// src/app/[locale]/(marketing)/page.tsx
import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
import { generateSeo } from "@/lib/seo";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://endijital.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages();

  const title =
    locale === "tr"
      ? "Endijital | Geleceğin Web Mimarisi & Dijital Çözümler"
      : "Endijital | Next-Gen Web Architecture & Digital Solutions";

  const description =
    (messages.meta?.siteDescription as string) ||
    "High-performance digital products built with Next.js, Cloudflare Edge and modern web technologies.";

  return generateSeo({ title, description, path: "", locale });
}

function generateHomePageJsonLd(locale: string) {
  const isTr = locale === "tr";
  const currentUrl = `${BASE_URL}/${locale}`;

  const webPage = {
    "@type": "WebPage",
    "@id": `${currentUrl}#webpage`,
    url: currentUrl,
    name: isTr
      ? "Endijital | Geleceğin Web Mimarisi & Dijital Çözümler"
      : "Endijital | Next-Gen Web Architecture & Digital Solutions",
    description: isTr
      ? "Next.js, Cloudflare Edge ve modern web teknolojileri ile yüksek performanslı dijital ürünler geliştiren ajans."
      : "Agency developing high-performance digital products with Next.js, Cloudflare Edge and modern web technologies.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${BASE_URL}/opengraph-image.png`,
      width: 1200,
      height: 630,
    },
    inLanguage: isTr ? "tr-TR" : "en-US",
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isTr ? "Ana Sayfa" : "Home",
        item: currentUrl,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, breadcrumb],
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const homePageJsonLd = generateHomePageJsonLd(locale);

  return (
    <main>
      {/* WebPage + Breadcrumb Unified JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageJsonLd),
        }}
      />

      <Hero />
      <Services />
      <Portfolio />
      <About />
      <CTA />
    </main>
  );
}