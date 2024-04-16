"use server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const returnUrl = absoluteUrl("/");

type Variant = {
  id: string;
  name: string;
  stock: number;
};

type Props = {
  id: string;
  name: string;
  price: number;
  collectionId: string[];
  frontImageSrc: string;
  backImageSrc: string;
  description: string;
  variants: Variant[];
}[];

export const createStripeUrl = async (cartProducts: Props) => {
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: "sgerickee@gmail.com",
    line_items: cartProducts.map((cartProduct) => {
      return {
        quantity: 1,
        price_data: {
          currency: "EUR",
          product_data: {
            name: cartProduct.name,
            description: cartProduct.description,
          },
          unit_amount: cartProduct.price * 100,
        },
      };
    }),
    success_url: returnUrl,
    cancel_url: returnUrl,
  });
  return { data: stripeSession.url };
};
