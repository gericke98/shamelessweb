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
import { CartContextType, CartItem, ProductType, VariantType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  product: ProductType;
};
type SizeSelectorProps = {
  variants: VariantType[];
  activeVariant: string;
  setVariant: React.Dispatch<React.SetStateAction<string>>;
  product: ProductType;
  cartItems: CartItem[];
};
type ProductInfoProps = {
  product: ProductType;
  activeVariant: string;
  setVariant: React.Dispatch<React.SetStateAction<string>>;
  stockActive: number;
  cartItems: CartItem[];
  addProductToCart: () => void;
};

const SizeSelector = ({
  variants,
  activeVariant,
  setVariant,
  product,
  cartItems,
}: SizeSelectorProps) => (
  <div className="flex flex-row gap-4 mt-2 border-t-2 py-6 border-b-2 justify-between px-2">
    {variants.map((variant) => {
      const variantStock = variant.stock;
      const cartItemQuantity =
        cartItems.find(
          (cartItem) =>
            cartItem.id === product.id && cartItem.variant === variant.name
        )?.quantity ?? 0;

      return (
        <p
          key={variant.id}
          className={cn(
            "cursor-pointer text-xs uppercase border-b-2 border-transparent hover:border-b-current transition-all duration-300",
            {
              "border-b-current": variant.name === activeVariant,
              "line-through text-slate-300":
                variantStock < 1 || cartItemQuantity >= variantStock,
            }
          )}
          onClick={() => setVariant(variant.name)}
        >
          {variant.name}
        </p>
      );
    })}
  </div>
);

const ProductInfo = ({
  product,
  activeVariant,
  setVariant,
  stockActive,
  cartItems,
  addProductToCart,
}: ProductInfoProps) => (
  <div className="overflow-hidden h-full px-9 lg:pt-8 lg:px-20">
    <h1 className="text-3xl pt-10">{product.name}</h1>
    <h3 className="text-xl pt-5">{product.price}.00 €</h3>
    <p className="mt-1">Taxes included</p>

    <div className="mt-9">
      <p className="text-md tracking-wider">{product.description}</p>
      <p className="mt-14 text-md tracking-wider">
        Model (man) wearing size L - 188 cm
      </p>
      <p className="mt-8 text-md tracking-wider">
        Model (woman) wearing size S - 170 cm
      </p>
    </div>

    <h4 className="mt-10 font-bold text-md">Sizes</h4>
    <SizeSelector
      variants={product.variants}
      activeVariant={activeVariant}
      setVariant={setVariant}
      product={product}
      cartItems={cartItems}
    />
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
    <Accordion type="single" collapsible className="my-10">
      <AccordionItem value="details">
        <AccordionTrigger>
          <h3 className="text-md font-normal">DETAILS</h3>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside pl-5">
            <li className="mb-2 text-md text-gray-700">
              Knitted crewneck with big logo on the back
            </li>
            <li className="mb-2 text-md text-gray-700">
              Unique Garment dye wash
            </li>
            <li className="mb-2 text-md text-gray-700">
              Distressed effect and wide ribbed hem and cuffs
            </li>
            <li className="mb-2 text-md text-gray-700">Boxy Fit</li>
            <li className="mb-2 text-md text-gray-700">100% cotton</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="shipping">
        <AccordionTrigger>
          <h3 className="text-md font-normal">SHIPPING</h3>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside pl-5">
            <li className="mb-2 text-md text-gray-700">
              Spain and Portugal: 3-5 days
            </li>
            <li className="mb-2 text-md text-gray-700">
              International: 5-7 days
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="size">
        <AccordionTrigger>
          <h3 className="text-md font-normal">SIZE GUIDE</h3>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside pl-5">
            <li className="mb-2 text-md text-gray-700">
              Foto con el size guide de la prenda
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

export const ProductClientPage = ({ product }: Props) => {
  const [activeVariant, setVariant] = useState<string>("SMALL");
  const stockActive =
    product.variants.find((variant) => variant.name === activeVariant)?.stock ||
    0;
  const { addItemToCart, isCartOpen, cartItems } =
    useContext<CartContextType>(CartContext);

  const addProductToCart = () => {
    const existingCartItem = cartItems.find(
      (cartItem: CartItem) =>
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
            imageSrc: product.mainImg,
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
        imageSrc: product.mainImg,
        maxstock: stockActive,
      });
    } else {
      toast.error("No more products available at this moment");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-row w-full h-full m-0 p-0",
        isCartOpen && "bg-slate-100"
      )}
    >
      <ScrollArea className="hidden lg:flex flex-col h-[100vh] w-[65vw]">
        <Image
          src={product.mainImg}
          alt={product.name}
          width={1600}
          height={1000}
        />
        {product.images.map((image) => (
          <Image
            key={image.id}
            src={image.path || product.mainImg}
            alt={product.name}
            width={1600}
            height={1000}
          />
        ))}
      </ScrollArea>
      <div className="hidden lg:block w-[35vw]">
        <ProductInfo
          product={product}
          activeVariant={activeVariant}
          setVariant={setVariant}
          stockActive={stockActive}
          cartItems={cartItems}
          addProductToCart={addProductToCart}
        />
      </div>
      <div className="lg:hidden flex w-full h-full items-center justify-center flex-col">
        <Carousel className="w-full h-full p-5">
          <CarouselContent>
            <CarouselItem>
              <Image
                src={product.mainImg}
                alt={product.name}
                width={1600}
                height={1000}
              />
            </CarouselItem>
            {product.images.map((image) => (
              <CarouselItem key={image.id}>
                <Image
                  src={image.path || product.mainImg}
                  alt={product.name}
                  width={1600}
                  height={1000}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="w-full h-full px-5">
          <ProductInfo
            product={product}
            activeVariant={activeVariant}
            setVariant={setVariant}
            stockActive={stockActive}
            cartItems={cartItems}
            addProductToCart={addProductToCart}
          />
        </div>
      </div>
    </div>
  );
};
