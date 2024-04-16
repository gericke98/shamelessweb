export type CartItem = {
  id: string;
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
