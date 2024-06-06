"use client";
import { addProduct } from "@/actions/product";
import DashboardInput from "@/components/dashboard/input/dashboardInput";
import React, { useState } from "react";
import { ImageGridAdd } from "./imageGridAdd";

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
  const resizeImage = (file: File) => {
    return new Promise<File>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const resizedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });
                resolve(resizedFile);
              }
            },
            file.type,
            0.8
          );
        };
      };
      reader.readAsDataURL(file);
    });
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    const newPreviews: string[] = [];
    const newFiles: File[] = [];

    for (const file of files) {
      const resizedFile = await resizeImage(file);
      newFiles.push(resizedFile);
      newPreviews.push(URL.createObjectURL(resizedFile));
    }

    setPreviewImages((prev) => [...prev, ...newPreviews]);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
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
