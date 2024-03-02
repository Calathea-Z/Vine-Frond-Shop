import { useEffect, useState } from "react";
import client from "@/utils/client";
import ClipLoader from "react-spinners/ClipLoader";
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

	const [category, setCategory] = useState("");

	const { loading, error, products } = state;

	useEffect(() => {
		const fetchData = async () => {
			try {
				let query = `*[_type == "product"]`;
				if (category) {
					query = `*[_type == "product" && category.current == "${category}"]`;
				}

				const products = await client.fetch(query);
				setState({ products, loading: false });
			} catch (err) {
				setState({ loading: false, error: err.message });
			}
		};
		fetchData();
	}, [category]);

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
			<main className="flex-grow mt-8">
				<div className=" p-2">
					<div className="grid grid-cols-4 justify-items-center">
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

export default AllProducts;
