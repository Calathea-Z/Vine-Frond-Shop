const CheckoutHelper = ({ activeStep = 0 }) => {
  return (
    <div className="mb-5 flex flex-wrap">
      {["Cart", "Information", "Shipping", "Payment"].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2 text-center font-sans text-xs sm:text-md ${
              index === activeStep
                ? "border-primary text-primary"
                : "border-gray-400 text-gray-400"
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
