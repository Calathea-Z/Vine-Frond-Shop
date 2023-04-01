import Image from "next/image";
import { fullLogo, heroPic } from "@/public/assets";
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
        {/* <div className="hidden opacity-90 bottom-[.2rem] right-[.1rem] z-20 absolute sm:flex gap-[.36rem]">
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
        </div> */}
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
        className='p-20 mx-auto h-auto w-[35rem] md:w-[45rem] lg:w-[60rem] text-md sm:text-[1.25rem] md:text-[1.7rem] leading-loose italic text-slate-800'>A ceramics and houseplant company born out of a passion for clay and greenery. From local pop-up markets to an online shop, we create functional pieces to bring beauty to your home.</motion.h1>
      </div>
      <div className='bg-[#fdf9f5] w-full flex justify-center items-center'>
        <Image src={fullLogo} alt='full vine and frond logo' />
      </div>
    </>
  );
};
export default Hero;
