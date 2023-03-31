import Image from "next/image";
import { heroPic } from "@/public/assets";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <>
{/*---------- Hero Image + social icons     */}
      <div className="relative w-full flex h-[300px] sm:h-[600px]">
        <Image
          src={heroPic}
          alt="pots"
          priority
          placeholder="blur"
          className="content-fill w-full h-auto"
        />
        <div className="hidden opacity-90 bottom-[.2rem] right-[.1rem] z-20 absolute sm:flex gap-[.36rem]">
          <SocialIcon
            url="https://www.instagram.com/vineandfrond/"
            fgColor="black"
          />
          <SocialIcon
            url="https://www.facebook.com/vineandfrondceramics"
            fgColor="black"
          />
          <SocialIcon
            url="https://www.tiktok.com/@vineandfrond"
            fgColor="white"
          />
        </div>
      </div>

{/*------------------------- Mission statement       */}
      <div className="bg-[#fdf9f5] w-full flex justify-center items-center">
        <motion.h1
        animate={{ y: 0,
        opacity: 1 }}
        initial={{ y: 200,
          opacity: 0
         }}
        transition={{ duration: 4 }}
        className='p-10 mx-auto h-[10rem] w-[35rem] md:h-[20rem] md:w-[45rem]  lg:w-[60rem] lg:[h-35rem] text-2xl leading-loose italic text-slate-800'>A ceramics and houseplant company born out of a passion for clay and greenery. From local pop-up markets to an online shop, we create functional pieces to bring beauty to your home.</motion.h1>
      </div>
    </>
  );
};
export default Hero;
