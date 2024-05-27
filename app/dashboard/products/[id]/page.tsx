import { editProduct } from "@/actions/product";
import DashboardInput from "@/components/dashboard/input/dashboardInput";
import { getProduct } from "@/db/queries";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const SingleProductPage = async ({ params }: Props) => {
  const product = await getProduct(params.id);

  return (
    <div className="flex gap-20 mt-5 ">
      <div className="basis-1/4">
        <div className="w-full h-[450px] relative rounded-sm overflow-hidden bg-[var(--primary-soft-color)] mb-5">
          <Image src={product[0].mainImg} alt={product[0].name} fill />
        </div>
        {product[0].name}
      </div>
      <div className="basis-3/4 bg-[var(--primary-soft-color)] p-5 rounded-sm font-bold text-white">
        <form className="flex flex-col gap-2" action={editProduct}>
          <input className="hidden" name={"id"} value={product[0].id} />
          <label className="text-lg">Title</label>
          <DashboardInput
            name={"name"}
            placeholder={product[0].name}
            type="text"
            valueini={product[0].name}
          />
          <label className="text-lg">Description</label>
          <DashboardInput
            name={"description"}
            placeholder={product[0].description}
            type="textarea"
            valueini={product[0].description}
          />
          <label className="text-lg">Price</label>
          <DashboardInput
            name={"price"}
            placeholder={product[0].price.toString()}
            type="number"
            valueini={product[0].price.toString()}
          />
          <label className="text-lg">Size</label>
          {product[0].variants.map((variant) => (
            <div key={variant.id} className="w-full flex flex-row">
              <div className="w-1/2">
                <DashboardInput
                  name={`variant-${variant.id}`}
                  placeholder={variant.name}
                  type="text"
                  valueini={variant.name}
                />
              </div>
              <div className="w-1/2">
                <DashboardInput
                  name={`stock-${variant.id}`}
                  placeholder={variant.stock.toString()}
                  type="number"
                  valueini={variant.stock.toString()}
                />
              </div>
            </div>
          ))}
          <label className="text-lg">Media</label>
          <input type="file" accept="image/*" name="main_image" />
          <button className="w-full p-5 bg-[teal] border-none text-white rounded-sm cursor-pointer mt-4">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
