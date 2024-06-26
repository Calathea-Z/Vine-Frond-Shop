//App
import client from "@/utils/client";
import { Store } from "@/utils/Store";
import Footer from "@/components/mainPage/Footer";
import Header from "@/components/mainPage/header/Header";
import Modal from "@/components/store/Modal";
import { urlFor } from "@/utils/image.js";
//Packages
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";

export default function ProductScreen(props) {
	const { slug } = props;
	const {
		state: { cart, isCartVisible },
		dispatch,
	} = useContext(Store);
	const { enqueueSnackbar } = useSnackbar();
	const [state, setState] = useState({
		product: null,
		loading: true,
		error: "",
		quantity: 1,
	});
	const { product, loading, error, quantity } = state;
	const [selectedImage, setSelectedImage] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (image) => {
		setSelectedImage(image);
		setIsModalOpen(true);
	}

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedImage(null);
	}

	const toggleCart = () => {
		dispatch({ type: isCartVisible ? "HIDE_CART" : "SHOW_CART" });
	};

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
		const newQuantity = existItem ? existItem.quantity + quantity : quantity;
		const { data } = await axios.get(`/api/allproducts/${product._id}`);
		if (data.countInStock < newQuantity) {
			enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" });
			return;
		}
		toggleCart(); // Utilizing the toggleCart function to make the code cleaner
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
				quantity: newQuantity,
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

	const handleQuantityChange = (change) => {
		const newQuantity = quantity + change;
		if (newQuantity > 0 && newQuantity <= product.countInStock) {
			setState({ ...state, quantity: newQuantity });
		} else {
			enqueueSnackbar(
				`We only have ${quantity} ${product.name}s in stock at the moment!`,
				{
					variant: "warning",
					anchorOrigin: { vertical: "top", horizontal: "right" },
					style: { color: "#000000" }, // Set text color to dark black
				}
			);
		}
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
											className="flex justify-center items-center rounded-[.3rem] cursor-pointer"
											onClick={() => openModal(photo)}
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
										<div className="flex flex-col items-center justify-center">
											{product.countInStock > 0 ? (
												<>
													<div className="flex items-center mb-4 text-lg">
														<span className="mr-4">Quantity:</span>
														<div className="flex items-center">
															<button
																className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center"
																onClick={() => handleQuantityChange(-1)}
																disabled={quantity <= 1}
															>
																-
															</button>
															<span className="mx-3 font-amaticSC font-bold text-3xl">
																{quantity}
															</span>
															<button
																className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center"
																onClick={() => handleQuantityChange(1)}
															>
																+
															</button>
														</div>
													</div>
													<motion.div
														whileHover={{
															rotate: [0, 1, -1, 1, 0],
															transition: { duration: 0.4 },
														}}
														className="inline-block"
													>
														<button
															className="bg-emerald-400/70 border-gray-800 border-[.1rem] rounded px-20 py-3 hover:border-blue-400 mt-4 mb-8 flex items-center justify-center gap-3"
															onClick={addToCartHandler}
														>
															Add to Cart
														</button>
													</motion.div>
												</>
											) : (
												<button
													className="bg-rose-400 cursor-not-allowed border-gray-800 border-[.1rem] rounded px-4 py-3 mt-4 mb-8 flex items-center justify-center gap-3"
													disabled
												>
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
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				{selectedImage && selectedImage.asset && selectedImage.asset._ref && (
					<Image
						src={urlFor(selectedImage.asset._ref).url()}
						alt={`Enlarged image of ${product.name}`}
						width={1024}
						height={768}
						layout="responsive"
					/>
				)}
			</Modal>
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

