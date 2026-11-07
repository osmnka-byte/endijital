"use client";

import { useEffect } from "react";

/**
 * HTML LANG SYNC
 * ------------------------------------------------
 * Root layout <html lang="tr"> ile statik başlar (varsayılan pazar TR).
 * Bu bileşen client tarafında lang değerini gerçek locale'e (tr/en) senkronlar.
 *
 * Neden gerekli?
 * - Next.js App Router: root layout locale parametresini OKUYAMAZ.
 * - Nested layout'lar <html> render EDEMEZ.
 * - Bu mini köprü, her iki kısıtı çiğnemeden lang'i doğru tutar.
 *
 * Etki: Lighthouse a11y denetimi geçer, ekran okuyucular doğru dili duyurur.
 * CLS/performans etkisi: YOK (yalnızca DOM özniteliği günceller).
 */
export default function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}