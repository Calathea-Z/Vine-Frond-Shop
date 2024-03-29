import { urlFor } from "@/utils/image.js";
import Link from "next/link";

const ProductItem = ({ product }) => {
	const slug =
		typeof product.slug === "object" ? product.slug.current : product.slug;

	return (
		<div className="flex flex-col items-center">
			<div
				className={`w-full h-auto bg-white shadow-lg border border-black flex flex-col items-center justify-center p-2`}
			>
				{product.photo && product.photo.length > 0 ? (
					<Link href={`/allproducts/product/${slug}`}>
						<img
							src={urlFor(product.photo[0].asset._ref).url()}
							alt={product.name}
							className="object-cover rounded-3xl px-1 py-2"
							style={{ maxHeight: "100%", maxWidth: "100%", width: "100%" }}
						/>
					</Link>
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
				<div className="w-full p-2 text-center">
					<h4 className="text-sm font-bold mb-1">{product.name}</h4>
					<p className="text-md text-gray-700">${product.price}</p>
				</div>
			</div>
		</div>
	);
};
export default ProductItem;
