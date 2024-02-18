import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductItem from "./ProductItem";
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
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
					arrows: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
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
				{/* <div className="flex justify-center mt-[2rem]">
					<motion.div
						whileHover={{
							rotate: [0, 8, -8, 8, 0],
							transition: { duration: 0.4 },
						}}
					>
						<Link
							href="/allproducts"
							passHref
							className="text-lg border-2 border-black text-black py-2 px-4 rounded-md hover:border-4 hover:bg-white/20 transition-all duration-100"
						>
							Shop Now
						</Link>
					</motion.div>
				</div> */}
			</div>
		</div>
	);
};

export default FeaturedProducts;
