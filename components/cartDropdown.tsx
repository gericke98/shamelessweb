import { CartContext } from "@/contexts/cart.context";
import React, { useContext } from "react";
import Link from "next/link";
import CartItem from "./cartItem";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="absolute w-[440px] h-[340px] flex flex-col top-8 right-0">
      <div className="flex flex-col overflow-auto">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <Link href="/checkout/">CHECKOUT</Link>
    </div>
  );
};

export default CartDropdown;
