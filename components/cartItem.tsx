import { CartItem as CartItemType } from "@/types";
import React from "react";

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  return (
    <div className="flex flex-row w-full flex-start items-center mb-5">
      <div className="flex flex-col flex-start">
        <span className="text-lg">{cartItem.name}</span>
        <span className="text-lg">
          {cartItem.quantity} x €{cartItem.price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
