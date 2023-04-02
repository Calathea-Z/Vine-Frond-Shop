import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <div className='bg-primary w-full flex flex-col justify-center items-center p-10'>
      <div className='p-4'>
        <h1 className='text-4xl text-bold'>Get Shop Updates</h1>
      </div>
      <div className='p-10 mx-auto h-auto w-[20rem] md:w-[35rem] lg:w-[45rem] text-sm leading-5'>
        <p>Stay up to date with new releases, sales, and where you can grab items in-store. Don't worry I'll send these infrequently, just a friendly hello now and again!</p>
      </div>
      <div className="flex m-4">
        <form className='bg-transparent focus:underline-0'>
          <input type="email" name="email" placeholder="Enter your email" className='bg-transparent border-none outline-none underline p-0 pr-2 focus:ring-0 focus:underline-0' />
          <button className='m-2'>
            <EnvelopeIcon className='w-5 h-5 underline' />
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
        <h6>Contact</h6>
        <h6>FAQ</h6>
        <h6>Shipping</h6>
        <h6>Returns</h6>
      </div>
      <Link href='https://zach-sykes.com'className='text-xs'>
        Website by Calathea Designs
      </Link>
    </div>
  );
};
export default Footer;
