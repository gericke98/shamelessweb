"use client";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import { products } from "@/db/schema";

type Props = {
  product: typeof products.$inferSelect;
};

export const Card = ({ product }: Props) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="w-full h-full mb-5 relative overflow-hidden cursor-pointer">
        <MotionConfig transition={{ duration: 1 }}>
          <motion.div
            className="relative lg:h-[65vh] h-[40vh] w-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 transition-opacity duration-500 hover:opacity-0 opacity-100">
              <Image
                src={product.frontImageSrc}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="33vw"
              />
              <div className="absolute top-0 left-0 bg-white z-200 w-22 h-7 flex items-center justify-center ml-4 mt-3">
                <h5 className="text-xs">{product.tag}</h5>
              </div>
            </div>
            <div className="absolute inset-0 transition-opacity duration-500 hover:opacity-100 opacity-0">
              <Image
                src={product.backImageSrc}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="33vw"
              />
            </div>
            <div className="absolute top-0 left-0 bg-white z-200 w-24 h-7 flex items-center justify-center ml-4 mt-3">
              <h5 className="text-xs">{product.tag}</h5>
            </div>
          </motion.div>
        </MotionConfig>
        <h3 className="text-left mt-2 text-sm lg:text-md">{product.name}</h3>
        <h3 className="text-left mt-0.5 text-sm lg:text-md">
          {product.price}.00 €
        </h3>
      </div>
    </Link>
  );
};
