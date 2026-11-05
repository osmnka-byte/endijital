// src/app/[locale]/(marketing)/page.tsx
import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
import { generateSeo } from "@/lib/seo";

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

function homePageJsonLd(locale: string) {
  const url = `https://endijital.com/${locale}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url: url,
    name:
      locale === "tr"
        ? "Endijital | Geleceğin Web Mimarisi & Dijital Çözümler"
        : "Endijital | Next-Gen Web Architecture & Digital Solutions",
    description:
      locale === "tr"
        ? "Next.js, Cloudflare Edge ve modern web teknolojileri ile yüksek performanslı dijital ürünler geliştiren ajans."
        : "Agency developing high-performance digital products with Next.js, Cloudflare Edge and modern web technologies.",
    isPartOf: { "@id": "https://endijital.com/#website" },
    about: { "@id": "https://endijital.com/#organization" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://endijital.com/opengraph-image.png",
      width: 1200,
      height: 630,
    },
    inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };
}

function breadcrumbJsonLd(locale: string) {
  const name = locale === "tr" ? "Ana Sayfa" : "Home";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: name,
        item: `https://endijital.com/${locale}`,
      },
    ],
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageJsonLd(locale)),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(locale)),
        }}
      />

      {/*
        NOT: Service şemaları bu dosyada YOK.
        8 Service şeması tek kaynak olarak [locale]/layout.tsx'ten render edilir.
      */}

      <Hero />
      <Services />
      <Portfolio />
      <About />
      <CTA />
    </main>
  );
}