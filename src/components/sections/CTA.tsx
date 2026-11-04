"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Rocket, ArrowRight } from "lucide-react";

/**
 * CTA SECTION
 * ------------------------------------------------
 * H2 tipografisi dünya standardı: 30/36px + tracking-tight
 */
export default function CTA() {
  const t = useTranslations("cta");

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div
            className={cn(
              "glassmorphic-strong rounded-3xl p-8 md:p-12 border border-white/10",
              "neon-glow text-center"
            )}
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
            >
              <Rocket className="w-10 h-10 text-white" />
            </motion.div>

            {/* Title - Dünya Standardı Tipografi */}
            <h2 className="mx-auto max-w-2xl text-3xl md:text-4xl font-bold mb-6 text-gradient-animated tracking-tight leading-tight">
              {t("title")}
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center gap-3 px-8 py-4 rounded-lg",
                  "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                  "text-white font-semibold text-lg",
                  "hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105",
                  "transition-all duration-300"
                )}
              >
                <span>{t("buttonText")}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}