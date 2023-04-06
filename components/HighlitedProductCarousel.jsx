import ClipLoader from "react-spinners";
import { client } from "@/utils/client"
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const HighlightedProductCarousel = () => {

  const [state, setState] = useState({
    products: [],
    error: "",
    loading: true,
  });

  const { loading, error, products } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setState({ products, loading: false });
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full bg-primary flex flex-col justify-center items-center gap-2">
      <h1 className='text-2xl p-2'>This Weeks Favorites</h1>
      <div className='relative w-full flex overflow-x-scroll overflow-y-hidden scrollbar scrollbar-track-primary scrollbar-thumb-[#caafa8]'>
      {loading ? <ClipLoader color={"#877570"} className='flex justify-center items-center' /> : error ? "Error please reload" : (products.map((product, index) => (
        <div key={index} className='flex justify-center rounded-md p-2 flex-shrink-0'>
          <ProductItem product={product} />
        </div>
      )))}
      </div>
    </div>
  );
};
export default HighlightedProductCarousel;
