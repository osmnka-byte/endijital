// src/app/[locale]/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://endijital.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "tr"
      ? "Endijital | Geleceğin Web Mimarisi & Dijital Çözümler"
      : "Endijital | Next-Gen Web Architecture & Digital Solutions";

  const description =
    locale === "tr"
      ? "Next.js, Cloudflare Edge ve modern web teknolojileri ile yüksek performanslı dijital ürünler. Web geliştirme, e-ticaret ve SEO optimizasyonu hizmetleri."
      : "High-performance digital products built with Next.js, Cloudflare Edge and modern web technologies. Web development, e-commerce, and SEO optimization services.";

  const canonicalUrl = `${BASE_URL}/${locale}`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: `${BASE_URL}/tr`,
        en: `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/tr`,
      },
    },
    // Favicon ve Sekme İkonlarının Tarayıcılara Açık Bildirimi (404 Hatasını Önler)
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icon.png", type: "image/png" },
      ],
      shortcut: ["/favicon.ico"],
      apple: [
        { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      siteName: "Endijital",
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: `${BASE_URL}/opengraph-image.png`,
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
      images: [`${BASE_URL}/opengraph-image.png`],
    },
  };
}

/**
 * UNIFIED SCHEMA (@graph) — 1 tek <script> etiketi ile tüm şemalar
 */
function generateUnifiedJsonLd(locale: string) {
  const isTr = locale === "tr";

  const organization = {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Endijital",
    alternateName: "Endijital Ajans",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/opengraph-image.png`,
      width: 1200,
      height: 630,
    },
    image: `${BASE_URL}/opengraph-image.png`,
    description: isTr
      ? "Next.js, Cloudflare Edge ve modern web teknolojileri ile yüksek performanslı dijital ürünler geliştiren ajans."
      : "Agency developing high-performance digital products with Next.js, Cloudflare Edge and modern web technologies.",
    email: "info@endijital.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kurtköy Mahallesi, Dr. Gürol Başaran Sokak, No: 1",
      addressLocality: "Pendik",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    foundingDate: "2024",
    foundingLocation: "İstanbul, Türkiye",
    sameAs: [
      "https://linkedin.com/company/endijital",
      "https://twitter.com/endijital",
      "https://github.com/endijital",
      "https://instagram.com/endijital",
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Cloudflare",
      "Web Development",
      "E-Commerce",
      "SEO Optimization",
      "Performance Optimization",
      "Edge Computing",
      "SaaS Development",
      "Headless CMS",
      "API Development",
      "PostgreSQL",
      "Drizzle ORM",
    ],
    slogan: isTr ? "Geleceğin Web Mimarisi" : "Next-Gen Web Architecture",
  };

  const website = {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Endijital",
    description: isTr ? "Geleceğin Web Mimarisi" : "Next-Gen Web Architecture",
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: isTr ? "tr-TR" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/${locale}?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const rawServices = [
    {
      name: isTr ? "Next.js Mimarisi" : "Next.js Architecture",
      description: isTr
        ? "App Router, React 19, Server Components ve Streaming ile inşa edilmiş, SEO dostu, ultra hızlı ve ölçeklenebilir modern web uygulamaları."
        : "SEO-friendly, ultra-fast, and scalable modern web applications with App Router, React 19, Server Components, and Streaming.",
      serviceType: "Web Application Development",
    },
    {
      name: isTr ? "Cloudflare Edge & Güvenlik" : "Cloudflare Edge & Security",
      description: isTr
        ? "Cloudflare Pages, Workers ve WAF entegrasyonu ile dünyanın her noktasında milisaniyeler içinde yüklenen, DDoS ve bot saldırılarına karşı korunaklı edge-first altyapılar."
        : "Edge-first infrastructures that load in milliseconds worldwide and are protected against DDoS and bot attacks through Cloudflare Pages, Workers, and WAF integration.",
      serviceType: "Web Hosting & Edge Computing",
    },
    {
      name: isTr ? "E-Ticaret Çözümleri" : "E-Commerce Solutions",
      description: isTr
        ? "Headless e-ticaret mimarisi ile Shopify, Medusa ve özel ödeme altyapılarını entegre ediyor, dönüşüm oranı yüksek satış platformları inşa ediyoruz."
        : "We integrate Shopify, Medusa, and custom payment gateways through headless e-commerce architecture, delivering high-conversion sales platforms.",
      serviceType: "E-Commerce Development",
    },
    {
      name: isTr ? "Performans & SEO Optimizasyonu" : "Performance & SEO Optimization",
      description: isTr
        ? "%100 PageSpeed skorları, Zero-CLS, Core Web Vitals uyumluluğu ve yapılandırılmış veri (Schema.org) ile arama motorlarında zirveye oynayan teknik SEO altyapısı."
        : "Technical SEO infrastructure with 100% PageSpeed scores, Zero-CLS, Core Web Vitals compliance, and structured data (Schema.org) for top search rankings.",
      serviceType: "SEO Services",
    },
    {
      name: isTr ? "SaaS Dashboard Geliştirme" : "SaaS Dashboard Development",
      description: isTr
        ? "B2B SaaS ürünleri için karmaşık veri görselleştirme, gerçek zamanlı güncellemeler ve kullanıcı dostu yönetim panelleri."
        : "Complex data visualization, real-time updates, and user-friendly management panels for B2B SaaS products.",
      serviceType: "SaaS Development",
    },
    {
      name: isTr ? "Headless CMS Entegrasyonu" : "Headless CMS Integration",
      description: isTr
        ? "Sanity.io ve Payload CMS ile içerik ekibinizin kolayca yönetebileceği, geliştiricilerin esnekçe entegre edebileceği modern CMS altyapıları."
        : "Modern CMS infrastructures with Sanity.io and Payload CMS that your content team can easily manage and developers can flexibly integrate.",
      serviceType: "Content Management",
    },
    {
      name: isTr ? "API Geliştirme & Entegrasyon" : "API Development & Integration",
      description: isTr
        ? "RESTful ve GraphQL API'ler geliştiriyor, üçüncü parti servisleri projelerinize güvenle entegre ediyoruz."
        : "We develop RESTful and GraphQL APIs and securely integrate third-party services into your projects.",
      serviceType: "API Development",
    },
    {
      name: isTr ? "Veritabanı & Backend Mimarisi" : "Database & Backend Architecture",
      description: isTr
        ? "PostgreSQL ve Drizzle ORM ile tip güvenli, performanslı ve bakımı kolay veritabanı mimarileri tasarlıyoruz."
        : "We design type-safe, performant, and maintainable database architectures with PostgreSQL and Drizzle ORM.",
      serviceType: "Backend Development",
    },
  ];

  const services = rawServices.map((service, index) => ({
    "@type": "Service",
    "@id": `${BASE_URL}/#service-${index + 1}`,
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    availableLanguage: ["Turkish", "English"],
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, ...services],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "tr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const skipLabel = locale === "tr" ? "İçeriğe atla" : "Skip to content";
  const unifiedJsonLd = generateUnifiedJsonLd(locale);

  return (
    <NextIntlClientProvider messages={messages}>
      {/* Unified JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(unifiedJsonLd),
        }}
      />

      <div className="relative flex min-h-screen flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-3 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:font-semibold focus:shadow-lg"
        >
          {skipLabel}
        </a>

        <Header />

        <div id="main-content" className="flex-1">
          {children}
        </div>

        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}