import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Store } from "@/utils/Store";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { urlFor } from "@/utils/image";

const CartScreen = () => {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);
  console.log(cartItems);
  return (
    <>
      <Header />
      <div className="w-full flex justify-center items-start p-6">
        <h1>Shopping Cart</h1>
      </div>
      <div className="grid grid-col-2 grid-rows-auto p-10">
        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center">
            <h1>Cart Is Empty</h1>
            <Link href="/allproducts">Go Shopping!</Link>
          </div>
        ) : (
          <div className="grid  grid-cols-2 justify-center items-center px-12 py-2">
            <div className="flex flex-col items-start gap-2">
              {cartItems.map((item, index) => (
                <div className="flex justify-center items-center gap-2" key={index}>
                  <Link href={`/allproducts/${item.slug}`} passHref>
                    <Image
                      src={item.photo}
                      width={90}
                      height={90}
                      className="rounded-sm"
                    />
                  </Link>
                  <Link href={`/allproducts/${item.slug}`} passHref>
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center self-start">
              <p>Check Out Steps</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default CartScreen;
