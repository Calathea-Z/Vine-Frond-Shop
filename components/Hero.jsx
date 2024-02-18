import Image from "next/image";
import Link from "next/link";
import { heroPic } from "@/public/assets";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
	const [topBannerHeight, setTopBannerHeight] = useState(0);

	useEffect(() => {
		const banner = document.querySelector("#top-banner");
		if (banner) {
			setTopBannerHeight(banner.offsetHeight);
		}
	}, []);

	return (
		<section className={`relative mx-auto bg-primary z-0 w-full`}>
			<div className="relative w-full h-auto sm:h-[280px] md:h-[450px] lg:h-[600px] overflow-y-hidden">
				<Image
					src={heroPic}
					alt="A group of some of Vine & Fronds products. A variety of planters."
					priority
					placeholder="blur"
					style={{
						layout: "responsive",
					}}
				/>
				<div className="absolute top-20 left-0 p-4">
					<h2 className="text-lg text-slate-900/90 sm:text-xl md:text-2xl lg:text-3xl font-thin italic bg-primary/80 p-2 rounded-md">
						Handmade pottery and Houseplants.
					</h2>
				</div>
			</div>
			<div className="absolute bottom-11 left-1/2 transform -translate-x-1/2">
				<motion.div
					whileHover={{
						rotate: [0, 8, -8, 8, 0],
						transition: { duration: 0.4 },
					}}
				>
					<Link
						href="/allproducts"
						passHref
						className="text-lg border-2 border-black bg-white  text-slate-900/90 py-0 px-4 rounded-md hover:border-6 hover:bg-[#ECC89A] transition-all duration-200"
					>
						Shop All
					</Link>
				</motion.div>
			</div>
		</section>
	);
};
export default Hero;
