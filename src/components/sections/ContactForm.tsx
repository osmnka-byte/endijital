"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * İLETİŞİM FORMU (Web3Forms Entegrasyonu)
 * ------------------------------------------------
 * DOĞRU ENDPOINT: https://api.web3forms.com/submit
 *
 * Güvenlik:
 * - access_key PUBLIC (Web3Forms tasarım gereği, risk yok)
 * - botcheck honeypot: gizli text input, botlar doldurur → sessiz reddetme
 * - Web3Forms sunucu tarafı: rate limiting + Akismet spam filtresi
 *
 * Gizlilik:
 * - Gerçek alıcı (gmail) KODA YAZILMAZ, Web3Forms dashboard'ında tanımlı
 * - UI'da yalnızca info@endijital.com gösterilir
 *
 * SEO / Mobil / A11y:
 * - Honeypot input render edilmez (display:none) → SEO'ya etkisi yok
 * - aria-hidden + tabIndex=-1 → ekran okuyucular atlar (WCAG uyumlu)
 * - Tüm dokunma hedefleri ≥44px (mobil uyum)
 * - label htmlFor bağlantıları korunur (form erişilebilirliği)
 */

const WEB3FORMS_ACCESS_KEY = "8fd6f674-af3d-4a99-9cee-da772bb5238f";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type FormState = "idle" | "sending" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
  botcheck: string;
}

// Web3Forms response tipi
interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  company: "",
  message: "",
  botcheck: "",
};

export default function ContactForm() {
  const t = useTranslations("contact.form");

  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot: botcheck doluysa bot → sessizce "başarılı" gibi davran
    if (formData.botcheck.trim() !== "") {
      setFormState("success");
      setFormData(initialFormData);
      setTimeout(() => setFormState("idle"), 3000);
      return;
    }

    setFormState("sending");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          company: formData.company || "-",
          message: formData.message,
          subject: `Yeni İletişim: ${formData.name} (${formData.email})`,
          from_name: "Endijital Web Sitesi",
          replyto: formData.email,
        }),
      });

      const result = (await response.json()) as Web3FormsResponse;

      if (result.success) {
        setFormState("success");
        setFormData(initialFormData);
        setTimeout(() => setFormState("idle"), 5000);
      } else {
        console.error("Web3Forms rejected:", result);
        setFormState("error");
        setTimeout(() => setFormState("idle"), 5000);
      }
    } catch (error) {
      console.error("Contact form network error:", error);
      setFormState("error");
      setTimeout(() => setFormState("idle"), 5000);
    }
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isDisabled = formState === "sending" || formState === "success";

  const inputClasses = cn(
    "w-full px-4 py-3 rounded-lg",
    "bg-secondary/50 border border-white/10",
    "text-foreground placeholder:text-muted-foreground",
    "focus:outline-none focus:ring-2 focus:ring-primary",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "transition-all duration-200"
  );

  return (
    <div className="glassmorphic rounded-2xl p-6 md:p-8 border border-white/10 card-glow">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
        {/* HONEYPOT (Gizli text input - botlar doldurur) */}
        <div style={{ display: "none" }} aria-hidden="true">
          <label htmlFor="botcheck">Bu alanı boş bırakın</label>
          <input
            type="text"
            id="botcheck"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            value={formData.botcheck}
            onChange={handleChange("botcheck")}
          />
        </div>

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            {t("name.label")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            minLength={2}
            disabled={isDisabled}
            value={formData.name}
            onChange={handleChange("name")}
            placeholder={t("name.placeholder")}
            className={inputClasses}
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            {t("email.label")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isDisabled}
            value={formData.email}
            onChange={handleChange("email")}
            placeholder={t("email.placeholder")}
            className={inputClasses}
          />
        </div>

        {/* Company Field */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
            {t("company.label")}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            disabled={isDisabled}
            value={formData.company}
            onChange={handleChange("company")}
            placeholder={t("company.placeholder")}
            className={inputClasses}
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            {t("message.label")}
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            disabled={isDisabled}
            value={formData.message}
            onChange={handleChange("message")}
            placeholder={t("message.placeholder")}
            rows={5}
            className={cn(inputClasses, "resize-none")}
          />
        </div>

        {/* Submit Button - min 44px dokunma hedefi */}
        <button
          type="submit"
          disabled={isDisabled}
          className={cn(
            "w-full min-h-[44px] flex items-center justify-center gap-2 px-6 py-4 rounded-lg",
            "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
            "text-white font-semibold text-lg",
            "hover:shadow-2xl hover:shadow-purple-500/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-all duration-300"
          )}
        >
          {formState === "sending" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>{t("sending")}</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" aria-hidden="true" />
              <span>{t("submit")}</span>
            </>
          )}
        </button>

        {/* Status Messages */}
        <AnimatePresence>
          {formState === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              role="status"
              aria-live="polite"
              className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20"
            >
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" aria-hidden="true" />
              <p className="text-sm text-green-500">{t("success")}</p>
            </motion.div>
          )}

          {formState === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              role="alert"
              aria-live="assertive"
              className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" aria-hidden="true" />
              <p className="text-sm text-red-500">{t("error")}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}