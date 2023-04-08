import { useState } from "react";
import { urlFor } from "@/utils/image.js";
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon
} from "@heroicons/react/24/solid";

const SingleProductCarousel = (props) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="max-w-[1400px] h-[500px] md:h-[600px] lg:h-[800px] w-full m-auto py-16 px-4 relative group">
      {props.photo.map((photo, index) => (
        <div
        key={index}
          style={{ backgroundImage: `url(${urlFor(photo.asset._ref).url()})`}}
          className="w-full h-full rounded-xl bg-center bg-contain bg-no-repeat duration-500"
        ></div>
      ))}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer'>
        <ArrowSmallLeftIcon className='w-10 h-10'/>
      </div>
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer'>
        <ArrowSmallRightIcon className='w-10 h-10'/>
      </div>
    </div>
  );
};
export default SingleProductCarousel;
