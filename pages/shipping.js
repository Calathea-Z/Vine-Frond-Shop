import CheckoutHelper from "@/components/CheckoutHelper";
import Image from "next/image";
import { simpleLogo } from "@/public/assets";
import Link from "next/link";
import ShippingCostCalculator from "@/components/ShippingCostCalculator";
import { useContext } from "react";
import { Store } from "@/utils/Store";

const ShippingScreen = () => {
  const { state } = useContext(Store);
  const {
    cart: { shippingInformation },
  } = state;

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
        <div className="rounded-md w-full h-auto border-2 border-gray-300 p-2">
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
              <p>{shippingInformation.company}</p>
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
        <h1>Shipping Method</h1>
      </div>
      <div>
        <ShippingCostCalculator />
      </div>
    </div>
  );
};
export default ShippingScreen;
