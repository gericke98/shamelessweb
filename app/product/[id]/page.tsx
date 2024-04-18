"use client";
import { createStripeUrl } from "@/actions/payments";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartContext } from "@/contexts/cart.context";
import { cn } from "@/lib/utils";
import { products } from "@/placeholder";
import Image from "next/image";
import { toast } from "sonner";
import { useContext, useState, useTransition } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  params: {
    id: string;
  };
};

const ProductPage = ({ params }: Props) => {
  // Get the product
  const productfiltered = products.filter(
    (product) => product.id === params.id
  );
  const [activeVariant, setVariant] = useState("SMALL");

  const stockActive = productfiltered[0].variants.filter(
    (variant) => variant.name === activeVariant
  )[0].stock;

  const { addItemToCart, isCartOpen } = useContext(CartContext);
  const addProductToCart = () => {
    if (stockActive > 0) {
      addItemToCart({
        id: productfiltered[0].id,
        name: productfiltered[0].name,
        price: productfiltered[0].price,
        variant: activeVariant,
        quantity: 0,
        imageSrc: productfiltered[0].frontImageSrc,
      });
    }
  };
  const [pending, startTransition] = useTransition();

  //Payment
  const onPay = () => {
    startTransition(() => {
      createStripeUrl(productfiltered)
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
          src={productfiltered[0].frontImageSrc}
          alt={productfiltered[0].name}
          width={1600}
          height={1000}
        />
        <Image
          src={productfiltered[0].backImageSrc}
          alt={productfiltered[0].name}
          width={1600}
          height={1000}
        />
      </ScrollArea>
      <div className="hidden lg:block w-[35vw] overflow-hidden h-full ml-10 pl-10 pr-10">
        <h1 className="text-3xl pt-10">{productfiltered[0].name}</h1>
        <h3 className="text-xl pt-5">{productfiltered[0].price}.00 €</h3>
        <p className="mt-1">Impuestos incluidos</p>

        <div className="pr-4 mt-10 ">
          <p className="text-lg">{productfiltered[0].description}</p>
        </div>

        <h5 className="mt-10 font-bold text-lg">Talla</h5>
        <div className="flex flex-row gap-8 mt-2">
          {productfiltered[0].variants.map((variant) => (
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
                src={productfiltered[0].frontImageSrc}
                alt={productfiltered[0].name}
                width={1600}
                height={1000}
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src={productfiltered[0].backImageSrc}
                alt={productfiltered[0].name}
                width={1600}
                height={1000}
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="lg:hidden w-full overflow-hidden h-full pl-5">
          <h1 className="lg:text-3xl pt-10 text-xl">
            {productfiltered[0].name}
          </h1>
          <h3 className="text-xl pt-5">{productfiltered[0].price}.00 €</h3>
          <p className="mt-1 text-sm">Impuestos incluidos</p>

          <div className="pr-4 mt-10 ">
            <p className="lg:text-lg text-md">
              {productfiltered[0].description}
            </p>
          </div>

          <h5 className="mt-10 font-bold text-lg">Talla</h5>
          <div className="flex flex-row gap-8 mt-2">
            {productfiltered[0].variants.map((variant) => (
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
      </div>
    </div>
  );
};

export default ProductPage;
