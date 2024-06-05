"use client";
import { ProductType } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
type Props = {
  product: ProductType;
};

export const ImageGrid = ({ product }: Props) => {
  const [imageGrid, setImageGrid] = useState(product.images);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
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
    <div className="grid lg:grid-cols-3 grid-cols-2 gap-3 py-3 px-5 h-full">
      {imageGrid.map((image, index) => (
        <div key={image.id} className="relative w-full h-0 pb-[100%]">
          <Image
            src={image.path || product.mainImg}
            alt={image.id.toString() || product.name}
            fill
            sizes="33vw"
            className="object-cover rounded-sm cursor-pointer"
          />
          <button
            type="button"
            className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1"
            onClick={() => handleRemoveImage(index)}
          >
            <FaTimes />
          </button>
        </div>
      ))}
      {previewImages.map((preview, index) => (
        <div key={index} className="relative w-full h-0 pb-[100%]">
          <Image
            src={preview}
            alt={`Preview ${index}`}
            fill
            sizes="33vw"
            className="object-cover rounded-sm cursor-pointer"
          />
          <button
            type="button"
            className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1"
            onClick={() => handleRemovePreviewImage(index)}
          >
            <FaTimes />
          </button>
        </div>
      ))}
      <div className="relative w-full h-0 pb-[100%] border-dashed border flex items-center justify-center">
        <input
          type="file"
          accept="image/*"
          name="main_image"
          className="absolute inset-0 w-full h-full cursor-pointer z-10 opacity-0"
          onChange={handleFileChange}
        />
        <p className="absolute inset-0 flex items-center justify-center text-center text-gray-500">
          Click to upload image
        </p>
      </div>
    </div>
  );
};
