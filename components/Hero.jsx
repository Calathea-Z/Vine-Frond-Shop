import Image from "next/image";
import { heroPic } from "@/public/assets";
import { motion } from "framer-motion";

const Hero = () => {
	return (
		<>
			{/*---------- Hero Image*/}
			<div className="relative p-4 mt-[9rem] rounded-md flex mx-auto bg-primary z-0 h-auto sm:h-[280px] md:h-[450px] lg:h-[600px]">
				<Image
					src={heroPic}
					alt="pots"
					priority="true"
					placeholder="blur"
					className="content-fill w-full h-auto rounded-lg"
				/>
			</div>

			{/*------------------------- Mission statement       */}
			<div className="w-full flex justify-center items-center bg-primary">
				<h1 className='bg-[url("../public/assets/logo_opac.png")] bg-contain bg-center bg-no-repeat p-10 mx-auto h-auto w-2/3  text-md sm:text-[1.25rem] md:text-[1.7rem] leading-loose italic text-black background-image:linear-gradient(rgba(9, 148, 143, 0.9), rgba(9, 148, 143, 0.9)), url("../public/assets/newLogo.png")'>
					A ceramics and houseplant company born out of a passion for clay and
					greenery. From local pop-up markets to an online shop, we create
					functional pieces to bring beauty to your home.
				</h1>
			</div>
		</>
	);
};
export default Hero;
