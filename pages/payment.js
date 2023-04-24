import CheckoutHelper from "@/components/CheckoutHelper";

const PaymentScreen = () => {
  return (
    <div>
      <div className="p-8">
        <CheckoutHelper activeStep={3} />
      </div>
    </div>
  );
};
export default PaymentScreen;
