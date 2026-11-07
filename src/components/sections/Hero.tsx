// src/components/sections/Hero.tsx
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Rocket, ArrowRight, Zap, Shield, Gauge } from "lucide-react";

/**
 * HERO SECTION (SERVER COMPONENT - SIFIR JS)
 * ------------------------------------------------
 * LCP OPTİMİZASYONU (Kritik):
 * - Hero bir SERVER component: içerik HTML'de hazır gelir,
 *   above-the-fold için tarayıcıya hiç JS inmez.
 *
 * GÖRSEL/PERFORMANS DENGESİ (HİBRİT MODEL):
 * - H1: text-gradient-animated → Desktop'ta orijinal kayan ışıltı KORUNUR
 *   (desktop Lighthouse animasyonla bile 100/100 idi).
 *   Mobilde (≤768px) globals.css media query animasyonu OTOMATİK dondurur
 *   → LCP öğesinde repaint yok, mobil skor korunur.
 * - blur-3xl blob'ları → radial-gradient: aynı yumuşak parlama görseli,
 *   filter OLMADAN ~0 paint maliyeti (mobil GPU dostu).
 * - animate-float mobilde CSS ile devre dışı, desktop'ta aktif.
 *
 * SEO: Tek H1 korunur, metin içeriği ve link yapısı DEĞİŞMEZ.
 * CLS: Tüm değişiklikler paint katmanındadır, layout kayması yok.
 */

const performanceMetrics = [
  { label: "LCP", value: "1.2s", icon: Zap, color: "from-green-400 to-emerald-500" },
  { label: "FID", value: "12ms", icon: Gauge, color: "from-blue-400 to-cyan-500" },
  { label: "CLS", value: "0.01", icon: Shield, color: "from-purple-400 to-pink-500" },
];

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Effects (CSS-only, filter YOK → mobil GPU dostu) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full animate-float"
          style={{
            background:
              "radial-gradient(circle at center, rgba(59,130,246,0.28) 0%, rgba(59,130,246,0) 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full animate-float"
          style={{
            background:
              "radial-gradient(circle at center, rgba(168,85,247,0.28) 0%, rgba(168,85,247,0) 70%)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(236,72,153,0.14) 0%, rgba(236,72,153,0) 70%)",
          }}
        />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Badge (CSS-only pulse) */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphic border border-white/10 neon-glow-hover transition-all duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm font-medium text-foreground">
                {t("badge")}
              </span>
            </div>
          </div>

          {/* ============================================
              MAIN H1 - SSR'da ANINDA görünür (LCP güvencesi)
              Desktop: kayan gradient ışıltısı (orijinal görünüm)
              Mobil: globals.css ile statik gradient'e dondurulur
              ============================================ */}
          <h1 className="mx-auto max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.08] tracking-[-0.03em]">
            <span className="text-gradient-animated">
              {t("title")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/contact"
              className={cn(
                "flex items-center justify-center gap-2 px-8 py-4 rounded-lg w-full sm:w-auto min-h-[44px]",
                "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                "text-white font-semibold text-lg whitespace-nowrap",
                "hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105",
                "transition-all duration-300"
              )}
            >
              <Rocket className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{t("cta.primary")}</span>
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
            </Link>
            <Link
              href="/portfolio"
              className={cn(
                "flex items-center justify-center gap-2 px-8 py-4 rounded-lg w-full sm:w-auto min-h-[44px]",
                "glassmorphic border border-white/10",
                "text-foreground font-semibold text-lg whitespace-nowrap",
                "hover:bg-white/5 hover:scale-105",
                "transition-all duration-300"
              )}
            >
              <span>{t("cta.secondary")}</span>
            </Link>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {performanceMetrics.map((metric) => (
              <div
                key={metric.label}
                className="glassmorphic rounded-xl p-4 border border-white/10 card-glow hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br",
                      metric.color
                    )}
                  >
                    <metric.icon className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-2xl font-bold text-foreground">
                    {metric.value}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}