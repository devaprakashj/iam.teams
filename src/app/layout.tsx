import type { Metadata } from "next";
import { Inter, Syne, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "iamfolio | Your career. Your identity. Your story.",
  description: "Build your AI-powered career profile and export professional ATS-ready resumes. Share your identity at iamfolio.in/username.",
  metadataBase: new URL("https://iamfolio.in"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${syne.variable} ${spaceMono.variable} font-inter antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
