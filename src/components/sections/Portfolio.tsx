"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ExternalLink,
  LineChart,
  Boxes,
  BarChart3,
  ShoppingBag,
  Activity,
  Leaf,
  Gauge,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PORTFOLIO SECTION (Anasayfa)
 * ------------------------------------------------
 * - 8 proje: 2 gerçek SaaS + 3 demo + 2 Ar-Ge + 1 konsept
 * - Rozetler şeffaflık sağlar (SEO güven sinyali)
 * - Lokal görsel yoksa gradient fallback (kırık ikon ASLA yok)
 */

export type ProjectVisual = {
  src: string;
  gradient: string;
  icon: ComponentType<{ className?: string }>;
};

export const PROJECT_VISUALS: ProjectVisual[] = [
  {
    src: "/images/portfolio/kar-dedektoru.png",
    gradient: "from-emerald-600/60 via-teal-700/40 to-slate-900",
    icon: LineChart,
  },
  {
    src: "/images/portfolio/entegrematik.png",
    gradient: "from-cyan-600/60 via-sky-700/40 to-slate-900",
    icon: Boxes,
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-blue-600/60 via-indigo-700/40 to-slate-900",
    icon: BarChart3,
  },
  {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-purple-600/60 via-fuchsia-700/40 to-slate-900",
    icon: ShoppingBag,
  },
  {
    src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-emerald-600/60 via-teal-700/40 to-slate-900",
    icon: Activity,
  },
  {
    src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-orange-600/60 via-amber-700/40 to-slate-900",
    icon: Leaf,
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-blue-600/60 via-indigo-700/40 to-slate-900",
    icon: Gauge,
  },
  {
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-purple-600/60 via-fuchsia-700/40 to-slate-900",
    icon: Palette,
  },
];

function ProjectImage({
  src,
  alt,
  title,
  gradient,
  icon: Icon,
  priority = false,
}: {
  src: string;
  alt: string;
  title: string;
  gradient: string;
  icon: ComponentType<{ className?: string }>;
  priority?: boolean;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  if (status === "error") {
    return (
      <div
        role="img"
        aria-label={alt}
        title={title}
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-3",
          "bg-gradient-to-br",
          gradient
        )}
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20">
          <Icon className="w-8 h-8 text-white/90" aria-hidden="true" />
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
        title={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
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

export default function Portfolio() {
  const t = useTranslations("portfolio");

  const projects = t.raw("projects") as Array<{
    title: string;
    slug: string;
    badge: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
  }>;

  return (
    <section className="py-20 md:py-32 relative overflow-hidden" aria-labelledby="portfolio-title">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="portfolio-title"
            className="text-3xl md:text-4xl font-bold mb-4 text-gradient tracking-tight leading-tight"
          >
            {t("sectionTitle")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("sectionDescription")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => {
            const visual = PROJECT_VISUALS[index % PROJECT_VISUALS.length];

            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
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
                    <ProjectImage
                      src={visual.src}
                      alt={project.title}
                      title={`${project.title} - ${project.description}`}
                      gradient={visual.gradient}
                      icon={visual.icon}
                      priority={index === 0}
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
                    <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-gradient-animated transition-all duration-300">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
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
        </div>
      </div>
    </section>
  );
}