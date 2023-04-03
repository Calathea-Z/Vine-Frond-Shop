import Link from "next/link";
import Image from "next/image";
import { simpleLogo } from "@/public/assets";
import { SocialIcon } from "react-social-icons";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <div className='bg-primary w-full flex flex-col justify-center items-center p-10'>
      <div className='p-4'>
        <h1 className='text-4xl text-bold'>Get Shop Updates</h1>
      </div>
      <div className="flex m-4">
        <form className='bg-transparent focus:underline-0'>
          <input type="email" name="email" placeholder="Enter your email" className='bg-transparent border-none outline-none pr-2 focus:ring-0 focus:underline-0 text-[#877570]' />
          <button className='m-2 p-2 rounded-full bg-transparent border-black border-[1px] hover:bg-[#caafa8]'>
            <EnvelopeIcon className='w-5 h-5' />
          </button>
        </form>
      </div>
      <div>
        <div className="p-3 flex gap-5">
          <SocialIcon
            url="https://www.instagram.com/vineandfrond/"
            fgColor="transparent"
            bgColor='black'
          />
          <SocialIcon
            url="https://www.facebook.com/vineandfrondceramics"
            fgColor="transparent"
            bgColor="black"
          />
          <SocialIcon
            url="https://www.tiktok.com/@vineandfrond"
            fgColor="transparent"
            bgColor='black'
          />
        </div>
      </div>
      <div className='flex justify-around items-center p-10 space-x-10'>
        <Link href='/#' className='hover-underline-animation'>
          <Image src={simpleLogo} alt='simple logo' className='w-[5.5rem] h-[5.5rem]' />
        </Link>
        <Link href="/contact" className='hover-underline-animation'>Contact</Link>
        <Link href="/shipping" className='hover-underline-animation'>Shipping</Link>
        <Link href='/faq' className='hover-underline-animation'>FAQ</Link>
      </div>
      <Link href='https://zach-sykes.com' className='text-xs hover-underline-animation'>
        Website by Calathea Designs
      </Link>
    </div>
  );
};
export default Footer;