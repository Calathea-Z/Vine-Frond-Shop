import Image from "next/image";
import Link from "next/link";
import { heroPic } from "@/public/assets";

const Hero = () => {
	return (
		<section>
			{/* Hero Image with Overlay Text */}
			{/* Hero Image with Overlay Text */}
			<div className="relative p-4 mt-[9rem] rounded-md flex mx-auto bg-primary z-0 h-auto sm:h-[280px] md:h-[450px] lg:h-[600px]">
				<Image
					src={heroPic}
					alt="A group of some of Vine & Fronds products. A variety of planters."
					priority={true}
					priority={true}
					placeholder="blur"
					className="content-fill w-full h-auto rounded-lg"
					layout="fill" // Consider adding layout="fill" if you want the image to cover the container.
					objectFit="cover" // Use objectFit to control how the image should fit within the container.
					layout="fill" // Consider adding layout="fill" if you want the image to cover the container.
					objectFit="cover" // Use objectFit to control how the image should fit within the container.
				/>
				{/* Overlay Text */}
				<div className="absolute top-4 left-2 p-4">
					<h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-black/30 p-2 rounded-md">
						Handmade pottery and Houseplants.
					</h2>
				</div>
				{/* Shop All Button */}
				<div className="absolute bottom-11 left-1/2 transform -translate-x-1/2">
					<Link
						href="/allproducts"
						className="text-lg border-2 border-white text-white py-0 px-4 rounded-md hover:border-4 hover:bg-white/20 transition-all duration-100"
					>
						Shop All
					</Link>
				</div>
			</div>
		</section>
	);
};
export default Hero;
