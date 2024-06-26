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
export const MobileSideBar = () => {
  return (
    <div className="sticky bottom-0 h-full">
      <div className="w-full flex flex-row">
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
      </div>
      <button className="flex items-center gap-2 pointer rounded-sm p-5 my-1 bg-transparent border-none w-full hover:bg-[#2e374a]">
        <MdLogout /> Logout
      </button>
    </div>
  );
};
