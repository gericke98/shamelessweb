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

  // Create the upload directory
  const uploadDir = join(process.cwd(), "public");
  try {
    // Check if directory exists
    await stat(uploadDir);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      // If the directory doesn't exist, create one
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error("Error while trying to create directory:", error);
      throw error;
    }
  }
  imagesInput.previewImages.map(async (imagePath) => {
    // Create the buffer of the image
    let buffer;
    try {
      buffer = Buffer.from(
        await fetch(imagePath).then((res) => res.arrayBuffer())
      );
    } catch (error) {
      console.error("Error creating buffer from image file:", error);
      throw new Error("Invalid image file");
    }

    // Save the image file
    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      let filename = `${rawFormData.name}-${uniqueSuffix}.jpg`;
      filename = filename.replace(/\s+/g, "-"); // Replace spaces with hyphens
      await writeFile(`${uploadDir}/${filename}`, buffer);
      const fileUrl = `/${filename}`;
      // Save the file URL to the database

      const imagesDB = await db
        .insert(images)
        .values({
          productId: Number(rawFormData.id),
          path: fileUrl.toString(),
        })
        .returning();
      // Agrego la nueva imagen al array de ids para que no se elimine mas adelante
      imageIds.push(imagesDB[0].id);
    } catch (e) {
      console.error("Error while trying to upload a file:", e);
      throw e;
    }
  });

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
  console.log("Entro");
  //Extraigo la info de producto
  const rawFormData = {
    name: formData.get("name")?.toString() || "s",
    description: formData.get("description")?.toString(),
    price: Number(formData.get("price")),
  };
  const mainImgPath = imagesInput.images[0].toString();
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
  // Create the upload directory
  console.log("Entro 2");
  const uploadDir = join(process.cwd(), "public");
  try {
    // Check if directory exists
    await stat(uploadDir);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      // If the directory doesn't exist, create one
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error("Error while trying to create directory:", error);
      throw error;
    }
  }

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
          mainImg: mainImgPath || "/world-tour-front.jpg",
        })
        .returning();
      console.log("Entro 3");
      //Actualizo variantes
      stockToUpdate.map(async (stockInfo) => {
        await db.insert(variants).values({
          productId: newdb[0].id,
          name: stockInfo.name.toString(),
          stock: Number(stockInfo.stock),
        });
      });
      console.log("Entro 4");
      // Actualizo imagenes
      imagesInput.images.map(async (imagePath) => {
        // Create the buffer of the image
        let buffer;
        try {
          buffer = Buffer.from(
            await fetch(imagePath).then((res) => res.arrayBuffer())
          );
        } catch (error) {
          console.error("Error creating buffer from image file:", error);
          throw new Error("Invalid image file");
        }
        console.log("Entro 5");
        // Save the image file
        try {
          const uniqueSuffix = `${Date.now()}-${Math.round(
            Math.random() * 1e9
          )}`;
          let filename = `${rawFormData.name}-${uniqueSuffix}.jpg`;
          filename = filename.replace(/\s+/g, "-"); // Replace spaces with hyphens
          await writeFile(`${uploadDir}/${filename}`, buffer);
          const fileUrl = `/${filename}`;
          // Save the file URL to the database

          await db
            .insert(images)
            .values({
              productId: Number(newdb[0].id),
              path: fileUrl.toString(),
            })
            .returning();
          // Agrego la nueva imagen al array de ids para que no se elimine mas adelante
        } catch (e) {
          console.error("Error while trying to upload a file:", e);
          throw e;
        }
      });
      revalidatePath("/", "layout");
    } catch (e) {
      console.log("Error updating database");
    }

    redirect("/dashboard");
  }
}
