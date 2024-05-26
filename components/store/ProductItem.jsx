//App
import { urlFor } from "@/utils/image.js";
import { Store } from "@/utils/Store";
//Packages
import { useContext } from "react";
import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

const ProductItem = ({ product, addToCart }) => {
	const { dispatch } = useContext(Store);

	const addToCartHandler = () => {
		dispatch({
			type: "CART_ADD_ITEM",
			payload: {
				_key: product._id,
				name: product.name,
				countInStock: product.countInStock,
				slug: product.slug.current,
				price: product.price,
				photo: product.photo,
				quantity: 1,
			},
		});
	};

	const slug =
		typeof product.slug === "object" ? product.slug.current : product.slug;

	console.log(product.name, product.countInStock);

	return (
		<div className="flex flex-col items-center relative">
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
				<div className="w-full flex justify-between gap-3 items-center p-2">
					<h4 className="text-xs font-bold">{product.name}</h4>
					<p className="text-md text-gray-700">${product.price}</p>
				</div>
				{product.countInStock === 0 && (
					<div className="absolute top-2 right-2 bg-rose-500 text-white py-1 px-2 text-sm font-bold rounded-md">
						SOLD OUT
					</div>
				)}
				<button
					className={`bg-slate-400 hover:bg-emerald-500 text-white self-end font-bold py-1 px-2 rounded flex items-center ${
						product.countInStock <= 0 ? "opacity-0" : ""
					}`}
					onClick={addToCartHandler}
					disabled={product.countInStock <= 0}
				>
					<ShoppingBagIcon className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
};

export default ProductItem;
