import { getProduct } from "@/db/queries";
import { ProductClientPage } from "./productClient";

type Props = {
  params: {
    id: string;
  };
};

const ProductPage = async ({ params }: Props) => {
  const product = await getProduct(params.id);
  return <ProductClientPage product={product[0]} />;
};

export default ProductPage;
