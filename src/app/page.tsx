import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.products.findMany({
    orderBy: { id: "desc" },
  });
  console.log(products);

  return (
    <div className="w-full">
      <div className="w-full hero bg-base-200 py-6">
        <div className="w-10/12 hero-content flex-col lg:flex-row justify-center lg:justify-between items-center  rounded-xl shadow-xl border">
          <Image
            src={products[0].imageUrl}
            width={800}
            height={400}
            alt="image of prod"
            className="w-full max-w-sm shadow-2xl"
            priority
          />
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">{products[0].name}</h1>
            <p className="py-6">{products[0].description}</p>
            <Link href={"/product/" + products[0].id} className="btn btn-primary">
              Let&apos;s make your wallet empty
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full grid px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-10">
        { products.slice(1).map(product => <ProductCard key={product.id} product={product} /> ) }
      </div>

    </div>
  );
}
