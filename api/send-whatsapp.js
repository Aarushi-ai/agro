module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { customerPhone, customerMsg, companyMsg } = req.body;
  const endpoint = process.env.WATI_API_ENDPOINT;
  const token = process.env.WATI_ACCESS_TOKEN;
  const companyPhone = process.env.COMPANY_WHATSAPP_NUMBER;

  async function sendWatiMessage(phone, message) {
    const r = await fetch(
      `${endpoint}/api/v1/sendSessionMessage/${phone}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ messageText: message })
      }
    );
    if (!r.ok) {
      return fetch(`${endpoint}/api/v1/sendTemplateMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          template_name: 'agrocare_enquiry_confirmation',
          broadcast_name: 'website_enquiry',
          receivers: [{
            whatsappNumber: phone,
            customParams: [{ name: 'name', value: 'Farmer' }]
          }]
        })
      });
    }
    return r;
  }

  try {
    await Promise.all([
      sendWatiMessage(customerPhone, customerMsg),
      sendWatiMessage(companyPhone, companyMsg)
    ]);
    res.json({ success: true });
  } catch (err) {
    console.error('[AgroCare Wati Error]:', err);
    res.status(500).json({ error: err.message });
  }
};
