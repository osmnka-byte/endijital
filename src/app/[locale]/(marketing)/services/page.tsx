// src/app/[locale]/(marketing)/services/page.tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Code, Cloud, ShoppingCart, TrendingUp, CheckCircle } from "lucide-react";
import { generateSeo } from "@/lib/seo";

const serviceIcons = [Code, Cloud, ShoppingCart, TrendingUp];
const serviceGradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generateSeo({
    title: locale === "tr" ? "Hizmetlerimiz | Endijital" : "Our Services | Endijital",
    description:
      locale === "tr"
        ? "Modern web teknolojileri ile işletmenizi bir adım öteye taşıyacak kapsamlı dijital çözümler."
        : "Comprehensive digital solutions powered by modern web technologies to take your business to the next level.",
    path: "/services",
    locale,
  });
}

/**
 * HİZMETLER SAYFASI (Server Component)
 * ------------------------------------------------
 * KURAL: Server component'lerde useTranslations YASAKTIR.
 * Doğrusu: await getTranslations() (next-intl/server).
 * Bu dosyada framer-motion KULLANILMAZ (invalid hook riski).
 */
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
                          <CheckCircle
                            className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
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