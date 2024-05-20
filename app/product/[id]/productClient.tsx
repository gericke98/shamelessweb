"use client";
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
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "sonner";

type Props = {
  product: ProductType;
};

export const ProductClientPage = ({ product }: Props) => {
  const [activeVariant, setVariant] = useState<string>("SMALL");

  const stockActive = product.variants.filter(
    (variant) => variant.name === activeVariant
  )[0].stock;

  const { addItemToCart, isCartOpen, cartItems } = useContext(CartContext);
  const addProductToCart = () => {
    // Reviso si existe stock suficiente de ese producto
    const existingCartItem = cartItems.find(
      (cartItem) =>
        cartItem.id === product.id && cartItem.variant === activeVariant
    );
    if (existingCartItem) {
      if (existingCartItem.quantity < stockActive) {
        try {
          addItemToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            variant: activeVariant,
            quantity: 0,
            imageSrc: product.frontImageSrc,
            maxstock: stockActive,
          });
        } catch (error) {
          console.error("Caught error:", error);
          toast.error("No more products available at this moment");
        }
      }
    } else if (stockActive > 0) {
      addItemToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        variant: activeVariant,
        quantity: 0,
        imageSrc: product.frontImageSrc,
        maxstock: stockActive,
      });
    } else {
      toast.error("No more products available at this moment");
    }
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
      <div className="hidden lg:block w-[35vw] overflow-hidden h-full pl-10 pr-10">
        <h1 className="text-3xl pt-10">{product.name}</h1>
        <h3 className="text-xl pt-5">{product.price}.00 €</h3>
        <p className="mt-1">Taxes included</p>

        <div className="pr-4 mt-10">
          <p className="text-md">{product.description}</p>
          <p className="mt-14 text-md">Model (man) wearing size L - 188 cm</p>
          <p className="mt-8 text-md">Model (woman) wearing size S - 170 cm</p>
        </div>

        <h4 className="mt-10 font-bold text-md">Sizes</h4>
        <div className="flex flex-row gap-8 mt-2 border-t-2 pt-6 pb-6 border-b-2 justify-between px-4">
          {product.variants.map((variant) => (
            <p
              key={variant.id}
              className={cn(
                "cursor-pointer text-sm uppercase border-b-2 border-transparent hover:border-b-current transition-all duration-300",
                {
                  "border-b-current": variant.name === activeVariant,
                  "line-through text-slate-300":
                    variant.stock < 1 ||
                    (cartItems.find(
                      (cartItem) =>
                        cartItem.id === product.id &&
                        cartItem.variant === variant.name
                    )?.quantity ?? 0) >= variant.stock,
                }
              )}
              onClick={() => setVariant(variant.name)}
            >
              {variant.name}
            </p>
          ))}
        </div>
        {stockActive > 0 &&
        (cartItems.find(
          (cartItem) =>
            cartItem.id === product.id && cartItem.variant === activeVariant
        )?.quantity ?? 0) < stockActive ? (
          <div className="mt-16 flex flex-col gap-2">
            <Button variant="default2" size="xlg" onClick={addProductToCart}>
              ADD TO CART
            </Button>
            <Link href="/checkout" className="w-full">
              <Button
                variant="secondary"
                size="xlg"
                onClick={addProductToCart}
                className="w-full"
              >
                BUY NOW
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mt-16 flex flex-col gap-2">
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
            <p className="text-sm">{product.description}</p>
            <p className="mt-14 text-sm">Model (man) wearing size L - 188 cm</p>
            <p className="mt-8 text-sm">
              Model (woman) wearing size S - 170 cm
            </p>
          </div>

          <h5 className="mt-10 font-bold text-lg">Talla</h5>
          <div className="flex flex-row gap-8 mt-2">
            {product.variants.map((variant) => (
              <p
                key={variant.id}
                className={cn(
                  "cursor-pointer text-sm uppercase border-b-2 border-transparent hover:border-b-current transition-all duration-300",
                  {
                    "border-b-current": variant.name === activeVariant,
                    "line-through text-slate-300":
                      variant.stock < 1 ||
                      (cartItems.find(
                        (cartItem) =>
                          cartItem.id === product.id &&
                          cartItem.variant === variant.name
                      )?.quantity ?? 0) >= variant.stock,
                  }
                )}
                onClick={() => setVariant(variant.name)}
              >
                {variant.name}
              </p>
            ))}
          </div>
          {stockActive > 0 &&
          (cartItems.find(
            (cartItem) =>
              cartItem.id === product.id && cartItem.variant === activeVariant
          )?.quantity ?? 0) < stockActive ? (
            <div className="mt-16 flex flex-col w-[90vw] gap-2">
              <Button variant="default2" size="xlg" onClick={addProductToCart}>
                ADD TO CART
              </Button>
              <Link href="/checkout" className="w-full">
                <Button
                  variant="secondary"
                  size="xlg"
                  onClick={addProductToCart}
                  className="w-full"
                >
                  BUY NOW
                </Button>
              </Link>
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
