"use client";
import { CartContext } from "@/contexts/cart.context";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

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
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setHeaderVisible(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <>
      <div
        className={cn(
          "fixed top-0 w-full z-10 bg-white transition-transform duration-300",
          headerVisible ? "transform-none" : "-translate-y-full",
          "hidden lg:flex items-center justify-center gap-2 h-14 px-3 border-b-2 border-slate-900"
        )}
      >
        <div className="flex-1 p-5 items-center justify-center">
          <Link href="/">
            <Image
              src={"/LOGO_black.png"}
              width={0}
              height={0}
              sizes="33vw"
              alt="Logo"
              className="cursor-pointer w-[6vw] h-auto max-w-28"
            />
          </Link>
        </div>
        <div className="flex flex-grow justify-between px-5">
          {links.map((link) => (
            <Link
              key={link.name}
              href="/"
              className={cn(
                "cursor-pointer text-md tracking-wide uppercase border-b-2 border-transparent hover:border-b-current transition-all duration-300 sm:text-sm md:text-md",
                pathname === link.path && "border-b-current"
              )}
              passHref
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex-1 flex items-center justify-end p-5">
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
      </div>
      {isCartOpen && <CartDropdown />}
    </>
  );
};
