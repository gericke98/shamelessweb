import { categories, products } from "@/placeholder";
import { Card } from "./card";
import { getCollections } from "@/db/queries";

export const CategoryList = async () => {
  // Extraigo los productos
  // const productsfromDb = getProducts();
  const collectionsfromDb = getCollections();
  const [collectionsDb] = await Promise.all([collectionsfromDb]);

  return (
    <div className="mx-auto px-4 w-full flex flex-col">
      {collectionsDb.map((category, idx) => {
        if (category.products.length > 0) {
          return (
            <div
              key={idx}
              className="flex flex-col w-full m-2 lg:p-10 p-4 items-center justify-center"
            >
              <h2 className="font-bold text-center mb-10 text-2xl">
                {category.name.toUpperCase()}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full ">
                {category.products.map((product, idx) => (
                  <Card key={idx} product={product} />
                ))}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
