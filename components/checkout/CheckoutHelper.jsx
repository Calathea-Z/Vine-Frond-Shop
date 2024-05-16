// This component is responsible for displaying the checkout process in a tabbed format.
// It visually indicates which step of the checkout process the user is currently on.

// Define the steps involved in the checkout process.
const CHECKOUT_STEPS = ["Cart", "Information", "Shipping", "Payment"];

// The CheckoutHelper functional component takes an activeStep prop to indicate the current step.
const CheckoutHelper = ({ activeStep = 0 }) => {
	return (
		<div className="mb-5 flex flex-wrap">
			{/* Loop through the CHECKOUT_STEPS array to render each step as a tab. */}
			{CHECKOUT_STEPS.map((step, index) => (
				<div
					key={step} // Use the step name as a unique key for each tab.
					// Dynamically assign classes to style the tab based on whether it is the active step.
					// Active steps are highlighted in green, while inactive steps are gray.
					className={`flex-1 border-b-2 text-center font-sans text-xs sm:text-md pb-2 ${
						index === activeStep
							? "border-green-500 text-green-500" // Styles for the active step
							: "border-gray-100 text-gray-500" // Styles for inactive steps
					}`}
				>
					{step} {/* Display the name of the step */}
				</div>
			))}
		</div>
	);
};

export default CheckoutHelper;
