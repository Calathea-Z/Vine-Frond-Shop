import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { Store } from "@/utils/Store";
import { useContext } from "react";
import newLogo from 'public/assets/newLogo.png'
import Image from "next/image";

const OrderSuccessScreen = ({ params }) => {
  const { id: orderId } = params;
  const { state } = useContext(Store);
  const {
    cart: { shippingInformation },
  } = state;
  return (
    <div className="h-screen">
      <div className="flex flex-col h-screen w-full justify-start items-center bg-white">
        <div className='bg-primary w-full flex justify-center items-center p-2 mb-2'>
        <Image src={newLogo} alt='full vine and frond logo' priority='true' />
      </div>
      <h1 className="font-sans text-3xl">Thanks for your order!</h1>
      <h1 className='font-sans text-lg p-2 mb-2'>You will receive a confirmation email shortly at <span className='text-blue-400 font-sans'>{shippingInformation.shippingContactEmail} </span></h1>
        <div className='grid grid-cols-2 grid-row-1 p-2 border-2 border-black/90 rounded-md'>
        <div className="flex justify-between p-4">
  
            <div className="flex flex-col gap-2 items-center">
              <h6 className="font-sans text-gray-600">Shipping to:</h6>
              <p className="font-sans">
                {shippingInformation.firstNameShipping}{" "}
                {shippingInformation.lastNameShipping}
              </p>
              <p className="font-sans">{shippingInformation.company}</p>
              <p className="font-sans">{shippingInformation.address}</p>
              <p className="font-sans">
                {shippingInformation.city}, {shippingInformation.usState}
              </p>
              <p className="font-sans">{shippingInformation.zipCode}{shippingInformation.country}</p>
            </div>

          </div>
          <div className="self-start py-2">
            <div className='flex flex-col items-center'>
        <h1 className="font-sans p-2 text-gray-600">Confirmation Number: </h1>
        <h1 className='font-sans text-sm'>{orderId}</h1>
        </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export function getServerSideProps({ params }) {
  return { props: { params } };
}
export default dynamic(() => Promise.resolve(OrderSuccessScreen), {
  ssr: false,
});
