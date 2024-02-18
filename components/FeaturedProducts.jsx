import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";
import client from "@/utils/client";

const FeaturedProducts = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const fetchedProducts = await client.fetch(`*[_type == "product"]`);
				setProducts(fetchedProducts);
				setError("");
			} catch (err) {
				setError(err.message);
				setProducts([]);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center">
				<ClipLoader color={"#877570"} />
			</div>
		);
	}

	if (error) {
		return <p>Error please reload</p>;
	}

	return (
		<div className="w-full bg-primary py-12 px-4">
			<h1 className="text-xl sm:text-4xl lg:text-5xl mb-8 font-thin italic text-center">
				Featured Products
			</h1>
			<div className="max-w-screen-xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{products.map((product) => (
						<ProductItem key={product._id} product={product} />
					))}
				</div>
				<div className="flex justify-center">
					<div className="flex justify-center">
						<Link href="/allproducts" passHref>
							<a className="text-lg border-2 border-black text-black py-2 px-4 rounded-md hover:border-4 hover:bg-white/20 transition-all duration-100">
								Shop Now
							</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;
