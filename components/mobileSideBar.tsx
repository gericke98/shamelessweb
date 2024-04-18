"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "@/contexts/cart.context";

import CartIcon from "../public/cart.svg";
import CartDropdown from "./cartDropdown";

const links = [
  { name: "HOME", path: "/" },
  { name: "SHOP ALL", path: "/shop-all" },
  { name: "T-SHIRTS", path: "/t-shirts" },
  { name: "LONGSLEEVE TEES", path: "/longsleeve-tees" },
  { name: "CREWNECKS", path: "/crewnecks" },
  { name: "HOODIES", path: "/hoodies" },
];

export const MobileSideBar = () => {
  const { cartCount, isCartOpen, setIsCartOpen } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <Sheet>
        <SheetTrigger>
          <Menu className="text-black" />
        </SheetTrigger>
        <SheetContent className="p-0 z-[100] " side="left">
          <div className="flex flex-grow flex-col justify-between pt-10 pl-5 pr-5 gap-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href="/"
                className="cursor-pointer text-md tracking-wide uppercase border-b-2 border-transparent hover:border-b-current transition-all duration-300"
                passHref
              >
                {link.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex-1 flex items-center justify-end p-2">
        <div className="flex justify-center items-center cursor-pointer">
          <Image
            onClick={toggleIsCartOpen}
            src={CartIcon}
            height={25}
            width={25}
            alt="Cart icon"
          />
          <h2 className="text-sm">{cartCount}</h2>
        </div>
      </div>
      {isCartOpen && <CartDropdown />}
    </div>
  );
};
