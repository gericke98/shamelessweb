import React from "react";

import {
  MdAttachMoney,
  MdDashboard,
  MdHelpCenter,
  MdLogout,
  MdOutlineSettings,
  MdShoppingBag,
  MdSupervisedUserCircle,
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Orders",
        path: "/dashboard/orders",
        icon: <MdAttachMoney />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];
export const SideBar = () => {
  return (
    <div className="sticky top-4 h-full">
      <div className="flex items-center gap-5 mb-5">
        <Image
          src="/user.png"
          alt="User"
          width={50}
          height={50}
          className="rounded-[50%] object-cover"
        />
        <div className="flex flex-col">
          <span className="font-medium">Santiago Gericke</span>
          <span className="text-xs text-slate-500">Administrator</span>
        </div>
      </div>
      <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className="text-white font-bold text-sm m-2">
              <span className="text-slate-500">{cat.title}</span>
              {cat.list.map((item) => (
                <MenuLink
                  title={item.title}
                  path={item.path}
                  icon={item.icon}
                  key={item.title}
                />
              ))}
            </span>
          </li>
        ))}
      </ul>
      <button className="flex items-center gap-2 pointer rounded-sm p-5 my-1 bg-transparent border-none w-full hover:bg-[#2e374a]">
        <MdLogout /> Logout
      </button>
    </div>
  );
};
