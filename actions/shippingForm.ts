"use server";

import db from "@/db/drizzle";
import { orders } from "@/db/schema";
import { CartItem } from "@/types";

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
    zip: formData.get("zip"),
    city: formData.get("city"),
    province: formData.get("province"),
    number: formData.get("number"),
  };
  // Actualizo la informacion de la base de datos
  if (rawFormData) {
    await db.insert(orders).values({
      name: rawFormData.name,
      surname: rawFormData.sname,
      address1: rawFormData.address,
      address2: rawFormData.address2 || "NA",
      zipcode: rawFormData.zip,
      city: rawFormData.city,
      number: rawFormData.number,
      email: rawFormData.email,
      total: newCartTotal,
    });
    console.log("Hecho");
  }
}
