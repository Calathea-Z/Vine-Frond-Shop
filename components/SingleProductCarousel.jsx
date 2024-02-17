import ClipLoader from "react-spinners/ClipLoader";
import client from "@/utils/client";
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
		let isMounted = true;

		const fetchData = async () => {
			try {
				setState((prevState) => ({ ...prevState, loading: true }));
				const products = await client.fetch(`*[_type == "product"]`);
				if (isMounted) {
					setState({ products, loading: false, error: "" });
				}
			} catch (err) {
				if (isMounted) {
					setState({ products: [], loading: false, error: err.message });
				}
			}
		};

		fetchData();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="w-full bg-primary flex flex-col justify-center items-center gap-2 p-4">
			<h1 className="text-2xl sm:text-4xl xl:text-6xl p-4 mb-6">
				Current Favorites!
			</h1>
			{loading ? (
				<ClipLoader
					color={"#877570"}
					className="flex justify-center items-center"
				/>
			) : error ? (
				<p>Error please reload</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{products.map((product) => (
						<ProductItem key={product._id} product={product} />
					))}
				</div>
			)}
		</div>
	);
};

export default HighlightedProductCarousel;
