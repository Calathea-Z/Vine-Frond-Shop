import { CreditCard, PaymentForm, ApplePay, GooglePay } from "react-square-web-payments-sdk";
import axios from 'axios';

const PaymentSquare = () => {

  return (
    <div className='p-4'>
      <PaymentForm
        applicationId='sandbox-sq0idb-Jh0U_iAf4arZphPcQUcmNA'
        cardTokenizeResponseReceived={async (token) => {
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
        <div className='flex flex-col justify-center gap-2'>
          <div className='hover:opacity-80'>
          <CreditCard buttonProps={{
            css: {
              backgroundColor: '#efd6b3',
              color: 'black',
              fontFamily: 'sans-serif',
              padding: '.5rem',
              width: '15rem'
            }
          }} />
          </div>
          <div>
          <GooglePay buttonProps={{
            css: {
              padding: 0,
              width: '15rem'
            }
          }} />
          </div>
          </div>
      <div>

      </div>
      </PaymentForm>
    </div>
  );
};
export default PaymentSquare;
