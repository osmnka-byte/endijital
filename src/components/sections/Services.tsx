"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code, Cloud, ShoppingCart, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SERVICES SECTION
 * ------------------------------------------------
 * H2 tipografisi dünya standardına çekildi:
 * 30px mobil / 36px desktop + tracking-tight + leading-tight
 */

const services = [
  {
    key: "nextjs",
    icon: Code,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    key: "cloudflare",
    icon: Cloud,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    key: "ecommerce",
    icon: ShoppingCart,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    key: "performance",
    icon: TrendingUp,
    gradient: "from-orange-500 to-red-500",
  },
];

export default function Services() {
  const t = useTranslations("services");

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient tracking-tight leading-tight">
            {t("sectionTitle")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("sectionDescription")}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div
                className={cn(
                  "glassmorphic rounded-2xl p-8 border border-white/10",
                  "card-glow hover:scale-105",
                  "transition-all duration-300"
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br",
                    service.gradient,
                    "group-hover:scale-110 transition-transform duration-300"
                  )}
                >
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-gradient-animated transition-all duration-300">
                  {t(`${service.key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {t(`${service.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}