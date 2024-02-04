import { Store } from "@/utils/Store";
import { getError } from "@/utils/error";
import { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClipLoader from "react-spinners/ClipLoader";
import dynamic from "next/dynamic";
import Link from "next/link";

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

const OrderHistoryScreen = () => {
	const router = useRouter();
	const { state } = useContext(Store);
	const { userInfo } = state;

	const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
		loading: true,
		orders: [],
		error: "",
	});

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
		<div className="h-screen flex flex-col justify-between mt-[9rem]">
			<Header />
			{loading ? (
				<div className="flex-grow flex justify-center items-center ">
					<ClipLoader />
				</div>
			) : (
				<div className="flex-grow p-8 grid gap-4 bg-[#f7fafc]">
					<h1 className="text-2xl text-center font-sans font-bold text-[#2d3748] py-4">
						{userInfo.firstName}'s Order History
					</h1>
					{orders
						.slice()
						.reverse()
						.map((order, index) => (
							<div
								key={index}
								className="border-2 border-gray-400 rounded-md p-4 grid grid-cols-4 gap-4"
							>
								<div>
									<h1 className="font-sans text-lg">Order Date:</h1>
									<h1 className="font-sans text-md">
										{order.createdAt.substring(0, 10)}
									</h1>
								</div>
								<div className="mr-4">
									<h1 className="font-sans text-lg">Confirmation Number:</h1>
									<h1 className="font-sans text-md">{order._id}</h1>
								</div>
								<div className="ml-4">
									<h1 className="font-sans text-lg">Total Price:</h1>
									<h1 className="font-sans text-md">${order.totalPrice}</h1>
								</div>
								<div className="flex justify-center items-center">
									<Link
										href={`/order/details/${order._id}`}
										className="bg-gray-200 font-sans border-gray-800 border-[.1rem] rounded px-10 py-2 hover:border-blue-400 mt-4 mb-8"
										passHref
									>
										Order Details
									</Link>
								</div>
							</div>
						))}
				</div>
			)}

			<Footer />
		</div>
	);
};

export default dynamic(() => Promise.resolve(OrderHistoryScreen), {
	ssr: false,
});
