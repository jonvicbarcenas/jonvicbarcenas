import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jon Vic Barcenas | Linux Desktop Portfolio",
  description:
    "An interactive Linux desktop portfolio for Jon Vic T. Barcenas, a BSIT student and junior developer building with React, TypeScript, Java, Kotlin, Python, and AI-assisted workflows.",
  authors: [{ name: "Jon Vic Barcenas" }],
  openGraph: {
    title: "Jon Vic Barcenas | Linux Desktop Portfolio",
    description: "Projects, stack, and contact details for Jon Vic T. Barcenas.",
    url: "https://github.com/jonvicbarcenas",
    siteName: "Portfolio.sh",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
