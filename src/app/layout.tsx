import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";
import PageTransition from "@/components/PageTransition";
import ParticleBackground from "@/components/ParticleBackground";
import CopyProtection from "@/components/CopyProtection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Drill Pedia — The Drill Music Encyclopedia",
    template: "%s — Drill Pedia",
  },
  description:
    "A comprehensive documentation and research hub for Drill music culture across the United States and beyond.",
  icons: "/logo.jpg",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ParticleBackground />
        <Provider>
          <CopyProtection />
          <Navbar />
          <main className="flex-1 relative z-10 min-w-0">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
