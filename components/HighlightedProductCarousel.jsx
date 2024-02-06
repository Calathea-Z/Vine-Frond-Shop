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

	// This useEffect hook is responsible for fetching the product data asynchronously when the component mounts.
	// It uses a flag, isMounted, to prevent state updates if the component unmounts during the data fetching process.
	useEffect(() => {
		let isMounted = true; // Flag to track component mount status

		// Asynchronous function to fetch product data
		const fetchData = async () => {
			try {
				// Set loading state before fetching data
				setState((prevState) => ({ ...prevState, loading: true }));
				// Fetch product data
				const products = await client.fetch(`*[_type == "product"]`);
				// If component is still mounted, update state with fetched data
				if (isMounted) {
					setState({ products, loading: false, error: "" }); // Update state with fetched products and clear errors
				}
			} catch (err) {
				// If an error occurs and component is still mounted, update state with error message
				if (isMounted) {
					setState({ products: [], loading: false, error: err.message }); // Update state with error message
				}
			}
		};

		fetchData(); // Invoke the fetchData function

		return () => {
			isMounted = false; // Set flag to false when component unmounts
		};
	}, []);

	return (
		<div className="w-full bg-primary flex flex-col justify-center items-center gap-2 p-4">
			<h1 className="text-2xl sm:text-4xl xl:text-6xl p-4 mb-6">
				Current Favorites!
			</h1>
			<div className="relative w-full flex overflow-x-scroll overflow-y-hidden scrollbar scrollbar-track-primary scrollbar-thumb-[#caafa8] justify-center">
				{loading ? (
					<ClipLoader
						color={"#877570"}
						className="flex justify-center items-center"
					/>
				) : error ? (
					"Error please reload"
				) : (
					products.map((product) => (
						<div
							key={product._id}
							className="flex justify-center rounded-md p-2 flex-shrink-0 w-[90px] h-auto sm:w-[180px] lg:w-[260px] xl:w-[360px]"
						>
							<ProductItem product={product} />
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default HighlightedProductCarousel;
