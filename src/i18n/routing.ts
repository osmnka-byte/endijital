// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Desteklenen diller
  locales: ["tr", "en"],

  // Varsayılan dil (URL'de `/tr` prefix olarak görünür)
  defaultLocale: "tr",

  // URL prefix stratejisi:
  // "always" -> Tüm URL'lerde /tr ve /en gösterilir (statik export için en güvenli)
  // "as-needed" -> Varsayılan dilde prefix gösterilmez
  // "never" -> Hiçbir dil prefix gösterilmez
  localePrefix: "always",
});

// Tip yardımcıları — tip güvenli Link ve redirect için export ediyoruz
export type Locale = (typeof routing.locales)[number];