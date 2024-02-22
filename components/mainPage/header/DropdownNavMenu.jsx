export default function DropdownNavMenu() {
	return (
		<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex flex-col items-center justify-center">
			{/* Menu items */}
			<a href="/all" className="text-white text-lg p-2">
				All
			</a>
			<a href="/pottery" className="text-white text-lg p-2">
				Pottery
			</a>
			<a href="/prints" className="text-white text-lg p-2">
				Prints
			</a>
			{/* Add more links as needed */}
		</div>
	);
}
