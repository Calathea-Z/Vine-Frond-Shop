import ClipLoader from "react-spinners/ClipLoader";
import client from "@/utils/client";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Link from "next/link";

const FeaturedProducts = () => {
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
		<div className="w-full bg-primary py-12 px-4">
			{" "}
			{/* Adjusted padding and background color */}
			<h1 className="text-xl sm:text-4xl lg:text-5xl mb-8 font-thin italic text-center">
				{" "}
				{/* Adjusted font size and added text centering */}
				Featured Products
			</h1>
			{loading ? (
				<ClipLoader
					color={"#877570"}
					className="flex justify-center items-center"
				/>
			) : error ? (
				<p>Error please reload</p>
			) : (
				<div className="max-w-screen-xl mx-auto">
					{" "}
					{/* Centered the grid in a max-width container */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						{" "}
						{/* Increased gap */}
						{products.map((product) => (
							<ProductItem key={product._id} product={product} />
						))}
					</div>
					<div className="flex justify-center">
						<Link href="/allproducts" legacyBehavior>
							<a className="text-lg border-2 border-black text-black py-2 px-4 rounded-md hover:border-4 hover:bg-white/20 transition-all duration-100">
								Shop Now
							</a>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default FeaturedProducts;
