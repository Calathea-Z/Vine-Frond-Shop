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
            <div className='col-span-1 lg:grow justify-center items-center'>
              <Image
                src={urlFor(product.photo.asset._ref).url()}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-md lg:w-[400px]"
              />
            </div>
            <div className='flex flex-col self-center items-center space-y-6 p-2 lg:p-8 grid-col-span-1 lg:grow content-center'>
              <h1 className='text-2xl font-extrabold font-mono'>{product?.name}</h1>
              <h4 className="text-bold font-sans p-1 text-center text-slate-800">
                $ {product.price}
              </h4>
              <p className="lg:w-[35rem] text-bold font-sans p-1 text-center text-slate-800">
                {product.description}
              </p>
              <p className="text-bold font-sans p-1 text-center text-slate-800">
                {product.measurements}
              </p>
              {product.countInStock ? (
                " "
              ) : (
                <h6 className="text-red-500 text-bold text-lg p-1 text-center">
                  Sold Out
                </h6>
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
