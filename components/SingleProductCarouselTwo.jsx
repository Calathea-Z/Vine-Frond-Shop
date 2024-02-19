import { urlFor } from "@/utils/image.js";
import Image from "next/image";

const SingleProductCarouselTwo = ({ photos, name }) => {
	// Assuming photos is an array and we're interested in displaying the first image
	const firstImage = photos.length > 0 ? photos[0] : null;

	return (
		<>
			{firstImage && (
				<Image
					src={urlFor(firstImage.asset._ref).url()}
					alt={`Picture # ${photos.length} of ${name}`}
					quality={100}
					priority={true}
					width={622}
					height={622}
				/>
			)}
		</>
	);
};

export default SingleProductCarouselTwo;
