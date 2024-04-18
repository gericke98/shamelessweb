"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";

type Props = {
  title: string;
  path: string;
  icon: ReactElement;
};

const MenuLink: React.FC<Props> = ({ title, path, icon }) => {
  const pathname = usePathname();
  return (
    <Link
      href={path}
      className={cn(
        "flex flex-row items-center p-5 gap-2 hover:bg-[#2e374a] my-1 mx-0 rounded-sm",
        pathname === path && "bg-[#2e374a]"
      )}
    >
      {icon}
      {title}
    </Link>
  );
};

export default MenuLink;
