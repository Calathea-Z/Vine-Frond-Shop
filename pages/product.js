import { useEffect, useState } from "react"
import { client } from "@/utils/client"
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import ProductItem from "@/components/ProductItem";

const product = () => {

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
    <div className='flex justify-center'>
      {loading ? <ClipLoader color={"#877570"} /> : error ? "ERROR try again" : (products.map((product, index) => (
        <div key={product.slug}>
          <ProductItem product={product} />
          <Image href={`${product.image}`} className='w-5 h-5' />
        </div>
      )))}
    </div>
  )
}
export default product