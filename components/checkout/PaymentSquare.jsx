import PaymentMethodSwitcher from "./PaymentMethodSwitcher";
import {
	CreditCard,
	PaymentForm,
	GooglePay,
	payments,
} from "react-square-web-payments-sdk";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Store } from "@/utils/Store";
import jsCookie from "js-cookie";
import { PulseLoader } from "react-spinners";

const PaymentSquare = ({ totalPrice }) => {
	const { dispatch } = useContext(Store);
	const [paymentMethod, setPaymentMethod] = useState("card");
	const [orderSuccess, setOrderSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (orderSuccess) {
			dispatch({
				type: "UPDATE_PAYMENT_SUCCESS",
				payload: { orderSuccess },
			});
			jsCookie.set("orderSuccess", JSON.stringify({ orderSuccess }));
		}
	}, [orderSuccess, dispatch]);

	const handlePaymentFormSubmit = async (token) => {
		try {
			setLoading(true);
			const response = await axios.post(
				"/api/payments/squarepay",
				{ sourceId: token.token, amount: totalPrice },
				{ headers: { "Content-Type": "application/json" } }
			);
			if (response.data.payment.status === "COMPLETED") {
				setOrderSuccess(true);
			} else {
				setError("Payment failed. Please try again.");
			}
		} catch (error) {
			setError("Payment failed. Please try again.");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	// Initialize Google Pay
	useEffect(() => {
		const initializeGooglePay = async () => {
			if (!payments) {
				console.error("Square Web Payments SDK is not loaded.");
				return;
			}

			try {
				const paymentRequest = payments.paymentRequest({
					countryCode: "US",
					currencyCode: "USD",
					total: {
						amount: totalPrice.toString(),
						label: "Total",
					},
				});

				const googlePay = await payments.googlePay(paymentRequest);
				await googlePay.attach("#google-pay-button");
			} catch (error) {
				console.error("Initializing Google Pay failed", error);
			}
		};

		if (paymentMethod === "google") {
			initializeGooglePay();
		}
	}, [paymentMethod, totalPrice]);

	return (
		<div className="p-6 min-w-[350px]">
			{error && <div className="text-red-500 mb-4">{error}</div>}
			{loading ? (
				<PulseLoader color="#36d7b7" />
			) : (
				<>
					<PaymentMethodSwitcher
						paymentMethod={paymentMethod}
						setPaymentMethod={setPaymentMethod}
					/>
					{paymentMethod === "card" && (
						<PaymentForm
							applicationId={process.env.NEXT_PUBLIC_SQUARE_APP_ID}
							cardTokenizeResponseReceived={handlePaymentFormSubmit}
							createPaymentRequest={() => ({
								countryCode: "US",
								currencyCode: "USD",
								total: {
									amount: totalPrice.toString(),
									label: "Total",
								},
							})}
							locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID}
						>
							<CreditCard
								buttonProps={{
									css: {
										backgroundColor: "rgb(30 41 59)",
										color: "white",
										transition: "opacity 0.1s ease",
										"&:hover": {
											opacity: 0.9,
										},
									},
								}}
							/>
						</PaymentForm>
					)}

					{paymentMethod === "google" && (
						<PaymentForm
							applicationId={process.env.NEXT_PUBLIC_SQUARE_APP_ID}
							cardTokenizeResponseReceived={handlePaymentFormSubmit}
							createPaymentRequest={() => ({
								countryCode: "US",
								currencyCode: "USD",
								total: {
									amount: totalPrice.toString(),
									label: "Total",
								},
							})}
							locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID}
						>
							<GooglePay />
						</PaymentForm>
					)}
				</>
			)}
		</div>
	);
};

export default PaymentSquare;
