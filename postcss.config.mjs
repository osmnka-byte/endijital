// postcss.config.mjs

/**
 * PostCSS Configuration for Tailwind CSS v4 + Next.js 15/16
 * 
 * @type {import('postcss-load-config').Config}
 * 
 * Bu dosya SADECE PostCSS eklenti konfigürasyonunu içerir.
 * CSS kuralları src/app/globals.css içinde yer alır.
 */
const config = {
  plugins: {
    // Tailwind CSS v4 için yeni PostCSS eklentisi
    // Autoprefixer artık dahil, ayrı eklenmesine gerek yok
    "@tailwindcss/postcss": {},
  },
};

export default config;