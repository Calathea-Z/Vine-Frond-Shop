import client from "@/utils/client";
import ClipLoader from "react-spinners/ClipLoader";
import Footer from "@/components/mainPage/Footer";
import Header from "@/components/mainPage/header/Header";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import { Store } from "@/utils/Store";
import { useSnackbar } from "notistack";
import { useEffect, useState, useContext } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { urlFor } from "@/utils/image.js";

export default function ProductScreen(props) {
	const { slug } = props;
	const {
		state: { cart },
		dispatch,
	} = useContext(Store);
	const { enqueueSnackbar } = useSnackbar();
	const [state, setState] = useState({
		product: null,
		loading: true,
		error: "",
	});

	const { product, loading, error } = state;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const product = await client.fetch(
					`*[_type == "product" && slug.current == $slug][0]`,
					{ slug }
				);
				setState({ ...state, product, loading: false });
			} catch (err) {
				setState({ ...state, error: err.message, loading: false });
			}
		};
		fetchData();
		console.log(product);
	}, [slug]);

	const addToCartHandler = async () => {
		const existItem = cart.cartItems.find((x) => x._id === product._id);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const { data } = await axios.get(`/api/allproducts/${product._id}`);
		if (data.countInStock < quantity) {
			enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" });
			return;
		}
		dispatch({
			type: "CART_ADD_ITEM",
			payload: {
				_key: product._id,
				name: product.name,
				countInStock: product.countInStock,
				slug: product.slug.current,
				price: product.price,
				photo: product.photo,
				shippingWeight: product.shippingWeight,
				quantity,
			},
		});
		enqueueSnackbar(`${product.name} added to cart!`, { variant: "success" });
	};

	const splitProductDetails = () => {
		if (!product || !product.description) return [];
		return product.description
			.split(".")
			.map((sentence) => sentence.trim())
			.filter((sentence) => sentence !== "");
	};

	return (
		<>
			<Header />
			<div className="flex flex-col items-center justify-center h-4/5 mt-[11rem] pt-[3rem] px-[5rem]">
				{loading ? (
					<div className="flex justify-center items-center w-full">
						<ClipLoader />
					</div>
				) : error ? (
					<div className="w-full text-center">{error}</div>
				) : (
					<div className="flex flex-col lg:flex-row items-center justify-center lg:items-start w-full px-6 gap-6">
						<div className="lg:w-1/2 w-full flex justify-center items-center mb-4 lg:mb-0">
							{product && product.photo && product.photo.length > 0 ? (
								<div className="grid grid-cols-2 grid-rows-2 gap-[.2rem]">
									{product.photo.map((photo, index) => (
										<div
											key={index}
											className="flex justify-center items-center rounded-[.3rem]"
										>
											<Image
												src={urlFor(photo.asset._ref).url()}
												alt={`Picture of ${product.name} ${index + 1}`}
												className="object-cover border-black border h-auto max-w-full mb-1 rounded-[.3rem]"
												quality={100}
												priority={index === 0 && index === 1}
												responsive={true}
												width={760}
												height={700}
											/>
										</div>
									))}
								</div>
							) : (
								<div className="flex items-center justify-center w-full h-full bg-gray-200">
									<p className="text-gray-500">No Image Available</p>
								</div>
							)}
						</div>
						<div className="flex flex-col items-center justify-center md:flex-1 w-full">
							{product ? (
								<>
									<div className="bg-offwhite rounded-lg p-6 mt-5 shadow-md mx-auto w-full">
										<h1 className="text-3xl font-bold ">{product.name}</h1>
										<h4 className="font-extrabold p-1 text-md text-emerald-800 mt-2 mb-6">
											$ {product.price}.00
										</h4>
										<p className="text-slate-800 text-md font-bold items-center leasing-loose mb-6">
											{product.tagLine}
										</p>
										<p className="text-slate-800 font-bold text-md mb-3">
											Size:
										</p>
										<p className="text-slate-800 text-sm mb-8">
											{product.measurements}
										</p>
										<div className="flex justify-center">
											{product.countInStock > 0 ? (
												<motion.div
													whileHover={{
														rotate: [0, 8, -8, 8, 0],
														transition: { duration: 0.4 },
													}}
													className="inline-block"
												>
													<button
														className="bg-emerald-400 border-gray-800 border-[.1rem] rounded px-4 py-3 hover:border-blue-400 mt-4 mb-8 flex items-center justify-center gap-3"
														onClick={addToCartHandler}
													>
														Add to Cart
													</button>
												</motion.div>
											) : (
												<button
													className="bg-rose-400 cursor-not-allowed border-gray-800 border-[.1rem] rounded px-4 py-3 mt-4 mb-8 flex items-center justify-center gap-3"
													disabled
												>
													<XCircleIcon className="w-5 h-5" />
													Sold Out
												</button>
											)}
										</div>
									</div>
									<div className="bg-secondary rounded-lg px-6 pt-6 pb-[7.5rem] mt-7 shadow-md mx-auto w-full">
										<h1 className="font-bold mb-4 font-amaticSC text-4xl text-stone-800">
											Details:
										</h1>
										<ul className="list-disc pl-5">
											{splitProductDetails().map((detail, index) => (
												<li
													key={index}
													className="mb-2 font-amaticSC font-bold text-3xl text-stone-800"
												>
													{detail}
												</li>
											))}
										</ul>
									</div>
								</>
							) : (
								<div className="text-center">
									<h1 className="text-2xl text-thin italic">
										Product not found
									</h1>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
			<div className="mt-auto">
				<Footer />
			</div>
		</>
	);
}

export function getServerSideProps(context) {
	return {
		props: { slug: context.params.slug },
	};
}
