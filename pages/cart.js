import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Store } from "@/utils/Store";
import Link from "next/link";
import { useContext } from "react";

const CartScreen = () => {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);
  return (
    <>
      <Header />
      <div className="w-full flex justify-center items-start p-6">
        <h1>Shopping Cart</h1>
      </div>
      <div className='flex justify-center items-center'>
        {cartItems.length === 0 ? (
          <Link href="/allproducts">Shop!</Link>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className=''>{index + 1}{" "}{item.name}</div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default CartScreen;
