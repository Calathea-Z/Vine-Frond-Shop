import { useState } from "react";
import { urlFor } from "@/utils/image.js";
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  StopIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const SingleProductCarousel = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? props.photo.length - 1 : currentIndex -1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === props.photo.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="max-w-[1400px] h-[500px] md:h-[600px] lg:h-[700px] w-full m-auto py-16 px-4 relative group">
        <div
          style={{ backgroundImage: `url(${urlFor(props.photo[currentIndex].asset._ref).url()})`}}
          className="w-full h-full rounded-lg bg-center bg-contain bg-no-repeat duration-500"
        ></div>

      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer'>
        <ArrowSmallLeftIcon className='w-8 h-8 md:w-10 md:h-10' onClick={prevSlide}/>
      </div>
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer'>
        <ArrowSmallRightIcon className='w-8 h-8 md:w-10 md:h-10' onClick={nextSlide}/>
      </div>
      <div className='flex left-4 justify-center py-2 gap-2'>
        {props.photo.map((thumbnail, index) => (
            <div key={index} className='cursor-pointer rounded-sm w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem] relative' onClick={() => setCurrentIndex(index)}>
              <Image src={urlFor(thumbnail.asset._ref).url()} fill />
            </div>
        ))}
      </div>
    </div>
  );
};
export default SingleProductCarousel;
