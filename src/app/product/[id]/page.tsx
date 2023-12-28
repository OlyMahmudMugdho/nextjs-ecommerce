import AddToCartButton from "@/components/AddToCartButton";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import React, { cache } from "react";
import { increaseProductQuantity } from "./actions";

type Props = {};

interface ProductPageProps {
  params: {
    id: String;
  };
}

const getProductDetails = cache(async (id: String) => {
  const product = await prisma.products.findUnique({
    where: {
      id: `${id}`,
    },
  });

  return product;
});

async function page({ params: { id } }: ProductPageProps) {
  const product: any = await getProductDetails(id);

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-center card  ">
      <div className="w-full card-body">
        <div className="w-full card-content bg-base-100 flex flex-col lg:flex-row justify-center items-center shadow-lg border rounded-xl">
          <Image
            src={product.imageUrl}
            height={200}
            width={400}
            alt={product.name}
            className="bg-base-100 rounded-lg"
          />

          <div className="w-full flex flex-col px-5 pb-5 justify-center">
            <div className="w-full flex flex-row items-center ">
              <h1 className="w-full text-xl lg:text-3xl font-bold py-3">
                {product.name}
              </h1>
              <span className="badge badge-lg badge-warning font-bold text-white mx-6">
                {product.price}
              </span>
            </div>
            <div className="text-lg">{product.description}</div>
          <AddToCartButton 
            productId={product.id}
            incrementProductQuantity={increaseProductQuantity}
          />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
