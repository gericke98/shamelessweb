"use client";
import { editProduct } from "@/actions/product";
import DashboardInput from "@/components/dashboard/input/dashboardInput";
import Image from "next/image";
import { ImageGrid } from "./imageGrid";
import { ProductType } from "@/types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

type Props = {
  product: ProductType;
};

export const ClientPage = ({ product }: Props) => {
  const [imageGrid, setImageGrid] = useState(product.images);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  // Configuracion S3
  const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
    },
  });
  const editproductparam = {
    images: imageGrid,
    previewImages: previewImages,
  };
  const updateProductOrder = editProduct.bind(null, editproductparam);
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
  const handleRemoveImage = async (index: number) => {
    const filename = imageGrid.filter((_, i) => i === index)[0];
    console.log(filename.path);
    const newpreview = imageGrid.filter((_, i) => i !== index);
    if (filename) {
      try {
        // Añado el objeto a S3
        const uploadToS3 = new DeleteObjectCommand({
          Bucket,
          Key: filename.path?.toString(),
        });
        await s3.send(uploadToS3);
        // En caso de exitoso guardo la url
        setImageGrid(newpreview);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="flex flex-col gap-20 mt-5 h-full">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="basis-1/4">
          <div className="lg:w-auto lg:h-[550px] hidden  lg:block relative rounded-sm overflow-hidden bg-[var(--primary-soft-color)] mb-5">
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
