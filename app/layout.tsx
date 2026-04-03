import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GeBeCert | Blockchain Anti-Counterfeiting Technology",
  description: "GeBeCert — Protect your products with military-grade blockchain and microchip technology. End counterfeiting forever.",
  keywords: "anti-counterfeiting, blockchain, microchip, product authentication, supply chain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
