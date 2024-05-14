import { products, variants } from "@/db/schema";

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
};
