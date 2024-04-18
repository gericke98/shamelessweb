import { CartContext } from "@/contexts/cart.context";
import React, { useContext } from "react";
import CartItem from "./cartItem";
import { Button } from "./ui/button";
import Image from "next/image";
import DoneIcon from "../public/done.svg";
import CloseIcon from "../public/close.svg";
import { redirect } from "next/navigation";
import Link from "next/link";

const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  if (cartItems.length === 0) {
    setIsCartOpen(false);
  }
  const goToCart = () => {
    setIsCartOpen(false);
  };
  return cartItems.length ? (
    <div className="absolute w-[440px] h-[320px] flex flex-col top-20 right-5  bg-white outline-offset-3">
      <div className="flex justify-end pr-2 cursor-pointer">
        <Image
          src={CloseIcon}
          width={20}
          height={20}
          alt="Close icon"
          onClick={() => setIsCartOpen(false)}
        />
      </div>
      <div className="flex flex-row items-center gap-1 pl-2">
        <Image src={DoneIcon} height={30} width={30} alt="Done icon" />
        <h3 className="font-thin">Added to cart</h3>
      </div>
      <div className="flex flex-col overflow-auto p-4">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className="flex flex-row justify-between mt-4 w-full p-3">
        <Link href="/cart">
          <Button variant="default" size="ancho" onClick={goToCart}>
            VIEW CART
          </Button>
        </Link>
        <Button variant="default" size="ancho" onClick={() => {}}>
          CHECKOUT
        </Button>
      </div>
    </div>
  ) : (
    <div className="absolute w-[440px] h-[320px] flex flex-col top-20 right-5  bg-white outline-offset-3">
      <p>Your cart is empty</p>
    </div>
  );
};

export default CartDropdown;
