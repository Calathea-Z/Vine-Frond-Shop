import client from "@/utils/client";
import ClipLoader from "react-spinners/ClipLoader";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SingleProductCarouselTwo from "@/components/SingleProductCarouselTwo";
import { Store } from "@/utils/Store";
import { useSnackbar } from "notistack";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

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
					<div className="flex flex-col md:flex-row h-1/2 mt-48">
						<div className="md:w-1/2 h-auto flex justify-center items-center translate-y-10">
							<SingleProductCarouselTwo photos={product.photo} />
						</div>

						<div className="md:w-1/2 flex flex-col justify-between p-4">
							<h1 className="text-2xl">{product.name}</h1>
							<h4 className="text-extrabold p-1 text-center text-slate-800 text-xl">
								$ {product?.price}.00
							</h4>
							<div className="flex flex-col justify-start items-start">
								<h6 className="text-extrabold p-1 text-left text-slate-800 inline-flex">
									Description:
								</h6>
								<p className="text-bold p-1 text-left text-slate-800 inline-flex">
									{product.description}
									<br /> <br />
									Measurements:
									<br /> <br />
									{product.measurements}
								</p>
							</div>
							{product.countInStock > 0 ? (
								<button
									className="bg-gray-200 border-gray-800 border-[.1rem] rounded px-10 py-2 hover:border-blue-400 mt-4 mb-8"
									onClick={addToCartHandler}
								>
									Add to Cart
								</button>
							) : (
								<div className="w-full flex bg-red-500 border-black border-2 p-4 justify-center items-center font-mono text-lg text-white">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 mr-2"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
									<span>Sold Out</span>
								</div>
							)}
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
