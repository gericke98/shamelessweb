import { relations } from "drizzle-orm";
import {
  integer,
  text,
  pgTable,
  serial,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const categoriesRelations = relations(collections, ({ many }) => ({
  products: many(products),
}));

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id"),
  name: text("name").notNull(),
  description: text("description").notNull(),
  tag: text("tag").notNull(),
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
  productOrder: one(productOrders),
  product: one(products, {
    fields: [variants.productId],
    references: [products.id],
  }),
}));

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  address1: text("address1").notNull(),
  address2: text("address2"),
  zipcode: text("zip").notNull(),
  city: text("city").notNull(),
  number: integer("number").notNull(),
  email: text("email").notNull(),
  total: integer("total").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
  paid: boolean("paid").notNull(),
});
export const orderRelations = relations(orders, ({ many }) => ({
  products: many(productOrders),
}));

export const productOrders = pgTable("productOrders", {
  id: serial("id").primaryKey(),
  orderId: text("orderId").notNull(),
  productId: text("productId").notNull(),
  quantity: integer("quantity").notNull(),
});

export const productOrderRelations = relations(productOrders, ({ one }) => ({
  order: one(orders, {
    fields: [productOrders.orderId],
    references: [orders.id],
  }),
  variant: one(variants, {
    fields: [productOrders.productId],
    references: [variants.id],
  }),
}));

export const shipping = pgTable("shipping", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  cost: integer("cost").notNull(),
});

export const discounts = pgTable("discounts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  percentage: integer("percentage").notNull(),
});
