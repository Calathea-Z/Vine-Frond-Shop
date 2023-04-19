import Link from "next/link";
import Image from "next/image";
import { simpleLogo } from "@/public/assets";
import { SocialIcon } from "react-social-icons";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <div className="bg-primary flex flex-col justify-center items-center sm:px-4 sm:py-1 w-full bottom-0 mt-auto">
      <div className='flex flex-col sm:flex-row justify-between items-center sm:items-end w-full'>
        <div>
          <Image src={simpleLogo} alt='simple logo' width={90} height={90} className='sm:translate-y-5'/>
        </div>
        <div className="flex">
          <form className="hidden bg-transparent focus:underline-0 sm:flex items-center">
            <input
              type="email"
              name="email"
              placeholder="Get store updates!"
              className="bg-transparent border-none text-xs focus:ring-0 focus:underline-0 text-[#877570] font-sans"
            />
            <button className="rounded-lg bg-transparent border-transparent border-[1px] hover:bg-[#caafa8]">
              <EnvelopeIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
        <div className="hidden sm:p-3 sm:flex sm:gap-5">
          <SocialIcon
            url="https://www.instagram.com/vineandfrond/"
            fgColor="white"
            bgColor="black"
            className="hover:opacity-80"
            style={{width: 35, height:35}}
          />
          <SocialIcon
            url="https://www.facebook.com/vineandfrondceramics"
            fgColor="white"
            bgColor="black"
            className="hover:opacity-80"
            style={{width: 35, height:35}}
          />
          <SocialIcon
            url="https://www.tiktok.com/@vineandfrond"
            fgColor="white"
            bgColor="black"
            className="hover:opacity-80"
            style={{width: 35, height:35}}
          />
        </div>
        <div className=" sm:hidden p-1 sm:p-3 flex gap-3 sm:gap-5">
          <SocialIcon
            url="https://www.instagram.com/vineandfrond/"
            fgColor="white"
            bgColor="black"
            className="hover:opacity-80"
            style={{width: 20, height:20}}
          />
          <SocialIcon
            url="https://www.facebook.com/vineandfrondceramics"
            fgColor="white"
            bgColor="black"
            className="hover:opacity-80"
            style={{width: 20, height:20}}
          />
          <SocialIcon
            url="https://www.tiktok.com/@vineandfrond"
            fgColor="white"
            bgColor="black"
            className="hover:opacity-80"
            style={{width: 20, height:20}}
          />
        </div>
      </div>
      <div className="hidden sm:flex w-full border border-white justify-center items-center" />
      <div className='flex justify-between w-full'>
        <div className="sm:flex justify-between items-center sm:p-5 text-xs sm:text-md sm:gap-2 hidden">
          <Link href="/#" className="hover-underline-animation font-sans">
            Home
          </Link>
          <Link href="/contact" className="hover-underline-animation font-sans">
            Contact
          </Link>
          <Link href="/shipping" className="hover-underline-animation font-sans">
            Shipping
          </Link>
          <Link href="/faq" className="hover-underline-animation font-sans">
            FAQ
          </Link>
        </div>
        <div className="flex mx-auto sm:mx-0 items-center sm:p-3 text-xs sm:text-md space-x-2 sm:gap-2">
          <Link
            href="https://zach-sykes.com"
            className="text-xs hover-underline-animation font-sans"
          >
            Website by Calathea Designs
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
