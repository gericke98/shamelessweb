"use server";

import db from "@/db/drizzle";
import { orders, productOrders, users } from "@/db/schema";
import { CartItem } from "@/types";
import { createStripeUrl } from "./payments";
import { redirect } from "next/navigation";
import { getDiscount, getVariant } from "@/db/queries";

export async function checkDiscount(prevState: any, formData: FormData) {
  const rawFormData = {
    discount: formData.get("discount"),
  };
  let discountinput = rawFormData.discount?.toString().toUpperCase();
  if (discountinput) {
    let discount = await getDiscount(discountinput);
    if (discount) {
      return { name: discountinput, discount: discount.percentage };
    }
    return { name: "", discount: 0 };
  }
  return { name: "", discount: 0 };
}

type Props = {
  cartitems: CartItem[];
  carttotal: number;
  discount: number;
};

export async function createOrder(cartItems: Props, formData: FormData) {
  const rawFormData = {
    email: formData.get("email"),
    country: formData.get("country"),
    name: formData.get("name"),
    sname: formData.get("surname"),
    address: formData.get("address"),
    address2: formData.get("address2"),
    zip: formData.get("zipcode"),
    city: formData.get("city"),
    province: formData.get("province"),
    number: formData.get("number"),
  };
  const currentTime = new Date(); // Current timestamp
  // Actualizo la informacion de la base de datos
  if (rawFormData) {
    //Actualizo la tabla de usuarios
    const user = await db
      .insert(users)
      .values({
        name: rawFormData.name?.toString() || "No information",
        subscribed: true,
        surname: rawFormData.sname?.toString() || "No information",
        address1: rawFormData.address?.toString() || "No information",
        address2: rawFormData.address2?.toString() || "NA",
        zipcode: rawFormData.zip?.toString() || "No information",
        city: rawFormData.city?.toString() || "No information",
        number: Number(rawFormData.number) || 666666666,
        email: rawFormData.email?.toString() || "No information",
      })
      .returning();
    let customerId = user[0].id.toString();
    const order = await db
      .insert(orders)
      .values({
        clientId: Number(customerId),
        total: Math.round(cartItems.carttotal * 100),
        createdAt: currentTime,
        updatedAt: currentTime,
        paid: false,
        fulfilled: false,
      })
      .returning();
    // Actualizo también la tabla de los productos del pedido
    let orderId = order[0].id.toString();
    cartItems.cartitems.map(async (cartitem: CartItem) => {
      const variant = await getVariant(cartitem.id, cartitem.variant);
      if (variant) {
        await db.insert(productOrders).values({
          orderId: parseInt(orderId, 10) || 1,
          productId: variant.id,
          quantity: cartitem.quantity || 0,
        });
      }
    });
    let email =
      rawFormData.email?.toString() || "hello@shamelesscollective.com";
    if (!order) {
      return;
    }
    const url = (
      await createStripeUrl(
        cartItems.cartitems,
        email,
        order[0].id.toString(),
        cartItems.discount
      )
    ).data;
    if (url) {
      redirect(url);
    }
  }
}
