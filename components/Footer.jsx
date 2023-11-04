import Link from "next/link";
import Image from "next/image";
import { simpleLogo } from "@/public/assets";
import { SocialIcon } from "react-social-icons";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  if (router.pathname === "/login") {
    return (
      <Link href="/">
        <div className="bg-[#fdf9f5] flex justify-center items-center w-full bottom-0 left-0 right-0 relative py-0.5">
          <Image
            src={simpleLogo}
            alt="simple logo"
            width={400}
            height={400}
            className="sm:translate-y-3"
          />
        </div>
      </Link>
    );
  }
  return (
    <div className="bg-secondary flex flex-col justify-center items-center sm:px- sm:py-1 w-full bottom-0 left-0 right-0 relative">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end w-full py-4">
        <div className="flex justify-center items-center">
          <Image
            src={simpleLogo}
            alt="simple logo"
            width={150}
            height={150}
            className="sm:translate-y-3"
          />
        </div>
        <div className="flex-grow flex self-center mt-5 justify-center">
          <form className="bg-blue-500 p-4 rounded-md flex items-center text-white hover:bg-blue-600 transition-colors duration-300">
            <input
              type="email"
              name="email"
              placeholder="Get store updates!"
              className="bg-transparent border-none text-lg focus:ring-2 focus:ring-white focus:underline-0 text-white font-sans p-2 placeholder-white"
            />
            <button className="rounded-lg bg-transparent border-transparent border-[1px] hover:bg-blue-700 p-1 ml-2 transition-colors duration-300">
              <EnvelopeIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
        <div className="hidden sm:p-3 self-center mt-5 sm:flex sm:gap-5">
          <SocialIcon
            url="https://www.instagram.com/vineandfrond/"
            fgColor="white"
            bgColor="black"
            className="hover:opacity-80"
            style={{ width: 50, height: 50 }}
          />
          <SocialIcon
            url="https://www.facebook.com/vineandfrondceramics"
            fgColor="white"
            bgColor="black"
            className="hover:opacity-80"
            style={{ width: 50, height: 50 }}
          />
          <SocialIcon
            url="https://www.tiktok.com/@vineandfrond"
            fgColor="white"
            bgColor="black"
            className="hover:opacity-80"
            style={{ width: 50, height: 50 }}
          />
        </div>
        <div className=" sm:hidden p-1 sm:p-3 flex gap-3 sm:gap-5">
          <SocialIcon
            url="https://www.instagram.com/vineandfrond/"
            fgColor="white"
            bgColor="black"
            className="hover:opacity-80"
            style={{ width: 40, height: 40 }}
          />
          <SocialIcon
            url="https://www.facebook.com/vineandfrondceramics"
            fgColor="white"
            bgColor="black"
            className="hover:opacity-80"
            style={{ width: 40, height: 40 }}
          />
          <SocialIcon
            url="https://www.tiktok.com/@vineandfrond"
            fgColor="white"
            bgColor="black"
            className="hover:opacity-80"
            style={{ width: 40, height: 40 }}
          />
        </div>
      </div>
      <div className="hidden sm:flex w-full border border-white justify-center items-center" />
      <div className="flex justify-between w-full">
        <div className="sm:flex justify-between items-center sm:p-5 text-md sm:text-md sm:gap-2 hidden">
          <Link href="/#" className="hover-underline-animation">
            Home
          </Link>
          <Link href="/contact" className="hover-underline-animation">
            Contact
          </Link>
          <Link href="/shipping" className="hover-underline-animation">
            Shipping
          </Link>
          <Link href="/faq" className="hover-underline-animation">
            FAQ
          </Link>
        </div>
        <div className="flex mx-auto sm:mx-0 items-center p-1 sm:p-3 text-xs sm:text-md space-x-2 sm:gap-2">
          <Link
            href="https://zach-sykes.com"
            className="text-[.9rem] hover-underline-animation font-sans"
          >
            Website Design by Calathea Designs
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
