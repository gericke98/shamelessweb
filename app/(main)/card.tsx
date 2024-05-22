"use client";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { products } from "@/db/schema";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

type Props = {
  product: typeof products.$inferSelect;
};

export const Card = ({ product }: Props) => {
  return (
    <div className="lg:h-[75vh] h-[50vh] mb-5 relative cursor-pointer">
      <MotionConfig transition={{ duration: 1 }}>
        <motion.div
          className="relative h-5/6 w-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0">
            <Carousel className="w-full h-full">
              <Link key={product.id} href={`/product/${product.id}`}>
                <CarouselContent>
                  <CarouselItem>
                    <div className="relative w-full h-full lg:min-h-[62vh] min-h-[41vh]">
                      <Image
                        src={product.frontImageSrc}
                        alt={product.name}
                        fill
                        className="overflow-hidden object-cover object-center"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="relative w-full h-full lg:min-h-[62vh] min-h-[41vh]">
                      <Image
                        src={product.backImageSrc}
                        alt={product.name}
                        fill
                        className="overflow-hidden object-cover object-center"
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Link>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="absolute top-0 left-0 bg-white z-200 w-20 lg:w-24 h-5 lg:h-7 flex items-center justify-center lg:ml-4 ml-2 lg:mt-3 mt-2">
            <h5 className="lg:text-xs text-xxs">{product.tag}</h5>
          </div>
        </motion.div>
      </MotionConfig>
      <div className="h-1/6 mt-2">
        <h3 className="text-left mt-2 text-xs lg:text-md font-medium">
          {product.name}
        </h3>
        <h3 className="text-left mt-0.5 text-xs lg:text-md">
          €{product.price}
        </h3>
      </div>
    </div>
  );
};
