"use client";
import { addProduct } from "@/actions/product";
import DashboardInput from "@/components/dashboard/input/dashboardInput";
import React, { useState } from "react";
import { ImageGridAdd } from "./imageGridadd";

const variants = [
  {
    name: "SMALL",
    stock: 0,
  },
  {
    name: "MEDIUM",
    stock: 0,
  },
  {
    name: "LARGE",
    stock: 0,
  },
  {
    name: "X-LARGE",
    stock: 0,
  },
];

const AddProductPage = () => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const addproductparam = {
    images: previewImages,
  };
  const addProductOrder = addProduct.bind(null, addproductparam);
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
  return (
    <div className="bg-[var(--primary-soft-color)] p-5 rounded-sm mt-5">
      <form
        action={addProductOrder}
        className="flex flex-wrap justify-between gap-2"
      >
        <label className="text-lg">Name</label>
        <DashboardInput
          name={"name"}
          placeholder={"Name"}
          type="text"
          valueini={""}
        />
        <label className="text-lg">Description</label>
        <DashboardInput
          name={"description"}
          placeholder={"Insert description here"}
          type="textarea"
          valueini={""}
        />
        <label className="text-lg">Media</label>
        <ImageGridAdd
          previewImages={previewImages}
          handleFileChange={handleFileChange}
          handleRemovePreviewImage={handleRemovePreviewImage}
        />
        <label className="text-lg">Price</label>
        <DashboardInput
          name={"price"}
          placeholder={"35"}
          type="number"
          valueini={""}
        />
        <label className="text-lg">Size</label>
        {variants.map((variant) => (
          <div key={variant.name} className="w-full flex flex-row">
            <div className="w-1/2">
              <DashboardInput
                name={`variant-${variant.name}`}
                placeholder={variant.name}
                type="text"
                valueini={variant.name}
              />
            </div>
            <div className="w-1/2">
              <DashboardInput
                name={`stock-${variant.name}`}
                placeholder={variant.stock.toString()}
                type="number"
                valueini={variant.stock.toString()}
              />
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="w-full p-5 bg-[teal] cursor-pointer border-none rounded-sm mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
