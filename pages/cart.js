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
        quantity: quantity,
      },
    });
    enqueueSnackbar(`${item.name} Cart Updated!`, { variant: "success" });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  useEffect(() => {
    const currentWeight = cartItems.reduce(
      (a, c) => a + c.quantity * c.shippingWeight,
      0
    );
    dispatch({
      type: "UPDATE_SHIPPING_WEIGHT",
      payload: currentWeight,
    });
    jsCookie.set("shippingWeight", JSON.stringify(currentWeight));
  }, [cartItems, dispatch]);

  return (
    <div className="h-screen flex flex-col justify-between bg-primary">
      <Header />
      <div class="flex-grow mt-6">
        <div className="w-full flex items-center sm:p-6 flex-col bg-primary">
          <h1 className="text-xl sm:text-4xl underline decoration-primary underline-offset-4 decoration-1 ">
            Cart
          </h1>
        </div>

        <div className="grid grid-col-2 grid-rows-auto p-2 sm:p-10 bg-primary">
          {cartItems.length === 0 ? (
            <div className="flex flex-col col-span-2 items-center justify-around">
              <div className="p-6 rounded-md">
                <Image
                  src={sadCart}
                  alt="empty cart"
                  width={150}
                  height={150}
                />
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
                    <div className="flex justify-center items-center hover:opacity-80 w-[4rem] h-[4rem] sm:w-[8rem] sm:h-[8rem] pb-1 ">
                      <Link href={`/allproducts/${item.slug}`} passHref>
                        <Image
                          src={urlFor(item.photo[0].asset._ref).url()}
                          alt={item.name}
                          width={120}
                          height={120}
                          className="rounded-md"
                        />
                      </Link>
                    </div>
                    <div className="w-min-content sm:w-max bg-gray-300 p-4 rounded-lg shadow-lg  ">
                      <Link
                        href={`/allproducts/${item.slug}`}
                        passHref
                        className="text-lg font-bold bg-gray-300 text-black hover:opacity-80 w-max font-sans"
                      >
                        {item.name}
                      </Link>
                      <p className="text-lg font-bold bg-gray-300 text-black p-1 font-sans">
                        $ {item.price}
                      </p>
                    </div>
                    <div className="flex justify-center items-center ml-[10rem] sm:ml-[6rem]">
                      <form className="bg-gray-300 p-4 rounded-lg shadow-lg focus:underline-0 focus:ring-0 flex flex-col gap-2">
                        <label
                          htmlFor="quantity"
                          className="font-bold text-black text-lg"
                        >
                          Quantity
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          className="text-center border-x-0 border-t-0 border-b-[#f7fafc] focus:ring-0 focus:underline-0 font-sans text-lg bg-transparent text-black"
                          value={item.quantity}
                          name="quantity"
                          min="0"
                          max={item.countInStock}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        />
                        <button
                          className="text-lg rounded-md bg-[#f7fafc] text-[#2d3748] font-sans hover:bg-[#2d3748] hover:text-[#f7fafc] transition-colors"
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

          <div className="col-span-2 border border-black flex justify-center items-center mt-4" />

          <div className=" flex justify-between items-center">
            <Link
              href="/allproducts"
              className="col-span-2 bg-gray-200 border-gray-800 border-[.1rem] rounded px-10 py-2 hover:border-blue-400 mt-4 mb-8"
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
                  className="col-span-2 bg-gray-200 border-gray-800 border-[.1rem] rounded px-10 py-2 hover:border-blue-400 mt-4 mb-8"
                  onClick={() => router.push("/information")}
                >
                  Check Out
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
