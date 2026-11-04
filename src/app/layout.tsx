// src/app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/**
 * ROOT LAYOUT (Kök Düzen)
 * ------------------------------------------------
 * MİMARİ KURAL: Bu dosya YALNIZCA <html> ve <body> iskeletini döndürür.
 * - notFound() KESİNLİKLE kullanılamaz (Next.js root layout'ta yasaklar).
 * - Locale doğrulama, redirect veya koşullu mantık BARINDIRMAZ.
 * - Tüm i18n mantığı src/app/[locale]/layout.tsx seviyesindedir.
 */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * VIEWPORT CONFIGURATION (Next.js 15+)
 * ------------------------------------------------
 * - width=device-width: Mobil uyumluluk
 * - initial-scale=1: Zoom engelleme
 * - theme-color: Mobil adres çubuğu rengi
 * - color-scheme: Native UI dark mode
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0a0f1e",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://endijital.com"),
  title: {
    default: "Endijital | Geleceğin Web Mimarisi",
    template: "%s",
  },
  description:
    "Next.js 15, Cloudflare Edge ve modern web teknolojileri ile yüksek performanslı dijital ürünler.",
  applicationName: "Endijital",
  authors: [{ name: "Endijital", url: "https://endijital.com" }],
  creator: "Endijital",
  publisher: "Endijital",
  keywords: [
    "Next.js 15",
    "Cloudflare Edge",
    "web geliştirme",
    "e-ticaret",
    "SEO optimizasyonu",
    "web development",
  ],
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

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}