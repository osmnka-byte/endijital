"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * MOBILE MENU
 * ------------------------------------------------
 * Touch target: Tüm butonlar min 44x44px (WCAG 2.5.8)
 * Erişilebilirlik: aria-expanded, aria-label, aria-controls
 * Performans: AnimatePresence ile GPU-accelerated animasyon
 */

const navLinks = [
  { href: "/services", labelKey: "services" },
  { href: "/portfolio", labelKey: "portfolio" },
  { href: "/about", labelKey: "about" },
  { href: "/contact", labelKey: "contact" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <div className="md:hidden">
      {/* Toggle Button - 44px touch target */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-foreground hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label={isOpen ? "Menüyü Kapat" : "Menüyü Aç"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 mt-2 mx-4 p-4 glassmorphic-strong rounded-2xl border border-white/10 shadow-2xl z-50"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobil menü">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-base font-medium",
                    "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                    "transition-all duration-200 min-h-[44px] flex items-center"
                  )}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block w-full text-center px-4 py-3 rounded-lg min-h-[44px] flex items-center justify-center",
                    "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                    "text-white font-semibold",
                    "hover:shadow-lg hover:shadow-purple-500/30",
                    "transition-all duration-300"
                  )}
                >
                  {t("startProject")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}