import { useEffect, useState } from "react"
import  client from "@/utils/client"
import  ClipLoader from "react-spinners/ClipLoader";
import ProductItem from "@/components/ProductItem";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const AllProducts = () => {

  const [state, setState] = useState({
    products: [],
    error: '',
    loading: true,
  })

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
  },[])

  return (
    <>
    <Header />
    <div className='grid grid-cols-3 grid-rows-auto gap-2 justify-center justify-items-center p-4 bg-[#fdf9f5]'>
      {loading ? <div className='flex justify-center items-center' ><ClipLoader color={"#877570"} /></div> : error ? "Error please reload" : (products.map((product, index) => (
        <div key={index} className='flex justify-center rounded-md p-2'>
          <ProductItem product={product} />
        </div>
      )))}
    </div>
    <Footer />
    </>
  )
}
export default AllProducts