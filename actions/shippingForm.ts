"use server";

import db from "@/db/drizzle";
import { orders, productOrders } from "@/db/schema";
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
    const order = await db
      .insert(orders)
      .values({
        name: rawFormData.name?.toString() || "No information",
        surname: rawFormData.sname?.toString(),
        address1: rawFormData.address?.toString(),
        address2: rawFormData.address2?.toString() || "NA",
        zipcode: rawFormData.zip?.toString() || "No information",
        city: rawFormData.city?.toString(),
        number: Number(rawFormData.number) || 666666666,
        email: rawFormData.email?.toString(),
        total: Math.round(cartItems.carttotal * 100),
        createdAt: currentTime,
        updatedAt: currentTime,
        paid: false,
      })
      .returning();
    // Actualizo también la tabla de los productos del pedido
    let orderId = order[0].id.toString();
    cartItems.cartitems.map(async (cartitem: CartItem) => {
      const variant = await getVariant(cartitem.id, cartitem.variant);
      await db.insert(productOrders).values({
        orderId: orderId,
        productId: variant?.id.toString(),
        quantity: cartitem.quantity,
      });
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
