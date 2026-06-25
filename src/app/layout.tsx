import type { Metadata } from "next";
import { Outfit, Share_Tech_Mono, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apex Tool Design | Precision Mould & Product Engineering",
  description:
    "Premium CAD & product design portfolio of Ditty Thomas, specializing in high-tolerance injection moulds, runner optimization, and cooling layouts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${shareTechMono.variable} ${lora.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-industrial-950 font-sans selection:bg-primary/10 selection:text-primary">
        {/* Security Watermark Overlay */}
        <div className="watermark-overlay" />

        {/* Global Navigation Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-grow w-full relative">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
