import { getProducts } from "@/db/queries";
import React from "react";
import { MdOutlineBeenhere } from "react-icons/md";

export default async function CardProducts() {
  const products = await getProducts();
  return (
    <div className="flex flex-row bg-[var(--primary-soft-color)] p-5 rounded-sm gap-5 pointer w-full hover:bg-[#2e374a]">
      <MdOutlineBeenhere size={24} />
      <div className="flex flex-col gap-5">
        <span className="text-lg font-medium">Total Products</span>
        <span className="text-2xl font-medium">{products.length}</span>
      </div>
    </div>
  );
}
