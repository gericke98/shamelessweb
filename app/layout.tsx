import type { Metadata } from "next";
import "./globals.css";
import { Eczar } from "next/font/google";

const eczar = Eczar({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shameless Collective - Live without shame",
  description: "Streetwear clothing brand",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={eczar.className}>{children}</body>
    </html>
  );
}
