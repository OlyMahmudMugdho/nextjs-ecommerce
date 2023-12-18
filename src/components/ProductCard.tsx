import { products } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: products;
}

function ProductCard({ product }: ProductCardProps) {
  const price : any = product.price;
  return (
    <Link href={`product/${product.id}`} className="card w-full bg-base-100 hover:shadow-xl">
      <div className="card-content w-full flex flex-col justify-between">
        <figure>
          <Image
            src={product.imageUrl}
            height={800}
            width={400}
            alt={product.name}
          />
        </figure>
        <div className="card-body w-full flex flex-col justify-between ">
          <div className="w-full text-right pb-3">
            <span className="badge badge-warning text-white font-bold">
              {"$" + parseFloat(price)}
            </span>
          </div>
          <h1 className="text-lg font-bold">{product.name}</h1>
          <p className="">{product.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
