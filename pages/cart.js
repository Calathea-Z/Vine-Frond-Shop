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
  console.log(cartItems)
  const { enqueueSnackbar } = useSnackbar();

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/allproducts/${item._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        _key: item._key,
        name: item.name,
        countInStock: item.countInStock,
        slug: item.slug.current,
        price: item.price,
      photo: item.photo,
      quantity,
    },
    });
    enqueueSnackbar(`${item.name} Cart Updated!`, { variant: 'success' });
  };

  const removeItemHandler = (item) => {
    dispatch({type: 'CART_REMOVE_ITEM', payload: item});
  }

  return (
    <div>
      <Header />
      <div className="w-full flex items-center p-6 flex-col bg-[#fdf9f5]">
        <h1 className="text-4xl">Cart</h1>
      </div>

      <div className="grid grid-col-2 grid-rows-auto p-10 bg-[#fdf9f5]">
        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center">
            <h1>Cart Is Empty</h1>
            <Link href="/allproducts">Go Shopping!</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 justify-center items-center px-12 py-2">
            <div className="flex flex-col  gap-2">
              {cartItems.map((item) => (
                <div
                  className="grid grid-cols-3 items-center justify-center gap-2"
                  key={item._id}
                >
                  <div className="flex justify-center items-center hover:opacity-80">
                    <Link href={`/allproducts/${item.slug}`} passHref>
                      <Image
                      src={urlFor(item.photo[0].asset._ref).url()}
                        width={90}
                        height={90}
                        className="rounded-sm"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link href={`/allproducts/${item.slug}`} passHref className='text-sm hover:opacity-80'>
                      {item.name}
                    </Link>
                    <p className='text-sm p-1'>$ {item.price}</p>
                  </div>
                  <div className='flex justify-center items-center'>
                    <form className="bg-transparent focus:underline-0 focus:ring-0 flex flex-col gap-1">
                      <input
                        type="number"
                        id="quantity"
                        className="text-center border-x-0 border-t-0 border-b-primary bg-[#fdf9f5] focus:ring-0 focus:underline-0"
                        placeholder={item.quantity}
                        name="quantity"
                        min="1"
                        max={item.countInStock}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      />
                      <button className='text-[.55rem] rounded-md hover:bg-primary/20' onClick={() => removeItemHandler(item)}>
                        Remove
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center self-start">
              <p>Check Out Steps</p>
            </div>
          </div>
        )}
        <div className='col-span-2 border border-primary' />
        <div className='p-2'>
          <h1>Subtotal ({" "}{cartItems.reduce((a, c) => a + c.quantity, 0)}{" "} items{" "}) : $ {" "}{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} </h1>
        </div>
        <button className='col-span-2 bg-primary rounded-sm mt-2 px-10 py-2 hover:bg-primary/80'>Check Out</button>
        
      </div>
      <Footer />
    </div>
  );
};
export default dynamic(() => Promise.resolve(CartScreen), {ssr: false})

