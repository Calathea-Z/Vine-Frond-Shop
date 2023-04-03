import { useEffect, useState } from "react"
import { client } from "@/utils/client"
import Image from "next/image";

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
    <div>
      {loading ? "loading" : error ? "ERROR try again" : (products.map((product, index) => (
        <div key={product.slug}>
          <h1>{product.name}</h1>
          <Image href={`${product.image}`} className='w-5 h-5' />
        </div>
      )))}
    </div>
  )
}
export default product