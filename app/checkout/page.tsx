"use client";
import { CartContext } from "@/contexts/cart.context";
import { useContext } from "react";

const Checkout = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  setIsCartOpen(false);
  return (
    <div className="flex flex-col w-full h-full">
      {cartItems.map((cartitem) => (
        <div
          key={cartitem.id}
          className="flex flex-row justify-center items-center gap-2 mb-4"
        >
          <span>{cartitem.name}</span>
          <span>{cartitem.variant}</span>
          <span>{cartitem.quantity}</span>
          <span>{cartitem.price * cartitem.quantity}</span>
        </div>
      ))}
    </div>
  );
};

export default Checkout;
