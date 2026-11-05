// src/app/[locale]/(marketing)/services/page.tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Code,
  Shield,
  ShoppingCart,
  Zap,
  LayoutDashboard,
  FileText,
  Plug,
  Database,
} from "lucide-react";
import { generateSeo } from "@/lib/seo";

/**
 * HİZMETLER SAYFASI (Server Component)
 * ------------------------------------------------
 * - 8 hizmet için 8 ayrı ikon + 8 ayrı gradient (anasayfa ile senkron).
 * - Server component'te useTranslations YASAKTIR → await getTranslations().
 * - Bu dosyada framer-motion KULLANILMAZ (invalid hook riski).
 * - Tüm touch target'lar min 44px (mobil uyum).
 */

const serviceIcons = [
  Code,
  Shield,
  ShoppingCart,
  Zap,
  LayoutDashboard,
  FileText,
  Plug,
  Database,
];

const serviceGradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-blue-500",
  "from-fuchsia-500 to-purple-500",
  "from-teal-500 to-cyan-500",
  "from-amber-500 to-orange-500",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateSeo({
    title:
      locale === "tr" ? "Hizmetlerimiz | Endijital" : "Our Services | Endijital",
    description:
      locale === "tr"
        ? "Next.js mimarisi, Cloudflare Edge, e-ticaret, SEO, SaaS dashboard, headless CMS, API ve veritabanı çözümleri: 8 uzmanlık alanında uçtan uca dijital hizmet."
        : "End-to-end digital services across 8 expertise areas: Next.js architecture, Cloudflare Edge, e-commerce, SEO, SaaS dashboards, headless CMS, APIs, and databases.",
    path: "/services",
    locale,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services_page");

  const services = t.raw("detailed") as Array<{
    title: string;
    description: string;
    features: string[];
  }>;

  return (
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Page Header */}
        <header className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            {t("pageTitle")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t("pageDescription")}
          </p>
        </header>

        {/* Detailed Services */}
        <div className="max-w-6xl mx-auto space-y-12">
          {services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            const gradient = serviceGradients[index % serviceGradients.length];
            return (
              <article
                key={service.title}
                className="glassmorphic rounded-2xl p-8 md:p-12 border border-white/10 card-glow"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradient}`}
                    >
                      <Icon className="w-10 h-10 text-white" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                      {service.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}