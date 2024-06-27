import { getProducts } from "@/db/queries";
import React from "react";
import { MdOutlineBeenhere } from "react-icons/md";

export default async function CardProducts() {
  const products = await getProducts();
  return (
    <div className="flex flex-row justify-center bg-[var(--primary-soft-color)] lg:p-5 p-3 rounded-sm gap-5 pointer w-full hover:bg-[#2e374a]">
      <MdOutlineBeenhere size={24} />
      <div className="flex flex-col gap-5">
        <span className="lg:text-lg text-md font-medium">Total Products</span>
        <span className="lg:text-2xl text-xl font-medium">
          {products.length}
        </span>
      </div>
    </div>
  );
}
