"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";

/**
 * LANGUAGE SWITCHER
 * ------------------------------------------------
 * Touch target: min 44x44px (WCAG 2.5.8 Target Size)
 * Erişilebilirlik: aria-label ile ekran okuyucu desteği
 */
export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "tr" ? "en" : "tr";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium",
        "text-muted-foreground hover:text-foreground",
        "transition-all duration-200 hover:bg-secondary",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        "min-w-[44px] min-h-[44px] justify-center"
      )}
      aria-label={
        locale === "tr"
          ? "Dil Değiştir: İngilizceye geç"
          : "Change Language: Switch to Turkish"
      }
    >
      <Languages className="w-4 h-4" aria-hidden="true" />
      <span className="uppercase tracking-wider">{locale}</span>
    </button>
  );
}