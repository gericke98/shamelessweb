import { CartItem as CartItemType } from "@/types";
import Image from "next/image";
import React, { useContext } from "react";
import leftArrow from "../public/left.svg";
import rightArrow from "../public/right.svg";
import { CartContext } from "@/contexts/cart.context";

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  const { addItemToCart, removeItemToCart, clearItemFromCart } =
    useContext(CartContext);
  const removeItemFromCart = () => {
    removeItemToCart({
      id: cartItem.id,
      name: cartItem.name,
      price: cartItem.price,
      variant: cartItem.variant,
      quantity: 0,
      imageSrc: cartItem.imageSrc,
    });
  };

  const addItemCart = () => {
    addItemToCart({
      id: cartItem.id,
      name: cartItem.name,
      price: cartItem.price,
      variant: cartItem.variant,
      quantity: 0,
      imageSrc: cartItem.imageSrc,
    });
  };

  const removeItem = () => {
    clearItemFromCart({
      id: cartItem.id,
      name: cartItem.name,
      price: cartItem.price,
      variant: cartItem.variant,
      quantity: 0,
      imageSrc: cartItem.imageSrc,
    });
  };
  return (
    <div className="flex flex-col w-full h-full mb-2">
      <div className="flex flex-row w-full flex-start items-top mb-5 gap-4 mt-5">
        <Image
          src={cartItem.imageSrc}
          width={100}
          height={150}
          alt={cartItem.name}
        />
        <div className="flex flex-col flex-start gap-2">
          <span className="text-md">{cartItem.name}</span>
          <span className="text-md">
            {cartItem.quantity} x €{cartItem.price}
          </span>
          <span className="text-sm text-slate-400">
            Size: {cartItem.variant}
          </span>
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={leftArrow}
              width={18}
              height={18}
              alt="left arrow"
              className="cursor-pointer"
              onClick={removeItemFromCart}
            />
            {cartItem.quantity}
            <Image
              src={rightArrow}
              width={18}
              height={18}
              alt="right arrow"
              className="cursor-pointer"
              onClick={addItemCart}
            />
          </div>
          <span
            className="text-xs text-slate-400 cursor-pointer"
            onClick={removeItem}
          >
            Remove
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
