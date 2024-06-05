import { editProduct } from "@/actions/product";
import DashboardInput from "@/components/dashboard/input/dashboardInput";
import Image from "next/image";
import { ImageGrid } from "./imageGrid";
import { ProductType } from "@/types";

type Props = {
  product: ProductType;
};

export const ClientPage = ({ product }: Props) => {
  return (
    <div className="flex flex-col gap-20 mt-5 h-full">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="basis-1/4">
          <div className="lg:w-full lg:h-[400px] hidden  lg:block relative rounded-sm overflow-hidden bg-[var(--primary-soft-color)] mb-5">
            <Image src={product.mainImg} alt={product.name} fill sizes="75vw" />
          </div>
          {product.name}
        </div>
        <div className="basis-3/4 bg-[var(--primary-soft-color)] p-5 rounded-sm font-bold text-white">
          <form className="flex flex-col gap-2" action={editProduct}>
            <input className="hidden" name={"id"} value={product.id} readOnly />
            <label className="text-lg">Title</label>
            <DashboardInput
              name={"name"}
              placeholder={product.name}
              type="text"
              valueini={product.name}
            />
            <label className="text-lg">Description</label>
            <DashboardInput
              name={"description"}
              placeholder={product.description}
              type="textarea"
              valueini={product.description}
            />
            <label className="text-lg">Price</label>
            <DashboardInput
              name={"price"}
              placeholder={product.price.toString()}
              type="number"
              valueini={product.price.toString()}
            />
            <label className="text-lg">Size</label>
            {product.variants.map((variant) => (
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
            {product.images && <ImageGrid product={product} />}
            <button className="w-full p-5 bg-[teal] border-none text-white rounded-sm cursor-pointer mt-4">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
