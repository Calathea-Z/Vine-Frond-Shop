import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";
import client from "@/utils/client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Add Slick CSS
import "slick-carousel/slick/slick-theme.css";

const FeaturedProducts = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	const carouselSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: true, // Enable arrows for navigation
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
					arrows: true, // Enable arrows for navigation
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true, // Enable arrows for navigation
				},
			},
		],
	};

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
		<div className="w-full bg-primary py-12 px-0">
			{" "}
			{/* Adjust padding to 0 for full width */}
			<h1 className="text-xl sm:text-4xl lg:text-5xl mb-8 font-thin italic text-center">
				Featured Products
			</h1>
			<div className="max-w-full mx-auto">
				{" "}
				{/* Adjust max-width for full width */}
				<Slider {...carouselSettings}>
					{products.map((product) => (
						<ProductItem key={product._id} product={product} />
					))}
				</Slider>
				<div className="flex justify-center mt-8">
					<Link
						href="/allproducts"
						passHref
						className="text-lg border-2 border-black text-black py-2 px-4 rounded-md hover:border-4 hover:bg-white/20 transition-all duration-100"
					>
						Shop Now
					</Link>
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;
