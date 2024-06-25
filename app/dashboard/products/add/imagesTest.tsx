"use client";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Fragment, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ImageTest = () => {
  const [file, setFile] = useState<File | null>(null);
  const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
    },
  });
  const handleUploadLocalFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };
  const handleUploadS3 = async (e: any) => {
    if (!file) return;
    e.preventDefault();
    const ext = file?.name.split(".").at(-1);
    const uid = uuidv4().replace(/-/g, "");
    const fileName = `${uid}${ext ? "." + ext : ""}`;
    console.log("Entro");

    try {
      const uploadToS3 = new PutObjectCommand({
        Bucket,
        Key: fileName,
        Body: file,
      });
      await s3.send(uploadToS3);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Fragment>
      <div className="w-full h-full">
        <div>
          <div>
            <div>
              <input type="file" accept=".png, .jpg, .jpeg" />
            </div>
          </div>
          <div>
            <button>S3 Upload</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ImageTest;
