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

const PaymentScreen = () => {
  const router = useRouter();
  const {
    state: {
      userInfo,
      cart: { cartItems, shippingInformation, shippingCost },
    },
    dispatch,
  } = useContext(Store);

  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(true);

  const itemsPrice =parseFloat((cartItems.reduce((a,c) => a + c.quantity * c.price, 0)))
  const taxPrice = parseFloat((shippingInformation.usState === 'NC' || shippingInformation.usState === 'North Carolina') ? (itemsPrice * .07 ) : 0)
  const parsedShippingCost = parseFloat(shippingCost);
  const totalPrice = parsedShippingCost + taxPrice + itemsPrice;

  const placeOrderHandler = async () => {
    if(userInfo){
    try {
      setButtonLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems.map((x) => ({
          ...x, countInStock: undefined, slug: undefined
        })),
        shippingInformation,
        itemsPrice,
        parsedShippingCost,
        taxPrice,
        totalPrice,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`
        },
      }
      );
    dispatch({ type: 'CART_CLEAR_ITEMS' });
    jsCookie.remove('cartItems');
    setButtonLoading(false);
    router.push(`/order/${data}`);
    }catch (err) {
      toast.error(getError(err));
    }
  }
  else {
    try {
      setButtonLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems.map((x) => ({
          ...x, countInStock: undefined, slug: undefined
        })),
        shippingInformation,
        itemsPrice,
        parsedShippingCost,
        taxPrice,
        totalPrice,
      },
      );
    dispatch({ type: 'CART_CLEAR_ITEMS' });
    jsCookie.remove('cartItems');
    setButtonLoading(false);
    router.push(`/order/${data}`);
    }catch (err) {
      toast.error(getError(err));
    }
  }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [cartItems]);

  return (
    <div className="p-4 h-100">
      <CheckoutHelper activeStep={3} />
      <div className="p-6 flex flex-col justify-center items-center">
        <h1 className="font-sans mb-2">Place Order</h1>

        {isLoading ? (
          <div className="flex justify-center items-center mx-auto h-screen">
            <ClipLoader />
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex justify-center items-center mx-auto">
            <Link href="/allproducts">
              <Image src={sadCart} height={100} width={100} alt='sad cart empty' />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-5 gap-1">
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
              <div className="rounded-lg border-2 shadow-md overflow-x-auto border-gray-300 block p-5 mb-5">
              <h2 className='font-sans'>Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left font-sans">Item</th>
                    <th className="p-5 text-right font-sans">Quantity</th>
                    <th className="p-5 text-right font-sans">Price</th>
                    <th className="p-5 text-right font-sans">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td>
                        <Link
                          href={`/allproducts/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={urlFor(item.photo[0].asset._ref).url()}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-sm"
                          />
                          &nbsp;
                        </Link>
                      </td>
                      <td className="p-5 text-right font-sans">{item.quantity}</td>
                      <td className="p-5 text-right font-sans">${item.price}</td>
                      <td className="p-5 text-right font-sans">
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart" className="font-sans text-xs sm:text-sm underline hover:text-blue-400">Edit</Link>
              </div>
            </div>
            </div>
            <div className='lg:col-start-1'>
            
            </div>
            <div className="rounded-lg border-2 shadow-md border-gray-300 mb-5 p-6 mx-auto lg:col-start-4 lg:row-start-1">
            <div className="rounded-lg border-2 shadow-md row-start-2 border-gray-300 block p-5 mb-5">
              <h2 className='mb-2 text-lg font-sans'>Order Summary</h2>
              <ul>
                <li>
                  <div className='mb-2 flex justify-between'>
                    <div className='font-sans'>Items</div>
                    <div className='font-sans'>${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div className='font-sans'>Tax</div>
                    <div className='font-sans'>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div className='font-sans'>Shipping</div>
                    <div className='font-sans'>${shippingCost}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div className='font-sans'>Total</div>
                    <div className='font-sans'>${totalPrice}</div>
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

export default dynamic(() => Promise.resolve(PaymentScreen), { ssr: false })
