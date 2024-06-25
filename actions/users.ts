"use server";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editUser(formData: FormData) {
  // Extraigo la info del order - la que se pone en el formulario
  const rawFormData = {
    id: Number(formData.get("id")),
    name: formData.get("name")?.toString() || "s",
    email: formData.get("email")?.toString() || "s",
    phone: formData.get("phone")?.toString() || "s",
    address: formData.get("address")?.toString() || "s",
    address2: formData.get("address2")?.toString() || "",
    city: formData.get("city")?.toString() || "s",
    zip: formData.get("zip")?.toString() || "s",
  };

  // Actualizo la base de datos
  if (rawFormData) {
    //Actualizo order
    await db
      .update(users)
      .set({
        name: rawFormData.name,
        address1: rawFormData.address,
        address2: rawFormData.address2,
        zipcode: rawFormData.zip,
        city: rawFormData.city,
        number: Number(rawFormData.phone),
        email: rawFormData.email,
      })
      .where(eq(users.id, rawFormData.id));
    revalidatePath("/", "layout");
  }
  // Redirijo a dashboard para que se actualice corectamente
  redirect("/dashboard");
}

export async function addUser(formData: FormData) {
  // Extraigo la info del order - la que se pone en el formulario
  const rawFormData = {
    id: Number(formData.get("id")),
    name: formData.get("name")?.toString() || "s",
    surname: formData.get("surname")?.toString() || "s",
    email: formData.get("email")?.toString() || "s",
    phone: formData.get("phone")?.toString() || "s",
    address: formData.get("address")?.toString() || "s",
    address2: formData.get("address2")?.toString() || "",
    city: formData.get("city")?.toString() || "s",
    zip: formData.get("zip")?.toString() || "s",
  };

  // Actualizo la base de datos
  if (rawFormData) {
    //Actualizo order
    await db.insert(users).values({
      name: rawFormData.name,
      subscribed: true,
      surname: rawFormData.surname,
      address1: rawFormData.address,
      address2: rawFormData.address2,
      zipcode: rawFormData.zip,
      city: rawFormData.city,
      number: Number(rawFormData.phone),
      email: rawFormData.email,
    });
    revalidatePath("/", "layout");
  }
  // Redirijo a dashboard para que se actualice corectamente
  redirect("/dashboard");
}

export async function deleteUser(id: number) {
  await db.delete(users).where(eq(users.id, id));
  // Hidration
  revalidatePath("/", "layout");
  redirect("/dashboard");
}
