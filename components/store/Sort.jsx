import { useState, useEffect, useRef } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const Sort = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [sortSelected, setSortSelected] = useState(
		"Sort: Alphabetically, A to Z"
	);
	const sortRef = useRef();

	const sortOptions = [
		"Sort: Alphabetically, A to Z",
		"Sort: Alphabetically, Z to A",
		"Sort: Best Selling",
		"Sort: Date, New to Old",
		"Sort: Date, Old to Now",
		"Sort: Featured",
		"Sort: Price, High to Low",
		"Sort: Price, Low to High",
	];

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (sortRef.current && !sortRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [sortRef]);

	const handleSortSelection = (option) => {
		setSortSelected(option);
		setIsOpen(false); // Close the dropdown when a new sort type is selected
	};

	return (
		<div className="relative" ref={sortRef}>
			<div
				className={`w-[15rem] flex justify-between items-center mt-2 py-1 px-2 gap-2 border-[1px] border-black cursor-pointer hover:bg-slate-200 ${
					isOpen ? "border-b-[1px] border-slate-200" : "hover:border-b-black"
				}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="text-black font-amaticSC font-bold text-2xl">
					{sortSelected}
				</span>
				{isOpen ? (
					<ChevronUpIcon className="w-4 h-4" />
				) : (
					<ChevronDownIcon className="w-4 h-4" />
				)}
			</div>
			{isOpen && (
				<div className="absolute z-10 bg-primary border-[1px] border-black border-t-[1px] pt-1 pb-2 px-2 w-[15rem] rounded-b-sm shadow-lg right-0 top-full">
					{sortOptions.map((option, index) => (
						<div
							key={index}
							className="text-start font-bold text-2xl font-amaticSC hover:bg-slate-200 cursor-pointer"
							onClick={() => handleSortSelection(option)}
						>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
export default Sort;
