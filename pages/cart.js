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
import { XMarkIcon } from "@heroicons/react/24/solid";

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
    if (quantity === 0 || quantity === "0") {
      removeItemHandler(item);
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
    enqueueSnackbar(`Cart Updated!`, { variant: "success" });
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
      <div className="flex-grow mt-6 flex flex-col p-5">
        <div className="w-full flex items-center sm:p-6 flex-col bg-primary">
          <h1 className="text-xl sm:text-4xl underline decoration-primary underline-offset-4 decoration-1 ">
            Cart
          </h1>
        </div>

        <div className="flex-grow p-2 sm:p-10 bg-primary">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-around">
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
            cartItems.map((item, index) => (
              <div
                className="flex items-center justify-between py-2"
                key={item._id || index}
              >
                <div className="flex items-center space-x-5">
                  <Link href={`/allproducts/${item.slug}`} passHref>
                    <Image
                      src={urlFor(item.photo[0].asset._ref).url()}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="rounded-md"
                    />
                  </Link>
                  <div>
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p className="text-lg font-bold">${item.price}</p>
                  </div>
                </div>
                <form className="flex flex-col gap-2">
                  <label
                    htmlFor="quantity"
                    className="font-bold text-black text-lg"
                  >
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      id="quantity"
                      className="text-center border-x-0 border-t-0 border-b-[#f7fafc] focus:ring-0 focus:underline-0 font-sans text-lg bg-transparent text-black"
                      value={item.quantity}
                      name="quantity"
                      min="0"
                      max={item.countInStock}
                      onChange={(e) => updateCartHandler(item, e.target.value)}
                    />
                    <button
                      onClick={() => removeItemHandler(item)}
                      className="bg-white border border-black text-black p-1 rounded-full w-6 h-6 flex items-center justify-center ml-2 hover:border-red-500 hover:text-red-500"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-between p-4">
          <Link
            href="/allproducts"
            className="bg-gray-200 border-gray-800 border-[.1rem] rounded px-4 py-2 hover:border-blue-400"
          >
            Continue Shopping
          </Link>
          <Link
            href="/information"
            className="bg-gray-300 border-gray-800 border-[.1rem] rounded px-4 py-2 hover:border-blue-400"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
