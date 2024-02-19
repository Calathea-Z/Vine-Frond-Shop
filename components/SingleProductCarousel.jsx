import { useState } from "react";
import { urlFor } from "@/utils/image.js";
import Slider from "react-slick";
import Image from "next/image";

const SingleProductCarousel = (props) => {
	const settings = {
		dots: true,
		arrows: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: "0px",
		variableWidth: false,
		beforeChange: (current, next) => setCurrentIndex(next),
	};
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<div className=" flex justify-center items-center">
			<Slider {...settings}>
				{props.photo.map((image, index) => (
					<div key={index} className="">
						<img
							src={urlFor(image.asset._ref).url()}
							alt="product thumbnails"
							className="object-contain mx-auto"
							style={{
								maxHeight: "75vh", // Adjust this to control the height
								maxWidth: "100%",
								width: "auto", // This will maintain the aspect ratio
								height: "auto", // This will maintain the aspect ratio
							}}
						/>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default SingleProductCarousel;
