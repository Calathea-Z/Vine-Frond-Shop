// App
import { Store } from "@/utils/Store";
import { urlFor } from "@/utils/image";
import { sadCart } from "@/public/assets/index";
import { emptyCart } from "@/public/assets/index";
// Packages
import { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import jsCookie from "js-cookie";
import { useSnackbar } from "notistack";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
	const router = useRouter();
	const {
		state: {
			cart: { cartItems },
			isCartVisible,
		},
		dispatch,
	} = useContext(Store);

	const { enqueueSnackbar } = useSnackbar();

	const updateCartHandler = async (item, quantity) => {
		const { countInStock } = await axios.get(`/api/allproducts/${item._id}`);

		if (countInStock < quantity) {
			enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" });
			return;
		}
		if (quantity === 0 || quantity === "0") {
			removeItemHandler(item);
			return;
		}
		dispatch({
			type: "CART_ADD_ITEM",
			payload: {
				_key: item._key,
				name: item.name,
				countInStock: item.countInStock,
				slug: item.slug,
				price: item.price,
				photo: item.photo,
				shippingWeight: item.shippingWeight,
				quantity: quantity,
			},
		});
		enqueueSnackbar(`Cart Updated!`, { variant: "success" });
	};

	const removeItemHandler = (item) => {
		dispatch({ type: "CART_REMOVE_ITEM", payload: item });
	};

	const closeCartHandler = () => {
		dispatch({ type: "HIDE_CART" });
	};

	useEffect(() => {
		const currentWeight = cartItems.reduce(
			(a, c) => a + c.quantity * c.shippingWeight,
			0
		);
		dispatch({
			type: "UPDATE_SHIPPING_WEIGHT",
			payload: currentWeight,
		});
		jsCookie.set("shippingWeight", JSON.stringify(currentWeight));
	}, [cartItems, dispatch]);

	return (
		<AnimatePresence>
			{isCartVisible && (
				<motion.div
					key="cart"
					id="cartContainer"
					initial={{ x: "100%" }}
					animate={{ x: "0%" }}
					exit={{ x: "100%" }}
					transition={{ type: "spring", stiffness: 260, damping: 20 }}
					className="fixed right-0 top-0 w-[30%] h-screen bg-gradient-to-tr from-secondary to-white z-50 shadow-lg rounded-lg"
				>
					<div className="flex justify-between items-center p-5 border-b border-black">
						<button
							onClick={closeCartHandler}
							className="bg-black p-2 rounded-full"
						>
							<XMarkIcon className="h-4 w-4 text-white" />
						</button>
						<h1 className="text-md sm:text-2xl underline decoration-primary underline-offset-4 decoration-1">
							Cart ({cartItems.reduce((a, c) => a + c.quantity, 0)})
						</h1>
					</div>
					<div className="flex-grow overflow-y-auto mt-6 flex flex-col p-5">
						<div className="flex-grow p-2 sm:p-1 bg-transparent">
							{cartItems.length === 0 ? (
								<div className="flex flex-col items-center justify-around">
									<div className="p-6 rounded-md">
										<Image
											src={emptyCart}
											alt="empty cart"
											width={275}
											height={275}
											className="rounded-lg"
										/>
									</div>
									<div className="p-4">
										<h1 className="self-start pl-2 text-xl font-serif text-black">
											Your cart is empty
										</h1>
									</div>
								</div>
							) : (
								cartItems.map((item, index) => (
									<div
										className="flex justify-between items-center py-4 border-b border-black"
										key={item._id || index}
									>
										<div className="flex items-center space-x-4">
											<Link href={`/allproducts/product/${item.slug}`} passHref>
												<Image
													src={urlFor(item.photo[0].asset._ref).url()}
													alt={item.name}
													width={80}
													height={80}
													className="rounded-md"
												/>
											</Link>
											<div className="flex flex-col gap-3">
												<h2 className="text-xs font-bold">{item.name}</h2>
												<div className="flex items-center gap-3">
													<div className="space-x-2">
														<button
															onClick={() =>
																updateCartHandler(item, item.quantity - 1)
															}
															className="bg-primary rounded-full p-1 hover:bg-gray-200 text-xl font-bold"
														>
															-
														</button>
														<button
															onClick={() =>
																updateCartHandler(item, item.quantity + 1)
															}
															className="bg-primary rounded-full p-1 hover:bg-gray-200 text-xl font-bold"
														>
															+
														</button>
													</div>
													<p className="text-sm font-serif">
														QTY: {item.quantity}
													</p>
												</div>
											</div>
										</div>
										<div className="flex flex-col items-center gap-4">
											<p className="text-md font-bold">
												${item.price * item.quantity}
											</p>
											<div className="mt-auto">
												<button
													onClick={() => removeItemHandler(item)}
													className="text-red-600 text-xs rounded-lg p-1 hover:bg-slate-50"
												>
													Remove
												</button>
											</div>
										</div>
									</div>
								))
							)}
						</div>
						<div className="fixed inset-x-0 bottom-0 p-6 h-1/5 bg-transparent shadow-lg">
							{cartItems.length > 0 ? (
								<div className="border-t w-full border-white">
									<div className="flex justify-between p-6">
										<span className="text-lg font-bold">Subtotal</span>
										<span className="text-lg font-bold">
											${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
										</span>
									</div>
									<div className="flex justify-between mt-2 gap-2">
										<button
											onClick={closeCartHandler}
											className="bg-white text-black px-4 py-2 w-1/2 rounded"
										>
											Continue Shopping
										</button>
										<button
											onClick={closeCartHandler}
											className="bg-black text-white px-4 py-2 w-1/2 rounded"
										>
											Checkout
										</button>
									</div>
								</div>
							) : (
								<div className="flex justify-center mt-4">
									<div className="p-4 rounded-md bg-white text-black">
										<button onClick={closeCartHandler}>
											Continue Shopping
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Cart;
