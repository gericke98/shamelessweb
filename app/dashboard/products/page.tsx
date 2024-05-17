import Pagination from "@/components/dashboard/pagination/pagination";
import Search from "@/components/dashboard/search/search";
import { getProducts } from "@/db/queries";
import Link from "next/link";
import React from "react";
import { ProductRow } from "./productRow";

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <div className="bg-[var(--primary-soft-color)] p-5 rounded-sm m-5">
      <div className="flex items-center justify-between">
        <Search placeholder="Search for a product" />
        <Link href="/dashboard/products/add">
          <button className="p-2 bg-[#5d57c9] text-white border-none rounded-sm cursor-pointer text-sm">
            Add New
          </button>
        </Link>
      </div>
      <table className="w-full text-left">
        <thead>
          <th className="p-2">Title</th>
          <th className="p-2">Price</th>
          <th className="p-2">Created at</th>
          <th className="p-2">Stock</th>
          <th className="p-2">Actions</th>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default ProductsPage;
