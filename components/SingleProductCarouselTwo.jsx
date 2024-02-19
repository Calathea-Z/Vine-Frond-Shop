import { urlFor } from "@/utils/image.js";

const SingleProductCarouselTwo = ({ photos, className }) => {
	// Assuming photos is an array and we're interested in displaying the first image
	const firstImage = photos.length > 0 ? photos[0] : null;

	return (
		<div
			className={`relative ${className} flex justify-center items-center  border-l-black`}
		>
			{firstImage && (
				<img
					src={urlFor(firstImage.asset._ref).url()}
					alt="Product"
					className="object-cover mx-auto border-l"
					style={{
						width: "100%", // Stretches the image to fill the container
						height: "100%", // Stretches the image to fill the container
						objectFit: "contain", // Keeps the aspect ratio while filling the container
					}}
				/>
			)}
		</div>
	);
};

export default SingleProductCarouselTwo;
