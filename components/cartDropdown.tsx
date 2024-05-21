import { CartContext } from "@/contexts/cart.context";
import React, { useContext } from "react";
import CartItem from "./cartItem";
import { Button } from "./ui/button";
import Image from "next/image";
import DoneIcon from "../public/done.svg";
import CloseIcon from "../public/close.svg";
import Link from "next/link";

const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const goToCart = () => {
    setIsCartOpen(false);
  };
  return cartItems.length ? (
    <div className="fixed top-0 right-0 z-50 lg:w-1/4  w-full h-full flex flex-col bg-white outline-offset-3 pt-5 px-2 border-2 ">
      <div className="flex justify-end pr-2 pt-1 cursor-pointer">
        <Image
          src={CloseIcon}
          width={30}
          height={30}
          alt="Close icon"
          onClick={() => setIsCartOpen(false)}
        />
      </div>
      <h1>YOUR CART</h1>
      <div className="flex flex-col overflow-auto gap-2 h-3/4">
        {cartItems.length ? (
          cartItems.map((item) => (
            <CartItem key={item.id + item.variant} cartItem={item} />
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className="text-sm mt-5 border-y-2 py-2 text-center">
        Buy now and get free shipping
      </div>
      <div className="flex flex-row justify-between mt-4 w-full lg:p-3 p-2">
        <Link href="/checkout" className="w-full">
          <Button variant="default" size="ancho" className="w-full">
            CHECKOUT
          </Button>
        </Link>
      </div>
    </div>
  ) : (
    <div className="absolute lg:w-[440px] w-screen h-[320px] flex flex-col top-14 lg:right-5 right-0 bg-white outline-offset-3">
      <p className="p-2">Your cart is empty</p>
    </div>
  );
};

export default CartDropdown;
