"use client";
import { CartContext } from "@/contexts/cart.context";
import { startTransition, useContext } from "react";
import leftArrow from "../../public/left.svg";
import rightArrow from "../../public/right.svg";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { createStripeUrl } from "@/actions/payments";
import { toast } from "sonner";

const CartPage = () => {
  const { cartItems, addItemToCart, removeItemToCart, cartTotal } =
    useContext(CartContext);
  const removeItemFromCart = (cartItem: CartItem) => {
    removeItemToCart({
      id: cartItem.id,
      name: cartItem.name,
      price: cartItem.price,
      variant: cartItem.variant,
      quantity: 0,
      imageSrc: cartItem.imageSrc,
    });
  };

  const addItemCart = (cartItem: CartItem) => {
    addItemToCart({
      id: cartItem.id,
      name: cartItem.name,
      price: cartItem.price,
      variant: cartItem.variant,
      quantity: 0,
      imageSrc: cartItem.imageSrc,
    });
  };

  const onPay = () => {
    startTransition(() => {
      createStripeUrl(cartItems)
        .then((res) => {
          if (res.data) {
            window.location.href = res.data;
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <div className="lg:m-24 m-15">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.id + item.variant}>
              <TableCell className="flex flex-row w-full flex-start items-top mb-5 gap-4 mt-5 ">
                <Image
                  src={item.imageSrc}
                  width="0"
                  height="0"
                  alt={item.name}
                  sizes="15vw"
                  className="h-auto w-auto lg:block hidden"
                />
                <div className="flex flex-col flex-start gap-2">
                  <span className="lg:text-md text-xs">{item.name}</span>
                  <span className="lg:text-md text-xs text-slate-400">
                    {item.variant}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-md">€{item.price}.00</TableCell>
              <TableCell>
                <div className="flex flex-row items-center justify-center">
                  <Image
                    src={leftArrow}
                    width={0}
                    height={0}
                    sizes="10vw"
                    alt="left arrow"
                    className="cursor-pointer h-auto lg:w-[1.5vw] w-[3vw]"
                    onClick={() => removeItemFromCart(item)}
                  />
                  <div className="flex flex-col flex-start gap-2 lg:text-lg text-xs">
                    {item.quantity}
                  </div>
                  <Image
                    src={rightArrow}
                    width={0}
                    height={0}
                    alt="right arrow"
                    className="cursor-pointer h-auto lg:w-[1.5vw] w-[3vw]"
                    onClick={() => addItemCart(item)}
                    sizes="10vw"
                  />
                </div>
              </TableCell>
              <TableCell>€{(item.quantity * item.price).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-row justify-between mt-10 mb-10 border-t-2 border-b-2 border-black pt-3 pl-4 pr-4 pb-3">
        <span>Subtotal</span>
        <span>€{cartTotal}.00</span>
      </div>
      <Button variant="default" size="ancho" onClick={onPay}>
        CHECKOUT
      </Button>
    </div>
  );
};

export default CartPage;
