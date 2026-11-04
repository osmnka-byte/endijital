// src/app/[locale]/(marketing)/portfolio/[slug]/page.tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ExternalLink, CheckCircle, BarChart3 } from "lucide-react";
import { generateSeo } from "@/lib/seo";

/**
 * PORTFOLYO DETAY SAYFASI (Server Component)
 * ------------------------------------------------
 * - 8 slug × 2 locale = 16 statik sayfa
 * - Gerçek ürünler: SoftwareApplication JSON-LD
 * - Demo/Ar-Ge/Konsept: CreativeWork JSON-LD (dürüst etiketleme)
 * - url boşsa "Ziyaret Et" butonu render EDİLMEZ
 */

const PROJECT_SLUGS = [
  "kar-dedektoru",
  "entegrematik",
  "technova",
  "luxecommerce",
  "finedge",
  "greenenergy",
  "edgeperf-lab",
  "luxe-marketplace-ui",
] as const;

const REAL_PRODUCTS = new Set(["kar-dedektoru", "entegrematik"]);

type ProjectDetail = {
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  longDescription: string;
  image: string;
  screenshots: string[];
  technologies: string[];
  features: string[];
  url: string;
  results: Record<string, string>;
};

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  try {
    const t = await getTranslations({ locale, namespace: "portfolio_detail" });
    const project = t.raw(`projects.${slug}`) as ProjectDetail | undefined;

    if (!project) {
      return { title: "Not Found | Endijital" };
    }

    return generateSeo({
      title: `${project.title} | Endijital`,
      description: project.description,
      path: `/portfolio/${slug}`,
      locale,
    });
  } catch {
    return { title: "Not Found | Endijital" };
  }
}

function productJsonLd(slug: string, project: ProjectDetail, locale: string) {
  const pageUrl = `https://endijital.com/${locale}/portfolio/${slug}`;

  if (REAL_PRODUCTS.has(slug)) {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: project.title,
      description: project.description,
      url: pageUrl,
      operatingSystem: "Web",
      applicationCategory: "BusinessApplication",
      creator: { "@id": "https://endijital.com/#organization" },
      inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: pageUrl,
    creator: { "@id": "https://endijital.com/#organization" },
    inLanguage: locale === "tr" ? "tr-TR" : "en-US",
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("portfolio_detail");

  let project: ProjectDetail | undefined;
  try {
    project = t.raw(`projects.${slug}`) as ProjectDetail | undefined;
  } catch {
    notFound();
  }

  if (!project) {
    notFound();
  }

  return (
    <main className="pt-32 pb-20">
      {/* Product / CreativeWork Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd(slug, project, locale)),
        }}
      />

      <div className="container mx-auto px-4 md:px-6">
        {/* Back Button */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 min-h-[44px] rounded-lg glassmorphic border border-white/10 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{t("backToPortfolio")}</span>
        </Link>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-sm font-semibold bg-secondary border border-white/10 text-foreground">
              {project.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient leading-[1.08] tracking-[-0.03em]">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              {project.subtitle}
            </p>

            <ul className="flex flex-wrap gap-3 mb-8" aria-label={t("technologies")}>
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground border border-white/5"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" aria-hidden="true" />
                <span>{t("visitWebsite")}</span>
              </a>
            )}
          </header>

          {/* Main Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 card-glow bg-secondary/40">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-top"
            />
          </div>

          {/* Overview */}
          <section className="mb-12" aria-labelledby="overview-title">
            <h2 id="overview-title" className="text-2xl md:text-3xl font-bold mb-6 text-foreground tracking-tight">
              {t("projectOverview")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.longDescription}
            </p>
          </section>

          {/* Results */}
          <section className="mb-12" aria-label="Results">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {Object.entries(project.results).map(([key, value]) => (
                <div
                  key={key}
                  className="glassmorphic rounded-2xl p-6 border border-white/10 card-glow text-center"
                >
                  <BarChart3 className="w-8 h-8 mx-auto mb-3 text-primary" aria-hidden="true" />
                  <div className="text-2xl font-bold mb-2 text-gradient">{value}</div>
                  <p className="text-sm text-muted-foreground capitalize">{key}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="mb-12" aria-labelledby="features-title">
            <h2 id="features-title" className="text-2xl md:text-3xl font-bold mb-6 text-foreground tracking-tight">
              {t("features")}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Screenshots (opsiyonel) */}
          {project.screenshots && project.screenshots.length > 0 && (
            <section aria-labelledby="screenshots-title">
              <h2 id="screenshots-title" className="text-2xl md:text-3xl font-bold mb-6 text-foreground tracking-tight">
                {t("screenshots")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.screenshots.map((screenshot, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-xl overflow-hidden card-glow bg-secondary/40"
                  >
                    <Image
                      src={screenshot}
                      alt={`${project.title} ekran görüntüsü ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}