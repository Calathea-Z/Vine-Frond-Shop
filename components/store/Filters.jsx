import { useState, useEffect } from "react";
import { PlusIcon, MinusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Filters = ({ productTypes = [] }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [checkedStates, setCheckedStates] = useState({});
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [selectedPriceRange, setSelectedPriceRange] = useState("");
	const [selectedAvailability, setSelectedAvailability] = useState("");

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
			(filter) => !["Under 25", "25-50", "Over 50"].includes(filter)
		);

		if (price !== "All") {
			setSelectedFilters([...filteredFilters, price]);
		} else {
			setSelectedFilters(filteredFilters);
		}
		console.log(`Updated selectedFilters: ${selectedFilters}`); // Debugging
	};
	const handleAvailabilityChange = (availability) => {
		setSelectedAvailability(availability);
		const filteredFilters = selectedFilters.filter(
			(filter) => !["In Stock", "Out of Stock"].includes(filter)
		);
		setSelectedFilters([...filteredFilters, availability]);
	};

	const clearFilter = (filter) => {
		setSelectedFilters(selectedFilters.filter((f) => f !== filter));
		if (filter === selectedPriceRange) {
			setSelectedPriceRange("All");
		} else if (filter === selectedAvailability) {
			setSelectedAvailability("");
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
					{selectedFilters.map(
						(filter) =>
							filter !== "All" && (
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
							)
					)}
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
							{["All", "Under 25", "25-50", "Over 50"].map((price, index) => (
								<label key={index} className="inline-flex items-center mt-2">
									<input
										type="radio"
										name="price"
										className="form-radio"
										checked={selectedPriceRange === price}
										onChange={() => {
											handlePriceRangeChange(price);
											if (price === "All") {
												setSelectedFilters(
													selectedFilters.filter((filter) => filter !== price)
												);
											}
										}}
									/>
									<span className="ml-2 text-2xl font-bold font-amaticSC">
										{price}
									</span>
								</label>
							))}
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-4xl font-bold font-amaticSC">
								Availability
							</span>
							{["In Stock", "Out of Stock"].map((availability, index) => (
								<label key={index} className="inline-flex items-center mt-2">
									<input
										type="radio"
										name="availability"
										className="form-radio"
										checked={selectedAvailability === availability}
										onChange={() => handleAvailabilityChange(availability)}
									/>
									<span className="ml-2 text-2xl font-semibold font-amaticSC">
										{availability}
									</span>
								</label>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default Filters;
