// functions/api/contact.ts
/**
 * Contact Form API Endpoint
 * ------------------------------------------------
 * Cloudflare Pages Functions ile çalışan serverless API endpoint.
 *
 * ÖNEMLİ: @cloudflare/workers-types'ın Response tipi ile
 * DOM'un Response tipi çakıştığı için PagesFunction tipini
 * kullanmıyoruz. Kendi tipimizi tanımlıyoruz.
 *
 * POST /api/contact
 * Body: { name, email, company?, message }
 */

// Tip güvenli request body
interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

// Tip güvenli response
interface ContactResponse {
  success: boolean;
  message: string;
  data?: {
    name: string;
    email: string;
    timestamp: string;
  };
}

// Kendi PagesFunction tipimizi tanımla (çakışma önleme)
interface PageContext {
  request: Request;
  env: unknown;
  params: Record<string, string>;
}

type PageHandler = (context: PageContext) => Promise<Response>;

/**
 * Email Validation Helper
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Input Sanitization (XSS koruması)
 */
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/**
 * JSON Response Helper
 */
function jsonResponse(data: ContactResponse, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

/**
 * POST /api/contact
 */
export const onRequestPost: PageHandler = async (context) => {
  try {
    // Request body'yi parse et
    const body = await context.request.json() as ContactFormData;

    // Validasyon
    if (!body.name || !body.email || !body.message) {
      return jsonResponse({
        success: false,
        message: "Ad, e-posta ve mesaj alanları zorunludur.",
      }, 400);
    }

    // Email format kontrolü
    if (!isValidEmail(body.email)) {
      return jsonResponse({
        success: false,
        message: "Geçerli bir e-posta adresi giriniz.",
      }, 400);
    }

    // Input sanitization
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      company: body.company ? sanitizeInput(body.company) : undefined,
      message: sanitizeInput(body.message),
    };

    // Minimum uzunluk kontrolü
    if (sanitizedData.name.length < 2) {
      return jsonResponse({
        success: false,
        message: "Ad en az 2 karakter olmalıdır.",
      }, 400);
    }

    if (sanitizedData.message.length < 10) {
      return jsonResponse({
        success: false,
        message: "Mesaj en az 10 karakter olmalıdır.",
      }, 400);
    }

    // ------------------------------------------------
    // GERÇEK PROJELER İÇİN: Burada e-posta gönderimi,
    // veritabanı kaydı veya CRM entegrasyonu yapılabilir.
    // ------------------------------------------------

    console.log("Contact form submitted:", sanitizedData);

    return jsonResponse({
      success: true,
      message: "Mesajınız başarıyla gönderildi! 24 saat içinde size dönüş yapacağız.",
      data: {
        name: sanitizedData.name,
        email: sanitizedData.email,
        timestamp: new Date().toISOString(),
      },
    }, 200);
  } catch (error) {
    console.error("Contact API error:", error);

    return jsonResponse({
      success: false,
      message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    }, 500);
  }
};

/**
 * Diğer HTTP metodları için 405 Method Not Allowed
 */
export const onRequest: PageHandler = async () => {
  return new Response(
    JSON.stringify({
      success: false,
      message: "Bu endpoint yalnızca POST isteklerini kabul eder.",
    } satisfies ContactResponse),
    {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        Allow: "POST",
      },
    }
  );
};