import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aswith Portfolio | Ranga Naga Aswith",
  description: "Official Engineering Portfolio of Ranga Naga Aswith — Software & AI Automation Developer, Embedded Systems & IoT Enthusiast.",
  keywords: [
    "Ranga Naga Aswith",
    "Aswith Portfolio",
    "Software Engineer",
    "AI Automation",
    "Python Developer",
    "Embedded Systems",
    "IoT Telematics",
    "ECE",
  ],
  authors: [{ name: "Ranga Naga Aswith" }],
  openGraph: {
    title: "Aswith Portfolio | Ranga Naga Aswith",
    description: "Official Engineering Portfolio of Ranga Naga Aswith — Software & AI Automation Developer, Embedded Systems & IoT Enthusiast.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="bg-black text-white selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden relative w-full min-h-full">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
