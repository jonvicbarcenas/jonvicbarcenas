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
  title: "Jon Vic Barcenas | Portfolio.sh",
  description:
    "A terminal-inspired portfolio for Jon Vic T. Barcenas, a BSIT student and junior developer focused on React, TypeScript, Java, Kotlin, Python/Django, AI-assisted workflows, and automation.",
  authors: [{ name: "Jon Vic Barcenas" }],
  openGraph: {
    title: "Jon Vic Barcenas | Portfolio.sh",
    description:
      "Projects, stack, and contact details for Jon Vic T. Barcenas.",
    url: "https://github.com/jonvicbarcenas",
    siteName: "Portfolio.sh",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
