import { cache } from "react";
import db from "./drizzle";
import { and, eq } from "drizzle-orm";
import { products, variants } from "./schema";

export const getCollections = cache(async () => {
  const data = await db.query.collections.findMany({
    with: {
      products: true,
    },
  });
  return data;
});

export const getProduct = cache(async (id: string) => {
  let idnumber = +id;
  const data = await db.query.products.findMany({
    where: eq(products.id, idnumber),
    with: {
      variants: true,
    },
  });
  return data;
});

export const getVariant = cache(async (id: number, name: string) => {
  const data = await db.query.variants.findFirst({
    where: and(eq(variants.productId, id), eq(variants.name, name)),
  });
  return data;
});
