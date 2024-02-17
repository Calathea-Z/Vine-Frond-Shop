import Image from "next/image";
import Link from "next/link";
import { heroPic } from "@/public/assets";

const Hero = () => {
	return (
		<section>
			{/*---------- Hero Image with Overlay Text */}
			<div className="relative p-4 mt-[9rem] rounded-md flex mx-auto bg-primary z-0 h-auto sm:h-[280px] md:h-[450px] lg:h-[600px]">
				<Image
					src={heroPic}
					alt="A group of some of Vine & Fronds products. A variety of planters."
					priority="true"
					placeholder="blur"
					className="content-fill w-full h-auto rounded-lg"
				/>
				{/* Overlay Text */}
				<div className="absolute top-4 left-2 p-4">
					<h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-black/30 p-2 rounded-md">
						Handmade pottery and Houseplants.
					</h2>
				</div>
				{/* Shop All Button */}
				<div className="absolute bottom-11 left-1/2 transform -translate-x-1/2">
					<Link href="/allproducts" legacyBehavior>
						<a className="text-lg border-2 border-white text-white py-0 px-4 rounded-md hover:border-4 hover:bg-white/20 transition-all duration-100">
							Shop All
						</a>
					</Link>
				</div>
			</div>
			{/* 
			<div className="w-full flex justify-center items-center p-2 bg-primary">
				<h1 className='bg-[url("../public/assets/logo_opac.png")] bg-contain bg-center bg-no-repeat h-auto text-md sm:text-[1.25rem] md:text-[1.7rem] leading-loose italic text-black background-image:linear-gradient(rgba(9, 148, 143, 0.9), rgba(9, 148, 143, 0.9)), url("../public/assets/newLogo.png")'>
					Subscribe to my newsletter at the bottom of the page for shop updates.
					You can always shop my pots and plants in person all over the
					Asheville, NC area. Check the Stockists section for a detailed list.
				</h1>
			</div> */}
		</section>
	);
};
export default Hero;
