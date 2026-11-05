// src/app/[locale]/(marketing)/portfolio/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generateSeo } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generateSeo({
    title:
      locale === "tr"
        ? "Portfolyo & Projelerimiz | Endijital"
        : "Portfolio & Projects | Endijital",
    description:
      locale === "tr"
        ? "Next.js, Cloudflare Edge ve modern web mimarileri ile geliştirdiğimiz SaaS ürünleri, demo uygulamalar ve Ar-Ge projeleri."
        : "SaaS products, demo applications, and R&D projects developed with Next.js, Cloudflare Edge, and modern web architectures.",
    path: "/portfolio",
    locale,
  });
}

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return children;
}