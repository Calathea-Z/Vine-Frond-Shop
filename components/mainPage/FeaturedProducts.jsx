import { useEffect, useState } from "react";
import ProductItem from "../store/ProductItem";
import { PropagateLoader } from "react-spinners";
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
				breakpoint: 1510,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
					arrows: true,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
					arrows: true,
				},
			},
			{
				breakpoint: 850,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
					arrows: true,
				},
			},
			{
				breakpoint: 620,
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
				const query = `*[_type == "product" && featuredProduct == true]`;
				const fetchedProducts = await client.fetch(query);
				if (fetchedProducts.length > 0) {
					setProducts(fetchedProducts);
					setError("");
				} else {
					setError("No products currently featured");
					setProducts([]);
				}
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
			<div className="flex justify-center items-center p-10">
				<PropagateLoader size={35} color={"#8cc6b0"} />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center p-4">
				<p>{error}</p>
			</div>
		);
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
