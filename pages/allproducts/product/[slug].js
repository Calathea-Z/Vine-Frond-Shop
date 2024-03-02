import client from "@/utils/client";
import ClipLoader from "react-spinners/ClipLoader";
import Footer from "@/components/mainPage/Footer";
import Header from "@/components/mainPage/header/Header";
import axios from "axios";
import Image from "next/image";
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
	return (
		<>
			<Header />
			<div
				className="flex flex-col md:flex-row"
				style={{ height: "calc(100vh - 25px)" }}
			>
				{loading ? (
					<div className="flex-grow w-full flex justify-center items-center">
						<ClipLoader />
					</div>
				) : error ? (
					<div className="flex-grow w-full">{error}</div>
				) : (
					<div className="flex flex-col md:flex-row w-full">
						<div className="h-full relative w-full md:w-1/2">
							{product && product.photo && product.photo.length > 0 ? (
								<Image
									src={urlFor(product.photo[0].asset._ref).url()}
									alt={`Picture of ${product.name}`}
									className="object-cover"
									quality={100}
									priority={true}
									fill
								/>
							) : (
								<div className="flex items-center justify-center w-full h-full bg-gray-200">
									<p className="text-gray-500">No Image Available</p>
								</div>
							)}
						</div>
						<div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
							<div className="text-center">
								<h1 className="text-2xl text-thin italic">
									{product ? product.name : "Product not found"}
								</h1>
								{product && (
									<>
										<h4 className="text-extrabold p-1 text-slate-800 text-xl">
											$ {product.price}.00
										</h4>
										<div className="flex flex-col items-center p-10 gap-3 leading-loose">
											<p className="text-bold text-slate-800">
												{product.description}
												<br /> <br />
											</p>
											<p className="text-bold text-slate-800">
												Size:
												<br />
												{product.measurements}
											</p>
										</div>
										<div className="w-full flex justify-center">
											<button
												className={`${
													product.countInStock > 0
														? "bg-gray-200"
														: "bg-red-200 cursor-not-allowed"
												} border-gray-800 border-[.1rem] rounded px-12 py-3 hover:border-blue-400 mt-4 mb-8 flex items-center justify-center gap-3`}
												onClick={
													product.countInStock > 0
														? addToCartHandler
														: undefined
												}
												disabled={product.countInStock === 0}
											>
												{product.countInStock > 0 ? (
													"Add to Cart"
												) : (
													<>
														<XCircleIcon className="w-5 h-5" />
														Sold Out
													</>
												)}
											</button>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
			<Footer />
		</>
	);
}

export function getServerSideProps(context) {
	return {
		props: { slug: context.params.slug },
	};
}
