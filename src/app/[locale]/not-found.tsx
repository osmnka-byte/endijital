"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Home, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const t = useTranslations("not_found");

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <h1 className="text-[150px] md:text-[200px] font-bold text-gradient-animated leading-none">
            {t("title")}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mb-6 text-foreground"
        >
          {t("subtitle")}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-muted-foreground mb-12 leading-relaxed"
        >
          {t("description")}
        </motion.p>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-3 px-8 py-4 rounded-lg",
              "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
              "text-white font-semibold text-lg",
              "hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105",
              "transition-all duration-300"
            )}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t("backHome")}</span>
            <Home className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}