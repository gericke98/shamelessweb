"use client";
import { CartContext } from "@/contexts/cart.context";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

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

export const HeaderComponent = () => {
  const pathname = usePathname();
  const { cartCount, isCartOpen, setIsCartOpen } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <div className="flex items-center justify-center gap-2 bg-white h-[80px]">
      <div className="flex-1 p-5 items-center justify-center">
        <Link href="/">
          <Image
            src={"/LOGO_black.png"}
            width={100}
            height={100}
            alt="Logo"
            className="cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex flex-grow justify-between px-5">
        {links.map((link) => (
          <Link
            key={link.name}
            href="/"
            className={cn(
              "cursor-pointer text-md tracking-wide uppercase border-b-2 border-transparent hover:border-b-current transition-all duration-300",
              pathname === link.path && "border-b-current"
            )}
            passHref
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex-1 flex items-center justify-end p-5">
        <div className="flex justify-center items-center">
          <Image
            onClick={toggleIsCartOpen}
            src={CartIcon}
            height={30}
            width={30}
            alt="Cart icon"
          />
          <h2 className="">{cartCount}</h2>
        </div>
      </div>
      {isCartOpen && <CartDropdown />}
    </div>
  );
};
