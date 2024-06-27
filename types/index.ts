import {
  collections,
  images,
  orders,
  productOrders,
  products,
  users,
  variants,
} from "@/db/schema";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  variant: string;
  imageSrc: string;
  maxstock: number;
};

export type CartContextType = {
  isCartOpen: boolean;
  setIsCartOpen: (isCartOpen: boolean) => void;
  cartItems: CartItem[];
  addItemToCart: (product: CartItem) => void;
  removeItemToCart: (product: CartItem) => void;
  clearItemFromCart: (product: CartItem) => void;
  updatePrice: (percentage: number) => void;
  cartCount: number;
  cartTotal: number;
  discount: number;
};

export type ProductType = typeof products.$inferSelect & {
  variants: (typeof variants.$inferSelect)[];
  images: (typeof images.$inferSelect)[];
};
export type CollectionType = {
  id: number;
  name: string;
  products: {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    tag: string;
    price: number;
    mainImg: string;
    images: {
      id: number;
      productId: number;
      path: string | null;
    }[];
  }[];
}[];

export type VariantType = typeof variants.$inferSelect;

export type OrderType = typeof orders.$inferSelect & {
  products: (typeof productOrders.$inferSelect)[];
} & {
  client: typeof users.$inferSelect;
};

export type UserType = typeof users.$inferSelect;
