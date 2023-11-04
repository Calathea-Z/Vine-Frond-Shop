import { useState } from "react";
import { urlFor } from "@/utils/image.js";
import Link from "next/link";
import Image from "next/image";

const ProductItem = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
  };

  const handleLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className={`relative w-64 ${hovered ? 'shadow-md border border-gray-300' : ''} transition-shadow duration-300`}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <Link href={`/allproducts/${product.slug.current}`}>
        <div className="flex flex-col gap-1 items-center">
          <Image
            src={urlFor(product.photo[0].asset._ref).url()}
            alt={product.name}
            width={200}
            height={200}
            className="rounded-md mt-2"
          />
          <h4 className="p-2 text-center text-slate-800 text-lg font-medium">
            {product.name}
          </h4>
          <h4 className="text-bold font-sans p-1 text-center text-slate-800 text-xl">
            $ {product.price}.00
          </h4>
          {product.countInStock ? (
            ""
          ) : (
            <div className="absolute top-0 right-0 bg-red-600 rounded-sm cr cr-top cr-right">
              SOLD OUT
            </div>
          )}
        </div>
      </Link>
      <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-center">
        <Link href={`/allproducts/${product.slug.current}`}>
          <button
            className="bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-900 transition-colors"
            style={{ display: hovered ? "block" : "none" }}
          >
            View Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
