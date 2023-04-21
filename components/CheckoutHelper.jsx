const CheckoutHelper = ({ activeStep = 0 }) => {
  return (
    <div className="mb-5 flex flex-wrap">
      {["Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2 text-center font-sans ${
              index <= activeStep
                ? "border-primary text-primary"
                : "border-black text-black"
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
