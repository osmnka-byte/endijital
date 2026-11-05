// src/app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://endijital.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0a0f1e",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Endijital | Geleceğin Web Mimarisi & Dijital Çözümler",
  description:
    "Next.js, Cloudflare Edge ve modern web teknolojileri ile yüksek performanslı dijital ürünler. Web geliştirme, e-ticaret ve SEO optimizasyonu hizmetleri.",
  applicationName: "Endijital",
  authors: [{ name: "Endijital", url: BASE_URL }],
  creator: "Endijital",
  publisher: "Endijital",
  keywords: [
    "Next.js",
    "Cloudflare Edge",
    "web geliştirme",
    "e-ticaret",
    "SEO optimizasyonu",
    "web development",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: "Endijital",
    images: [
      {
        url: `${BASE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Endijital Dijital Çözümler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@endijital",
    images: [`${BASE_URL}/twitter-image.png`],
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    publisher: "Endijital",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}