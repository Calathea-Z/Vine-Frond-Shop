import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { useState } from "react";
import jsCookie from "js-cookie";
import Cookies from "js-cookie";
import { useEffect } from "react";

const ProfileScreen = () => {

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
          <h2 className=''>Name</h2>
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