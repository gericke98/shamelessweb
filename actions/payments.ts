"use server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const returnUrl = absoluteUrl("/");

export const createStripeUrl = async () => {
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: "sgerickee@gmail.com",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "EUR",
          product_data: {
            name: "Compra shameless",
            description: "Compra shameless",
          },
          unit_amount: 5000, //equivalente a 20 euros
        },
      },
    ],
    success_url: returnUrl,
    cancel_url: returnUrl,
  });
  return { data: stripeSession.url };
};
