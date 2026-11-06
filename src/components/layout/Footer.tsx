"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Briefcase, AtSign, Code2, Camera } from "lucide-react";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Briefcase,
  twitter: AtSign,
  github: Code2,
  instagram: Camera,
};

export default function Footer() {
  const t = useTranslations("footer");

  const quickLinks = t.raw("quickLinks.links") as Array<{
    label: string;
    href: string;
  }>;
  const services = t.raw("services.links") as Array<{
    label: string;
    href: string;
  }>;
  const social = t.raw("social.links") as Array<{
    label: string;
    href: string;
    icon: string;
  }>;

  return (
    <footer className="relative border-t border-white/10 bg-background/60 backdrop-blur-sm">
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
      />

      <div className="container mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">
          {/* MARKA KOLONU */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group min-h-[44px]"
              aria-label="Endijital - Ana Sayfa"
            >
              <div className="logo-box bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center neon-glow">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M5 4h14v2.5H8.5v3.5h9.5v2.5H8.5v4.5H19V20H5V4z" />
                </svg>
              </div>
              <span className="logo-text text-foreground whitespace-nowrap">Endijital</span>
            </Link>
            <p className="footer-text leading-relaxed text-muted-foreground max-w-xs">
              {t("brand.description")}
            </p>
          </div>

          {/* HIZLI ERİŞİM */}
          <nav aria-label={t("quickLinks.title")}>
            <h3 className="footer-heading text-foreground mb-3">
              {t("quickLinks.title")}
            </h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="footer-link group inline-flex items-center min-h-[44px] text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* HİZMETLER */}
          <nav aria-label={t("services.title")}>
            <h3 className="footer-heading text-foreground mb-3">
              {t("services.title")}
            </h3>
            <ul className="space-y-1">
              {services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="footer-link group inline-flex items-center min-h-[44px] text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* SOSYAL MEDYA */}
          <div>
            <h3 className="footer-heading text-foreground mb-3">
              {t("social.title")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {social.map((item) => {
                const Icon = socialIcons[item.icon] || Briefcase;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className={cn(
                      "social-icon flex items-center justify-center",
                      "glassmorphic border border-white/10",
                      "text-muted-foreground hover:text-foreground",
                      "hover:scale-110 hover:neon-glow",
                      "transition-all duration-300"
                    )}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ALT BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="footer-text text-muted-foreground">{t("copyright")}</p>
          <p className="footer-text text-muted-foreground">{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}