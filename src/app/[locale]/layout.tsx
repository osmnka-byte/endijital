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
      ? "Endijital | Geleceğin Web Mimarisi"
      : "Endijital | Next-Gen Web Architecture";

  const description =
    locale === "tr"
      ? "Next.js 15, Cloudflare Edge ve modern web teknolojileri ile yüksek performanslı dijital ürünler."
      : "High-performance digital products built with Next.js 15, Cloudflare Edge and modern web technologies.";

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
 * GÜNCELLEME: Sahte telefon kaldırıldı.
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
        ? "Next.js 15, Cloudflare Edge ve modern web teknolojileri ile yüksek performanslı dijital ürünler geliştiren ajans."
        : "Agency developing high-performance digital products with Next.js 15, Cloudflare Edge and modern web technologies.",
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