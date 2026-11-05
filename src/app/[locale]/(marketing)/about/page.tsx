// src/app/[locale]/(marketing)/about/page.tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Award, Target, Eye, Heart } from "lucide-react";
import { generateSeo } from "@/lib/seo";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://endijital.com";

const valueIcons = [Award, Target, Eye, Heart];
const valueGradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generateSeo({
    title: locale === "tr" ? "Hakkımızda | Endijital" : "About Us | Endijital",
    description:
      locale === "tr"
        ? "Endijital'in hikayesi, misyonumuz ve dijital dönüşüm vizyonumuz."
        : "Endijital's story, our mission, and our digital transformation vision.",
    path: "/about",
    locale,
  });
}

function generateAboutPageJsonLd(locale: string) {
  const isTr = locale === "tr";
  const currentUrl = `${BASE_URL}/${locale}/about`;
  const homeUrl = `${BASE_URL}/${locale}`;

  const aboutPage = {
    "@type": "AboutPage",
    "@id": `${currentUrl}#webpage`,
    url: currentUrl,
    name: isTr ? "Hakkımızda | Endijital" : "About Us | Endijital",
    description: isTr
      ? "Endijital'in hikayesi, misyonumuz ve dijital dönüşüm vizyonumuz."
      : "Endijital's story, our mission, and our digital transformation vision.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    inLanguage: isTr ? "tr-TR" : "en-US",
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isTr ? "Ana Sayfa" : "Home",
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isTr ? "Hakkımızda" : "About Us",
        item: currentUrl,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [aboutPage, breadcrumb],
  };
}

/**
 * HAKKIMIZDA SAYFASI (Server Component)
 */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about_page");

  const story = t.raw("story") as { title: string; paragraphs: string[] };
  const mission = t.raw("mission") as { title: string; text: string };
  const vision = t.raw("vision") as { title: string; text: string };
  const values = t.raw("values") as {
    title: string;
    items: Array<{ title: string; description: string }>;
  };

  const jsonLd = generateAboutPageJsonLd(locale);

  return (
    <main className="pt-32 pb-20">
      {/* AboutPage + Breadcrumb Unified JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="container mx-auto px-4 md:px-6">
        {/* Page Header */}
        <header className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            {t("pageTitle")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t("pageDescription")}
          </p>
        </header>

        <div className="max-w-5xl mx-auto space-y-16">
          {/* Story */}
          <section aria-labelledby="story-title">
            <h2 id="story-title" className="text-3xl font-bold mb-8 text-foreground">
              {story.title}
            </h2>
            <div className="space-y-6">
              {story.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glassmorphic rounded-2xl p-8 border border-white/10 card-glow">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 mb-6">
                <Target className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{mission.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{mission.text}</p>
            </div>

            <div className="glassmorphic rounded-2xl p-8 border border-white/10 card-glow">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 mb-6">
                <Eye className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{vision.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{vision.text}</p>
            </div>
          </div>

          {/* Values */}
          <section aria-labelledby="values-title">
            <h2 id="values-title" className="text-3xl font-bold mb-8 text-center text-foreground">
              {values.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.items.map((value, index) => {
                const Icon = valueIcons[index % valueIcons.length];
                const gradient = valueGradients[index % valueGradients.length];

                return (
                  <div
                    key={value.title}
                    className="glassmorphic rounded-2xl p-6 border border-white/10 card-glow hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} flex-shrink-0`}
                      >
                        <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-foreground">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}