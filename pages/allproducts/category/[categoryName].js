import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import client from "@/utils/client";
import ClipLoader from "react-spinners/ClipLoader";
import ProductItem from "@/components/store/ProductItem";
import Footer from "@/components/mainPage/Footer";
import Header from "@/components/mainPage/header/Header";

const CategoryProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const router = useRouter();
	const { category } = router.query;

	useEffect(() => {
		const fetchData = async () => {
			try {
				let query = `*[_type == "product" && category.current == "${category}"]`;
				const fetchedProducts = await client.fetch(query);
				console.log("Fetched Products:", fetchedProducts); // Debugging line
				setProducts(fetchedProducts);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		if (category) {
			fetchData();
		}
	}, [category]);

	// Render logic remains similar to your AllProducts component
	return (
		<div className="bg-primary flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow">
				<div className="mx-4 my-8 p-4 bg-primary rounded-lg shadow-y border-t-2 border-gray-200 flex-grow mb-32">
					<div className="grid grid-cols-4 justify-items-center mt-32">
						{loading ? (
							<div className="flex justify-center items-center">
								<ClipLoader color={"#877570"} />
							</div>
						) : error ? (
							"Error please reload"
						) : (
							products.map((product, index) => (
								<div key={index} className="flex justify-center rounded-md p-2">
									<div className="p-4 bg-white rounded-lg shadow-lg border-t-2 border-gray-200 w-full h-full">
										<ProductItem product={product} />
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</main>
			<Footer className="mt-auto" />
		</div>
	);
};

export default CategoryProducts;
