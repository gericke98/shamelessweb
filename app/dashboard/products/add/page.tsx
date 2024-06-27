import { getCollections } from "@/db/queries";
import AddProductPageClient from "./pageAdd";

const AddProductPage = async () => {
  const collections = await getCollections();
  return <AddProductPageClient collections={collections} />;
};

export default AddProductPage;
