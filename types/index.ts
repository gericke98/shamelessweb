import { products, variants } from "@/db/schema";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  variant: string;
  imageSrc: string;
};

export type CartContextType = {
  isCartOpen: boolean;
  setIsCartOpen: (isCartOpen: boolean) => void;
  cartItems: CartItem[];
  addItemToCart: (product: CartItem) => void;
  removeItemToCart: (product: CartItem) => void;
  clearItemFromCart: (product: CartItem) => void;
  cartCount: number;
  cartTotal: number;
};

export type ProductType = typeof products.$inferSelect & {
  variants: (typeof variants.$inferSelect)[];
};
