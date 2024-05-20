import { CartItem } from "@/types";
import Image from "next/image";

type Props = {
  item: CartItem;
};

export const CheckoutCard = ({ item }: Props) => {
  return (
    <div className="w-full ">
      <div className="flex flex-row lg:w-8/12 w-full lg:p-0 p-4">
        <div className="relative w-28 h-28 border-2 rounded-xl">
          <div className="overflow-hidden w-full h-full">
            <Image
              src={item.imageSrc}
              alt={item.name}
              layout="responsive"
              objectPosition="center"
              width={10}
              height={10}
            />
          </div>
          <div className="absolute top-0 right-0 w-6 h-6 bg-slate-500 text-white rounded-full flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 text-sm">
            {item.quantity}
          </div>
        </div>
        <div className="flex flex-col ml-5 justify-start gap-1 w-1/2">
          <h1>{item.name}</h1>
          <h3 className="text-sm">{item.variant}</h3>
        </div>
        <div className="flex flex-row justify-end w-1/2">
          <h3>{item.price * item.quantity}.00 €</h3>
        </div>
      </div>
    </div>
  );
};
