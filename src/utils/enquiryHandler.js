// ─────────────────────────────────────────────
// STEP 1: Categorize enquiry using Groq (FREE)
// Groq: 14,400 requests/day, never expires
// Model: llama-3.1-8b-instant (fast + accurate)
// ─────────────────────────────────────────────
async function categorizeEnquiry(subject, message) {
  try {
    const res = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: 'You are a classifier for Agrocare, an organic farming company. Return ONLY valid JSON. No markdown. No explanation. No extra text.'
            },
            {
              role: 'user',
              content: `Classify this customer enquiry into ONE category.

CATEGORIES:
- product_enquiry (asking about products, ingredients, how to use)
- pricing_complaint (price too high, asking for discount, bulk price)
- complaint (bad experience, product not working, delivery issue)
- farm_advisory (soil help, crop help, farming guidance needed)
- bulk_order (large quantity order, dealer, distributor)
- partnership (business tie-up, collaboration, FPO)
- export (international order, export enquiry)
- order_status (where is my order, delivery tracking)
- general (anything else)

Subject: "${subject}"
Message: "${message}"

Return ONLY this JSON format:
{"category":"category_name","priority":"high|medium|low","summary":"one sentence under 12 words"}`
            }
          ],
          temperature: 0.1,
          max_tokens: 100,
        })
      }
    );

    if (!res.ok) throw new Error('Groq API error');
    const data = await res.json();
    const raw = data.choices[0].message.content.trim();
    const clean = raw.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);

  } catch (err) {
    console.warn('[Agrocare] AI categorization failed, using default:', err);
    return {
      category: 'general',
      priority: 'medium',
      summary: 'Customer enquiry received'
    };
  }
}

// ─────────────────────────────────────────────
// STEP 2: WhatsApp message templates
// One per category — warm, professional, branded
// ─────────────────────────────────────────────
function getCustomerMessage(name, category) {
  const base = `\n\n🌿 *Agrocare — Certified Organic Agri-Inputs*\n_Growing Naturally Since 2011_`;

  const templates = {
    product_enquiry:
      `Hello ${name}! 🌱\n\nThank you for your interest in *Agrocare* products!\n\nYour product enquiry has been received. Our agri-expert will contact you within *24 hours* with full product details, application guidance, and pricing.\n\n✅ _Enquiry registered successfully_` + base,

    pricing_complaint:
      `Hello ${name}! 🙏\n\nThank you for reaching out to *Agrocare*.\n\nWe understand pricing matters. Our team will contact you within *24 hours* with:\n• Best available pricing\n• Bulk discount options\n• Government scheme benefits (up to 50% subsidy)\n\n✅ _Your feedback is important to us_` + base,

    complaint:
      `Hello ${name},\n\nWe sincerely apologize for the inconvenience. 🙏\n\nYour complaint has been logged as *Priority Case #AC-${Date.now().toString().slice(-6)}*.\n\nOur team will personally contact you within *48 hours* to resolve this. We value your trust in Agrocare.` + base,

    farm_advisory:
      `Hello ${name}! 🌾\n\nThank you for seeking farm advisory from *Agrocare*!\n\nOur certified agri-expert will call you within *12 hours* for a *free consultation*.\n\nPlease keep ready:\n• Your crop name and growth stage\n• Soil type (if known)\n• Current problem description\n\n📞 Or call directly: +91-XXXXXXXXXX` + base,

    bulk_order:
      `Hello ${name}! 📦\n\nThank you for your bulk order enquiry at *Agrocare*!\n\n🔴 *High Priority — Fast Response*\n\nOur sales team will contact you within *6 hours* with:\n• Best bulk pricing\n• Credit terms available\n• Delivery schedule\n• Distributor partnership benefits\n\n✅ _Your enquiry is our priority_` + base,

    partnership:
      `Hello ${name}! 🤝\n\nThank you for your partnership interest in *Agrocare*!\n\nWe actively welcome collaborations with farmers, dealers, FPOs, NGOs, and institutions.\n\nOur business development team will contact you within *24 hours* to discuss opportunities.\n\n✅ _Partnership enquiry registered_` + base,

    export:
      `Hello ${name}! 🌍\n\nThank you for your export enquiry at *Agrocare*!\n\nWe export certified organic seaweeds and bio-stimulants internationally.\n\nOur export team will contact you within *24 hours* with:\n• Product specifications\n• ISO 9001 certification details\n• Export pricing and MOQ\n\n✅ _Export enquiry registered_` + base,

    order_status:
      `Hello ${name}! 📦\n\nThank you for contacting *Agrocare* about your order.\n\nOur team will check your order status and update you within *6 hours*.\n\nFor faster help, please WhatsApp your order details to:\n📱 +91-XXXXXXXXXX\n\n✅ _Your query is noted_` + base,

    general:
      `Hello ${name}! 👋\n\nThank you for connecting with *Agrocare* — India's trusted certified organic agri-inputs company!\n\nYour message has been received successfully. ✅\n\nOur team will reach out to you soon.\n\n_Thank you for your enquiry. We truly appreciate your time!_` + base,
  };

  return templates[category] || templates.general;
}

function getCompanyMessage(name, phone, subject, category, priority, summary) {
  const priorityIcon = {
    high: '🔴',
    medium: '🟡',
    low: '🟢'
  }[priority] || '🟡';

  return `🔔 *NEW ENQUIRY — Agrocare Website*
━━━━━━━━━━━━━━━━━━━━
*Category:* ${category.replace(/_/g,' ').toUpperCase()}
*Priority:* ${priority.toUpperCase()} ${priorityIcon}
*Summary:* ${summary}
━━━━━━━━━━━━━━━━━━━━
*From:* ${name}
*Phone:* ${phone}
*Subject:* ${subject}
━━━━━━━━━━━━━━━━━━━━
_Reply to customer's WhatsApp directly to follow up_`;
}

// ─────────────────────────────────────────────
// STEP 3: Main export function
// Called from the contact form onSubmit
// ─────────────────────────────────────────────
export async function handleEnquirySubmit({ name, phone, subject, message }) {

  // Normalize phone to E.164 format for WhatsApp
  let customerPhone = phone.trim().replace(/\s+/g, '');
  if (!customerPhone.startsWith('+')) {
    customerPhone = '+91' + customerPhone.replace(/^0/, '');
  }

  // Step 1: AI categorization (Groq — free)
  const { category, priority, summary } =
    await categorizeEnquiry(subject, message);

  // Step 2: Send WhatsApp via backend endpoint
  // (credentials stay server-side, never exposed to browser)
  const response = await fetch('/api/send-whatsapp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerPhone,
      customerMsg: getCustomerMessage(name, category),
      companyMsg: getCompanyMessage(name, phone, subject, category, priority, summary)
    })
  });

  if (!response.ok) {
    throw new Error('WhatsApp send failed');
  }

  return { success: true, category, priority };
}
