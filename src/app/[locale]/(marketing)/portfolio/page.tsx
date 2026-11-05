"use client";

import { useState, use } from "react";
import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECT_VISUALS } from "@/components/sections/Portfolio";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://endijital.com";

type FilterKey = "all" | "saas" | "demo" | "arge" | "concept";

function ProjectCardImage({
  src,
  alt,
  gradient,
  icon: Icon,
}: {
  src: string;
  alt: string;
  gradient: string;
  icon: ComponentType<{ className?: string }>;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  if (status === "error") {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-3",
          "bg-gradient-to-br",
          gradient
        )}
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20">
          <Icon className="w-8 h-8 text-white/90" />
        </div>
        <span className="px-4 text-center text-sm font-medium text-white/80">{alt}</span>
      </div>
    );
  }

  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
          gradient,
          status === "loaded" ? "opacity-0" : "opacity-100"
        )}
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        className={cn(
          "object-cover object-top transition-all duration-700 group-hover:scale-110",
          status === "loaded" ? "opacity-100" : "opacity-0"
        )}
      />
    </>
  );
}

function generatePortfolioJsonLd(locale: string) {
  const isTr = locale === "tr";
  const currentUrl = `${BASE_URL}/${locale}/portfolio`;
  const homeUrl = `${BASE_URL}/${locale}`;

  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${currentUrl}#collectionpage`,
    url: currentUrl,
    name: isTr
      ? "Portfolyo & Projelerimiz | Endijital"
      : "Portfolio & Projects | Endijital",
    description: isTr
      ? "Next.js ve Cloudflare mimarisi ile geliştirdiğimiz dijital ürünler ve projeler."
      : "Digital products and projects developed with Next.js and Cloudflare architecture.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    inLanguage: isTr ? "tr-TR" : "en-US",
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isTr ? "Ana Sayfa" : "Home",
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isTr ? "Portfolyo" : "Portfolio",
        item: currentUrl,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [collectionPage, breadcrumb],
  };
}

export default function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = use(params);
  const locale = resolvedParams?.locale || "tr";

  const t = useTranslations("portfolio");
  const tPage = useTranslations("portfolio_page");

  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const projects = t.raw("projects") as Array<{
    title: string;
    slug: string;
    badge: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
  }>;

  const filters: Array<{ key: FilterKey; label: string }> = [
    { key: "all", label: tPage("filter.all") },
    { key: "saas", label: tPage("filter.saas") },
    { key: "demo", label: tPage("filter.demo") },
    { key: "arge", label: tPage("filter.arge") },
    { key: "concept", label: tPage("filter.concept") },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const jsonLd = generatePortfolioJsonLd(locale);

  return (
    <main className="pt-32 pb-20">
      {/* Portfolio Collection + Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="container mx-auto px-4 md:px-6">
        {/* Page Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient leading-[1.08] tracking-[-0.03em]">
            {tPage("pageTitle")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {tPage("pageDescription")}
          </p>
        </motion.header>

        {/* Filter Buttons */}
        <nav
          aria-label={tPage("pageTitle")}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              aria-pressed={activeFilter === filter.key}
              className={cn(
                "px-6 py-2.5 min-h-[44px] rounded-lg text-sm font-medium",
                "transition-all duration-300",
                activeFilter === filter.key
                  ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                  : "glassmorphic border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
              )}
            >
              {filter.label}
            </button>
          ))}
        </nav>

        {/* Projects Grid */}
        <section aria-labelledby="portfolio-grid-title">
          <h2 id="portfolio-grid-title" className="sr-only">
            {t("sectionTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const originalIndex = projects.findIndex((p) => p.slug === project.slug);
                const visual = PROJECT_VISUALS[originalIndex % PROJECT_VISUALS.length];

                return (
                  <motion.article
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <div
                      className={cn(
                        "glassmorphic rounded-2xl overflow-hidden border border-white/10",
                        "card-glow hover:scale-[1.02]",
                        "transition-all duration-300"
                      )}
                    >
                      <div className="relative aspect-video overflow-hidden bg-secondary/40">
                        <ProjectCardImage
                          src={visual.src}
                          alt={project.title}
                          gradient={visual.gradient}
                          icon={visual.icon}
                        />
                        <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold bg-background/80 backdrop-blur-sm border border-white/15 text-foreground">
                          {project.badge}
                        </span>
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-gradient-animated transition-all duration-300">
                          {project.title}
                        </h3>

                        <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        <ul className="flex flex-wrap gap-2 mb-4" aria-label="Technologies">
                          {project.tags.map((tag) => (
                            <li
                              key={tag}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-white/5"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>

                        <Link
                          href={`/portfolio/${project.slug}`}
                          aria-label={`${t("viewProject")}: ${project.title}`}
                          className="inline-flex items-center gap-2 min-h-[44px] text-sm font-medium text-primary hover:text-gradient-animated transition-all duration-300"
                        >
                          <span>{t("viewProject")}</span>
                          <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}