import { CreditCard, PaymentForm, ApplePay, GooglePay } from "react-square-web-payments-sdk";
import axios from 'axios';

const PaymentSquare = () => {

  return (
    <div className='p-4'>
      <PaymentForm
        applicationId='sandbox-sq0idb-Jh0U_iAf4arZphPcQUcmNA'
        cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
          try {
            const response = await axios.post('/api/payments/squarepay', {
              sourceId: token.token,
            }, {
              headers: {
                'Content-Type': 'application/json',
              }
            });
            console.log("token", token.token)
            console.log("response", response.data);
          //   console.log('token:', token);
          // console.log('verifiedBuyer:', verifiedBuyer);
          } catch (error) {
            console.error(error);
          }
        }}
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
          <CreditCard />
          <GooglePay />
          <ApplePay />
      <div>

      </div>
      </PaymentForm>
    </div>
  );
};
export default PaymentSquare;
