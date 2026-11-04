// src/app/robots.ts
import { MetadataRoute } from "next";

/**
 * ROBOTS.TXT GENERATOR
 * ------------------------------------------------
 * Next.js 16 + output: 'export' için ZORUNLU bildirimler:
 * Bu dosyanın build sırasında statik olarak üretilmesini sağlar.
 */
export const dynamic = "force-static";
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
    ],
    sitemap: "https://endijital.com/sitemap.xml",
    host: "https://endijital.com",
  };
}