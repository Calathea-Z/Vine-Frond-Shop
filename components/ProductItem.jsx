import { urlFor } from "@/utils/image.js";
import Link from "next/link";
import Image from "next/image";

const ProductItem = ({ product }) => {
  return (
    <div style={{ position: 'relative' }}>
      <Link href={`/allproducts/${product.slug.current}`}>
        <Image
          src={urlFor(product.photo[0].asset._ref).url()}
          alt={product.name}
          width={200}
          height={200}
          className='rounded-md'
        />
        <h4 className='font-sans text-semibold p-1 text-center text-slate-800'>{product.name}</h4>
        <h4 className='text-bold font-sans p-1 text-center text-slate-800'>$ {product.price}.00</h4>
        {product.countInStock ? (""):(<div className="absolute top-0 right-0 bg-red-600 rounded-sm cr cr-top cr-right">SOLD OUT</div>)}
        
      </Link>
    </div>
  );
};
export default ProductItem;
