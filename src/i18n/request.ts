// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Bu genellikle App Router'da otomatik çözülür,
  // fakat güvenlik kontrolü olarak manuel await ile sağlıyoruz.
  let locale = await requestLocale;

  // Geçerli bir locale olduğundan emin ol
  if (!locale || !routing.locales.includes(locale as "tr" | "en")) {
    notFound();
  }

  return {
    locale,
    // Dinamik import ile sadece o locale'in sözlüğü yüklenir
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});