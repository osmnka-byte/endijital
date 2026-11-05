// src/lib/seo.ts
import { Metadata } from "next";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  locale?: string;
}

/**
 * Dinamik SEO Metadata Generator
 * ------------------------------------------------
 * - path parametresinin başına otomatik "/" eklenir
 *   ("services" ve "/services" ikisi de doğru URL üretir).
 * - og:url, og:image, twitter:image tam URL olarak üretilir.
 * - title olduğu gibi kullanılır (template uygulanmaz, çift suffix riski yok).
 */
export function generateSeo({
  title,
  description,
  path = "",
  image = "/opengraph-image.png",
  locale = "tr",
}: SeoProps): Metadata {
  const baseUrl = "https://endijital.com";

  const normalizedPath =
    path && !path.startsWith("/") ? `/${path}` : path;

  const url = `${baseUrl}/${locale}${normalizedPath}`;
  const imageUrl = `${baseUrl}${image}`;

  return {
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
      canonical: url,
      languages: {
        tr: `${baseUrl}/tr${normalizedPath}`,
        en: `${baseUrl}/en${normalizedPath}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url,
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