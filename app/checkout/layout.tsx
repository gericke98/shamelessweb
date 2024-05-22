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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CartIcon from "../../public/cart.svg";

type Props = {
  children: React.ReactNode;
};
const initialState = {
  name: "",
  discount: 0,
};
const CheckoutLayout = ({ children }: Props) => {
  const { cartItems, cartTotal, updatePrice } = useContext(CartContext);

  // const [state, formAction] = useActionState(checkDiscount, initialState);
  const state = {
    name: "",
    discount: 0,
  };
  if (state.discount > 0) {
    updatePrice(state.discount);
  }
  return (
    <>
      <div className="hidden w-full h-full lg:flex flex-col items-center">
        <div className="flex flex-row flex-no-wrap w-full h-full min-h-screen">
          <div className="w-1/2 border-t-2">
            <div className="flex items-center justify-center w-full mt-20">
              <Link href="/">
                <Image
                  src={"/LOGO_black.png"}
                  width={0}
                  height={0}
                  sizes="33vw"
                  alt="Logo"
                  className="cursor-pointer w-[10vw] h-auto min-w-24"
                />
              </Link>
            </div>
            {children}
          </div>
          <div className="w-1/2 bg-custom-gray flex justify-start pl-20 pt-20 flex-col gap-4">
            {cartItems.map((item: CartItem) => (
              <CheckoutCard key={item.id} item={item} />
            ))}
            <form
              className="w-2/3 flex flex-row gap-3 items-center"
              action={""}
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

            <div className="w-2/3 flex justify-between items-center mt-3 border-t-2 pt-3">
              <h2 className="text-md font-regular ">Subtotal</h2>
              <h2 className="text-md font-regular">{cartTotal.toFixed(2)} €</h2>
            </div>
            <div className="w-2/3 flex justify-between items-center -mt-1 border-b-2 pb-3">
              <h2 className="text-md font-regular">Shipping</h2>
              <h2 className="text-md font-regular">0.00 €</h2>
            </div>
            <div className="w-2/3 flex justify-between items-center mt-4">
              <h2 className="text-lg font-bold">Total</h2>
              <h2 className="text-lg font-bold">{cartTotal.toFixed(2)} €</h2>
            </div>
            <h3 className="text-md -mt-2 text-gray-500">
              Including {(cartTotal * 0.21).toFixed(2)}€ in taxes
            </h3>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full lg:hidden flex-col items-center justify-center">
        <div className="m-3">
          <Link href="/">
            <Image
              src={"/LOGO_black.png"}
              width={0}
              height={0}
              sizes="33vw"
              alt="Logo"
              className="cursor-pointer w-[6vw] h-auto min-w-24"
            />
          </Link>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full bg-slate-100 border-y-2"
        >
          <AccordionItem value="item-1">
            <div className="flex flex-row items-center justify-between px-4">
              <div className="flex flex-row gap-2">
                <Image src={CartIcon} width={20} height={20} alt="Close icon" />
                <AccordionTrigger>
                  Mostrar resumen de tu pedido
                </AccordionTrigger>
              </div>
              <h3 className="text-bold">{cartTotal.toFixed(2)} €</h3>
            </div>
            <AccordionContent>
              <div className="w-full bg-custom-gray flex flex-col justify-start items-center pt-8 gap-4 border-2">
                {cartItems.map((item: CartItem) => (
                  <CheckoutCard key={item.id} item={item} />
                ))}
                <form
                  className="w-full px-2 flex flex-row gap-3 items-center"
                  action={""}
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

                <div className="w-full px-5 flex justify-between items-center mt-3">
                  <h2 className="text-md font-regular">Subtotal</h2>
                  <h2 className="text-md font-regular">
                    {cartTotal.toFixed(2)} €
                  </h2>
                </div>
                <div className="w-full px-5  flex justify-between items-center -mt-1">
                  <h2 className="text-md font-regular">Shipping</h2>
                  <h2 className="text-md font-regular">0.00 €</h2>
                </div>
                <div className="w-full px-5  flex justify-between items-center mt-4">
                  <h2 className="text-lg font-bold">Total</h2>
                  <h2 className="text-lg font-bold">
                    {cartTotal.toFixed(2)} €
                  </h2>
                </div>
                <h3 className="text-md -mt-2 text-gray-500 text-left">
                  Including {(cartTotal * 0.21).toFixed(2)}€ in taxes
                </h3>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/*TODO: METER AQUI APPLE PAY*/}
        <div className="w-full border-2">{children}</div>
      </div>
    </>
  );
};

export default CheckoutLayout;
