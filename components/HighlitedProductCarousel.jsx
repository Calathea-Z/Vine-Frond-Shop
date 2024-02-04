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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const products = await client.fetch(`*[_type == "product"]`);
				setState({ products, loading: false });
			} catch (err) {
				setState({ loading: false, error: err.message });
			}
		};

		fetchData();
	}, []);

	return (
		<div className="w-full bg-primary flex flex-col justify-center items-center gap-2 p-4">
			<h1 className="text-2xl sm:text-4xl xl:text-6xl p-4 mb-6">
				This Weeks Favorites
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
					products.map((product, index) => (
						<div
							key={index}
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
