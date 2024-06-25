"use client";
import Image from "next/image";

import { FaTimes } from "react-icons/fa";
type Props = {
  previewImages: string[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemovePreviewImage: (index: number) => void;
};

export const ImageGridAdd = ({
  previewImages,
  handleFileChange,
  handleRemovePreviewImage,
}: Props) => {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-2 gap-x-3 gap-y-2 py-3 px-5 h-full align-top w-full">
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
