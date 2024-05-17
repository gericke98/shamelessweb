"use server";

import db from "@/db/drizzle";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function editProduct(formData: FormData) {
  //Extraigo la info de producto
  const rawFormData = {
    id: Number(formData.get("id")),
    name: formData.get("name")?.toString() || "s",
    description: formData.get("description")?.toString(),
    price: Number(formData.get("price")),
  };

  //Extraigo la info de variantes
  // Convert FormData to array of objects
  const formDataEntries = Array.from(formData.entries()).map(
    ([name, value]) => ({ name, value })
  );
  const variantInputs = formDataEntries.filter((input) =>
    input.name.includes("variant")
  );
  console.log(variantInputs);
  const stockInputs = formDataEntries.filter((input) =>
    input.name.includes("stock")
  );
  //Actualizo bbdd
  if (rawFormData) {
    await db
      .update(products)
      .set({
        name: rawFormData.name,
        description: rawFormData.description,
        price: rawFormData.price,
      })
      .where(eq(products.id, rawFormData.id));
  }
}
