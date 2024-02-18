import { urlFor } from "@/utils/image.js";

const ProductItem = ({ product }) => {
	return (
		<div
			className="flex flex-col items-center"
			style={{ width: "20vw", margin: "0 10px" }}
		>
			<div className="relative w-full h-[25rem] bg-white rounded-lg shadow-lg border border-black flex items-center justify-center">
				<div className="w-full h-full flex items-center justify-center rounded-lg">
					{" "}
					{product.photo && product.photo.length > 0 ? (
						<img
							src={urlFor(product.photo[0].asset._ref).url()}
							alt={product.name}
							className="object-cover rounded-lg"
							style={{ maxHeight: "95%", maxWidth: "95%" }}
						/>
					) : (
						<div className="flex items-center justify-center w-full h-full">
							<p className="text-gray-500">No Image Available</p>
						</div>
					)}
				</div>
				{!product.countInStock && (
					<div className="absolute top-2 left-2 bg-red-600 text-white py-1 px-2 text-sm font-bold rounded-lg">
						Sold out
					</div>
				)}
			</div>
			<div className="text-center mt-4 px-2">
				<h4 className="text-lg font-bold">{product.name}</h4>
				<p className="text-md text-gray-700">{product.price} USD</p>
			</div>
		</div>
	);
};
export default ProductItem;
