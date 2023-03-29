import Image from "next/image";
import Link from "next/link";
import { simpleLogo } from "@/public/assets";
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'


const Header = () => {
  return (
    <div className='w-full flex justify-around items-center bg-yellow-400/60 font-mono py-1 px-1 fixed top-0 z-20'>

{/*------------------- Left Logo */}
      <div className='w-1/3 flex items-center'>
      <Image src={simpleLogo} alt='Vine & Frond logo' className='content-fill w-[140px] h-[140px] flex-initial'/>
      </div>

{/*------------------- Middle Menu       */}
      <div className='w-1/3 space-x-4 flex items-center'>
        <Link href='#'>Home</Link>
        <Link href='#shop'>Shop</Link>
        <Link href='#more'>More</Link>
      </div>

{/*------------------- Right Nav       */}
      <div className='flex items-center px-2 space-x-4'>
        <MagnifyingGlassIcon className='w-6 h-6'/>
        <ShoppingBagIcon className='w-6 h-6' />
      </div>
    </div>
  )
}
export default Header