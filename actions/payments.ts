"use server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { CartItem } from "@/types";

const returnUrl = absoluteUrl("/");

export const createStripeUrl = async (cartProducts: CartItem[]) => {
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: "sgerickee@gmail.com",
    line_items: cartProducts.map((cartProduct) => {
      return {
        quantity: cartProduct.quantity,
        price_data: {
          currency: "EUR",
          product_data: {
            name:
              cartProduct.quantity +
              " x " +
              cartProduct.name +
              " - " +
              cartProduct.variant,
            description: "Shameless",
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
