// src/app/not-found.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

/**
 * ROOT NOT FOUND (Kök 404 Sınırı)
 * ------------------------------------------------
 * MİMARİ KURAL: Bu bileşen NextIntlClientProvider DIŞINDA render edilir.
 * - useTranslations / useLocale KULLANILAMAZ (provider monte değildir).
 * - İçerik statik ve çift dillidir (TR + EN).
 * - [locale]/not-found.tsx (çevirili) sayfa seviyesi 404'ler için kalır.
 */
export const metadata: Metadata = {
  title: "404 | Sayfa Bulunamadı / Page Not Found",
  description:
    "Aradığınız sayfa taşınmış veya silinmiş olabilir. / The page you are looking for may have been moved or deleted.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootNotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* 404 Number */}
        <h1 className="text-gradient-animated mb-6 text-[120px] font-bold leading-none md:text-[180px]">
          404
        </h1>

        {/* Bilingual Subtitles */}
        <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
          Sayfa Bulunamadı
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Page Not Found
        </p>

        {/* Bilingual Descriptions */}
        <p className="mb-4 leading-relaxed text-muted-foreground">
          Aradığınız sayfa taşınmış veya silinmiş olabilir. Ana sayfaya dönün
          veya menüyü kullanarak istediğiniz sayfayı bulun.
        </p>
        <p className="mb-12 leading-relaxed text-muted-foreground">
          The page you are looking for may have been moved or deleted. Return
          to the homepage or use the menu to find what you need.
        </p>

        {/* Back to Home - redirect(/tr) üzerinden güvenli yönlendirme */}
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          <span>Ana Sayfaya Dön / Back to Home</span>
          <Home className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}