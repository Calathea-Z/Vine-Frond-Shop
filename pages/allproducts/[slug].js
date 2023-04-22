import client from "@/utils/client";
import ClipLoader from "react-spinners/ClipLoader";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SingleProductCarousel from "@/components/SingleProductCarousel";
import { Store } from "@/utils/Store";
import { useSnackbar } from "notistack";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

export default function ProductScreen(props) {
  // const router = useRouter();
  const { slug } = props;
  const { state: {cart}, dispatch, } = useContext(Store);
  const { enqueueSnackbar} = useSnackbar();
  const [state, setState] = useState({
    product: null,
    loading: true,
    error: "",
  });

  const { product, loading, error } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await client.fetch(
          `*[_type == "product" && slug.current == $slug][0]`,
          { slug }
        );
        setState({ ...state, product, loading: false });
      } catch (err) {
        setState({ ...state, error: err.message, loading: false });
      }
    };
    fetchData();
  }, [slug, state]);

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/allproducts/${product._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
      return;
    }
    console.log(product)
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        _key: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
      photo: product.photo,
      shippingWeight: product.shippingWeight,
      quantity,
    },
    });
    enqueueSnackbar(`${product.name} added to cart!`, { variant: 'success' },);
  };
  return (
    <>
      <Header />
      <div className="flex justify-center items-center">
        {loading ? (
          <div className='w-full h-screen flex justify-center items-center'>
          <ClipLoader />
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="flex flex-col md:grid md:grid-cols-2 justify-center space-y-4 items-start p-8">
            <div className="w-full h-auto">
                <SingleProductCarousel photo={product.photo}/>
            </div>
            <div className="flex flex-col self-center items-start space-y-6 p-2 lg:p-8 grid-col-span-1 lg:grow content-center">
              <h1 className="text-2xl font-extrabold font-mono">
                {product?.name}
              </h1>
              <h4 className="text-extrabold font-mono p-1 text-center text-slate-800 text-xl pr-5">
                $ {product?.price}.00
              </h4>
              <div className="flex flex-col justify-start items-start gap-2">
                <h6 className="lg:w-[35rem] text-extrabold font-sans p-1 text-left text-slate-800 inline-flex">
                  Description:
                </h6>
                <p className="lg:w-[35rem] text-bold font-sans p-1 text-left text-slate-800 inline-flex">
                  {product.description}
                  <br /> <br />
                  Measurements:
                  <br /> <br />
                  {product.measurements}
                </p>
              </div>
              {product.countInStock ? (
                <button className="w-full flex border-black border-2 p-4 justify-center items-center font-mono text-lg hover:bg-primary/50 cursor-pointer" onClick={addToCartHandler}>
                  Add to Cart
                </button>
              ) : (
                <div className="w-full flex bg-red-500/50 border-black border-2 p-4 justify-center items-center font-mono text-lg">
                  Sold Out
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export function getServerSideProps(context) {
  return {
    props: { slug: context.params.slug },
  };
}
