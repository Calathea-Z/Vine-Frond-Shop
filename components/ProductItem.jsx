import { urlFor } from "@/utils/image.js";
import Link from "next/link";
import Image from "next/image";

const ProductItem = ({ product }) => {
  return (
    <div>
      <Link href={`/product/${product.slug.current}`}>
        <Image
          src={urlFor(product.photo.asset._ref).url()}
          alt={product.name}
          width={300}
          height={300}
          className='rounded-md'
        />
        <h4 className='font-sans text-semibold p-1'>{product.name}</h4>
        <h4 className='text-bold font-sans p-1'>$ {product.price}</h4>
        {product.countInStock ? (
          " "
        ) : (
          <h6 className="text-red-500 text-bold font-mono p-1">Out of Stock</h6>
        )}
      </Link>
    </div>
  );
};
export default ProductItem;
