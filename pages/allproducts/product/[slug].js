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
	return (
		<>
			<Header />
			<div className="flex flex-col items-center justify-center h-4/5 mt-[11rem]">
				{loading ? (
					<div className="flex justify-center items-center w-full">
						<ClipLoader />
					</div>
				) : error ? (
					<div className="w-full text-center">{error}</div>
				) : (
					<div className="flex flex-col lg:flex-row items-center justify-center lg:items-start w-full px-6">
						<div className="lg:w-1/2 w-full flex justify-center items-center mb-4 lg:mb-0">
							{product && product.photo && product.photo.length > 0 ? (
								<div className="grid grid-cols-1 gap-6">
									{product.photo.map((photo, index) => (
										<div
											key={index}
											className="flex justify-center items-center"
										>
											<Image
												src={urlFor(photo.asset._ref).url()}
												alt={`Picture of ${product.name} ${index + 1}`}
												className="object-cover border-black border h-auto max-w-full mb-1"
												quality={100}
												priority={index === 0} // Only the first image is priority
												responsive={true}
												width={760} // Assuming a base width
												height={700} // Assuming a base height to maintain aspect ratio
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
						<div className="flex flex-col md:flex-1 lg:py-10">
							{product ? (
								<>
									<div className="text-center lg:text-left lg:px-3">
										<h1 className="text-2xl text-thin italic">
											{product.name}
										</h1>
										<h4 className="text-extrabold p-1 text-slate-800 text-xl mt-2">
											$ {product.price}.00
										</h4>
									</div>
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
									<div className="flex justify-center">
										<button
											className={`${
												product.countInStock > 0
													? "bg-gray-200"
													: "bg-red-200 cursor-not-allowed"
											} border-gray-800 border-[.1rem] rounded px-12 py-3 hover:border-blue-400 mt-4 mb-8 flex items-center justify-center gap-3`}
											onClick={
												product.countInStock > 0 ? addToCartHandler : undefined
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
			<div className="w-full h-1/5 flex justify-center bg-secondary border-t-black border-t p-4">
				<div>
					<h1>Sanity</h1>
				</div>
				<div>
					<h1>Sanity</h1>
				</div>
			</div>
			<div className="w-full h-2/5 flex justify-center">
				<p>Reviews Go Here</p>
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
