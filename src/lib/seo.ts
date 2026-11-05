// src/lib/seo.ts
import { Metadata } from "next";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  locale?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://endijital.com";

/**
 * Dinamik SEO Metadata Generator
 * ------------------------------------------------
 * - Trailing slash ve çift slash hataları otomatik temizlenir.
 * - Google uyumlu x-default hreflang etiketini içerir.
 * - Harici (CDN) ve yerel görsel URL'lerini sorunsuz işler.
 */
export function generateSeo({
  title,
  description,
  path = "",
  image = "/opengraph-image.png",
  locale = "tr",
}: SeoProps): Metadata {
  // Baştaki ve sondaki tüm slash karakterlerini temizle
  const cleanPath = path.trim().replace(/^\/+|\/+$/g, "");
  const pathSegment = cleanPath ? `/${cleanPath}` : "";

  // Tam Canonical URL
  const canonicalUrl = `${BASE_URL}/${locale}${pathSegment}`;

  // Görsel URL İşleme
  const imageUrl = image.startsWith("http")
    ? image
    : `${BASE_URL}${image.startsWith("/") ? image : `/${image}`}`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
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
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: `${BASE_URL}/tr${pathSegment}`,
        en: `${BASE_URL}/en${pathSegment}`,
        "x-default": `${BASE_URL}/tr${pathSegment}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: canonicalUrl,
      title,
      description,
      siteName: "Endijital",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@endijital",
    },
    other: {
      publisher: "Endijital",
    },
  };
}