"use server"

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function increaseProductQuantity(productId : String) {
    const cart = (await getCart()) ?? (await createCart());

    const articleInCart = cart.items.find(item => item.productId === productId)
    console.log(articleInCart)

    if(articleInCart) {
        await prisma.cartItem.update({
            where : {
                id : articleInCart.id
            },
            data : {
                quantity : {
                    increment : 1
                }
            }
        })
    }

    else {
        await prisma.cartItem.create({
            data : {
                cartId : cart.id,
                productId  : `${productId}`,
                quantity : 1
            }
        })
    }

    revalidatePath("/product/[id]");
}