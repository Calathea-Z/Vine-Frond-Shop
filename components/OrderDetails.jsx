import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { getError } from "@/utils/error";
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

const OrderDetails = ({ id, userInfo, isOpen }) => {
	const [{ loading, error, order }, dispatch] = useReducer(reducer, {
		loading: true,
		order: {},
		error: "",
	});

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				dispatch({ type: "FETCH_REQUEST" });
				const { data } = await axios.get(`/api/orders/${id}`, {
					headers: { authorization: `Bearer ${userInfo.token}` },
				});
				dispatch({ type: "FETCH_SUCCESS", payload: data });
			} catch (error) {
				dispatch({ type: "FETCH_FAIL", payload: getError(error) });
			}
		};

		if (isOpen) {
			fetchOrder();
		}
	}, [id, userInfo, isOpen]);

	if (!isOpen) {
		return null;
	}

	return (
		<div>
			{loading ? (
				<div className="flex justify-center items-center">
					<ClipLoader />
				</div>
			) : error ? (
				<div className="text-red-500">{error}</div>
			) : (
				<div className="p-4 border-2 border-black/90 rounded-md">
					{/* Display order details here */}
					<h6 className="font-sans text-gray-600 font-bold text-2xl">
						Shipping Details
					</h6>
					{/* Example detail: */}
					<p className="font-sans text-lg">
						{order.shippingInformation?.firstNameShipping}{" "}
						{order.shippingInformation?.lastNameShipping}
					</p>
					{/* Add more details as needed */}
				</div>
			)}
		</div>
	);
};

export default OrderDetails;
