const twilio = require('twilio');

module.exports = async (req, res) => {
  // Allow CORS from same domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { customerPhone, customerMsg, companyMsg } = req.body;

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await Promise.all([
      client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: `whatsapp:${customerPhone}`,
        body: customerMsg
      }),
      client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: `whatsapp:${process.env.COMPANY_WHATSAPP_NUMBER}`,
        body: companyMsg
      })
    ]);

    res.json({ success: true });

  } catch (err) {
    console.error('[Agrocare WhatsApp Error]:', err.message);
    res.status(500).json({ error: err.message });
  }
};
