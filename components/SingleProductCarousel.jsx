import { useState
 } from "react"
const SingleProductCarousel = (photoSet) => {
const [currentIndex, setCurrentIndex] = useState(0)

const next = () => {
  setCurrentIndex((currentIndex + 1) % photoSet.length)
};

const previous = () => {
  setCurrentIndex((currentIndex - 1 + photoSet.length) % photoSet.length)
};
  return (
    <>
    <div className='relative mt-[50px] mx-auto mb-[20px] w-[600px] h-[300px]'>
      {photoSet.map((photo, i) => (
  <div key={i}>
    
  </div>
      ))}
    </div>
    </>
  )
}
export default SingleProductCarousel