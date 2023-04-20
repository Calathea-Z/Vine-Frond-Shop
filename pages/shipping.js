import CheckoutHelper from "@/components/CheckoutHelper";
import { Store } from "@/utils/Store";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import states from 'states-us'
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import jsCookie from "js-cookie";
import Link from "next/link";

const ShippingScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      zipCode: "",
      usState: "",
    },
  })

  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress}, } = state;

  useEffect(() => {
    if (!userInfo) {

    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
    }
  }, [router, setValue, shippingAddress, userInfo]);
  

  const submitHandler = ( {fullName, address, city, zipCode, usState}) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, zipCode, usState },
    });
    jsCookie.set(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        zipCode,
        usState,
      })
    );
    router.push('/payment');
  };
  return (
    <div>
    <div className="p-8">
      <CheckoutHelper activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div>
        <h1 className="mb-4 text-xl font-sans">Shipping Address</h1>
        </div>
        <div className="mb-4">
          <label htmlFor="fullName" className='font-sans'>Full Name</label>
          <input
            className="w-full p-1 border-black/50 border-2 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-transparent"
            id="fullName"
            autoFocus
            {...register("fullName", { required: "Please enter full name" })}
          />
          {errors.fullName ? (
            <div className='text-red-500'>{errors.fullName?.message}</div>
          ) : ('')}
        </div>
        <div className="mb-4">
          <label htmlFor="address" className='font-sans'>Address</label>
          <input
            className="w-full p-1 border-black/50 border-2 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-transparent"
            id="address"
            autoFocus
            {...register("address", { required: "Please enter address" })}
          />
          {errors.address ? (
            <div className='text-red-500'>{errors.address?.message}</div>
          ) : ('')}
        </div>
        <div className="mb-4">
          <label htmlFor="city" className='font-sans'>City</label>
          <input
            className="w-full p-1 border-black/50 border-2 font-sans rounded-md focus:ring-0 focus:border-transparent"
            id="city"
            autoFocus
            {...register("city", { required: "Please enter city" })}
          />
          {errors.city ? (
            <div className='text-red-500'>{errors.city?.message}</div>
          ) : ('')}
        </div>
        <div className="mb-4">
          <label htmlFor="zipCode" className='font-sans'>Zip Code</label>
          <input
            className="w-full p-1 border-black/50 border-2 font-sans rounded-md  focus:ring-0 focus:border-transparent"
            id="zipCode"
            autoFocus
            {...register("zipCode", { required: "Please enter zipCode" })}
          />
          {errors.zipCode ? (
            <div className='text-red-500'>{errors.zipCode?.message}</div>
          ) : ('')}
        </div>
        <div className="mb-4">
          <label htmlFor="usState" className='font-sans'>State</label>
          <select
            className="w-full p-1 border-black/50 border-2 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-transparent"
            id="usState"
            autoFocus
            {...register("usState", { required: "Please choose a state" })}
          >
            {states.map((state,i) => (
              <option key={i} value={state.name}>{state.name}</option>
            ))}
          </select>
          {errors.usState ? (
            <div className='text-red-500'>{errors.usState?.message}</div>
          ) : ('')}
        </div>
        <div className='mb-4 flex justify-between'>
        <button
            className="bg-primary rounded-sm mt-2 px-10 py-2 font-sans hover:bg-primary/80"
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
      </div>
      <Footer />
    </div>
  );
};
export default ShippingScreen;
