"use client";
import { editProduct } from "@/actions/product";
import DashboardInput from "@/components/dashboard/input/dashboardInput";
import Image from "next/image";
import { ImageGrid } from "./imageGrid";
import { ProductType } from "@/types";
import { useState } from "react";

type Props = {
  product: ProductType;
};

export const ClientPage = ({ product }: Props) => {
  const [imageGrid, setImageGrid] = useState(product.images);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const editproductparam = {
    images: imageGrid,
    previewImages: previewImages,
  };
  const updateProductOrder = editProduct.bind(null, editproductparam);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newPreviews: string[] = [];
    const newFiles: File[] = [];

    files.forEach((file) => {
      newFiles.push(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);

        // Only update the state after all files have been read
        if (newPreviews.length === files.length) {
          setPreviewImages((prev) => [...prev, ...newPreviews]);
          setSelectedFiles((prev) => [...prev, ...newFiles]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleRemovePreviewImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };
  const handleRemoveImage = (index: number) => {
    setImageGrid((prev) => prev.filter((_, i) => i !== index));
  };
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
          <form className="flex flex-col gap-2" action={updateProductOrder}>
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
            {product.images && (
              <ImageGrid
                imageGrid={imageGrid}
                previewImages={previewImages}
                handleFileChange={handleFileChange}
                handleRemovePreviewImage={handleRemovePreviewImage}
                handleRemoveImage={handleRemoveImage}
              />
            )}
            <button className="w-full p-5 bg-[teal] border-none text-white rounded-sm cursor-pointer mt-4">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
