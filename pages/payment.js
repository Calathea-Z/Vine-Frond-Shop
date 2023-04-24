import CheckoutHelper from "@/components/CheckoutHelper";
import PaymentSquare from "@/components/PaymentSquare";
import { PaymentForm } from "react-square-web-payments-sdk";

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
