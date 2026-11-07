"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Award, Boxes, Gauge, Zap } from "lucide-react";

/**
 * ABOUT SECTION
 * ------------------------------------------------
 * İstatistikler doğrulanabilir değerlerdir:
 * 20+ Teslim Edilen Proje · 5+ SaaS Platformu · 100/100 Lighthouse · 0.7s LCP
 *
 * MOBİL UYUM GÜNCELLEMESİ:
 * - Stats grid: 4 kolon artık lg (1024px+) break noktasında (tabletlerde 2x2).
 * - Stat değerleri responsive font (text-2xl → sm:text-3xl → lg:text-4xl).
 * - min-w-0 + break-words ile taşma/kırpılma garantili önlendi.
 * - Mobilde kart padding'i p-4 (dar ekranlarda içerik alanı genişler).
 * - CLS riski YOK: tüm boyutlar viewport bazlı, ilk boyamada sabit.
 */

const statIcons = [Award, Boxes, Gauge, Zap];

export default function About() {
  const t = useTranslations("about");
  const stats = t.raw("stats") as Array<{ label: string; value: string }>;
  const techStack = t.raw("techStack") as { title: string; technologies: string[] };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient tracking-tight leading-tight">
              {t("sectionTitle")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = statIcons[index % statIcons.length];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={cn(
                    "glassmorphic rounded-2xl p-4 sm:p-6 border border-white/10",
                    "card-glow hover:scale-105",
                    "transition-all duration-300 text-center",
                    "min-w-0"
                  )}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                    <Icon
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-gradient leading-tight break-words tabular-nums">
                    {stat.value}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glassmorphic rounded-2xl p-8 border border-white/10 card-glow"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-foreground">
              {techStack.title}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium",
                    "bg-gradient-to-r from-blue-500/10 to-purple-500/10",
                    "border border-white/10",
                    "hover:scale-105 hover:border-white/20",
                    "transition-all duration-300"
                  )}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}