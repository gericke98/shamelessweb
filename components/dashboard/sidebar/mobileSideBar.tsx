import Link from "next/link";
import React from "react";
import {
  MdAttachMoney,
  MdDashboard,
  MdHelpCenter,
  MdOutlineSettings,
  MdShoppingBag,
  MdSupervisedUserCircle,
} from "react-icons/md";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard style={{ color: "black" }} size={22} />,
      },
      {
        title: "Orders",
        path: "/dashboard/orders",
        icon: <MdAttachMoney style={{ color: "black" }} size={22} />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag style={{ color: "black" }} size={22} />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle style={{ color: "black" }} size={22} />,
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
    <div className="w-full fixed bottom-0 flex items-center h-14 bg-white z-10">
      <div className="flex flex-row w-full justify-between items-center">
        {menuItems[0].list.map((menu) => (
          <Link
            href={menu.path}
            key={menu.title}
            className="w-full flex justify-center"
          >
            {menu.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};
