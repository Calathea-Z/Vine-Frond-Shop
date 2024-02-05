import { useState } from "react";
import { urlFor } from "@/utils/image.js";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const SingleProductCarousel = (props) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const prevSlide = () => {
		setCurrentIndex(
			currentIndex === 0 ? props.photo.length - 1 : currentIndex - 1
		);
	};

	const nextSlide = () => {
		setCurrentIndex(
			currentIndex === props.photo.length - 1 ? 0 : currentIndex + 1
		);
	};

	return (
		<div className="max-w-[1400px] h-[300px] md:h-[400px] lg:h-[600px] w-full m-auto py-16 px-4 my-10 relative group">
			<div
				style={{
					backgroundImage: `url(${urlFor(
						props.photo[currentIndex].asset._ref
					).url()})`,
				}}
				className="w-3/4 mx-auto h-full rounded-lg bg-center bg-contain bg-no-repeat duration-500"
			></div>

			<div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer">
				<ArrowLeftIcon
					className="w-8 h-8 md:w-10 md:h-10"
					onClick={prevSlide}
				/>
			</div>
			<div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer">
				<ArrowRightIcon
					className="w-8 h-8 md:w-10 md:h-10"
					onClick={nextSlide}
				/>
			</div>
			<div className="flex left-4 justify-center py-2 gap-2">
				{props.photo.map((thumbnail, index) => {
					return (
						<div
							key={thumbnail.asset._ref}
							className="cursor-pointer rounded-sm w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem] relative"
							onClick={() => setCurrentIndex(index)}
						>
							<Image
								src={urlFor(thumbnail.asset._ref).url()}
								fill
								alt="pottery thumbnails"
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SingleProductCarousel;
