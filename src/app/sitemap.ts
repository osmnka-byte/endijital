// src/app/sitemap.ts
import { MetadataRoute } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://endijital.com";
const LOCALES = ["tr", "en"] as const;

const ROUTES = [
  "",
  "/services",
  "/portfolio",
  "/portfolio/kar-dedektoru",
  "/portfolio/entegrematik",
  "/portfolio/technova",
  "/portfolio/luxecommerce",
  "/portfolio/finedge",
  "/portfolio/greenenergy",
  "/portfolio/edgeperf-lab",
  "/portfolio/luxe-marketplace-ui",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapItems: MetadataRoute.Sitemap = [];
  const currentDate = new Date().toISOString();

  LOCALES.forEach((locale) => {
    ROUTES.forEach((route) => {
      const isHome = route === "";
      const isPortfolioDetail = route.startsWith("/portfolio/");

      const url = `${BASE_URL}/${locale}${route}`;

      sitemapItems.push({
        url,
        lastModified: currentDate,
        changeFrequency: isHome ? "daily" : isPortfolioDetail ? "monthly" : "weekly",
        priority: isHome ? 1.0 : isPortfolioDetail ? 0.7 : 0.8,
        alternates: {
          languages: {
            tr: `${BASE_URL}/tr${route}`,
            en: `${BASE_URL}/en${route}`,
            "x-default": `${BASE_URL}/tr${route}`,
          },
        },
      });
    });
  });

  return sitemapItems;
}