export default function DropdownNavMenu() {
	return (
		<div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
			{/* Menu items */}
			<a
				href="/all"
				className="block text-gray-700 text-sm p-2 hover:bg-gray-100"
			>
				All
			</a>
			<a
				href="/pottery"
				className="block text-gray-700 text-sm p-2 hover:bg-gray-100"
			>
				Pottery
			</a>
			<a
				href="/prints"
				className="block text-gray-700 text-sm p-2 hover:bg-gray-100"
			>
				Prints
			</a>
			{/* Add more links as needed */}
		</div>
	);
}
