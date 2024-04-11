import Banner from "@/components/banner";
import { categories, products } from "@/placeholder";
import Image from "next/image";
import { Card } from "./card";

export default function Home() {
  return (
    <main className="flex flex-col justify-between w-[100%]">
      <Banner text="PENINSULAR FREE SHIPPING" variant="dark" />
      <div className="h-screen w-full relative">
        <Image
          src="/heropc.jpg"
          alt="Hero"
          fill
          objectFit="cover"
          objectPosition="10% 12%"
          quality={100}
        />
      </div>
      <Banner text="LIVE WITHOUT SHAME WEAR WITHOUT FEAR" variant="white" />
      <div className="mx-auto px-4 w-full flex flex-col">
        {categories.map((category, idx) => {
          //Extraer los productos que tienen la categoria específica
          const productsFiltered = products.filter((product) =>
            category.products.includes(product.id)
          );
          if (productsFiltered.length > 0) {
            return (
              <div
                key={idx}
                className="flex flex-col w-full m-2 p-10 items-center justify-center"
              >
                <h2 className="font-bold text-center mb-10 text-2xl">
                  {category.name.toUpperCase()}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
                  {productsFiltered.map((product, idx) => (
                    <Card key={idx} product={product} />
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </main>
  );
}
