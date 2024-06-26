import { getOrders } from "@/db/queries";
import React from "react";
import { MdOutlineShoppingBag } from "react-icons/md";

export default async function CardOrders() {
  const orders = await getOrders();

  return (
    <div className="flex flex-row bg-[var(--primary-soft-color)] p-5 rounded-sm gap-5 pointer w-full hover:bg-[#2e374a]">
      <MdOutlineShoppingBag size={24} />
      <div className="flex flex-col gap-5">
        <span className="text-lg font-medium">Total Orders</span>
        <span className="text-2xl font-medium">{orders.length}</span>
      </div>
    </div>
  );
}
