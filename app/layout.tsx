import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const makerSans = Inter({
  variable: "--font-maker-sans",
  subsets: ["latin"],
});

const makerMono = Source_Code_Pro({
  variable: "--font-maker-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MakerDAO Frontend",
  description: "A MakerDAO-specific front-end built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        将我们在上面定义的 makerSans.variable、makerMono.variable 
        注入到 body 的 className 中
      */}
      <body className={`${makerSans.variable} ${makerMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
