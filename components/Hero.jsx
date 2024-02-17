import Image from "next/image";
import Link from "next/link";
import { heroPic } from "@/public/assets";

const Hero = () => {
	return (
		<section className="relative mt-[9rem] mx-auto bg-primary z-0 w-full">
			{/* Hero Image with Overlay Text */}
			<div className="w-full h-auto sm:h-[280px] md:h-[450px] lg:h-[600px] overflow-hidden">
				<Image
					src={heroPic}
					alt="A group of some of Vine & Fronds products. A variety of planters."
					priority
					placeholder="blur"
				/>
			</div>
			{/* Overlay Text */}
			<div className="absolute top-4 left-2 p-4">
				<h2 className="text-lg text-slate-900/90 sm:text-xl md:text-2xl lg:text-3xl font-bold bg-primary/50 p-2 rounded-md">
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
		</section>
	);
};
export default Hero;
