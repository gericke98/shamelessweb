import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mongoose from "mongoose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const connectToDB = async () => {
  const connection = {};
  try {
    const db = await mongoose.connect(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@shameless.sgfrhgy.mongodb.net/dashboard?retryWrites=true&w=majority&appName=Shameless`,
      {
        autoIndex: false,
      }
    );
    console.log(db.connection[0].readyState);
    connection.isConnected = db.connection?[0].readyState;
  } catch (e) {
    console.error(e);
  }
};
