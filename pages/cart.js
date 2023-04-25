import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Store } from "@/utils/Store";
import { urlFor } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useSnackbar } from "notistack";
import sadCart from "../public/assets/sadCart.png";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";

const CartScreen = () => {
  const router = useRouter();
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();

  const updateCartHandler = async (item, quantity) => {
    const { countInStock } = await axios.get(`/api/allproducts/${item._id}`);
    if (countInStock < quantity) {
      enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" });
      return;
    }
    console.log(item)
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: item._key,
        name: item.name,
        countInStock: item.countInStock,
        slug: item.slug,
        price: item.price,
        photo: item.photo,
        shippingWeight: item.shippingWeight,
        quantity: quantity
      },
    });
    console.log("item.shippingWeight :", item.shippingWeight)
    enqueueSnackbar(`${item.name} Cart Updated!`, { variant: "success" });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  useEffect(() => {
    const currentWeight = cartItems.reduce((a, c) => a + c.quantity * c.shippingWeight, 0)
    console.log("Current weight ->", currentWeight)
    dispatch({
      type: "UPDATE_SHIPPING_WEIGHT",
      payload: currentWeight
    })
    jsCookie.set(
      "shippingWeight",
      JSON.stringify(currentWeight)
    )
  },[cartItems, dispatch])

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="w-full flex items-center sm:p-6 flex-col bg-[#fdf9f5]">
        <h1 className="text-xl sm:text-4xl underline decoration-primary underline-offset-4 decoration-1 ">Cart</h1>
      </div>

      <div className="grid grid-col-2 grid-rows-auto p-2 sm:p-10 bg-[#fdf9f5]">
        {cartItems.length === 0 ? (
          <div className="flex flex-col col-span-2 items-center justify-around">
            <div className="p-6">
              <Image src={sadCart} alt='empty cart' width={150} height={150} />
            </div>
            <div className="p-4">
              <h1 className="self-start pl-2 text-xl font-serif text-black">
                Your cart is currently empty
              </h1>
            </div>
          </div>
        ) : (
          <div className="flex sm:justify-between items-center gap-x-8 sm:px-12 sm:py-2">
            <div className="flex flex-col gap-4">
              {cartItems.map((item, index) => (
                <div
                  className="grid grid-cols-3 items-center justify-center gap-2"
                  key={item._id || index}
                >
                  <div className="flex justify-center items-center hover:opacity-80 w-[3rem] h-[3rem]sm:w-[6rem] sm:h-[6rem] pb-1">
                    <Link href={`/allproducts/${item.slug}`} passHref>
                      <Image
                        src={urlFor(item.photo[0].asset._ref).url()}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-sm"
                      />
                    </Link>
                  </div>
                  <div className="w-min-content sm:w-max">
                    <Link
                      href={`/allproducts/${item.slug}`}
                      passHref
                      className="text-[.6rem] sm:text-sm hover:opacity-80 w-max font-sans"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs sm:text-sm p-1 font-sans">
                      $ {item.price}
                    </p>
                  </div>
                  <div className="flex justify-center items-center ml-[8rem] sm:ml-[4rem]">
                    <form className="bg-transparent focus:underline-0 focus:ring-0 flex flex-col gap-1">
                      <input
                        type="number"
                        id="quantity"
                        className="text-center border-x-0 border-t-0 border-b-primary bg-[#fdf9f5] focus:ring-0 focus:underline-0 font-sans"
                        value={item.quantity}
                        name="quantity"
                        min="0"
                        max={item.countInStock}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      />
                      <button
                        className="text-[.55rem] sm:text-[.85rem] rounded-md hover:bg-primary/20 font-sans"
                        onClick={() => removeItemHandler(item)}
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="col-span-2 border border-primary flex justify-center items-center h-0" />
        <div className=" flex justify-between items-center">
          <Link
            href="/allproducts"
            className="text-xs sm:text-lg align-center self-start mt-2 font-sans py-1 px-2 ml-2 rounded-md bg-primary w-max hover:opacity-80 m-auto shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
        <div className="flex justify-end items-center px-1">
  {cartItems.length ? (
    <div className="flex gap-5 items-end justify-center self-start">
      <h1 className="font-sans text-xs sm:text-lg self-start pt-4">
        Subtotal : ${" "}
        <span className="font-bold font-sans">
          {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
        </span>
      </h1>
      <button
        className="col-span-2 bg-primary text-xs m-auto sm:text-lg rounded-md font-sans mt-2 px-2 py-1 hover:opacity-80 w-max shadow-md"
        onClick={() => router.push('/information')}
      >
        Check Out
      </button>
    </div>
  ) : (
    ""
  )}
</div>
      
    </div>
    <Footer />
    </div>
  );
};
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
