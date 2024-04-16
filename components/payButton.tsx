import { createStripeUrl } from "@/actions/payments";
import { startTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

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

//Payment: TO DO
// const onPay = () => {
//   startTransition(() => {
//     createStripeUrl(productfiltered)
//       .then((res) => {
//         if (res.data) {
//           window.location.href = res.data;
//         }
//       })
//       .catch(() => toast.error("Something went wrong"));
//   });
// };

export const PayButton = () => {
  return (
    <Button variant="secondary" size="xlg" onClick={() => {}}>
      BUY NOW
    </Button>
  );
};
