import Image from "next/image"
import { heroPic } from "@/public/assets"
// import { SocialIcon } from "react-social-icons"


const Hero = () => {
  return (
    <div className='relative w-full flex'>
      <Image src={heroPic} alt='pots' priority className='content-fill w-full h-auto' />
      {/* <div className='opacity-90 bottom-[.2rem] right-[.1rem] z-20 absolute flex gap-[.36rem]'>
      <SocialIcon 
      url='https://www.instagram.com/vineandfrond/'
      fgColor='black'
      />
      <SocialIcon 
      url='https://www.facebook.com/vineandfrondceramics'
      fgColor='black'
      />
      <SocialIcon 
      url='https://www.tiktok.com/@vineandfrond'
      fgColor='white'
      />
      </div> */}
    </div>
  )
}
export default Hero