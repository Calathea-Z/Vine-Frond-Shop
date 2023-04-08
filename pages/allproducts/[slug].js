import client from "@/utils/client";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import { urlFor } from "@/utils/image";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ProductScreen(props) {
  const { slug } = props;
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
  }, [setState, slug, state]);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center">
        {loading ? (
          <ClipLoader />
        ) : error ? (
          <div>{err}</div>
        ) : (
          <div className="flex flex-col md:grid md:grid-cols-2 justify-center items-center space-y-4 lg:flex lg:flex-row lg:gap-20 md:items-start p-8">
            <div className="w-full h-auto">
                {product.photo.map((image, index) => (
                <div className='w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] md:w-[400px] md:h-[400px] lg:w-[800px] lg:h-[800px] ' key={index}> 
                <Image
                  src={urlFor(image.asset._ref).url()}
                  fill
                  className='object-contain'
                />
                </div> 
                ))}
            </div>
            <div className="flex flex-col self-center items-start space-y-6 p-2 lg:p-8 grid-col-span-1 lg:grow content-center">
              <h1 className="text-2xl font-extrabold font-mono">
                {product?.name}
              </h1>
              <h4 className="text-extrabold font-mono p-1 text-center text-slate-800 text-xl pr-5">
                $ {product.price}.00
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
                <button className="w-full flex border-black border-2 p-4 justify-center items-center font-mono text-lg hover:bg-primary/50 cursor-pointer">
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
