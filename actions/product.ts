"use server";

type Combined = {
  id: string;
  name: string;
  stock: string;
};

import db from "@/db/drizzle";
import { products, variants } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

  const stockInputs = formDataEntries.filter((input) =>
    input.name.includes("stock")
  );

  // Creo un unico array con los valores
  const stockMap: { [key: string]: string } = stockInputs.reduce(
    (map, stock) => {
      const id = stock.name.split("-")[1];
      map[id] = stock.value.toString();
      return map;
    },
    {} as { [key: string]: string }
  );

  const stockToUpdate: Combined[] = variantInputs.map((variant) => {
    const id = variant.name.split("-")[1]; // Extract the ID from the variant name
    return {
      id: id,
      name: variant.value.toString(),
      stock: stockMap[id], // Get the corresponding stock value using the ID
    };
  });

  //Actualizo bbdd
  if (rawFormData && stockToUpdate) {
    try {
      //Actualizo productos
      await db
        .update(products)
        .set({
          name: rawFormData.name,
          description: rawFormData.description,
          price: rawFormData.price,
        })
        .where(eq(products.id, rawFormData.id));

      //Actualizo variantes
      stockToUpdate.map(async (stockInfo) => {
        await db
          .update(variants)
          .set({
            stock: Number(stockInfo.stock),
          })
          .where(
            and(
              eq(variants.productId, rawFormData.id),
              eq(variants.name, stockInfo.name)
            )
          );
      });
      revalidatePath("/", "layout");
    } catch (e) {
      console.log("Error updating database");
    }
    redirect("/dashboard");
  }
}

export async function addProduct(formData: FormData) {
  //Extraigo la info de producto
  const rawFormData = {
    name: formData.get("name")?.toString() || "s",
    description: formData.get("description")?.toString(),
    price: Number(formData.get("price")),
    images: formData.get("images"),
  };

  //Extraigo la info de variantes
  // Convert FormData to array of objects
  const formDataEntries = Array.from(formData.entries()).map(
    ([name, value]) => ({ name, value })
  );
  const variantInputs = formDataEntries.filter((input) =>
    input.name.includes("variant")
  );

  const stockInputs = formDataEntries.filter((input) =>
    input.name.includes("stock")
  );

  // // Creo un unico array con los valores
  const stockMap: { [key: string]: string } = stockInputs.reduce(
    (map, stock) => {
      const id = stock.name.split("-")[1];
      map[id] = stock.value.toString();
      return map;
    },
    {} as { [key: string]: string }
  );

  const stockToUpdate: Combined[] = variantInputs.map((variant) => {
    const id = variant.name.split("-")[1]; // Extract the ID from the variant name
    return {
      id: id,
      name: variant.value.toString(),
      stock: stockMap[id], // Get the corresponding stock value using the ID
    };
  });

  //Actualizo bbdd
  if (rawFormData && stockToUpdate) {
    try {
      //Actualizo productos
      const newdb = await db
        .insert(products)
        .values({
          categoryId: 2 || 1,
          name: rawFormData.name || "No information",
          description: rawFormData.description || "No information",
          tag: "BACK IN STOCK" || "BACK IN STOCK",
          price: rawFormData.price || 0,
          mainImg: "/world-tour-front.jpg",
          // backImageSrc: "/world-tour-back.jpg",
        })
        .returning();

      //Actualizo variantes
      stockToUpdate.map(async (stockInfo) => {
        await db.insert(variants).values({
          productId: newdb[0].id,
          name: stockInfo.name.toString(),
          stock: Number(stockInfo.stock),
        });
      });
      revalidatePath("/", "layout");
    } catch (e) {
      console.log("Error updating database");
    }
    redirect("/dashboard");
  }
}
