"use server";

type Combined = {
  id: string;
  name: string;
  stock: string;
};

import db from "@/db/drizzle";
import { images, products, variants } from "@/db/schema";
import { and, eq, notInArray } from "drizzle-orm";
import { mkdir, stat, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { join } from "path";

type PropsEdit = {
  images: (typeof images.$inferSelect)[];
  previewImages: string[];
};
type PropsAdd = {
  images: string[];
};
export async function editProduct(imagesInput: PropsEdit, formData: FormData) {
  // Extraigo la info de producto - la que se pone en el formulario
  const rawFormData = {
    id: Number(formData.get("id")),
    name: formData.get("name")?.toString() || "s",
    description: formData.get("description")?.toString(),
    price: Number(formData.get("price")),
    tag: formData.get("tag")?.toString(),
    collection: formData.get("category")?.toString(),
  };

  const imageIds = imagesInput.images.map((image) => image.id);

  // Extraigo la info de variantes y stock
  const formDataEntries = Array.from(formData.entries()).map(
    ([name, value]) => ({ name, value })
  );
  const variantInputs = formDataEntries.filter((input) =>
    input.name.includes("variant")
  );
  const stockInputs = formDataEntries.filter((input) =>
    input.name.includes("stock")
  );
  // Creo un unico array con los valores de variante-stock
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

  for (const fileUrl of imagesInput.previewImages) {
    try {
      // Lo incluyo en la base de datos
      const imagesDB = await db
        .insert(images)
        .values({
          productId: Number(rawFormData.id),
          path: fileUrl.toString(),
        })
        .returning();

      imageIds.push(imagesDB[0].id);
    } catch (e) {
      console.error("Error while trying to upload a file:", e);
      throw e;
    }
  }
  // Actualizo bbdd
  if (rawFormData && stockToUpdate) {
    try {
      //Actualizo productos
      await db
        .update(products)
        .set({
          name: rawFormData.name,
          description: rawFormData.description,
          price: rawFormData.price,
          categoryId: Number(rawFormData.collection),
          tag: rawFormData.tag?.toString(),
        })
        .where(eq(products.id, rawFormData.id));

      // Actualizo variantes
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

      // Actualizo imagenes: Elimino las que ya no estan
      await db.delete(images).where(notInArray(images.id, imageIds));

      // Insert las nuevas
      revalidatePath("/", "layout");
    } catch (e) {
      console.log("Error updating database");
    }
    redirect("/dashboard");
  }
}

export async function addProduct(imagesInput: PropsAdd, formData: FormData) {
  //Extraigo la info de producto
  const rawFormData = {
    name: formData.get("name")?.toString() || "s",
    description: formData.get("description")?.toString(),
    price: Number(formData.get("price")),
    category: Number(formData.get("category")),
    tag: formData.get("tag"),
  };
  const mainImgPath = imagesInput ? imagesInput.images[0].toString() : "";
  //Extraigo la info de variantes
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
          categoryId: rawFormData.category || 1,
          name: rawFormData.name || "No information",
          description: rawFormData.description || "No information",
          tag: rawFormData.tag?.toString() || "BACK IN STOCK",
          price: rawFormData.price || 0,
          mainImg: mainImgPath || "/world-tour-front.jpg",
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

      imagesInput.images.map(async (imageNew, idx) => {
        // Actualizo imagenes
        await db.insert(images).values({
          productId: newdb[0].id,
          path: imageNew.toString(),
        });
      });
      revalidatePath("/", "layout");
    } catch (e) {
      console.log("Error updating database");
    }

    redirect("/dashboard");
  }
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id));
  // Hidration
  revalidatePath("/", "layout");
}
