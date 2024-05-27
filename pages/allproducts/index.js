//App
import ProductItem from "@/components/store/ProductItem";
import Filters from "@/components/store/Filters";
import Footer from "@/components/mainPage/Footer";
import Header from "@/components/mainPage/header/Header";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import Sort from "@/components/store/Sort";
//Packages
import { useEffect, useState, useCallback } from "react";
import client from "@/utils/client";
import { PropagateLoader } from "react-spinners";

const AllProducts = () => {
	const [state, setState] = useState({
		products: [],
		error: "",
		loading: true,
		filters: [],
	});

	const { loading, error, products, filters } = state;

	const fetchData = async () => {
		if (!filters || filters.length === 0) {
			console.log("No filters set, skipping fetch");
			return;
		}
		setState((prevState) => ({ ...prevState, loading: true, error: "" }));

		try {
			let baseQuery = '*[_type == "product"';
			let filterConditions = [];

			// Handle category filters
			const categoryFilters = filters.filter((f) =>
				["Ceramics", "Bags", "Stickers", "Prints"].includes(f)
			);
			if (categoryFilters.length > 0) {
				filterConditions.push(
					`category->title in [${categoryFilters
						.map((f) => `"${f}"`)
						.join(", ")}]`
				);
			}

			// Handle price range filters
			const priceFilters = filters.filter((f) =>
				["Under 25", "25-50", "Over 50"].includes(f)
			);
			if (priceFilters.length > 0) {
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

			//Exclude out of stock products if the filter is active
			if (filters.includes("Exclude Out Of Stock")) {
				filterConditions.push("countInStock > 0");
			}

			// Combine all filter conditions
			if (filterConditions.length > 0) {
				baseQuery += ` && (${filterConditions.join(" && ")})`;
			}
			baseQuery += "]";

			const products = await client.fetch(baseQuery);

			if (!Array.isArray(products)) {
				throw new Error("Fetch did not return an array");
			}

			if (products.length === 0) {
				setState({
					loading: false,
					error: "No products found. Please check back later.",
					products: [],
				});
			} else {
				setState({ products, loading: false, error: "" });
			}
		} catch (err) {
			console.error("Error fetching products:", err);
			setState({ loading: false, error: err.message, products: [] });
		}
	};

	useEffect(() => {
		if (filters && filters.length > 0) {
			console.log("Fetching data with filters:", filters);
			fetchData();
		} else {
			console.log("No filters set, skipping fetch");
		}
	}, [filters]);

	const handleFilterChange = useCallback((selectedFilters) => {
		console.log("Received filters for update:", selectedFilters);
		setState((prevState) => {
			if (
				JSON.stringify(prevState.filters) !== JSON.stringify(selectedFilters)
			) {
				console.log("Updating Filters in AllProducts:", selectedFilters);
				return { ...prevState, filters: selectedFilters };
			}
			return prevState;
		});
	}, []);

	return (
		<div className="bg-primary flex flex-col min-h-screen">
			<Header />
			<div className="bg-primary py-1 px-2 mt-[10.6rem] h-[9rem] border-b-black border-b-[1px] border-t-black border-t-[1px]">
				<div className="flex-grow">
					<Breadcrumbs />
					<h1 className="text-5xl font-thin italic text-black px-1 py-4">
						Shop All
					</h1>
				</div>
			</div>
			<div className="flex justify-center bg-primary px-2">
				<div className="flex justify-between items-start w-screen">
					<div className="max-w-xs">
						<Filters
							productTypes={["Ceramics", "Bags", "Stickers", "Prints"]}
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
						<div className="flex flex-col items-center justify-start w-full h-full">
							<div className="w-full text-center text-xl leading-relaxed px-10 py-16 rounded-lg shadow-md bg-secondary/50">
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

export default AllProducts;
