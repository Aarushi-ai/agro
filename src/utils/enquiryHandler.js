// ─────────────────────────────────────────────
// STEP 1: Categorize with Groq (FREE forever)
// 14,400 requests/day, never expires
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
              content: 'You are a classifier for AgroCare, an organic farming inputs company in Gujarat, India. Return ONLY valid JSON. No markdown. No explanation. No extra text whatsoever.'
            },
            {
              role: 'user',
              content: `Classify this customer enquiry into ONE category.

CATEGORIES:
- product_enquiry (asking about products, how to use, ingredients)
- pricing_complaint (price too high, asking for discount, bulk price)
- complaint (bad experience, product issue, delivery problem)
- farm_advisory (soil help, crop problem, farming guidance)
- bulk_order (large quantity, dealer, distributor enquiry)
- partnership (business tie-up, FPO, institutional)
- export (international order, export enquiry)
- order_status (where is order, delivery tracking)
- combo_enquiry (asking about combo solution or bundles)
- general (anything else)

Subject: "${subject}"
Message: "${message}"

Return ONLY this exact JSON:
{"category":"category_name","priority":"high|medium|low","summary":"max 12 words"}`
            }
          ],
          temperature: 0.1,
          max_tokens: 100,
        })
      }
    );
    if (!res.ok) throw new Error('Groq error');
    const data = await res.json();
    const raw = data.choices[0].message.content.trim();
    return JSON.parse(raw.replace(/```json|```/g, '').trim());
  } catch (err) {
    console.warn('[AgroCare] AI categorization failed:', err);
    return { category: 'general', priority: 'medium', 
             summary: 'Customer enquiry received' };
  }
}

// ─────────────────────────────────────────────
// STEP 2: WhatsApp message templates
// Branded, warm, category-specific
// ─────────────────────────────────────────────
function getCustomerMessage(name, category) {
  const footer = `\n\n🌿 *AgroCare — Certified Organic Agri-Inputs*\n_Seaweed-based. Farmer-trusted. Since 2011._\n📞 +91-94272 05179`;

  const templates = {
    product_enquiry:
`Hello ${name}! 🌱

Thank you for your interest in *AgroCare* products!

Your product enquiry has been received. Our agri-expert will contact you within *24 hours* with full product details, dosage guidance, and pricing.

✅ _Enquiry registered successfully_` + footer,

    pricing_complaint:
`Hello ${name}! 🙏

Thank you for reaching out to *AgroCare*.

We understand pricing matters. Our team will contact you within *24 hours* with:
- Best available pricing
- Bulk discount options  
- Govt scheme benefits (up to 50% subsidy under PM-PRANAM)

✅ _Your feedback matters to us_` + footer,

    complaint:
`Hello ${name},

We sincerely apologize for the inconvenience. 🙏

Your complaint has been logged as *Priority Case #AC-${Date.now().toString().slice(-6)}*.

Our team will personally contact you within *48 hours* to resolve this completely. We value your trust.` + footer,

    farm_advisory:
`Hello ${name}! 🌾

Thank you for seeking farm advisory from *AgroCare*!

Our certified agri-expert will call you within *12 hours* for a *free consultation*.

Please keep ready:
- Your crop name and current stage
- Soil type if known
- Photo of the problem (send on WhatsApp)

📞 Or call us directly: +91-94272 05179` + footer,

    bulk_order:
`Hello ${name}! 📦

Thank you for your bulk order enquiry at *AgroCare*!

🔴 *High Priority — Fast Response*

Our sales team will contact you within *6 hours* with:
- Bulk pricing + volume discounts
- Credit terms available
- Delivery schedule
- Distributor partnership options

✅ _Priority enquiry registered_` + footer,

    partnership:
`Hello ${name}! 🤝

Thank you for your partnership interest in *AgroCare*!

We actively welcome collaborations with farmers, dealers, FPOs, NGOs, and institutions.

Our business development team will contact you within *24 hours*.

✅ _Partnership enquiry registered_` + footer,

    export:
`Hello ${name}! 🌍

Thank you for your export enquiry at *AgroCare*!

We export certified organic seaweeds and bio-stimulants internationally. Our export team will contact you within *24 hours* with:
- Product specifications + COA documents
- ISO 9001:2015 certification details
- Export pricing and MOQ

✅ _Export enquiry registered_` + footer,

    order_status:
`Hello ${name}! 📦

Thank you for contacting *AgroCare* about your order.

Our team will check your order status and update you within *6 hours*.

For faster help, please share your order details on WhatsApp:
📱 +91-94272 05179

✅ _Your query is noted_` + footer,

    combo_enquiry:
`Hello ${name}! 🎁

Thank you for your interest in *AgroCare's Combo Solution*!

Our combo gives you *VanChetan Davya + Energy Balls + Humic Acid* — everything for 1 acre, at *30–35% less* than buying separately.

Our team will contact you within *12 hours* with custom pricing for your farm size.

✅ _Combo enquiry registered_` + footer,

    general:
`Hello ${name}! 👋

Thank you for connecting with *AgroCare* — India's trusted certified organic agri-inputs company!

Your message has been received successfully. ✅

Our team will reach out to you soon. We truly appreciate your time!` + footer,
  };

  return templates[category] || templates.general;
}

function getCompanyMessage(name, phone, subject, category, priority, summary) {
  const icon = { high: '🔴', medium: '🟡', low: '🟢' }[priority] || '🟡';
  return `🔔 *NEW ENQUIRY — AgroCare Website*
━━━━━━━━━━━━━━━━━━━━
*Category:* ${category.replace(/_/g,' ').toUpperCase()}
*Priority:* ${priority.toUpperCase()} ${icon}
*Summary:* ${summary}
━━━━━━━━━━━━━━━━━━━━
*From:* ${name}
*Phone:* ${phone}
*Subject:* ${subject}
━━━━━━━━━━━━━━━━━━━━
_Reply to customer's WhatsApp to follow up_`;
}

// ─────────────────────────────────────────────
// STEP 3: Main export — called from form submit
// ─────────────────────────────────────────────
export async function handleEnquirySubmit({ name, phone, subject, message }) {
  // Normalize phone
  let customerPhone = phone.trim().replace(/\s+/g, '').replace(/[^0-9+]/g, '');
  if (!customerPhone.startsWith('+')) {
    customerPhone = '91' + customerPhone.replace(/^0/, '');
  } else {
    customerPhone = customerPhone.replace('+', '');
  }

  // AI categorize
  const { category, priority, summary } = 
    await categorizeEnquiry(subject, message);

  // Send via backend
  const response = await fetch('/api/send-whatsapp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerPhone,
      customerMsg: getCustomerMessage(name, category),
      companyMsg: getCompanyMessage(name, phone, subject, category, priority, summary),
      companyPhone: process.env.COMPANY_WHATSAPP_NUMBER
    })
  });

  if (!response.ok) throw new Error('Send failed');
  return { success: true, category, priority };
}
