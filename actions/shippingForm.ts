"use server";

import db from "@/db/drizzle";
import { orders } from "@/db/schema";
import { CartItem } from "@/types";
import { createStripeUrl } from "./payments";
import { redirect } from "next/navigation";

export async function createOrder(cartItems: CartItem[], formData: FormData) {
  const newCartTotal = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );
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
        name: rawFormData.name?.toString(),
        surname: rawFormData.sname,
        address1: rawFormData.address,
        address2: rawFormData.address2 || "NA",
        zipcode: rawFormData.zip?.toString() || "No information",
        city: rawFormData.city,
        number: rawFormData.number,
        email: rawFormData.email,
        total: newCartTotal,
        createdAt: currentTime,
        updatedAt: currentTime,
        paid: false,
      })
      .returning();
    const email =
      rawFormData.email?.toString() || "hello@shamelesscollective.com";
    if (!order) {
      return;
    }
    const url = (
      await createStripeUrl(cartItems, email, order[0].id.toString())
    ).data;
    if (url) {
      redirect(url);
    }
  }
}
