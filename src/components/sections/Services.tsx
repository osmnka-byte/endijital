"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
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
import { cn } from "@/lib/utils";

/**
 * SERVICES SECTION (Anasayfa)
 * ------------------------------------------------
 * - Mevcut premium görsel dil KORUNUR (canlı gradient ikonlar, ferah kartlar)
 * - 8 hizmet, 2 kolon × 4 satır grid ile gösterilir
 * - Her karta özel gradient paleti (index'e göre döner)
 */

const iconMap = {
  Code,
  Shield,
  ShoppingCart,
  Zap,
  LayoutDashboard,
  FileText,
  Plug,
  Database,
} as const;

type IconName = keyof typeof iconMap;

/**
 * CANLI GRADIENT PALETİ
 * ------------------------------------------------
 * Ekran görüntüsündeki görsel dili birebir korur:
 * 1. Mavi → 2. Pembe → 3. Yeşil → 4. Turuncu
 * 5. İndigo → 6. Fuşya → 7. Teal → 8. Amber
 */
const gradientPalette = [
  "from-blue-500 to-cyan-400",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-400",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-blue-400",
  "from-fuchsia-500 to-purple-400",
  "from-teal-500 to-cyan-400",
  "from-amber-500 to-orange-400",
];

export default function Services() {
  const t = useTranslations("services");

  const services = t.raw("services") as Array<{
    slug: string;
    icon: string;
    title: string;
    description: string;
  }>;

  return (
    <section
      className="py-20 md:py-32 relative overflow-hidden"
      aria-labelledby="services-title"
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="services-title"
            className="text-3xl md:text-4xl font-bold mb-4 text-gradient tracking-tight leading-tight"
          >
            {t("sectionTitle")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("sectionDescription")}
          </p>
        </motion.div>

        {/* Services Grid - 2 kolon × 4 satır (mevcut ferah stil korunur) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as IconName] || Code;
            const gradient = gradientPalette[index % gradientPalette.length];

            return (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
                className="group"
              >
                <div
                  className={cn(
                    "glassmorphic rounded-2xl p-8 h-full",
                    "border border-white/10",
                    "card-glow hover:scale-[1.02]",
                    "transition-all duration-300"
                  )}
                >
                  {/* Canlı Gradient İkon Kutusu (mevcut görsel dil) */}
                  <div
                    className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
                      "bg-gradient-to-br shadow-lg",
                      gradient
                    )}
                  >
                    <IconComponent
                      className="w-7 h-7 text-white"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Başlık */}
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-gradient-animated transition-all duration-300">
                    {service.title}
                  </h3>

                  {/* Açıklama */}
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}