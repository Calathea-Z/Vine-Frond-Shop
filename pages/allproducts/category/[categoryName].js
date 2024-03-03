import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import client from "@/utils/client";
import { PropagateLoader } from "react-spinners";
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
	const { categoryName } = router.query;

	const formattedCategoryName = categoryName
		? categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase()
		: "";

	useEffect(() => {
		// Check if the router is ready and the categoryName query exists
		if (!router.isReady || !categoryName) return;

		const fetchData = async () => {
			setLoading(true);
			setError("");
			try {
				// Define the query to fetch products of the specified category
				let query = `*[_type == "product" && category->title == $category]{..., "categoryTitle": category->title, "slug": slug.current}`;
				const fetchedProducts = await client.fetch(query, {
					category: formattedCategoryName,
				});
				// Handle the case where no products are found
				if (fetchedProducts.length === 0) {
					setError(
						`I''m all sold out of ${formattedCategoryName} right now... Check back soon!`
					);
				} else {
					// Update state with the fetched products
					setProducts(
						fetchedProducts.map((product) => ({
							...product,
						}))
					);
				}
			} catch (err) {
				console.error("Error fetching products:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [router.isReady, categoryName]);

	return (
		<div className="bg-primary flex flex-col min-h-screen">
			<Header />
			<div className="bg-primary py-1 px-2 mt-[10.6rem] h-[9rem] border-b-black border-b-[1px] border-t-black border-t-[1px]">
				<div className="flex-grow">
					<Breadcrumbs />
					<h1 className="text-5xl font-thin italic text-black px-1 py-4">
						{formattedCategoryName || "Category"}
					</h1>
				</div>
			</div>
			<div className="flex justify-between items-center bg-primary px-2 gap-3">
				<div className="flex justify-between items-start w-screen">
					<div class="max-w-xs">
						<Filters productTypes={[categoryName]} />
					</div>
					<div className=" max-w-xs">
						<Sort />
					</div>
				</div>
			</div>
			<main className="flex-grow mt-4">
				<div className="p-2 flex justify-center">
					{loading ? (
						<div className="flex justify-center items-center p-10">
							<PropagateLoader size={35} color={"#8cc6b0"} />
						</div>
					) : error ? (
						<div className="flex flex-col items-center justify-start w-full h-full">
							<div className="w-full text-center text-2xl leading-relaxed px-10 py-20 rounded-sm shadow-md bg-stone-300/50">
								{error}
							</div>
						</div>
					) : (
						// grid layout when displaying products
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mdLg:grid-cols-4 justify-items-center w-full">
							{products.map((product, index) => (
								<ProductItem key={index} product={product} />
							))}
						</div>
					)}
				</div>
			</main>
			<Footer className="mt-auto" />
		</div>
	);
};

export default CategoryProducts;
