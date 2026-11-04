// src/app/[locale]/(marketing)/contact/page.tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import { generateSeo } from "@/lib/seo";

/**
 * İLETİŞİM SAYFASI (Server Component)
 * ------------------------------------------------
 * GÜNCELLEME: Telefon kartı kaldırıldı.
 * Bilgi kartları: E-posta + Adres (Google Maps linkli) + Çalışma Saatleri
 * SEO: Gerçek adres, LocalSEO (NAP tutarlılığı) için değerlidir.
 */

const contactIcons = {
  email: Mail,
  location: MapPin,
  hours: Clock,
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generateSeo({
    title: locale === "tr" ? "İletişim | Endijital" : "Contact | Endijital",
    description:
      locale === "tr"
        ? "Projenizi hayata geçirmek için hazır mısınız? Bize ulaşın, 24 saat içinde size dönüş yapalım."
        : "Ready to bring your project to life? Reach out to us, and we'll get back to you within 24 hours.",
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  const contactInfo = [
    { key: "email", icon: contactIcons.email },
    { key: "location", icon: contactIcons.location },
    { key: "hours", icon: contactIcons.hours },
  ] as const;

  return (
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Page Header */}
        <header className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient leading-[1.08] tracking-[-0.03em]">
            {t("pageTitle")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t("pageDescription")}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information Cards */}
          <div className="space-y-6">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const info = t.raw(`info.${item.key}`) as {
                label: string;
                value: string;
                href: string;
              };
              const isExternal = info.href.startsWith("http");

              return (
                <a
                  key={item.key}
                  href={info.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 p-6 rounded-2xl glassmorphic border border-white/10 hover:scale-[1.02] hover:border-white/20 transition-all duration-300 group min-h-[44px]"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                    <p className="text-lg font-semibold text-foreground leading-snug">
                      {info.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Interactive Form (Client Component) */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}