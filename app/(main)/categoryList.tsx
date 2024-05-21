import { Card } from "./card";
import { getCollections } from "@/db/queries";

export const CategoryList = async () => {
  // Extraigo las colecciones
  const collectionsfromDb = getCollections();
  const [collectionsDb] = await Promise.all([collectionsfromDb]);

  return (
    <div className="w-full flex flex-col ">
      {collectionsDb.map((category, idx) => {
        if (category.products.length > 0) {
          return (
            <div
              key={idx}
              className="flex flex-col w-full items-center justify-center lg:mt-8 mt-3"
            >
              <h2 className="font-bold text-center mb-10 text-2xl">
                {category.name.toUpperCase()}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full lg:p-6 p-2">
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
