const PaymentMethodSwitcher = ({ paymentMethod, setPaymentMethod }) => {
	return (
		<div>
			{paymentMethod === "card" && (
				<button
					onClick={() => setPaymentMethod("google")}
					className="border-gray-400 bg-slate-800 text-white font-sans text-sm font-semibold border-2 flex justify-center items-center rounded-md p-2 m-2 mx-auto shadow-md hover:bg-green-600 mt-6"
				>
					Use Google Pay
				</button>
			)}
			{paymentMethod === "google" && (
				<button
					onClick={() => setPaymentMethod("card")}
					className="border-gray-400 bg-slate-800 text-white font-sans text-sm font-semibold border-2 flex justify-center items-center rounded-md p-2 m-2 mx-auto shadow-md hover:bg-green-600 mt-6"
				>
					Use Debit / Credit Card
				</button>
			)}
		</div>
	);
};

export default PaymentMethodSwitcher;
