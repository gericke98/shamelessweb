"use client";
import { addProduct } from "@/actions/product";
import DashboardInput from "@/components/dashboard/input/dashboardInput";
import React, { useState } from "react";
import { ImageGridAdd } from "./imageGridAdd";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import ImageTest from "./imagesTest";

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
  const [file, setFile] = useState<File | null>(null);
  const previewImages = [""];
  const handleRemovePreviewImage = () => {};
  // const addproductparam = {
  //   images: previewImages,
  // };
  // const addProductOrder = addProduct.bind(null, addproductparam);
  const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });
  console.log(s3);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (!event.target.files) return;
    setFile(event.target.files[0]);

    // setPreviewImages((prev) => [...prev, ...newPreviews]);
    // setSelectedFiles((prev) => [...prev, ...newFiles]);
  };
  const handleUploadS3 = async (e: any) => {
    if (!file) return;
    e.preventDefault();
    console.log(file);
    const ext = file?.name.split(".").at(-1);
    const uid = uuidv4().replace(/-/g, "");
    const fileName = `${uid}${ext ? "." + ext : ""}`;
    console.log(fileName);
    try {
      const uploadToS3 = new PutObjectCommand({
        Bucket: Bucket,
        Key: fileName,
        Body: file,
      });
      await s3.send(uploadToS3);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-[var(--primary-soft-color)] p-5 rounded-sm mt-5">
      <form action={""} className="flex flex-wrap justify-between gap-2">
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
        {/* <ImageGridAdd
          previewImages={previewImages}
          handleFileChange={handleFileChange}
          handleRemovePreviewImage={handleRemovePreviewImage}
        /> */}
        <ImageTest />
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
          onClick={handleUploadS3}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
