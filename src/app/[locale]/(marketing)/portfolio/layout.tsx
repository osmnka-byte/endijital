// src/app/[locale]/(marketing)/portfolio/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { generateSeo } from "@/lib/seo";

/**
 * PORTFOLYO SEGMENT LAYOUT (Server Component)
 * ------------------------------------------------
 * portfolio/page.tsx bir Client Component olduğu için
 * generateMetadata barındıramaz. Metadata bu layout'tan sağlanır.
 * Detay sayfaları ([slug]) kendi metadata'ları ile bunu override eder.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateSeo({
    title:
      locale === "tr" ? "Portfolyomuz | Endijital" : "Our Portfolio | Endijital",
    description:
      locale === "tr"
        ? "SaaS ürünlerimiz, demo çalışmalarımız, Ar-Ge projelerimiz ve UI/UX konseptlerimiz: modern web teknolojileriyle geliştirdiğimiz işlerden seçkiler."
        : "Our SaaS products, demo studies, R&D projects, and UI/UX concepts: a selection of work built with modern web technologies.",
    path: "/portfolio",
    locale,
  });
}

export default function PortfolioLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}