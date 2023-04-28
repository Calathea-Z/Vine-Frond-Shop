import { CreditCard, PaymentForm, GooglePay } from "react-square-web-payments-sdk";
import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { Store } from "@/utils/Store";
import jsCookie from "js-cookie";

const PaymentSquare = () => {
  const { dispatch } = useContext(Store);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if(orderSuccess === true){
    dispatch({
      type: "UPDATE_PAYMENT_SUCCESS",
      payload: { orderSuccess }
      });
    jsCookie.set(
      "orderSuccess",
      JSON.stringify({ orderSuccess})
    );
    } return;
  },[orderSuccess, dispatch])

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentFormSubmit = async (token) => {
    try {
      const response = await axios.post('/api/payments/squarepay', {
        sourceId: token.token,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log("response", response.data.payment.status);
      if(response.data.payment.status === 'COMPLETED'){
        setOrderSuccess(true);
        console.log("Order Status Changed")
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {paymentMethod === "card" && (
        <PaymentForm
          applicationId='sandbox-sq0idb-Jh0U_iAf4arZphPcQUcmNA'
          cardTokenizeResponseReceived={handlePaymentFormSubmit}
          createPaymentRequest={() => ({
            countryCode: "US",
            currencyCode: "USD",
            total: {
              amount: "1.00",
              label: "Total",
            },
          })}
          locationId="LPBC85G5K72DB"
        >
          <CreditCard buttonProps={{
            css: {
              backgroundColor: 'black',
              color: 'white'
            }
          }} />
        </PaymentForm>
      )}

      {paymentMethod === "google" && (
        <PaymentForm
          applicationId='sandbox-sq0idb-Jh0U_iAf4arZphPcQUcmNA'
          nonceGenerationStarted={function(){}}
          nonceGenerationCompleted={function(){}}
          cardNonceResponseReceived={handlePaymentFormSubmit}
          createPaymentRequest={() => ({
            countryCode: "US",
            currencyCode: "USD",
            total: {
              amount: "1.00",
              label: "Total",
            },
          })}
          locationId="LPBC85G5K72DB"
        >
          <GooglePay />
        </PaymentForm>
      )}

      {paymentMethod === "card" && (
        <button onClick={() => handlePaymentMethodChange("google")} className='border-gray-400 bg-green-400 text-stone-800 font-sans text-sm font-semibold border-2 flex justify-center items-center rounded-md p-2 m-2 mx-auto shadow-md'>
          Use Google Pay
        </button>
      )}

      {paymentMethod === "google" && (
        <button onClick={() => handlePaymentMethodChange("card")} className='border-gray-400 bg-green-400 text-stone-800 font-sans text-sm font-semibold border-2 flex justify-center items-center rounded-md p-2 m-2 mx-auto shadow-md'>
          Use Debit / Credit Card
        </button>
      )}
    </div>
  );
};

export default PaymentSquare

