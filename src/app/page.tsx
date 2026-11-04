// src/app/page.tsx
import { redirect } from "next/navigation";

/**
 * ROOT PAGE (Kök Sayfa)
 * ------------------------------------------------
 * Kök dizine ("/") girildiğinde kullanıcıyı varsayılan locale'e
 * ("tr") yönlendirir.
 *
 * MİMARİ KURAL:
 * - Bu dosyada koşul, state veya UI YOKTUR.
 * - redirect() sunucu tarafında çalışır; statik export'ta Next.js
 *   bunu otomatik olarak client-side redirect sayfasına derler.
 * - notFound() veya locale doğrulaması BURADA YAPILMAZ.
 */
export default function RootPage() {
  redirect("/tr");
}