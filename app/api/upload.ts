import type { NextApiRequest, NextApiResponse } from "next";
import formidable, {
  Fields,
  Files,
  File as FormidableFile,
  IncomingForm,
} from "formidable";
import fs from "fs";
import path from "path";

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to parse FormData
const parseForm = (
  req: NextApiRequest
): Promise<{ fields: Fields; files: Files }> => {
  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), "/public/uploads"),
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { files } = await parseForm(req);

      // Handle file array or undefined case
      const fileArray = files.file as FormidableFile[] | FormidableFile;
      const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const data = fs.readFileSync(file.filepath); // `filepath` is the correct property for the file path
      const filePath = path.join(
        process.cwd(),
        "/public/uploads",
        file.originalFilename as string
      );

      fs.writeFileSync(filePath, data);

      res
        .status(200)
        .json({
          message: "File uploaded successfully",
          filePath: `/uploads/${file.originalFilename}`,
        });
    } catch (error) {
      res.status(500).json({ error: "File upload failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
