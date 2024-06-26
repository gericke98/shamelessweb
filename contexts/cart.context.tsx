"use client";
import { CartContextType, CartItem } from "@/types";
import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems: CartItem[], productToAdd: CartItem) => {
  const newProduct = {
    id: productToAdd.id,
    name: productToAdd.name,
    price: productToAdd.price,
    variant: productToAdd.variant,
    imageSrc: productToAdd.imageSrc,
    maxstock: productToAdd.maxstock,
  };

  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.id === productToAdd.id &&
      cartItem.variant === productToAdd.variant
  );

  if (existingCartItem) {
    if (existingCartItem.quantity < productToAdd.maxstock) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id &&
        cartItem.variant === productToAdd.variant
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      throw new Error("No more stock available");
    }
  }
  return [...cartItems, { ...newProduct, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.id === cartItemToRemove.id &&
      cartItem.variant === cartItemToRemove.variant
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem?.quantity === 1) {
    return cartItems.filter(
      (cartItem) =>
        !(
          cartItem.id === cartItemToRemove.id &&
          cartItem.variant === cartItemToRemove.variant
        )
    );
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id &&
    cartItem.variant === cartItemToRemove.variant
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem) =>
  cartItems.filter(
    (cartItem) =>
      !(
        cartItem.id === cartItemToClear.id &&
        cartItem.variant === cartItemToClear.variant
      )
  );

export const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  updatePrice: () => {},
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  discount: 0,
});

export const CartProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal * (1 - discount));
  }, [cartItems, discount]);

  const addItemToCart = (productToAdd: CartItem) => {
    try {
      setCartItems(addCartItem(cartItems, productToAdd));
      setIsCartOpen(true);
    } catch (e) {
      throw new Error("No more stock available");
    }
  };

  const removeItemToCart = (cartItemToRemove: CartItem) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const updatePrice = (percentage: number) => {
    setDiscount(percentage / 100);
  };

  const clearItemFromCart = (cartItemToClear: CartItem) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    updatePrice,
    cartItems,
    cartCount,
    cartTotal,
    discount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
