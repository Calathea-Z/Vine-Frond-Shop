import { urlFor } from "@/utils/image.js";

const ProductItem = ({ product }) => {
	return (
		<div className="flex flex-col items-center w-full">
			{" "}
			{/* Removed max-width */}
			<div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
				{" "}
				{/* Increased height, added rounded corners and shadow */}
				{product.photo && product.photo.length > 0 ? (
					<img
						src={urlFor(product.photo[0].asset._ref).url()}
						alt={product.name}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="flex items-center justify-center w-full h-full bg-gray-100">
						<p className="text-gray-500">No Image Available</p>
					</div>
				)}
				{!product.countInStock && (
					<div className="absolute bottom-0 left-0 bg-red-600 text-white py-1 px-2 text-xs rounded-tr-lg">
						Sold out
					</div>
				)}
			</div>
			<div className="text-center mt-4">
				<h4 className="text-md font-bold">{product.name}</h4>
				<p className="text-sm">${product.price} USD</p>
			</div>
		</div>
	);
};

export default ProductItem;
