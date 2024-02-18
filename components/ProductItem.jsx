import { urlFor } from "@/utils/image.js";

const ProductItem = ({ product }) => {
	return (
		<div
			className="flex flex-col items-center"
			style={{ width: "20vw", margin: "0 10px" }}
		>
			{/* Adjusted container to include both image and text within the border */}
			<div
				className={`w-full h-auto bg-white shadow-lg border border-black flex flex-col items-center justify-center p-2`}
			>
				{/* Image container remains the same */}
				{product.photo && product.photo.length > 0 ? (
					<img
						src={urlFor(product.photo[0].asset._ref).url()}
						alt={product.name}
						className="object-cover rounded-3xl px-1 py-2" // Adjusted to round only the top corners
						style={{ maxHeight: "95%", maxWidth: "95%", width: "100%" }} // Ensure the image covers the width
					/>
				) : (
					<div className="flex items-center justify-center w-full h-full">
						<p className="text-gray-500">No Image Available</p>
					</div>
				)}
				{!product.countInStock && (
					<div className="absolute top-2 left-2 bg-red-600 text-white py-1 px-2 text-sm font-bold rounded-lg">
						Sold out
					</div>
				)}
				{/* Text container adjusted to be a direct child of the bordered container */}
				<div className="w-full p-2 text-center">
					<h4 className="text-lg font-bold">{product.name}</h4>
					<p className="text-md text-gray-700">${product.price}</p>
				</div>
			</div>
		</div>
	);
};
export default ProductItem;
