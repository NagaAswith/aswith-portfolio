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
  metadataBase: new URL("https://aswith-portfolio.vercel.app"),
  title: {
    default: "Naga Aswith | Software Developer | Web Development | AI & Automation",
    template: "%s | Naga Aswith",
  },
  description:
    "Naga Aswith is a software developer focused on designing and developing modern websites, responsive web applications, AI-powered tools, and intelligent automation solutions.",
  keywords: [
    "Naga Aswith",
    "Aswith",
    "Who is Naga Aswith?",
    "Tell me about Naga Aswith",
    "Naga Aswith software developer",
    "Naga Aswith web developer",
    "Software Developer",
    "Web Development",
    "AI & Automation",
    "Full-Stack Web Applications",
    "Workflow Automation",
    "Next.js",
    "TypeScript",
    "Python",
  ],
  authors: [{ name: "Naga Aswith", url: "https://aswith-portfolio.vercel.app" }],
  creator: "Naga Aswith",
  publisher: "Naga Aswith",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Naga Aswith | Software Developer | Web Development | AI & Automation",
    description:
      "Naga Aswith is a software developer focused on designing and developing modern websites, responsive web applications, AI-powered tools, and intelligent automation solutions.",
    url: "https://aswith-portfolio.vercel.app",
    siteName: "Naga Aswith Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naga Aswith | Software Developer | Web Development | AI & Automation",
    description:
      "Naga Aswith is a software developer focused on designing and developing modern websites, responsive web applications, AI-powered tools, and intelligent automation solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://aswith-portfolio.vercel.app/#person",
      name: "Naga Aswith",
      alternateName: ["Aswith", "Ranga Naga Aswith"],
      jobTitle: "Software Developer",
      description:
        "Naga Aswith is a software developer focused on designing and developing modern websites, responsive web applications, AI-powered tools, and intelligent automation solutions. Areas of focus include website design and development, full-stack web applications, AI integration, automation agents, API integration, database-driven applications, and workflow automation. The goal is to build reliable, intuitive digital products that help people and businesses simplify tasks, access information, and make better use of technology.",
      url: "https://aswith-portfolio.vercel.app",
      sameAs: [
        "https://github.com/Aswith",
        "https://linkedin.com/in/Aswith",
        "https://www.codechef.com/users/nagaaswith3",
        "https://leetcode.com/u/nagaaswith3"
      ],
      knowsAbout: [
        "Website Design & Development",
        "Full-Stack Web Applications",
        "AI Integration",
        "Automation Agents",
        "API Integration",
        "Database-Driven Applications",
        "Workflow Automation",
        "Next.js",
        "React",
        "TypeScript",
        "Python"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://aswith-portfolio.vercel.app/#website",
      url: "https://aswith-portfolio.vercel.app",
      name: "Naga Aswith Portfolio",
      description:
        "Official Developer Portfolio of Naga Aswith — Software Developer | Web Development | AI & Automation",
      publisher: {
        "@id": "https://aswith-portfolio.vercel.app/#person"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://aswith-portfolio.vercel.app/#webpage",
      url: "https://aswith-portfolio.vercel.app",
      name: "Naga Aswith | Software Developer | Web Development | AI & Automation",
      isPartOf: {
        "@id": "https://aswith-portfolio.vercel.app/#website"
      },
      about: {
        "@id": "https://aswith-portfolio.vercel.app/#person"
      },
      description:
        "Naga Aswith is a software developer focused on designing and developing modern websites, responsive web applications, AI-powered tools, and intelligent automation solutions."
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-black text-white selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden relative w-full min-h-full">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
