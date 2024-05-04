import { relations } from "drizzle-orm";
import { integer, text, pgTable, serial } from "drizzle-orm/pg-core";

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const categoriesRelations = relations(collections, ({ many }) => ({
  products: many(products),
}));

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => collections.id, {
    onDelete: "cascade",
  }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  frontImageSrc: text("front_image").notNull(),
  backImageSrc: text("back_image").notNull(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  variants: many(variants),
  collection: one(collections, {
    fields: [products.categoryId],
    references: [collections.id],
  }),
}));

export const variants = pgTable("variants", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  stock: integer("stock").notNull(),
});

export const variantsRelations = relations(variants, ({ one }) => ({
  product: one(products, {
    fields: [variants.productId],
    references: [products.id],
  }),
}));

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  total: integer("total").notNull(),
  stock: integer("stock").notNull(),
});

export const productOrders = pgTable("productOrders", {
  id: serial("id").primaryKey(),
  orderId: text("orderId").notNull(),
  productId: text("productId").notNull(),
});
