import { getOrders } from "@/db/queries";
import React from "react";
import { MdOutlineShoppingBag } from "react-icons/md";

export default async function CardOrders() {
  const orders = await getOrders();

  return (
    <div className="flex flex-row justify-start bg-[var(--primary-soft-color)] lg:p-5 p-3 rounded-sm gap-5 pointer w-full hover:bg-[#2e374a]">
      <MdOutlineShoppingBag size={24} />
      <div className="flex flex-col gap-5">
        <span className="lg:text-lg text-md font-medium ">Total Orders</span>
        <span className="lg:text-2xl text-xl font-medium ">
          {orders.length}
        </span>
      </div>
    </div>
  );
}
