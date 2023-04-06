import { useEffect, useState } from "react";

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
    <div className="h-screen w-full bg-primary flex justify-center items-center">
      <h1>This Weeks Favorites</h1>
    </div>
  );
};
export default HighlightedProductCarousel;
