import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import LayoutComponent from "@/components/constants/LayoutComponent";

const lexend = Lexend({
  weight: ["300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Weekday",
  description: "Weekday assignment by @vedprakash",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <LayoutComponent>{children}</LayoutComponent>
      </body>
    </html>
  );
}
