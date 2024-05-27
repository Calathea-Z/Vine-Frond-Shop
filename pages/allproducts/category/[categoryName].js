//App
import client from "@/utils/client";
import ProductItem from "@/components/store/ProductItem";
import Footer from "@/components/mainPage/Footer";
import Header from "@/components/mainPage/header/Header";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import Filters from "@/components/store/Filters";
import Sort from "@/components/store/Sort";
//Packages
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { SunIcon } from "@heroicons/react/24/solid";
import { PropagateLoader } from "react-spinners";

const CategoryProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selectedFilters, setSelectedFilters] = useState([]);

	const router = useRouter();
	const { categoryName } = router.query;

	const formattedCategoryName = categoryName
		? categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase()
		: "";

	const fetchData = async () => {
		setLoading(true);
		setError("");

		try {
			let baseQuery = '*[_type == "product"';
			let params = { category: formattedCategoryName };
			let filterConditions = [`category->title == $category`];

			// Handle price range filters
			if (Array.isArray(selectedFilters)) {
				const priceFilters = selectedFilters.filter((f) =>
					["Under 25", "25-50", "Over 50"].includes(f)
				);
				priceFilters.forEach((price) => {
					switch (price) {
						case "Under 25":
							filterConditions.push("price < 25");
							break;
						case "25-50":
							filterConditions.push("price >= 25 && price <= 50");
							break;
						case "Over 50":
							filterConditions.push("price > 50");
							break;
					}
				});
			}

			// Exclude out of stock products if the filter is active
			if (selectedFilters.includes("Exclude Out Of Stock")) {
				filterConditions.push("countInStock > 0");
			}

			// Combine all filter conditions
			if (filterConditions.length > 0) {
				baseQuery += ` && (${filterConditions.join(" && ")})`;
			}

			baseQuery +=
				']{..., "categoryTitle": category->title, "slug": slug.current}';

			console.log("Final query:", baseQuery);

			const fetchedProducts = await client.fetch(baseQuery, params);

			if (!fetchedProducts || fetchedProducts.length === 0) {
				setError(`No Results`);
				setProducts([]);
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

	useEffect(() => {
		fetchData();
	}, [selectedFilters]);

	const handleFilterChange = (filters) => {
		console.log("Selected Filters:", filters);
		setSelectedFilters(filters);
	};

	useEffect(() => {
		console.log("Filters updated to:", selectedFilters);
	}, [selectedFilters]);

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
					<div className="max-w-xs">
						<Filters
							key={categoryName}
							productTypes={[categoryName]}
							onFilterChange={handleFilterChange}
						/>
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
						<div className="flex flex-col items-center justify-center w-full h-full">
							<div className="w-full flex flex-col items-center text-center text-2xl leading-relaxed px-10 py-20 rounded-sm shadow-md bg-stone-300/50">
								<div>
									<SunIcon className="w-[6rem] h-[6rem] text-yellow-500" />
								</div>
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
