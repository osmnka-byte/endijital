// src/app/sitemap.ts
import { MetadataRoute } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://endijital.com";
  const locales = ["tr", "en"];

  const routes = [
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

  const sitemap: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1 : route.startsWith("/portfolio/") ? 0.7 : 0.8,
      });
    });
  });

  return sitemap;
}