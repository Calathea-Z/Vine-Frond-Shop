import {
  CreditCard,
  PaymentForm,
  GooglePay,
} from "react-square-web-payments-sdk";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Store } from "@/utils/Store";
import jsCookie from "js-cookie";
import { PulseLoader } from "react-spinners";

const PaymentSquare = () => {
  const { dispatch } = useContext(Store);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, SetError] = useState(null);

  useEffect(() => {
    if (orderSuccess === true) {
      dispatch({
        type: "UPDATE_PAYMENT_SUCCESS",
        payload: { orderSuccess },
      });
      jsCookie.set("orderSuccess", JSON.stringify({ orderSuccess }));
    }
    return;
  }, [orderSuccess, dispatch]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentFormSubmit = async (token) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/payments/squarepay",
        {
          sourceId: token.token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.payment.status === "COMPLETED") {
        setOrderSuccess(true);
      }
    } catch (error) {
      SetError("Payment failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-w-[350px]">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <PulseLoader color="#36d7b7" />
      ) : (
        <>
          {paymentMethod === "card" && (
            <PaymentForm
              applicationId="sandbox-sq0idb-Jh0U_iAf4arZphPcQUcmNA"
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
              applicationId="sandbox-sq0idb-Jh0U_iAf4arZphPcQUcmNA"
              nonceGenerationStarted={function () {}}
              nonceGenerationCompleted={function () {}}
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
            <button
              onClick={() => handlePaymentMethodChange("google")}
              className=" border-gray-400 bg-slate-800 text-white font-sans text-sm font-semibold border-2 flex justify-center items-center rounded-md p-2 m-2 mx-auto shadow-md hover:bg-green-600 mt-6"
            >
              Use Google Pay
            </button>
          )}

          {paymentMethod === "google" && (
            <button
              onClick={() => handlePaymentMethodChange("card")}
              className="border-gray-400 bg-slate-800 text-white font-sans text-sm font-semibold border-2 flex justify-center items-center rounded-md p-2 m-2 mx-auto shadow-md hover:bg-green-600 mt-6"
            >
              Use Debit / Credit Card
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentSquare;
