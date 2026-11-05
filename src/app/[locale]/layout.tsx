// src/app/[locale]/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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

  return {
    title,
    description,
    alternates: {
      canonical: `https://endijital.com/${locale}`,
      languages: {
        tr: "https://endijital.com/tr",
        en: "https://endijital.com/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      siteName: "Endijital",
      title,
      description,
      images: [
        {
          url: "https://endijital.com/opengraph-image.png",
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
      images: ["https://endijital.com/opengraph-image.png"],
    },
  };
}

/**
 * ORGANIZATION JSON-LD
 * ------------------------------------------------
 * Gerçek adres (PostalAddress) eklendi → Local SEO güçlenir.
 */
function organizationJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://endijital.com/#organization",
    name: "Endijital",
    alternateName: "Endijital Ajans",
    url: "https://endijital.com",
    logo: {
      "@type": "ImageObject",
      url: "https://endijital.com/opengraph-image.png",
      width: 1200,
      height: 630,
    },
    image: "https://endijital.com/opengraph-image.png",
    description:
      locale === "tr"
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
    slogan:
      locale === "tr" ? "Geleceğin Web Mimarisi" : "Next-Gen Web Architecture",
  };
}

function webSiteJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://endijital.com/#website",
    url: "https://endijital.com",
    name: "Endijital",
    description:
      locale === "tr"
        ? "Geleceğin Web Mimarisi"
        : "Next-Gen Web Architecture",
    publisher: { "@id": "https://endijital.com/#organization" },
    inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://endijital.com/${locale}?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * SERVICES JSON-LD (8 HİZMET)
 * ------------------------------------------------
 * Tek kaynak: Service şemaları YALNIZCA bu dosyada üretilir.
 * page.tsx içinde ayrıca service şeması BULUNMAMALIDIR (duplication yasağı).
 */
function servicesJsonLd(locale: string) {
  const services = [
    {
      name: locale === "tr" ? "Next.js Mimarisi" : "Next.js Architecture",
      description:
        locale === "tr"
          ? "App Router, React 19, Server Components ve Streaming ile inşa edilmiş, SEO dostu, ultra hızlı ve ölçeklenebilir modern web uygulamaları."
          : "SEO-friendly, ultra-fast, and scalable modern web applications with App Router, React 19, Server Components, and Streaming.",
      serviceType: "Web Application Development",
    },
    {
      name:
        locale === "tr"
          ? "Cloudflare Edge & Güvenlik"
          : "Cloudflare Edge & Security",
      description:
        locale === "tr"
          ? "Cloudflare Pages, Workers ve WAF entegrasyonu ile dünyanın her noktasında milisaniyeler içinde yüklenen, DDoS ve bot saldırılarına karşı korunaklı edge-first altyapılar."
          : "Edge-first infrastructures that load in milliseconds worldwide and are protected against DDoS and bot attacks through Cloudflare Pages, Workers, and WAF integration.",
      serviceType: "Web Hosting & Edge Computing",
    },
    {
      name: locale === "tr" ? "E-Ticaret Çözümleri" : "E-Commerce Solutions",
      description:
        locale === "tr"
          ? "Headless e-ticaret mimarisi ile Shopify, Medusa ve özel ödeme altyapılarını entegre ediyor, dönüşüm oranı yüksek satış platformları inşa ediyoruz."
          : "We integrate Shopify, Medusa, and custom payment gateways through headless e-commerce architecture, delivering high-conversion sales platforms.",
      serviceType: "E-Commerce Development",
    },
    {
      name:
        locale === "tr"
          ? "Performans & SEO Optimizasyonu"
          : "Performance & SEO Optimization",
      description:
        locale === "tr"
          ? "%100 PageSpeed skorları, Zero-CLS, Core Web Vitals uyumluluğu ve yapılandırılmış veri (Schema.org) ile arama motorlarında zirveye oynayan teknik SEO altyapısı."
          : "Technical SEO infrastructure with 100% PageSpeed scores, Zero-CLS, Core Web Vitals compliance, and structured data (Schema.org) for top search rankings.",
      serviceType: "SEO Services",
    },
    {
      name:
        locale === "tr"
          ? "SaaS Dashboard Geliştirme"
          : "SaaS Dashboard Development",
      description:
        locale === "tr"
          ? "B2B SaaS ürünleri için karmaşık veri görselleştirme, gerçek zamanlı güncellemeler ve kullanıcı dostu yönetim panelleri."
          : "Complex data visualization, real-time updates, and user-friendly management panels for B2B SaaS products.",
      serviceType: "SaaS Development",
    },
    {
      name:
        locale === "tr"
          ? "Headless CMS Entegrasyonu"
          : "Headless CMS Integration",
      description:
        locale === "tr"
          ? "Sanity.io ve Payload CMS ile içerik ekibinizin kolayca yönetebileceği, geliştiricilerin esnekçe entegre edebileceği modern CMS altyapıları."
          : "Modern CMS infrastructures with Sanity.io and Payload CMS that your content team can easily manage and developers can flexibly integrate.",
      serviceType: "Content Management",
    },
    {
      name:
        locale === "tr"
          ? "API Geliştirme & Entegrasyon"
          : "API Development & Integration",
      description:
        locale === "tr"
          ? "RESTful ve GraphQL API'ler geliştiriyor, üçüncü parti servisleri projelerinize güvenle entegre ediyoruz."
          : "We develop RESTful and GraphQL APIs and securely integrate third-party services into your projects.",
      serviceType: "API Development",
    },
    {
      name:
        locale === "tr"
          ? "Veritabanı & Backend Mimarisi"
          : "Database & Backend Architecture",
      description:
        locale === "tr"
          ? "PostgreSQL ve Drizzle ORM ile tip güvenli, performanslı ve bakımı kolay veritabanı mimarileri tasarlıyoruz."
          : "We design type-safe, performant, and maintainable database architectures with PostgreSQL and Drizzle ORM.",
      serviceType: "Backend Development",
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
  const servicesList = servicesJsonLd(locale);

  return (
    <NextIntlClientProvider messages={messages}>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd(locale)),
        }}
      />

      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteJsonLd(locale)),
        }}
      />

      {/* 8 Service Schemas */}
      {servicesList.map((service, i) => (
        <script
          key={`service-${locale}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(service),
          }}
        />
      ))}

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