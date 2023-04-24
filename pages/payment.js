import CheckoutHelper from "@/components/CheckoutHelper";
import PaymentSquare from "@/components/PaymentSquare";

const PaymentScreen = () => {
  return (
    <div>
      <div className="p-8">
        <CheckoutHelper activeStep={3} />
        <PaymentSquare />
      </div>
    </div>
  );
};
export default PaymentScreen;
