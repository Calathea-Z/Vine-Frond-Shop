import CheckoutHelper from "@/components/CheckoutHelper";
import PaymentSquare from "@/components/PaymentSquare";
import ClipLoader from "react-spinners/ClipLoader";
import { Store } from "@/utils/Store";
import { urlFor } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import sadCart from "../public/assets/sadCart.png";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { getError } from "@/utils/error";
import axios from "axios";
import jsCookie from "js-cookie";

const PaymentScreen = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const {
    state: {
      userInfo,
      cart: { cartItems, shippingInformation, shippingCost, orderSuccess },
    },
    dispatch,
  } = useContext(Store);

  const [isLoading, setIsLoading] = useState(true);

  const itemsPrice = parseFloat(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  const taxPrice = parseFloat(
    shippingInformation.usState === "NC" ||
      shippingInformation.usState === "North Carolina"
      ? (itemsPrice * 0.07).toFixed(2)
      : 0
  );
  const parsedShippingCost = parseFloat(shippingCost);
  const totalPrice = parsedShippingCost + taxPrice + itemsPrice;

  const placeOrderHandler = async () => {
    if (userInfo) {
    try {
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems.map((x) => ({
            ...x,
            countInStock: undefined,
            slug: undefined,
          })),
          shippingInformation: shippingInformation,
          itemsPrice: itemsPrice,
          parsedShippingCost: parsedShippingCost,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      await axios.put("/api/allproducts/updatequantity", {
        cartItems: cartItems,
      });

      dispatch({ type: "CART_CLEAR_ITEMS" });
      jsCookie.remove("cartItems");
      dispatch({ type: "CLEAR_PAYMENT_STATUS" });
      jsCookie.remove("orderSuccess");
      router.push(`/order/${data}`);
    } catch (err) {
      dispatch({ type: "CLEAR_PAYMENT_STATUS" });
      jsCookie.remove("orderSuccess");
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  } else {
    try {
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems.map((x) => ({
          ...x,
          countInStock: undefined,
          slug: undefined,
        })),
        shippingInformation: shippingInformation,
        itemsPrice: itemsPrice,
        parsedShippingCost: parsedShippingCost,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      });
      await axios.put("/api/allproducts/updatequantity", {
        cartItems: cartItems,
      });
      dispatch({ type: "CART_CLEAR_ITEMS" });
      jsCookie.remove("cartItems");
      dispatch({ type: "CLEAR_PAYMENT_STATUS" });
      jsCookie.remove("orderSuccess");
      router.push(`/order/${data}`);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  }
  };

  // This effect sets isLoading to false when cartItems changes
  useEffect(() => {
    setIsLoading(false);
  }, [cartItems]);

  // This effect calls placeOrderHandler() when orderSuccess changes
  useEffect(() => {
    if (orderSuccess) {
      placeOrderHandler();
    }
  }, [orderSuccess]);

  return (
    <div className="p-4">
      <CheckoutHelper activeStep={3} />
      <div className="p-6 flex flex-col justify-center items-center">
        <h1 className="font-sans underline underline-offset-4 mb-4">
          Finalize Your Order
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center mx-auto h-screen w-full">
            <ClipLoader />
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex justify-center flex-col items-center h-screen mt-[-6rem]">
            <h1>weird.. there is nothing in your cart...</h1>
            <Link
              href="/allproducts"
              className=" flex flex-col justify-center items-center"
            >
              <Image
                src={sadCart}
                height={300}
                width={300}
                alt="sad cart empty"
              />
              <p className="font-sans border-2 rounded-md p-1 bg-primary border-gray-200 shadow-md hover:opacity-80">
                Go Shopping.
              </p>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 lg:grid-rows-2 lg:gap-5 gap-1">
            <div className="lg:col-span-3">
              <div className="rounded-lg border-2 shadow-md border-gray-300 block p-2 mb-5">
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
                  <p className="font-sans">
                    {shippingInformation.zipCode}
                    {shippingInformation.country}
                  </p>
                </div>
                <div>
                  <Link
                    href="/information"
                    className="font-sans text-xs sm:text-sm underline hover:text-blue-400"
                  >
                    Edit
                  </Link>
                </div>
              </div>

              <div className="hidden rounded-lg border-2 shadow-md overflow-x-auto border-gray-300 sm:block p-4 sm:p-5 mb-5">
                <h2 className="font-sans">Items</h2>
                <table className="table-auto">
                  <thead className="border-b">
                    <tr>
                      <th className="px-5  text-left font-sans text-xs sm:text-lg w-full">
                        Item
                      </th>
                      <th className="p-5 text-right font-sans text-xs sm:text-lg">
                        Quantity
                      </th>
                      <th className="p-5 text-right font-sans text-xs sm:text-lg">
                        Price
                      </th>
                      <th className="p-5 text-right font-sans text-xs sm:text-lg ">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td>
                          <Link
                            href={`/allproducts/${item.slug}`}
                            className="flex flex-col"
                          >
                            <Image
                              src={urlFor(item.photo[0].asset._ref).url()}
                              alt={item.name}
                              width={80}
                              height={80}
                              class="rounded-md p-1"
                            />
                            <p className="font-sans text-xs">{item.name}</p>
                            &nbsp;
                          </Link>
                        </td>
                        <td className="p-5 text-right font-sans">
                          {item.quantity}
                        </td>
                        <td className="p-5 text-right font-sans">
                          ${item.price}
                        </td>
                        <td className="p-5 text-right font-sans">
                          ${item.quantity * item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <Link
                    href="/cart"
                    className="font-sans text-xs sm:text-sm underline hover:text-blue-400"
                  >
                    Edit
                  </Link>
                </div>
              </div>

              <div className="sm:hidden rounded-lg border-2 shadow-md overflow-x-auto border-gray-300 block p-4 sm:p-5 mb-5">
                <h2 className="font-sans">Items</h2>
                <div className="flex flex-wrap flex-col mb-5">
                  {cartItems.map((item, index) => (
                    <div key={index} class="flex flex-grow items-center">
                      <Link
                        href={`/allproducts/${item.slug}`}
                        className="flex items-center flex-col"
                      >
                        <Image
                          src={urlFor(item.photo[0].asset._ref).url()}
                          alt={item.name}
                          width={80}
                          height={80}
                          class="rounded-md p-1"
                        />
                        <p className="font-sans text-xs text-center">
                          {item.name}
                        </p>
                        &nbsp;
                      </Link>
                      <div class="w-1/3 text-center flex flex-col">
                        <p className="font-sans text-xs">Quantity</p>
                        <span class="font-sans">{item.quantity}</span>
                      </div>
                      <div class="w-1/3 text-center flex flex-col">
                        <p className="font-sans text-xs">Price</p>
                        <span class="font-sans">${item.price}</span>
                      </div>
                      <div class="w-1/3 text-center flex flex-col">
                        <p className="font-sans text-xs">Subtotal</p>
                        <span class="font-sans">
                          ${item.quantity * item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <Link
                    href="/cart"
                    class="font-sans text-xs sm:text-sm underline hover:text-blue-400"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-start-1"></div>
            <div className="rounded-lg border-2 shadow-md border-gray-300 mb-5 p-6 mx-auto lg:col-start-4 lg:row-start-1">
              <div className="rounded-lg border-2 shadow-md row-start-2 border-gray-300 block p-5 mb-5">
                <h2 className="mb-2 text-lg font-sans">Order Summary</h2>
                <ul>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div className="font-sans">Items</div>
                      <div className="font-sans">${itemsPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div className="font-sans">Tax</div>
                      <div className="font-sans">${taxPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div className="font-sans">Shipping</div>
                      <div className="font-sans">${shippingCost}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div className="font-sans">Total</div>
                      <div className="font-sans">${totalPrice}</div>
                    </div>
                  </li>
                </ul>
              </div>
              <PaymentSquare />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(PaymentScreen), { ssr: false });
