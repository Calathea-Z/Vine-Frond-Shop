import { useEffect, useState } from "react";
import client from "@/utils/client";
import { PropagateLoader } from "react-spinners";
import ProductItem from "@/components/store/ProductItem";
import Filters from "@/components/store/Filters";
import Footer from "@/components/mainPage/Footer";
import Header from "@/components/mainPage/header/Header";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import Sort from "@/components/store/Sort";

const AllProducts = () => {
	const [state, setState] = useState({
		products: [],
		error: "",
		loading: true,
	});

	const { loading, error, products } = state;

	useEffect(() => {
		const fetchData = async () => {
			setState((prevState) => ({ ...prevState, loading: true, error: "" }));
			try {
				let query = `*[_type == "product"]`;

				const products = await client.fetch(query);
				if (products.length === 0) {
					setState({
						loading: false,
						error: "No products found. Please check back later.",
					});
				} else {
					setState({ products, loading: false, error: "" });
				}
			} catch (err) {
				console.error("Error fetching products:", err);
				setState({ loading: false, error: err.message });
			}
		};
		fetchData();
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
			<div className="flex justify-between items-center bg-primary px-2 gap-3">
				<Filters />
				<Sort />
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
