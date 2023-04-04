import { urlForThumbnail } from "@/utils/image"
import Link from "next/link"

const ProductItem = (product) => {
  return (
    <div>
      <Link href={`/product/${product.slug}`} passHref>
        <Image src={urlForThumbnail(product.image).width(200).url()} alt={product.name} />
        <p>{product.name}</p>
      </Link>
    </div>
  )
}
export default ProductItem