import states from "states-us";
import axios from "axios";
import Image from "next/image";
import Footer from "@/components/Footer";
import jsCookie from "js-cookie";
import Link from "next/link";
import { Store } from "@/utils/Store";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import CheckoutHelper from "@/components/CheckoutHelper";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { simpleLogo } from "@/public/assets";
import { useSnackbar } from "notistack";


const InformationScreen = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      shippingContactEmail: "",
      firstNameShipping: "",
      lastNameShipping: "",
      emailMe: false,
      address: "",
      company: "",
      city: "",
      zipCode: "",
      usState: "",
    },
  });

  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingInformation },
  } = state;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!userInfo) {
      setValue(
        "shippingContactEmail",
        shippingInformation.shippingContactEmail
      );
      setValue("firstNameShipping", shippingInformation.firstNameShipping);
      setValue("lastNameShipping", shippingInformation.lastNameShipping);
      setValue("company", shippingInformation.lastNameShipping);
      setValue("address", shippingInformation.address);
      setValue("city", shippingInformation.city);
      setValue("zipCode", shippingInformation.zipCode);
      setValue("usState", shippingInformation.usState);
    } else {
      setLoggedIn(true);
      setValue("shippingContactEmail", userInfo.shippingContactEmail);
      setValue("firstNameShipping", userInfo.firstNameShipping);
      setValue("lastNameShipping", userInfo.lastNameShipping);
      setValue("company", userInfo.lastNameShipping);
      setValue("address", userInfo.address);
      setValue("city", userInfo.city);
      setValue("zipCode", userInfo.zipCode);
      setValue("usState", userInfo.usState);
    }
  }, [router, setValue, shippingInformation, userInfo]);

  const submitHandler = async ({
    shippingContactEmail,
    firstNameShipping,
    lastNameShipping,
    emailOptIn,
    company,
    address,
    city,
    zipCode,
    usState,
  }) => {
// ****Future -> Need to figure out email logic 
    if (emailOptIn) {
    }

    try {
      const response = await axios.post("/api/shipping/verifyAddress", {
        street: address,
        city: city,
        state: usState,
        zipCode: zipCode,
      });
      console.log(response)
    
      const { valid, suggestedAddress } = response.data;

    
      if (!valid && suggestedAddress.length) {
        enqueueSnackbar(
          `The address you entered may not be valid. Would you like to use the suggested address instead?`,
          {
            variant: "warning",
            action: (key) => (
              <div className="font-sans">
                <div className="flex justify-center space-x-4">
                  <button
                    className="px-4 py-2 text-black rounded-md border-black/50 border-2 font-sans hover:opacity-80"
                    color="secondary"
                    size="small"
                    onClick={() => {
                      setValue("address", suggestedAddress.street);
                      setValue("city", suggestedAddress.city);
                      setValue("usState", suggestedAddress.state);
                      setValue("zipCode", suggestedAddress.zipCode);
                      closeSnackbar(key);
                    }}
                  >
                    Use Suggested Address
                  </button>
                  <button
                    className="px-4 py-2 text-black rounded-md border-black/50 border-2 font-sans hover:opacity-80"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      closeSnackbar(key);
                    }}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ),
            persist: true,
          }
        );
      } else if (!valid) {
        enqueueSnackbar(
          `The address you entered may not be valid. Please check your input.`,
          { variant: "warning" }
        );
      } else {      
        dispatch({
          type: "SAVE_SHIPPING_ADDRESS",
          payload: {
            shippingContactEmail,
            firstNameShipping,
            lastNameShipping,
            company,
            address,
            city,
            zipCode,
            usState,
          },
        });
        jsCookie.set(
          "shippingAddress",
          JSON.stringify({
            shippingContactEmail,
            firstNameShipping,
            lastNameShipping,
            company,
            address,
            city,
            zipCode,
            usState,
          })
        );
        router.push("/shipping");
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error verifying address. Please try again.", {
        variant: "error",
      });
      return;
    }
  }
  return (
    <div>
      <div className="p-10 flex flex-col">
        <CheckoutHelper activeStep={1} />
        <Image
          className="self-center"
          src={simpleLogo}
          width={100}
          height={100}
          alt="simple Vine & Frond Logo"
        />
        <div>
          <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="p-2 flex justify-between items-center">
              <h1 className="mb-4 text-md font-sans">Contact</h1>
              {loggedIn ? (
                <h1 className="text-xs sm:text-sm text-amber-500">
                  You are kil'n it! Thanks for your purchase,{" "}
                  {userInfo.firstName} !
                </h1>
              ) : (
                <div className="flex gap-1 items-center">
                  <p className="text-xs sm:text-sm font-sans">
                    Already have an account?
                  </p>
                  <Link
                    href="/login"
                    className="text-xs sm:text-sm text-blue-400 hover:text-blue-400/50 font-sans"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
            <div className="mb-1 relative shadow-md">
              <label
                htmlFor="shippingContactEmail"
                className="font-sans text-xs text-gray-400 absolute left-4
              top-1"
              >
                Email
              </label>
              <input
                className="w-full p-4 border-gray-400 border-2 leading-0 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-black flex items-end"
                id="shippingContactEmail"
                autoFocus
                {...register("shippingContactEmail", {
                  required: "Please enter an email",
                })}
              />
              {errors.shippingContactEmail ? (
                <div className="text-red-500">
                  {errors.shippingContactEmail?.message}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="emailMe"
                className="font-sans text-xs text-gray-400 absolute left-7
              top-1"
              >
                Email me with store updates and offers
              </label>
              <input
                type="checkbox"
                className=" p-1 ml-1 border-gray-400 border-2 font-sans rounded-sm focus:bg-transparent focus:ring-0 focus:border-black"
                id="emailMe"
                autoFocus
                {...register("emailOptIn")}
              />
            </div>
            <div className="w-full md:flex md:gap-4 block">
              <div className=" mb-2 md:w-1/2 relative shadow-md">
                <label
                  htmlFor="firstNameShipping"
                  className="font-sans text-xs text-gray-400 absolute left-4
                  top-1"
                >
                  First Name
                </label>
                <input
                  className="w-full p-4 border-gray-400 border-2 leading-0 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-black flex items-end"
                  id="firstNameShipping"
                  {...register("firstNameShipping", {
                    required: "Please enter first name",
                  })}
                />
                {errors.firstNameShipping ? (
                  <div className="text-red-500">
                    {errors.firstNameShipping?.message}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-2 md:w-1/2 relative shadow-md">
                <label
                  htmlFor="lastNameShipping"
                  className="font-sans text-xs text-gray-400 absolute left-4
                top-1"
                >
                  Last Name
                </label>
                <input
                  className="w-full p-4 border-gray-400 border-2 leading-0 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-black flex items-end"
                  id="lastNameShipping"
                  {...register("lastNameShipping", {
                    required: "Please enter last name",
                  })}
                />
                {errors.lastNameShipping ? (
                  <div className="text-red-500">
                    {errors.lastNameShipping?.message}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="mb-2 relative shadow-md">
              <label
                htmlFor="company"
                className="font-sans text-xs text-gray-400 absolute left-4
              top-1"
              >
                Company (optional)
              </label>
              <input
                className="w-full p-4 border-gray-400 border-2 leading-0 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-black flex items-end"
                id="company"
                {...register("company")}
              />
            </div>
            <div className="mb-1 relative shadow-md">
              <label
                htmlFor="address"
                className="font-sans text-xs text-gray-400 absolute left-4
              top-1"
              >
                Address
              </label>
              <input
                className="w-full p-4 border-gray-400 border-2 leading-0 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-black flex items-end"
                id="contactMethod"
                {...register("address", {
                  required: "Please enter an address",
                })}
              />
              {errors.address ? (
                <div className="text-red-500">{errors.address?.message}</div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-1 relative shadow-md">
              <label
                htmlFor="city"
                className="font-sans text-xs text-gray-400 absolute left-4
              top-1"
              >
                City
              </label>
              <input
                className="w-full p-4 border-gray-400 border-2 leading-0 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-black flex items-end"
                id="contactMethod"
                {...register("city", {
                  required: "Please enter a city",
                })}
              />
              {errors.city ? (
                <div className="text-red-500">{errors.city?.message}</div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-1 relative shadow-md">
              <label
                htmlFor="zipCode"
                className="font-sans text-xs text-gray-400 absolute left-4
              top-1"
              >
                Zip Code
              </label>
              <input
                className="w-full p-4 border-gray-400 border-2 leading-0 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-black flex items-end"
                id="contactMethod"
                {...register("zipCode", {
                  required: "Please enter a zip code",
                })}
              />
              {errors.city ? (
                <div className="text-red-500">{errors.zipCode?.message}</div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-1 relative shadow-md">
              <label
                htmlFor="usState"
                className="font-sans text-xs text-gray-400 absolute left-4
              top-1"
              >
                State
              </label>
              <select
                className="w-full p-4 border-gray-400 border-2 leading-0 font-sans rounded-md focus:bg-transparent focus:ring-0 focus:border-black flex items-end"
                id="usState"
                {...register("usState", { required: "Please choose a state" })}
              >
                {states.map((state, i) => (
                  <option key={i} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.usState ? (
                <div className="text-red-500">{errors.usState?.message}</div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-4 flex justify-between">
              <button
                className="bg-primary rounded-md w-full mt-2 p-4 font-sans hover:bg-primary/80 shadow-md"
                type="submit"
              >
                Continue to Shipping
              </button>
            </div>
          </form>
        </div>
        <Link
          className="flex items-center mx-auto mt-2 font-sans gap-2"
          href="/cart"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Return to cart
        </Link>
      </div>
      <Footer />
    </div>
  );
};
export default InformationScreen;
