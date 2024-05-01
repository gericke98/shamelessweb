"use client";
import { createStripeUrl } from "@/actions/payments";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartContext } from "@/contexts/cart.context";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types";
import Image from "next/image";
import { useContext, useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  product: ProductType;
};

export const ProductClientPage = ({ product }: Props) => {
  const [activeVariant, setVariant] = useState("SMALL");

  const stockActive = product.variants.filter(
    (variant) => variant.name === activeVariant
  )[0].stock;

  const { addItemToCart, isCartOpen } = useContext(CartContext);
  const addProductToCart = () => {
    if (stockActive > 0) {
      addItemToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        variant: activeVariant,
        quantity: 0,
        imageSrc: product.frontImageSrc,
      });
    }
  };
  const [pending, startTransition] = useTransition();

  //Payment
  const onPay = () => {
    startTransition(() => {
      createStripeUrl([
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          variant: activeVariant,
          imageSrc: product.frontImageSrc,
        },
      ])
        .then((res) => {
          if (res.data) {
            window.location.href = res.data;
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <div
      className={cn(
        "flex flex-row w-full h-full ",
        isCartOpen && "bg-slate-100"
      )}
    >
      <ScrollArea className="hidden lg:flex flex-col h-[100vh] w-[65vw] ">
        <Image
          src={product.frontImageSrc}
          alt={product.name}
          width={1600}
          height={1000}
        />
        <Image
          src={product.backImageSrc}
          alt={product.name}
          width={1600}
          height={1000}
        />
      </ScrollArea>
      <div className="hidden lg:block w-[35vw] overflow-hidden h-full ml-10 pl-10 pr-10">
        <h1 className="text-3xl pt-10">{product.name}</h1>
        <h3 className="text-xl pt-5">{product.price}.00 €</h3>
        <p className="mt-1">Impuestos incluidos</p>

        <div className="pr-4 mt-10 ">
          <p className="text-lg">{product.description}</p>
        </div>

        <h5 className="mt-10 font-bold text-lg">Talla</h5>
        <div className="flex flex-row gap-8 mt-2">
          {product.variants.map((variant) => (
            <p
              key={variant.id}
              className={cn(
                "cursor-pointer text-md uppercase border-b-2 border-transparent hover:border-b-current transition-all duration-300",
                variant.name === activeVariant && "border-b-current"
              )}
              onClick={() => setVariant(variant.name)}
            >
              {variant.name}
            </p>
          ))}
        </div>
        {stockActive > 0 ? (
          <div className="mt-16 flex flex-col w-[25vw] gap-2">
            <Button variant="default2" size="xlg" onClick={addProductToCart}>
              ADD TO CART
            </Button>

            <Button variant="secondary" size="xlg" onClick={onPay}>
              BUY NOW
            </Button>
          </div>
        ) : (
          <div className="mt-16 flex flex-col w-[25vw] gap-2">
            <Button variant="default2" size="xlg" disabled>
              OUT OF STOCK
            </Button>
            <Button variant="destructive" size="xlg">
              NOTIFY ME WHEN AVAILABLE
            </Button>
          </div>
        )}
      </div>
      <div className="lg:hidden flex w-full h-full items-center justify-center flex-col">
        <Carousel className="w-full h-full p-5">
          <CarouselContent>
            <CarouselItem>
              <Image
                src={product.frontImageSrc}
                alt={product.name}
                width={1600}
                height={1000}
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src={product.backImageSrc}
                alt={product.name}
                width={1600}
                height={1000}
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="lg:hidden w-full overflow-hidden h-full pl-5">
          <h1 className="lg:text-3xl pt-10 text-xl">{product.name}</h1>
          <h3 className="text-xl pt-5">{product.price}.00 €</h3>
          <p className="mt-1 text-sm">Impuestos incluidos</p>

          <div className="pr-4 mt-10 ">
            <p className="lg:text-lg text-md">{product.description}</p>
          </div>

          <h5 className="mt-10 font-bold text-lg">Talla</h5>
          <div className="flex flex-row gap-8 mt-2">
            {product.variants.map((variant) => (
              <p
                key={variant.id}
                className={cn(
                  "cursor-pointer text-md uppercase border-b-2 border-transparent hover:border-b-current transition-all duration-300",
                  variant.name === activeVariant && "border-b-current"
                )}
                onClick={() => setVariant(variant.name)}
              >
                {variant.name}
              </p>
            ))}
          </div>
          {stockActive > 0 ? (
            <div className="mt-16 flex flex-col w-[90vw] gap-2">
              <Button variant="default2" size="xlg" onClick={addProductToCart}>
                ADD TO CART
              </Button>

              <Button variant="secondary" size="xlg" onClick={onPay}>
                BUY NOW
              </Button>
            </div>
          ) : (
            <div className="mt-16 flex flex-col w-[90vw] gap-2">
              <Button variant="default2" size="xlg" disabled>
                OUT OF STOCK
              </Button>
              <Button variant="destructive" size="xlg">
                NOTIFY ME WHEN AVAILABLE
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
