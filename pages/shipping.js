import CheckoutHelper from "@/components/CheckoutHelper";
import Image from "next/image";
import { simpleLogo } from "@/public/assets";
import Link from "next/link";
import ShippingCostCalculator from "@/components/ShippingCostCalculator";
import { useContext, useState, useEffect } from "react";
import { Store } from "@/utils/Store";
import ClipLoader from "react-spinners/ClipLoader";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const ShippingScreen = () => {
  const router = useRouter();
  const { state } = useContext(Store);
  const {
    cart: { shippingInformation },
  } = state;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [shippingInformation]);

  if (isLoading) {
    return <div className='flex justify-center items-center mx-auto h-screen'><ClipLoader/></div>;
  }

  return (
    <div>
      <div className="p-10 flex flex-col">
        <CheckoutHelper activeStep={2} />
        <Image
          className="self-center"
          src={simpleLogo}
          width={100}
          height={100}
          alt="simple Vine & Frond Logo"
        />
        <div className="rounded-md w-full h-auto border-2 border-gray-300 p-2 mb-4">
          <div className="flex justify-between p-4">
            <div className="flex flex-col gap-2">
              <h6 className="font-sans text-gray-400">Contact</h6>
              <p className="font-sans">
                {shippingInformation.shippingContactEmail}
              </p>
            </div>
            <div>
              <Link
                href="/information"
                className="font-sans text-xs sm:text-sm underline hover:text-blue-400"
              >
                Change
              </Link>
            </div>
          </div>
          <div className="border-[.1rem] border-gray-300 flex justify-center self-center items-center h-0" />
          <div className="flex justify-between p-4">
            <div className="flex flex-col gap-2">
              <h6 className="font-sans text-gray-400">Ship to</h6>
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
            <div>
              <Link
                href="/information"
                className="font-sans text-xs sm:text-sm underline hover:text-blue-400"
              >
                Change
              </Link>
            </div>
          </div>
        </div>
        <h1 className='font-sans text-l font-bold m-2'>Shipping Method</h1>
        <div className='rounded-md w-full h-auto border-2 border-gray-300 bg-gray-100 p-2 mb-4'>
        <ShippingCostCalculator />
      </div>
      <button className="rounded-md w-full h-auto border-2 border-gray-300 p-4 bg-primary hover:bg-primary/80 font-sans flex justify-center items-center mb-4" onClick={() => router.push('/payment')}>
       Continue to payment
      </button>
      <Link
          className="flex items-center mx-auto mt-2 font-sans gap-2"
          href="/information"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Return to information
        </Link>
      </div>
      
    </div>
  );
};
export default ShippingScreen;
