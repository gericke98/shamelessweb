"use client";
import { ProductType } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: ProductType;
};

export const ProductRow = ({ product }: Props) => {
  const price = Math.round(product.price * 100) / 100;
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    console.log(`Elimino producto ${product.id}`);
    // try {
    //   await deleteProduct(product.id);
    // } catch (e) {
    //   console.log("Something went wrong");
    // }
  };
  return (
    <tr>
      <td className="p-2">
        <Link href={`/dashboard/products/${product.id}`}>
          <div className="flex items-center gap-2">
            <Image
              src={product.frontImageSrc}
              alt="product"
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
            {product.name}
          </div>
        </Link>
      </td>
      <td className="p-2">{price}</td>
      <td className="p-2">13.01.2022</td>
      <td className="p-2">
        {product.variants.reduce((total, variant) => total + variant.stock, 0)}
      </td>
      <td className="p-2">
        <div className="flex gap-2">
          <Link href={`/dashboard/products/${product.id}`}>
            <button className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[teal]">
              View
            </button>
          </Link>
          <button
            className="py-1 px-2 rounded-sm text-white cursor-pointer bg-[crimson]"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};
