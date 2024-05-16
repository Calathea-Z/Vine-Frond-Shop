import { useState, useEffect } from "react";
import { PlusIcon, MinusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Filters = ({ productTypes = [] }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [checkedStates, setCheckedStates] = useState({});
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
	const [excludeOutOfStock, setExcludeOutOfStock] = useState(false);

	useEffect(() => {
		// Initialize or update the checkedStates based on productTypes
		const initialCheckedStates = productTypes.reduce((acc, type) => {
			acc[type] = productTypes.length === 1; // Auto-select if only one type
			return acc;
		}, {});
		setCheckedStates(initialCheckedStates);
	}, [productTypes]);

	const handleCheckboxChange = (type) => {
		setCheckedStates((prevStates) => ({
			...prevStates,
			[type]: !prevStates[type],
		}));
		const newFilters = selectedFilters.includes(type)
			? selectedFilters.filter((filter) => filter !== type)
			: [...selectedFilters, type];
		setSelectedFilters(newFilters);
	};

	const handlePriceRangeChange = (price) => {
		console.log(`Changing price range to: ${price}`); // Debugging
		setSelectedPriceRange(price);
		const filteredFilters = selectedFilters.filter(
			(filter) =>
				!["Under 25", "25-50", "Over 50", "All Prices"].includes(filter)
		);

		// If a specific price range is selected, remove "All Prices" from the filters if it exists
		if (price !== "All Prices") {
			const index = filteredFilters.indexOf("All Prices");
			if (index > -1) {
				filteredFilters.splice(index, 1);
			}
		}

		setSelectedFilters([...filteredFilters, price]);
		console.log(`Updated selectedFilters: ${selectedFilters}`); // Debugging
	};

	const handleExcludeOutOfStockChange = (exclude) => {
		setExcludeOutOfStock(exclude);
		const filterAction = exclude
			? "Exclude Out Of Stock"
			: "Include Out Of Stock";
		const filteredFilters = selectedFilters.filter(
			(filter) =>
				!["Include Out Of Stock", "Exclude Out Of Stock"].includes(filter)
		);
		setSelectedFilters([...filteredFilters, filterAction]);
	};

	const clearFilter = (filter) => {
		setSelectedFilters(selectedFilters.filter((f) => f !== filter));
		if (filter === selectedPriceRange) {
			setSelectedPriceRange("All Prices");
			// Ensure "All Prices" is added back to the filters when other selections are cleared
			const index = selectedFilters.indexOf(filter);
			if (index > -1) {
				let newFilters = [...selectedFilters];
				newFilters.splice(index, 1, "All Prices");
				setSelectedFilters(newFilters);
			}
		} else if (
			filter === "Exclude Out Of Stock" ||
			filter === "Include Out Of Stock"
		) {
			setExcludeOutOfStock(false);
		} else {
			setCheckedStates({ ...checkedStates, [filter]: false });
		}
	};

	return (
		<div>
			<div className="flex gap-2 mt-2 w-screen">
				<div
					className={`w-[8rem] flex justify-center items-center py-1 px-2 gap-1 ${
						isOpen ? "bg-slate-200" : "bg-transparent"
					} cursor-pointer hover:bg-slate-200 focus:bg-slate-200`}
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? (
						<MinusIcon className="w-4 h-4" />
					) : (
						<PlusIcon className="w-4 h-4" />
					)}
					<span className="text-black font-bold font-amaticSC text-2xl">
						{isOpen ? "HIDE FILTERS" : "SHOW FILTERS"}
					</span>
				</div>
				{/* Badges for selected filters */}
				<div className="flex flex-wrap gap-2">
					{selectedFilters.map((filter) => (
						<div
							key={filter}
							className="flex items-center bg-slate-200 px-2 py-1"
						>
							<span className="text-xl text-black font-bold font-amaticSC mr-2">
								{filter}
							</span>
							<XMarkIcon
								className="w-4 h-4 cursor-pointer"
								onClick={() => clearFilter(filter)}
							/>
						</div>
					))}
				</div>
			</div>
			{isOpen && (
				<div className="bg-primary py-4 w-screen">
					<div className="flex gap-[22rem] pt-2 px-4">
						<div className="flex flex-col gap-1">
							<span className="text-4xl font-semibold font-amaticSC">
								Product Type
							</span>
							{productTypes.map((type, index) => (
								<label key={index} className="inline-flex items-center mt-1">
									<input
										type="checkbox"
										className="form-checkbox"
										checked={checkedStates[type] || false}
										onChange={() => handleCheckboxChange(type)}
										disabled={productTypes.length === 1}
									/>
									<span className="ml-2 font-amaticSC font-bold text-2xl">
										{type}
									</span>
								</label>
							))}
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-4xl font-semibold font-amaticSC">
								Price
							</span>
							{["All Prices", "Under 25", "25-50", "Over 50"].map(
								(price, index) => (
									<label key={index} className="inline-flex items-center mt-2">
										<input
											type="radio"
											name="price"
											className="form-radio"
											checked={selectedPriceRange === price}
											onChange={() => handlePriceRangeChange(price)}
										/>
										<span className="ml-2 text-2xl font-bold font-amaticSC">
											{price}
										</span>
									</label>
								)
							)}
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-4xl font-bold font-amaticSC">
								Exclude Out Of Stock
							</span>
							<label className="inline-flex items-center mt-2">
								<input
									type="checkbox"
									className="form-checkbox"
									checked={excludeOutOfStock}
									onChange={(e) =>
										handleExcludeOutOfStockChange(e.target.checked)
									}
								/>
								<span className="ml-2 text-2xl font-semibold font-amaticSC">
									Yes
								</span>
							</label>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default Filters;
