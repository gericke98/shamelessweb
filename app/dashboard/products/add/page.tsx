"use client";
import { addProduct } from "@/actions/product";
import DashboardInput from "@/components/dashboard/input/dashboardInput";
import React, { useState } from "react";
import { ImageGridAdd } from "./imageGridAdd";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

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
  const addproductparam = {
    images: previewImages,
  };
  const addProductOrder = addProduct.bind(null, addproductparam);
  // Configuracion S3
  const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
    },
  });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Check del input
    event.preventDefault();
    if (!event.target.files) return;

    // Creo un array con todos los files
    const files = Array.from(event.target.files || []);

    // Recorro cada file para crear objeto en bucket S3
    files.forEach(async (file) => {
      // Creo el nombre del fichero que se va a guardar en s3
      const ext = file?.name.split(".").at(-1);
      const uid = uuidv4().replace(/-/g, "");
      const fileName = `${uid}${ext ? "." + ext : ""}`;

      try {
        // Añado el objeto a S3
        const uploadToS3 = new PutObjectCommand({
          Bucket,
          Key: fileName,
          Body: file,
        });
        await s3.send(uploadToS3);
        // En caso de exitoso guardo la url
        const newfileName = `https://${
          process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
        }.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${uid}${
          ext ? "." + ext : ""
        }`;
        setPreviewImages([...previewImages, newfileName]);
      } catch (error) {
        console.error(error);
      }
    });
  };
  const handleRemovePreviewImage = async (index: number) => {
    const filename = previewImages.filter((_, i) => i === index)[0];
    const newpreview = previewImages.filter((_, i) => i !== index);
    try {
      // Añado el objeto a S3
      const uploadToS3 = new DeleteObjectCommand({
        Bucket,
        Key: filename,
      });
      await s3.send(uploadToS3);
      // En caso de exitoso guardo la url
      setPreviewImages(newpreview);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-[var(--primary-soft-color)] p-5 rounded-sm mt-5">
      <form
        action={addProductOrder}
        className="flex flex-wrap justify-between gap-2"
      >
        <label className="lg:text-lg text-base">Name</label>
        <DashboardInput
          name={"name"}
          placeholder={"Name"}
          type="text"
          valueini={""}
        />
        <label className="lg:text-lg text-base">Description</label>
        <DashboardInput
          name={"description"}
          placeholder={"Insert description here"}
          type="textarea"
          valueini={""}
        />
        <label className="lg:text-lg text-base">Media</label>
        <ImageGridAdd
          previewImages={previewImages}
          handleFileChange={handleFileChange}
          handleRemovePreviewImage={handleRemovePreviewImage}
        />
        <label className="lg:text-lg text-base">Price</label>
        <DashboardInput
          name={"price"}
          placeholder={"35"}
          type="number"
          valueini={""}
        />
        <label className="lg:text-lg text-base">Size</label>
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
          className="w-full p-5 bg-[teal] cursor-pointer border-none rounded-sm mt-4 mb-20 lg:mb-0"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
