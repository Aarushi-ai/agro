const { sendJson, sendText, applyCors, parseBody } = require("../_http");

module.exports = async function handler(req, res) {
  try {
    applyCors(res);

    if (req.method === "OPTIONS") {
      return sendText(res, 204, "");
    }

    if (req.method === "GET") {
      return sendJson(res, 200, { status: "ok", service: "chat" });
    }

    if (req.method !== "POST") {
      return sendJson(res, 405, { error: "Method not allowed" });
    }

    const body = parseBody(req);
    if (body === null) {
      return sendJson(res, 400, { error: "Invalid JSON body" });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return sendJson(res, 503, {
        error: "Chat API is not configured on the server",
      });
    }

    return sendJson(res, 501, {
      error: "Chat streaming proxy is not enabled for this deployment",
    });
  } catch (err) {
    console.error("[api/chat] Unhandled error:", err);
    return sendJson(res, 500, { error: "Internal server error" });
  }
};
