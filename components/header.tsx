"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  return (
    <div className="flex items-center justify-center gap-2 bg-white h-[80px]">
      <div className="flex-1 p-5 items-center justify-center">
        <Image
          src={"/LOGO_black.png"}
          width={100}
          height={100}
          alt="Logo"
          className="cursor-pointer"
        />
      </div>
      <div className="flex flex-grow justify-between px-5">
        {links.map((link) => (
          <Link
            key={link.name}
            href="/"
            className={cn(
              "cursor-pointer text-xl tracking-wide uppercase border-b-2 border-transparent hover:border-b-current transition-all duration-300",
              pathname === link.path && "border-b-current"
            )}
            passHref
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex-1 flex items-center justify-end p-5">
        <h2 className="">{pathname}</h2>
      </div>
    </div>
  );
};
