"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import { Rocket } from "lucide-react";

/**
 * HEADER (Dünya Standartları - 2026)
 * ------------------------------------------------
 * - Font/boyut: globals.css design token'ları (.logo-box, .nav-link, .cta-button)
 * - whitespace-nowrap: CTA ve logo metni DAR ekranda ASLA sarılmaz
 * - Responsive padding: md'de kompakt (px-4), lg'de ferah (px-6)
 * - Touch target: tüm etkileşimli öğeler min 44px
 */

const navLinks = [
  { href: "/services", labelKey: "services" },
  { href: "/portfolio", labelKey: "portfolio" },
  { href: "/about", labelKey: "about" },
  { href: "/contact", labelKey: "contact" },
];

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glassmorphic-strong py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* ============================================
              LOGO - Footer'daki şık ve parıltılı tasarım entegre edildi
              ============================================ */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0 min-h-[44px]"
            aria-label="Endijital - Ana Sayfa"
          >
            <div className="logo-box bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center neon-glow transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-extrabold text-xl leading-none">
                E
              </span>
            </div>
            <span className="logo-text text-foreground whitespace-nowrap">
              Endijital
            </span>
          </Link>

          {/* ============================================
              DESKTOP NAV - .nav-link = 15px / medium
              ============================================ */}
          <nav
            className="hidden md:flex items-center gap-0.5 lg:gap-1"
            aria-label="Ana menü"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "nav-link relative px-3 lg:px-4 py-2 rounded-lg",
                  "min-h-[44px] flex items-center whitespace-nowrap",
                  "transition-all duration-200",
                  isActive(link.href)
                    ? "text-foreground bg-white/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {t(link.labelKey)}

                {/* Aktif sayfa gradient göstergesi */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-3 right-3 lg:left-4 lg:right-4 -bottom-0.5 h-0.5 rounded-full",
                    "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                    "transition-transform duration-300 origin-left",
                    isActive(link.href) ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* ============================================
              SAĞ AKSİYONLAR
              ============================================ */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <LanguageSwitcher />

            {/* CTA - whitespace-nowrap: ASLA iki satıra sarılmaz */}
            <Link
              href="/contact"
              className={cn(
                "cta-button hidden md:inline-flex items-center gap-2",
                "px-4 lg:px-6 py-2.5 rounded-lg min-h-[44px]",
                "whitespace-nowrap",
                "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                "text-white",
                "hover:shadow-xl hover:shadow-purple-500/40 hover:scale-[1.03]",
                "active:scale-[0.98]",
                "transition-all duration-300"
              )}
            >
              <Rocket className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t("startProject")}</span>
            </Link>

            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}