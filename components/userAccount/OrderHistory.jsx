import { Store } from "@/utils/Store";
import { getError } from "@/utils/error";
import { useContext, useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import dynamic from "next/dynamic";
import OrderDetails from "@/components/checkout/OrderDetails";

function reducer(state, action) {
	switch (action.type) {
		case "FETCH_REQUEST":
			return { ...state, loading: true, error: "" };
		case "FETCH_SUCCESS":
			return { ...state, loading: false, orders: action.payload, error: "" };
		case "FETCH_FAIL":
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
}

const OrderHistory = () => {
	const router = useRouter();
	const { state } = useContext(Store);
	const { userInfo } = state;

	const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
		loading: true,
		orders: [],
		error: "",
	});

	const [openAccordions, setOpenAccordions] = useState([]);

	const toggleAccordion = (orderId) => {
		setOpenAccordions((prevOpenAccordions) => ({
			...prevOpenAccordions,
			[orderId]: !prevOpenAccordions[orderId],
		}));
	};

	useEffect(() => {
		if (!userInfo) {
			router.push("/login");
		}
		const fetchOrders = async () => {
			try {
				dispatch({ type: "FETCH_REQUEST" });
				const { data } = await axios.get(`/api/orders/history`, {
					headers: { authorization: `Bearer ${userInfo.token}` },
				});
				dispatch({ type: "FETCH_SUCCESS", payload: data });
			} catch (error) {
				dispatch({ type: "FETCH_FAIL", payload: getError(error) });
			}
		};
		fetchOrders();
	}, [router, userInfo]);

	return (
		<div className="flex flex-col justify-between bg-primary">
			{loading ? (
				<div className="flex-grow flex justify-center items-center">
					<ClipLoader />
				</div>
			) : error ? (
				<div className="flex-grow flex justify-center items-center text-red-500">
					{error}
				</div>
			) : (
				<div className="flex-grow grid  bg-white shadow-md">
					{orders
						.slice()
						.reverse()
						.map((order, index) => (
							<div
								key={index}
								className="border border-black py-6 px-4 grid grid-cols-1 md:grid-cols-4 w-full"
							>
								<div>
									<h2 className="font-semibold">Order Date:</h2>
									<p>{order.createdAt.substring(0, 10)}</p>
								</div>
								<div>
									<h2 className="font-semibold">Confirmation Number:</h2>
									<p>{order._id}</p>
								</div>
								<div>
									<h2 className="font-semibold">Total Price:</h2>
									<p>${order.totalPrice}</p>
								</div>
								<div className="flex justify-center items-center">
									<motion.button
										onClick={() => toggleAccordion(order._id)}
										className="bg-primary text-black font-bold text-2xl font-amaticSC border border-black rounded px-4 py-2 hover:border-6 hover:bg-[#ECC89A] transition-all duration-200"
										whileHover={{
											rotate: [0, 10, -10, 10, 0],
											transition: { duration: 0.4 },
										}}
									>
										Details
									</motion.button>
								</div>
								{openAccordions[order._id] && (
									<div className="col-span-full">
										<OrderDetails
											id={order._id}
											userInfo={userInfo}
											isOpen={openAccordions[order._id]}
										/>
									</div>
								)}
							</div>
						))}
				</div>
			)}
		</div>
	);
};

export default dynamic(() => Promise.resolve(OrderHistory), {
	ssr: false,
});
