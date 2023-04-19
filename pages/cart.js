import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Store } from "@/utils/Store";
import { urlFor } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useSnackbar } from "notistack";

const CartScreen = () => {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/allproducts/${item._id}`);
    if (data.countInStock < quantity) {
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
        quantity,
      },
    });
    enqueueSnackbar(`${item.name} Cart Updated!`, { variant: "success" });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <div>
      <Header />
      <div className="w-full flex items-center p-6 flex-col bg-[#fdf9f5]">
        <h1 className="text-4xl">Cart</h1>
      </div>

      <div className="grid grid-col-2 grid-rows-auto p-10 bg-[#fdf9f5]">
        {cartItems.length === 0 ? (
          <div className="flex flex-col justify-center col-span-2 items-center">
            <h1 className="self-start pl-2 text-md">...Your cart is empty</h1>
            <Link
              href="/allproducts"
              pasHref
              className="font-sans text-xl p-5 border-primary w-full text-center hover:bg-primary/40"
            >
              Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 justify-center items-center gap-x-8 px-12 py-2">
            <div className="flex flex-col  gap-2">
              {cartItems.map((item, index) => (
                <div
                  className="grid grid-cols-3 items-center justify-center gap-2"
                  key={item._id || index}
                >
                  <div className="flex justify-center items-center hover:opacity-80">
                    <Link href={`/allproducts/${item.slug}`} passHref>
                      <Image
                        src={urlFor(item.photo[0].asset._ref).url()}
                        alt={item.name}
                        width={90}
                        height={90}
                        className="rounded-sm"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={`/allproducts/${item.slug}`}
                      passHref
                      className="text-sm hover:opacity-80"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm p-1">$ {item.price}</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <form className="bg-transparent focus:underline-0 focus:ring-0 flex flex-col gap-1">
                      <input
                        type="number"
                        id="quantity"
                        className="text-center border-x-0 border-t-0 border-b-primary bg-[#fdf9f5] focus:ring-0 focus:underline-0"
                        value={item.quantity}
                        name="quantity"
                        min="0"
                        max={item.countInStock}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      />
                      <button
                        className="text-[.55rem] rounded-md hover:bg-primary/20"
                        onClick={() => removeItemHandler(item)}
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {cartItems.length ? (
                <div className="p-2 flex-col">
                  <h1 className='font-sans'>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </h1>
                  <button className="col-span-2 bg-primary rounded-md font-sans mt-2 px-10 py-2 hover:opacity-80">
                    Check Out
                  </button>
                </div>
              ) : (
                " "
              )}
            </div>
          </div>
        )}
        <div className="col-span-2 border border-primary" />
        <Link href='/allproducts' className='text-sm font-sans py-2 px-1 mt-2 ml-2 rounded-md bg-primary w-[9rem] hover:opacity-80'>Continue Shopping</Link>
      </div>
      <Footer />
    </div>
  );
};
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
