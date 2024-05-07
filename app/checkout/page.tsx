import { getShipping } from "@/db/queries";
import { CheckoutClient } from "./checkoutClient";

const CheckoutPage = async () => {
  const shipping = await getShipping();
  return <CheckoutClient shipping={shipping} />;
};

export default CheckoutPage;
