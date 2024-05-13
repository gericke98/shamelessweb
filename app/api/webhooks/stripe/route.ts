import db from "@/db/drizzle";
import { getVariant } from "@/db/queries";
import { variants } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  // Extraigo el body
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
  }
  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    // Elimino el stock de la bbdd
    if (!session.metadata?.products) {
      return new NextResponse("Products are required", { status: 400 });
    }
    const products = JSON.parse(session.metadata.products);

    try {
      //Update the stock of each product
      products.map(
        async (product: { id: number; variant: string; quantity: number }) => {
          const variant = await getVariant(product.id, product.variant);
          if (variant && variant.stock >= product.quantity) {
            // Actualizo el stock
            await db
              .update(variants)
              .set({ stock: variant.stock - product.quantity })
              .where(eq(variants.id, variant.id));
            //Creo el pedido en la tabla de orders
          }
        }
      );
      revalidatePath("/", "layout");
    } catch (e) {
      throw new Error("Not able to update database");
    }
  }
  return new NextResponse(null, { status: 200 });
}
