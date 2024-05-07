"use client";
import { CartContext } from "@/contexts/cart.context";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CheckoutCard } from "./checkoutCard";
import { CartItem } from "@/types";
import FloatingLabelInput from "./labelInput";
import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
};

const CheckoutLayout = ({ children }: Props) => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="m-3">
        <Link href="/">
          <Image
            src={"/LOGO_black.png"}
            width={0}
            height={0}
            sizes="33vw"
            alt="Logo"
            className="cursor-pointer w-[6vw] h-auto"
          />
        </Link>
      </div>
      <div className="flex flex-row flex-no-wrap w-full h-full">
        <div className="w-1/2 border-2">{children}</div>
        <div className="w-1/2 bg-custom-gray flex justify-start pl-20 pt-20 flex-col gap-5 border-2">
          {cartItems.map((item: CartItem) => (
            <CheckoutCard key={item.id} item={item} />
          ))}
          <form className="w-2/3 flex flex-row gap-3 items-center">
            <FloatingLabelInput
              name={"discount"}
              placeholder={"Discount code or gift card"}
              type={"text"}
            />
            <Button variant="default" size="ancho" onClick={() => {}}>
              APPLY
            </Button>
          </form>
          <div className="w-2/3 flex justify-between mt-3 bg-red-100">
            <h2 className="text-xl font-regular">Subtotal</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
