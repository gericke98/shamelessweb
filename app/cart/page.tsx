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
import { createStripeUrl2 } from "@/actions/payments";
import { toast } from "sonner";

const CartPage = () => {
  const {
    cartItems,
    setIsCartOpen,
    addItemToCart,
    clearItemFromCart,
    removeItemToCart,
  } = useContext(CartContext);
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
      createStripeUrl2(cartItems)
        .then((res) => {
          if (res.data) {
            window.location.href = res.data;
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <div className="m-24">
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
            <TableRow key={item.id}>
              <TableCell className="flex flex-row w-full flex-start items-top mb-5 gap-4 mt-5 ">
                <Image
                  src={item.imageSrc}
                  width={100}
                  height={150}
                  alt={item.name}
                />
                <div className="flex flex-col flex-start gap-2">
                  <span className="text-md">{item.name}</span>
                  <span className="text-md text-slate-400">{item.variant}</span>
                </div>
              </TableCell>
              <TableCell>€{item.price}.00</TableCell>
              <TableCell>
                <div className="flex flex-row">
                  <Image
                    src={leftArrow}
                    width={18}
                    height={18}
                    alt="left arrow"
                    className="cursor-pointer"
                    onClick={() => removeItemFromCart(item)}
                  />
                  <div className="flex flex-col flex-start gap-2">
                    {item.quantity}
                  </div>
                  <Image
                    src={rightArrow}
                    width={18}
                    height={18}
                    alt="right arrow"
                    className="cursor-pointer"
                    onClick={() => addItemCart(item)}
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
        <span>€100.00</span>
      </div>
      <Button variant="default" size="ancho" onClick={onPay}>
        CHECKOUT
      </Button>
    </div>
  );
};

export default CartPage;
