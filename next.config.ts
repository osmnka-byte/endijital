// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // 1. KRİTİK: Cloudflare Pages için statik HTML export
  output: "export",
  
  // 2. KRİTİK: Statik export'ta Next.js Image optimizasyonu çalışmaz, kapatıyoruz
  images: {
    unoptimized: true,
  },

  // 3. Statik sitelerde URL sonlarına / ekler, Cloudflare yönlendirmeleri için en sağlıklı ayar
  trailingSlash: true,

  // 4. React 19 / Next.js 15 modern özellikleri
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // NOT: async headers() fonksiyonu output: 'export' ile ÇALIŞMAZ.
  // Cloudflare Pages için headers, _headers dosyası veya Cloudflare
  // Dashboard üzerinden ayarlanır.
};

export default withNextIntl(nextConfig);