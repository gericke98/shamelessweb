"use client";
import { Progress } from "@/components/ui/progress";
import FloatingLabelInput from "./labelInput";
import { shipping } from "@/db/schema";
import { startTransition, useContext } from "react";
import { createStripeUrl } from "@/actions/payments";
import { createOrder } from "@/actions/shippingForm";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/contexts/cart.context";
import { toast } from "sonner";

type shippingInfo = typeof shipping.$inferSelect;
type Props = {
  shipping: shippingInfo[];
};

export const CheckoutClient = ({ shipping }: Props) => {
  const { cartItems } = useContext(CartContext);
  const createNewOrder = createOrder.bind(null, cartItems);
  //Payment
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
    <div className="w-3/4 h-full p-5 mt-20 ml-[15%]">
      <Progress value={50} className="mb-5" />
      <form
        action={createNewOrder}
        className="flex flex-wrap justify-between gap-3 w-full"
      >
        <h1 className="w-full font-bold text-2xl">Contact</h1>
        <FloatingLabelInput
          name={"email"}
          placeholder={"Email"}
          type={"email"}
        />
        <h1 className="w-full font-bold text-2xl mt-20">Shipping</h1>
        <select
          id="Country"
          name="country"
          className="p-5 w-full bg-transparent border-2 border-[#d6d7d9] rounded-xl"
        >
          {shipping.map((country: shippingInfo) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <div className="w-full flex flex-row gap-3">
          <FloatingLabelInput
            name={"name"}
            placeholder={"First name"}
            type={"text"}
          />
          <FloatingLabelInput
            name={"surname"}
            placeholder={"Last name"}
            type={"text"}
          />
        </div>
        <FloatingLabelInput
          name={"address"}
          placeholder={"Address"}
          type={"text"}
        />
        <FloatingLabelInput
          name={"address2"}
          placeholder={"Apartment, suite, etc (optional)"}
          type={"text"}
        />
        <div className="w-full flex flex-row gap-3">
          <FloatingLabelInput
            name={"zipcode"}
            placeholder={"Postal code"}
            type={"text"}
          />
          <FloatingLabelInput
            name={"city"}
            placeholder={"City"}
            type={"text"}
          />
          <FloatingLabelInput
            name={"province"}
            placeholder={"Province"}
            type={"text"}
          />
        </div>
        <FloatingLabelInput
          name={"number"}
          placeholder={"Phone"}
          type={"phone"}
        />
        <Button
          variant="secondary"
          type="submit"
          size="xlg"
          className="w-full"
          onClick={onPay}
        >
          BUY NOW
        </Button>
      </form>
    </div>
  );
};
