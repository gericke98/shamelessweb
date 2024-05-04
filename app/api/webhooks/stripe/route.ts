import db from "@/db/drizzle";
import { getVariant } from "@/db/queries";
import { variants } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
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

    //Update the stock of each product
    try {
      products.map(
        async (product: { id: number; variant: string; quantity: number }) => {
          const variant = await getVariant(product.id, product.variant);
          if (variant && variant.stock >= product.quantity) {
            await db
              .update(variants)
              .set({ stock: variant.stock - product.quantity })
              .where(eq(variants.id, variant.id));
          }
        }
      );
      revalidatePath("/", "layout");
    } catch (e) {
      console.error(e);
    }

    // await db.update(variants).set({}).where(eq("1", "1"));
    // await db.insert(userSubscription).values({
    //   userId: session.metadata.userId,
    //   stripeSubscriptionId: subscription.id,
    //   stripeCustomerId: subscription.customer as string,
    //   stripePriceId: subscription.items.data[0].price.id,
    //   stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    // });
  }
  return new NextResponse(null, { status: 200 });
}
