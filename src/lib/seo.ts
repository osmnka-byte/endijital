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
 * DÜZELTME:
 * - og:url artık tam URL (https://endijital.com/tr)
 * - og:image artık /opengraph-image.png (Next.js otomatik üretir)
 * - twitter:image da aynı
 */
export function generateSeo({
  title,
  description,
  path = "",
  image = "/opengraph-image.png",
  locale = "tr",
}: SeoProps): Metadata {
  const baseUrl = "https://endijital.com";
  const url = `${baseUrl}/${locale}${path}`;
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
        tr: `${baseUrl}/tr${path}`,
        en: `${baseUrl}/en${path}`,
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
      "publisher": "Endijital",
    },
  };
}