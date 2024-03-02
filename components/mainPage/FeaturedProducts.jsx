import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductItem from "../store/ProductItem";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";
import client from "@/utils/client";
import Slider from "react-slick";

const FeaturedProducts = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	const carouselSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: "0px",
		variableWidth: false,
		responsive: [
			{
				breakpoint: 1480,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
					arrows: true,
				},
			},
			{
				breakpoint: 1170,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
					arrows: true,
				},
			},
			{
				breakpoint: 820,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
					arrows: true,
				},
			},
			{
				breakpoint: 550,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
					arrows: true,
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
			<h1 className="text-xl sm:text-3xl lg:text-4xl mb-4 font-thin italic px-4">
				Featured Ceramics
			</h1>
			<div className="max-w-full mx-auto">
				<Slider {...carouselSettings}>
					{products.map((product) => (
						<ProductItem key={product._id} product={product} />
					))}
				</Slider>
			</div>
		</div>
	);
};

export default FeaturedProducts;
