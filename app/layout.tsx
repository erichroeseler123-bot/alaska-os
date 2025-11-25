import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // <--- 1. Import Script component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Update Metadata for your site identity
export const metadata: Metadata = {
  title: "Alaska OS",
  description: "Live Port Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* 3. Inject FareHarbor API Global Script */}
        <Script src="https://fareharbor.com/embeds/api/v1/" strategy="lazyOnload" />
      </body>
    </html>
  );
}