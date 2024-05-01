import { cache } from "react";
import db from "./drizzle";
import { eq } from "drizzle-orm";
import { products } from "./schema";

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
