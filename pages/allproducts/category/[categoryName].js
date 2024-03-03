import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import client from "@/utils/client";
import ClipLoader from "react-spinners/ClipLoader";
import ProductItem from "@/components/store/ProductItem";
import Footer from "@/components/mainPage/Footer";
import Header from "@/components/mainPage/header/Header";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import Filters from "@/components/store/Filters";
import Sort from "@/components/store/Sort";

const CategoryProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const router = useRouter();

	useEffect(() => {
		if (!router.isReady || !router.query.categoryName) return;

		const fetchData = async () => {
			setLoading(true);
			try {
				const category =
					router.query.categoryName.charAt(0).toUpperCase() +
					router.query.categoryName.slice(1);
				console.log("Capitalized Category Name:", category);
				let query = `*[_type == "product" && category->title == $category]{..., "categoryTitle": category->title, "slug": slug.current}`;
				const fetchedProducts = await client.fetch(query, {
					category, // Directly use the capitalized category name
				});
				if (fetchedProducts.length === 0) {
					setError("No products found in this category.");
				} else {
					setProducts(fetchedProducts);
				}
			} catch (err) {
				console.error("Error fetching products:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [router.isReady, router.query.categoryName]);

	return (
		<div className="bg-primary flex flex-col min-h-screen">
			<Header />
			<div className="bg-primary py-1 px-2 mt-[10.6rem] h-[9rem] border-b-black border-b-[1px] border-t-black border-t-[1px]">
				<div className="flex-grow">
					<Breadcrumbs />
					<h1 className="text-5xl font-thin italic text-black px-1 py-4">
						Ceramics
					</h1>
				</div>
			</div>
			<div className="flex justify-between items-center bg-primary px-2 gap-3">
				<Filters />
				<Sort />
			</div>
			<main className="flex-grow mt-8">
				<div className=" p-2">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mdLg:grid-cols-4 justify-items-center">
						{loading ? (
							<div className="flex justify-center items-center">
								<ClipLoader color={"#877570"} />
							</div>
						) : error ? (
							"Error please reload"
						) : (
							products.map((product, index) => (
								<ProductItem key={index} product={product} />
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
