import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { Store } from "@/utils/Store";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";

const ProfileScreen = () => {
  const router = useRouter();
  const { state, dispatch} = useContext(Store);
  const { userInfo } = state;
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    }

    setValue("shippingContactEmail", userInfo.shippingContactEmail);
      setValue("firstNameShipping", userInfo.firstNameShipping);
      setValue("lastNameShipping", userInfo.lastNameShipping);
      setValue("company", userInfo.lastNameShipping);
      setValue("address", userInfo.address);
      setValue("city", userInfo.city);
      setValue("zipCode", userInfo.zipCode);
      setValue("usState", userInfo.usState);
  },[router, setValue, userInfo])

  return (
    <div>
      <Header />
      <div className='p-4 flex justify-start items-start flex-col h-screen'>
      <div className='p-4 flex justify-between w-[98%]'>
        <h1 className='py-5 px-8 text-4xl'>My Account</h1>
        <button className='py-3 px-8 text-3xl rounded-md border-2 bg-gray-300 hover:opacity-80'>Log Out</button>
      </div>
      <div>
      <div className='p-5'>
          <h2 className=''>hi</h2>
          <h6>Hi</h6>
        </div>
        <div className='p-5'>
          <h2>Shipping Address</h2>
          <h6>Shipping Address here</h6>
          <button className='py-2 px-4 text-lg rounded-md border-2 bg-gray-300 hover:opacity-80'>Update Shipping Address</button>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}
export default ProfileScreen