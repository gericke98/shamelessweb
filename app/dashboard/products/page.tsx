import Pagination from "@/components/dashboard/pagination/pagination";
import Search from "@/components/dashboard/search/search";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductsPage = () => {
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
          <th className="p-2">Description</th>
          <th className="p-2">Price</th>
          <th className="p-2">Created at</th>
          <th className="p-2">Stock</th>
          <th className="p-2">Actions</th>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">
              <div className="flex items-center gap-2">
                <Image
                  src="/"
                  alt="product"
                  width={40}
                  height={40}
                  className="rounded-lg object-cover"
                />
                Without shame sweatshirt
              </div>
            </td>
            <td className="p-2">Molona sudadera</td>
            <td className="p-2">€59.00</td>
            <td className="p-2">13.01.2022</td>
            <td className="p-2">72</td>
            <td className="p-2">
              <div className="flex gap-2">
                <Link href="/">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[teal]">
                    View
                  </button>
                </Link>
                <Link href="/">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[crimson]">
                    Delete
                  </button>
                </Link>
              </div>
            </td>
          </tr>
          <tr>
            <td className="p-2">
              <div className="flex items-center gap-2">
                <Image
                  src="/"
                  alt="product"
                  width={40}
                  height={40}
                  className="rounded-lg object-cover"
                />
                Without shame sweatshirt
              </div>
            </td>
            <td className="p-2">Molona sudadera</td>
            <td className="p-2">€59.00</td>
            <td className="p-2">13.01.2022</td>
            <td className="p-2">72</td>
            <td className="p-2">
              <div className="flex gap-2">
                <Link href="/dashboard/products/test">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[teal]">
                    View
                  </button>
                </Link>
                <Link href="/dashboard/products/test">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[crimson]">
                    Delete
                  </button>
                </Link>
              </div>
            </td>
          </tr>
          <tr>
            <td className="p-2">
              <div className="flex items-center gap-2">
                <Image
                  src="/"
                  alt="product"
                  width={40}
                  height={40}
                  className="rounded-lg object-cover"
                />
                Without shame sweatshirt
              </div>
            </td>
            <td className="p-2">Molona sudadera</td>
            <td className="p-2">€59.00</td>
            <td className="p-2">13.01.2022</td>
            <td className="p-2">72</td>
            <td className="p-2">
              <div className="flex gap-2">
                <Link href="/">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[teal]">
                    View
                  </button>
                </Link>
                <Link href="/">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[crimson]">
                    Delete
                  </button>
                </Link>
              </div>
            </td>
          </tr>
          <tr>
            <td className="p-2">
              <div className="flex items-center gap-2">
                <Image
                  src="/"
                  alt="product"
                  width={40}
                  height={40}
                  className="rounded-lg object-cover"
                />
                Without shame sweatshirt
              </div>
            </td>
            <td className="p-2">Molona sudadera</td>
            <td className="p-2">€59.00</td>
            <td className="p-2">13.01.2022</td>
            <td className="p-2">72</td>
            <td className="p-2">
              <div className="flex gap-2">
                <Link href="/">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[teal]">
                    View
                  </button>
                </Link>
                <Link href="/">
                  <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[crimson]">
                    Delete
                  </button>
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default ProductsPage;
