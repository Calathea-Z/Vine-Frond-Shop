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
    <div className="bg-primary">
    <Header />
    <div className='mx-4 my-8 p-4 bg-primary rounded-lg shadow-y border-t-2 border-gray-200'>
      <div className='grid grid-cols-3 justify-items-center mt-32'>
        {loading ? <div className='flex justify-center items-center' ><ClipLoader color={"#877570"} /></div> : error ? "Error please reload" : (products.map((product, index) => (
          <div key={index} className='flex justify-center rounded-md p-2'>
            <div className='p-4 bg-white rounded-lg shadow-lg border-t-2 border-gray-200'>
              <ProductItem product={product} />
            </div>
          </div>
        )))}
      </div>
    </div>
    <Footer />
  </div>
)
}
export default AllProducts