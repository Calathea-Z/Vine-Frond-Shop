// This component displays the steps of the checkout process as tabs, indicating which step is currently active.
const CheckoutHelper = ({ activeStep = 0 }) => {
  return (
    <div className="mb-5 flex flex-wrap">
      {/* Iterate through each step in the checkout process and create a tab for it */}
      {["Cart", "Information", "Shipping", "Payment"].map(
        (step, index) => (
          <div
            key={step}
            // Set the class of the tab based on whether it is the active step or not
            className={`flex-1 border-b-2 text-center font-sans text-xs sm:text-md pb-2 ${
              index === activeStep
                ? "border-green-500 text-green-500"
                : "border-gray-100 text-gray-500"
            }`}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
};

export default CheckoutHelper;