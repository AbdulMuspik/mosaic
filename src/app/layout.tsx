import type { Metadata } from "next";
import { Geist, Geist_Mono, Irish_Grover } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import { NavbarSection } from "@/features/landing/components/navbar-section";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const irishGrover = Irish_Grover({
  weight: "400",
  variable: "--font-irish-grover",
  subsets: ["latin"],
});

const thailandesa = localFont({
  src: "../fonts/Thailandesa.ttf",
  variable: "--font-thailandesa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mosaic | 2026",
  description: "Mosaic is a cultural fest by IILM University Greater Noida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${irishGrover.variable} ${thailandesa.variable} antialiased`}
      >
        <Providers>
          <NavbarSection />
          {children}
        </Providers>
      </body>
    </html>
  );
}
