import { getProduct } from "@/db/queries";
import React from "react";
import { ClientPage } from "./pageClient";

type Props = {
  params: {
    id: string;
  };
};

const SingleProductPage = async ({ params }: Props) => {
  const product = await getProduct(params.id);
  return <ClientPage product={product[0]} />;
};

export default SingleProductPage;
