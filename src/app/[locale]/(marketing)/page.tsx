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
      ? "Endijital | Geleceğin Web Mimarisi"
      : "Endijital | Next-Gen Web Architecture";

  const description =
    (messages.meta?.siteDescription as string) ||
    "High-performance digital products built with Next.js 15, Cloudflare Edge and modern web technologies.";

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
        ? "Endijital | Geleceğin Web Mimarisi"
        : "Endijital | Next-Gen Web Architecture",
    description:
      locale === "tr"
        ? "Next.js 15, Cloudflare Edge ve modern web teknolojileri ile yüksek performanslı dijital ürünler geliştiren ajans."
        : "Agency developing high-performance digital products with Next.js 15, Cloudflare Edge and modern web technologies.",
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

function servicesJsonLd(locale: string) {
  const services = [
    {
      name:
        locale === "tr" ? "Next.js 15 Geliştirme" : "Next.js 15 Development",
      description:
        locale === "tr"
          ? "App Router, React 19, Server Components ve Streaming ile SEO dostu, ultra hızlı, ölçeklenebilir modern web uygulamaları."
          : "SEO-friendly, ultra-fast, scalable modern web apps with App Router, React 19, Server Components, and Streaming.",
      serviceType: "Web Application Development",
    },
    {
      name:
        locale === "tr"
          ? "Cloudflare Edge Altyapısı"
          : "Cloudflare Edge Infrastructure",
      description:
        locale === "tr"
          ? "200+ lokasyonda edge-cached, DDoS korumalı, milisaniyeler içinde yüklenen edge-first web siteleri."
          : "Edge-cached, DDoS-protected websites that load in milliseconds across 200+ global locations.",
      serviceType: "Web Hosting & Edge Computing",
    },
    {
      name:
        locale === "tr"
          ? "Headless E-Ticaret Çözümleri"
          : "Headless E-Commerce Solutions",
      description:
        locale === "tr"
          ? "Shopify, Medusa veya özel backend ile yüksek dönüşümlü, ölçeklenebilir e-ticaret platformları."
          : "High-conversion, scalable e-commerce platforms with Shopify, Medusa, or custom backends.",
      serviceType: "E-Commerce Development",
    },
    {
      name:
        locale === "tr"
          ? "Performans & SEO Optimizasyonu"
          : "Performance & SEO Optimization",
      description:
        locale === "tr"
          ? "%100 PageSpeed skorları, Core Web Vitals uyumluluğu ve teknik SEO altyapısı ile arama motorlarında üst sıralama."
          : "100% PageSpeed scores, Core Web Vitals compliance, and technical SEO infrastructure for top search rankings.",
      serviceType: "SEO Services",
    },
  ];

  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    provider: { "@id": "https://endijital.com/#organization" },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    availableLanguage: ["Turkish", "English"],
  }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const servicesList = servicesJsonLd(locale);

  return (
    <main>
      {/* WebPage Schema - itemtype attribute ile */}
      <script
        type="application/ld+json"
        itemID={`https://endijital.com/${locale}#webpage`}
        itemScope
        itemType="https://schema.org/WebPage"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageJsonLd(locale)),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(locale)),
        }}
      />

      {/* 4 Service Schema */}
      {servicesList.map((service, i) => (
        <script
          key={`service-${i}`}
          type="application/ld+json"
          itemScope
          itemType="https://schema.org/Service"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(service),
          }}
        />
      ))}

      <Hero />
      <Services />
      <Portfolio />
      <About />
      <CTA />
    </main>
  );
}