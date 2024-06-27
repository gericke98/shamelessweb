"use client";

import { deleteProduct } from "@/actions/product";
import { ProductType } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: ProductType;
};

export const ProductRow = ({ product }: Props) => {
  const price = product.price.toFixed(2);
  return (
    <tr>
      <td className="p-2">
        <Link href={`/dashboard/products/${product.id}`}>
          <div className="flex items-center gap-2 text-xs lg:text-base">
            <Image
              src={product.mainImg}
              alt="product"
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
            {product.name}
          </div>
        </Link>
      </td>
      <td className="p-2 text-xs lg:text-base">{price}</td>
      <td className="p-2 text-xs lg:text-base">13.01.2022</td>
      <td className="p-2 text-xs lg:text-base">
        {product.variants.reduce((total, variant) => total + variant.stock, 0)}
      </td>
      <td className="p-2">
        <div className="flex gap-2">
          <Link href={`/dashboard/products/${product.id}`}>
            <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[teal] text-xs lg:text-base">
              View
            </button>
          </Link>
          <button
            className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[crimson] text-xs lg:text-base"
            onClick={async () => {
              await deleteProduct(product.id);
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};
