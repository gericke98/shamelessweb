import { getProducts } from "@/db/queries";
import React from "react";
import { PageClient } from "./pageClient";

const ProductsPage = async () => {
  const products = await getProducts();
  return <PageClient products={products} />;
};

export default ProductsPage;
