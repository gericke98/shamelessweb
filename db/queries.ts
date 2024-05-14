import { cache } from "react";
import db from "./drizzle";
import { and, asc, eq } from "drizzle-orm";
import { discounts, products, shipping, variants } from "./schema";

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
      variants: {
        orderBy: [asc(variants.id)],
      },
    },
  });
  return data;
});

export const getShipping = cache(async () => {
  const data = await db.query.shipping.findMany({
    orderBy: [asc(shipping.id)],
  });
  return data;
});

export const getVariant = cache(async (id: number, name: string) => {
  const data = await db.query.variants.findFirst({
    where: and(eq(variants.productId, id), eq(variants.name, name)),
  });
  return data;
});

export const getDiscount = cache(async (name: string) => {
  const data = await db.query.discounts.findFirst({
    where: eq(discounts.name, name),
  });
  return data;
});
