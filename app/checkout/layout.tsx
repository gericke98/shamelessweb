"use client";
import { CartContext } from "@/contexts/cart.context";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useContext } from "react";
import { CheckoutCard } from "./checkoutCard";
import { CartItem } from "@/types";
import FloatingLabelInput from "./labelInput";
import { Button } from "@/components/ui/button";
import { checkDiscount } from "@/actions/shippingForm";

type Props = {
  children: React.ReactNode;
};
const initialState = {
  name: "",
  discount: 0,
};
const CheckoutLayout = ({ children }: Props) => {
  const { cartItems, cartTotal, updatePrice } = useContext(CartContext);

  const [state, formAction] = useActionState(checkDiscount, initialState);
  if (state.discount > 0) {
    updatePrice(state.discount);
  }
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
        <div className="w-1/2 bg-custom-gray flex justify-start pl-20 pt-20 flex-col gap-4 border-2">
          {cartItems.map((item: CartItem) => (
            <CheckoutCard key={item.id} item={item} />
          ))}
          <form
            className="w-2/3 flex flex-row gap-3 items-center"
            action={formAction}
          >
            <FloatingLabelInput
              name={"discount"}
              placeholder={"Discount code or gift card"}
              type={"text"}
            />
            <Button variant="default" size="ancho" type="submit">
              APPLY
            </Button>
          </form>
          {state.discount > 0 && (
            <h5 className="text-center bg-transparent border-2 border-[#d6d7d9] rounded-xl w-1/4 pt-2 pb-2">
              {state?.name}
            </h5>
          )}

          <div className="w-2/3 flex justify-between items-center mt-3">
            <h2 className="text-md font-regular">Subtotal</h2>
            <h2 className="text-md font-regular">
              {" "}
              {Math.round(cartTotal * 100) / 100} €
            </h2>
          </div>
          <div className="w-2/3 flex justify-between items-center -mt-1">
            <h2 className="text-md font-regular">Shipping</h2>
            <h2 className="text-md font-regular">0.00 €</h2>
          </div>
          <div className="w-2/3 flex justify-between items-center mt-4">
            <h2 className="text-lg font-bold">Total</h2>
            <h2 className="text-lg font-bold">
              {Math.round(cartTotal * 100) / 100} €
            </h2>
          </div>
          <h3 className="text-md -mt-2 text-gray-500">
            Including {Math.round(cartTotal * 100 * 0.21) / 100}€ in taxes
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
