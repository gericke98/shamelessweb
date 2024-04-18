"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <div className="flex justify-between items-center p-5 rounded-2 bg-[var(--primary-soft-color)]">
      <div className="text-white font-bold capitalize">
        {pathname.split("/").pop()}
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-[#2e374a] p-2 rounded-2">
          <MdSearch />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none text-white"
          />
        </div>
        <div className="flex flex-row space-between items-center">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
