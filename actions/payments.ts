"use server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { CartItem } from "@/types";

const returnUrl = absoluteUrl("/");

export const createStripeUrl = async (
  cartProducts: CartItem[],
  email: string,
  order: string,
  discount: number
) => {
  const serializedProducts = JSON.stringify(
    cartProducts.map((product) => ({
      id: product.id,
      variant: product.variant,
      quantity: product.quantity,
    }))
  );
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: email,
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
          unit_amount: Math.round(cartProduct.price * (1 - discount) * 100),
        },
      };
    }),
    metadata: {
      products: serializedProducts,
      orderId: order,
    },
    success_url: returnUrl,
    cancel_url: returnUrl,
  });
  return { data: stripeSession.url };
};
