import { urlFor } from "@/utils/image.js";
import Link from "next/link";
import Image from "next/image";

const ProductItem = ({ product }) => {
  return (
    <div>
      <Link href={`/allproducts/${product.slug.current}`}>
        <Image
          src={urlFor(product.photo[0].asset._ref).url()}
          alt={product.name}
          width={300}
          height={300}
          className='rounded-md'
        />
        <h4 className='font-sans text-semibold p-1 text-center text-slate-800'>{product.name}</h4>
        <h4 className='text-bold font-sans p-1 text-center text-slate-800'>$ {product.price}.00</h4>
        {product.countInStock ? (
          " "
        ) : (
          <h6 className="text-red-500 text-bold text-lg p-1 text-center">Sold Out</h6>
        )}
      </Link>
    </div>
  );
};
export default ProductItem;
