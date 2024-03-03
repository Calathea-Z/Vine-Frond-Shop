const Filters = () => {
	return (
		<div className="flex justify-center items-center py-2 px-3 bg-transparent cursor-pointer hover:bg-slate-50 rounded-lg">
			<span className="text-black font-bold font-amaticSC text-2xl">
				FILTER
			</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 ml-2"
				fill="none"
				viewBox="0 0 24 24"
				stroke="black"
				strokeWidth="2"
			>
				<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
			</svg>
		</div>
	);
};

export default Filters;
