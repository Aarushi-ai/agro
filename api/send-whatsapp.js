const { sendJson, sendText, applyCors, parseBody } = require("./_http");

module.exports = async function handler(req, res) {
  try {
    applyCors(res);

    if (req.method === "OPTIONS") {
      return sendText(res, 204, "");
    }

    if (req.method !== "POST") {
      return sendJson(res, 405, { error: "Method not allowed" });
    }

    const body = parseBody(req);
    if (body === null) {
      return sendJson(res, 400, { error: "Invalid JSON body" });
    }

    const { customerPhone, customerMsg, companyMsg } = body;

    if (!customerPhone || !customerMsg || !companyMsg) {
      return sendJson(res, 400, {
        error: "Missing required fields: customerPhone, customerMsg, companyMsg",
      });
    }

    const endpoint = process.env.WATI_API_ENDPOINT;
    const token = process.env.WATI_ACCESS_TOKEN;
    const companyPhone = process.env.COMPANY_WHATSAPP_NUMBER;

    if (!endpoint || !token || !companyPhone) {
      console.error("[api/send-whatsapp] Missing WATI environment variables");
      return sendJson(res, 503, {
        error: "WhatsApp service is not configured",
      });
    }

    async function sendWatiMessage(phone, message) {
      const sessionUrl = `${endpoint.replace(/\/$/, "")}/api/v1/sendSessionMessage/${phone}`;
      const response = await fetch(sessionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ messageText: message }),
      });

      if (response.ok) {
        return response;
      }

      const templateUrl = `${endpoint.replace(/\/$/, "")}/api/v1/sendTemplateMessage`;
      return fetch(templateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          template_name: "agrocare_enquiry_confirmation",
          broadcast_name: "website_enquiry",
          receivers: [
            {
              whatsappNumber: phone,
              customParams: [{ name: "name", value: "Farmer" }],
            },
          ],
        }),
      });
    }

    const results = await Promise.allSettled([
      sendWatiMessage(customerPhone, customerMsg),
      sendWatiMessage(companyPhone, companyMsg),
    ]);

    const failed = results.filter(
      (r) => r.status === "rejected" || (r.status === "fulfilled" && !r.value?.ok)
    );

    if (failed.length > 0) {
      console.error("[api/send-whatsapp] WATI delivery failed", failed);
      return sendJson(res, 502, {
        error: "Failed to send one or more WhatsApp messages",
      });
    }

    return sendJson(res, 200, { success: true });
  } catch (err) {
    console.error("[api/send-whatsapp] Unhandled error:", err);
    return sendJson(res, 500, { error: "Internal server error" });
  }
};
