"use client";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  collectionId: string[];
  frontImageSrc: string;
  backImageSrc: string;
};

type Props = {
  product: Product;
};

export const Card = ({ product }: Props) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="w-full h-full mb-5 relative overflow-hidden cursor-pointer">
        <MotionConfig transition={{ duration: 1 }}>
          <motion.div
            className="relative w-full h-[80vh]"
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
              />
            </div>
            <div className="absolute inset-0 transition-opacity duration-500 hover:opacity-100 opacity-0">
              <Image
                src={product.backImageSrc}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </motion.div>
        </MotionConfig>
        <h3 className="text-left mt-2 text-m">{product.name}</h3>
        <h3 className="text-left mt-0.5 text-m">{product.price}.00 €</h3>
      </div>
    </Link>
  );
};
