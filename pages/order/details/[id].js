import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { Store } from "@/utils/Store";
import { useContext, useReducer, useEffect } from "react";
import { getError } from "@/utils/error";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function reducer(state, action) {
	switch (action.type) {
		case "FETCH_REQUEST":
			return { ...state, loading: true, error: "" };
		case "FETCH_SUCCESS":
			return { ...state, loading: false, order: action.payload, error: "" };
		case "FETCH_FAIL":
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
}

const OrderSuccessScreen = ({ params }) => {
	const { state } = useContext(Store);
	const { userInfo } = state;
	const id = params?.id;
	const [{ loading, error, order }, dispatch] = useReducer(reducer, {
		loading: true,
		order: {},
		error: "",
	});

	useEffect(() => {
		const fetchOrder = async () => {
			if (userInfo) {
				try {
					dispatch({ type: "FETCH_REQUEST" });
					const { data } = await axios.get(`/api/orders/${id}`, {
						headers: { authorization: `Bearer ${userInfo.token}` },
					});
					dispatch({ type: "FETCH_SUCCESS", payload: data });
				} catch (error) {
					dispatch({ type: "FETCH_FAIL", payload: getError(error) });
				}
			} else {
				try {
					dispatch({ type: "FETCH_REQUEST" });
					const { data } = await axios.get(`/api/orders/${id}`);
					dispatch({ type: "FETCH_SUCCESS", payload: data });
				} catch (error) {
					dispatch({ type: "FETCH_FAIL", payload: getError(error) });
				}
			}
		};
		fetchOrder();
	}, [id, userInfo]);

	const {
		shippingInformation,
		orderItems,
		itemsPrice,
		taxPrice,
		parsedShippingCost,
		totalPrice,
	} = order;

	return (
		<div className="h-screen flex flex-col justify-around">
			<Header />
			{loading && (
				<div className="flex justify-center items-center flex-col flex-grow">
					<ClipLoader className="flex justify-center align-center" />{" "}
				</div>
			)}
			{!loading && (
				<div className="flex flex-col h-screen flex-grow w-full justify-center items-center bg-primary">
					<div className="grid grid-cols-2 grid-row-1 p-2 border-2 border-black/90 rounded-md">
						<div className="flex justify-between p-4">
							<div className="flex flex-col gap-2 items-center">
								<h6 className="font-sans text-gray-600 font-bold text-2xl">
									Shipping Details
								</h6>
								<p className="font-sans text-lg">
									{shippingInformation?.firstNameShipping}{" "}
									{shippingInformation?.lastNameShipping}
								</p>
								<p className="font-sans text-lg">
									{shippingInformation?.company}
								</p>
								<p className="font-sans text-lg">
									{shippingInformation?.address}
								</p>
								<p className="font-sans text-lg">
									{shippingInformation?.city}, {shippingInformation?.usState}
								</p>
								<p className="font-sans text-lg">
									{shippingInformation?.zipCode}
									{shippingInformation?.country}
								</p>
							</div>
						</div>
						<div className="self-start py-2">
							<div className="flex flex-col items-center gap-6">
								<h1 className="font-sans p-2 text-gray-600 text-2xl font-bold">
									Confirmation Number:{" "}
								</h1>
								<h1 className="font-sans text-lg">{id}</h1>
							</div>
						</div>
					</div>
				</div>
			)}
			<Footer />
		</div>
	);
};

export function getServerSideProps({ params }) {
	return { props: { params } };
}
export default dynamic(() => Promise.resolve(OrderSuccessScreen), {
	ssr: false,
});
