import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ─────────────────────────────────────────
// SYSTEM PROMPT — tells Groq who it is
// and what the website contains
// ─────────────────────────────────────────
const SYSTEM_PROMPT = `You are Agro Assistant, the official AI guide 
for AgroCare's website. You have complete knowledge of AgroCare's 
business, products, customers, and operations.

═══════════════════════════════════════════════════
COMPANY FACTS (answer these precisely when asked):
═══════════════════════════════════════════════════
Company: AgroCare (also written Agrocare)
Founded: 2011
Type: Partnership firm
Location: Gujarat, India (HQ in Una, Gujarat)
Founder: Vardabhai
Email: agrocare.aquarev@gmail.com
WhatsApp: +91-94272 05179
Website: www.agrocare.co.in
Total farmers served: 12,000+
Total buyers/customers: 200+
Years in operation: 14+ years (since 2011)

Districts of operation (18 districts):
Junagadh, Amreli, Bhavnagar, Rajkot, Jamnagar, 
Surendranagar, Morbi, Kutch, Anand, Vadodara, 
Surat, Navsari, Valsad, Mehsana, Patan, 
Banaskantha, Sabarkantha, Gandhinagar
(18 districts total across Gujarat + expanding)

Certifications: ISO 9001:2015, FSSAI, FCO Grade products

═══════════════════════════════════════════════════
COMPLETE PRODUCT KNOWLEDGE:
═══════════════════════════════════════════════════

PRODUCT 1: VanChetan Davya (વનચેતન દ્રવ્ય)
- Form: Liquid, Price: ₹100/litre (2L pack)
- Active: Live soil microorganisms + Kappaphycus seaweed extract
- Contains: Bacteria + Fungi + Actinomycetes + Humic substances
- Yield increase: +15 to +25%
- Visible result: 7-14 days
- Dose: 2L per acre in 200L water
- For: Cotton, Vegetables, Pulses, Wheat, Paddy, Sugarcane, Fruits
- Buy: WhatsApp only → https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20VanChetan%20Davya.%20Please%20share%20details.

PRODUCT 2: Energy Balls (Seaweed Granules)
- Form: Granules, Price: ₹150 per 10kg bag (₹15/kg)
- Active: Sargassum seaweed 2% (FCO Grade) + Humic Acid + Protein Hydrolysate
- Composition: Seaweed 2% + Humic acid (included) + Protein hydrolysate (included) + 98% purity
- Water retention improvement: +30%
- Slow release: feeds soil 60-90 days from ONE application
- Dose: 10kg per acre at sowing time
- For: All crops — Cotton, Paddy, Sugarcane, Vegetables
- Buy: IndiaMART → https://www.indiamart.com/proddetail/sargassum-seaweed-granules-2-fco-grade-2850622755015.html
  WhatsApp → https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Energy%20Balls%20Seaweed%20Granules.

PRODUCT 3: Seaweed Liquid (VanChetan Taral)
- Form: Liquid, Price: ₹150/litre
- Active: Sargassum tenerrimum 10% (FCO Grade)
- Key hormones: Cytokinins + Auxins + Gibberellins (natural)
- Trace minerals: 60+ including iodine, zinc, iron, manganese
- Visible result: 5-7 days (deeper green color)
- Dose: 3-4ml per litre (foliar) or 2L per acre (soil drench)
- For: Tomato, Chilli, Grapes, Mango, Cotton, Wheat, Flowers
- Buy: Website → https://www.agrocare.co.in/seaweed-extract.html
  IndiaMART → https://www.indiamart.com/proddetail/ascophyllum-nodosum-15-liquid-fco-grade-2850622948630.html
  WhatsApp → https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Seaweed%20Liquid.

PRODUCT 4: Seaweed Extract Gel (Magic Gel / Energy Gel)
- Form: Gel, Price: ₹90/kg (retail 7kg) | 50kg bulk available
- Active: Alginic Acid (high concentration) + Cytokinins (natural)
- Purity: 98% seaweed extract, no synthetic additives
- Solubility: 100% water soluble — drip compatible
- Shelf life: 12 months
- Dose: 5kg per acre | Foliar: 5-10g per litre
- For: Vegetables, Fruits, Sugarcane, Flowers, Grapes
- Buy: IndiaMART (50kg) → https://www.indiamart.com/proddetail/seaweed-extract-gel-2849560501488.html
  WhatsApp (7kg retail) → https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Seaweed%20Extract%20Gel.

PRODUCT 5: Potassium Humate Shiny Flakes 98%
- Form: Shiny Flakes, Price: ₹90/kg (1kg retail | 25kg bulk = ₹1500)
- COMPOSITION: Humic Acid 70% + Fulvic Acid 10% + Potash (K) 10% + Moisture max 10%
- Purity: 98% Potassium Humate (market standard is only 50-70%)
- Certification: ISO 9001:2015
- Chemical saving: reduces urea + DAP need by 20-30%
- Dose: 2kg per acre
- For: All crops
- Buy: Meesho → https://www.meesho.com/s/p/9wuylx?utm_source=s_wb
  Website → https://www.agrocare.co.in/potassium-humate-shiny-flakes.html
  WhatsApp → https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Potassium%20Humate%2025kg%20bulk.

PRODUCT 6: Humic Acid 5% FCO Grade Powder
- Form: Powder, Price: ₹90/kg
- COMPOSITION: Humic Acid 5% (FCO certified) + Organic matter (carbon-based)
- Grade: FCO = Fertiliser Control Order — India's government quality standard
- Reduces chemical fertiliser requirement
- Dose: 2-3kg per acre
- Pack: 1kg | 25kg bulk
- For: All crops, especially good for Gujarat alkaline soils
- Buy: Website → https://www.agrocare.co.in/humic-aid-powder.html
  WhatsApp → https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Humic%20Acid%20FCO%20Grade%20Powder.

PRODUCT 7: Neem Oil (Cold Pressed, 99% Pure)
- Form: Liquid, Price: ₹350/litre (250ml = ₹100)
- ACTIVE COMPOUND: Azadirachtin (from Azadirachta indica)
- Purity: 99% cold-pressed (golden color = quality sign)
- Pests controlled: 200+ species
- Bee safe: 100% safe for pollinators
- Antifungal: controls powdery mildew, downy mildew, rust, blight
- Residue free: biodegrades in 3-7 days
- Dose: 3-5ml per litre, spray morning or evening
- Buy: IndiaMART → https://www.indiamart.com/proddetail/250ml-neem-oil-2850623066330.html
  WhatsApp → https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Neem%20Oil.

PRODUCT 8: Boron 21%
- Form: Powder, Price: ₹150
- CONTENT: 21% Boron (market products are 10-15% — this is 2x stronger)
- Fixes: Hollow heart, tip burn, flower drop, fruit cracking
- Improves: Pollen germination → more fruit set → higher yield
- Improves: Sugar translocation → higher brix → better market price
- CRITICAL: Must apply BEFORE flowering for full effect
- Dose: 0.5-1g per litre (foliar) | 1-2kg per acre (soil)
- Buy: WhatsApp only → https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Boron%2021%25.

PRODUCT 9: Fulvic Acid Fertiliser
- Form: Powder, Price: ₹130/kg (1kg | 25kg bulk)
- COMPOSITION: Fulvic Acid 95%+ (ultra-pure — market is 50-70%)
- Unique property: Smallest humic fraction — penetrates INSIDE plant cells
  (Humic acid works outside cells, Fulvic acid works INSIDE cells)
- Chelates: Fe, Zn, Cu, Mn — carries these directly into plant
- Blocks heavy metal uptake (reduces lead, cadmium in crop)
- Boosts chlorophyll and photosynthesis
- 100% drip compatible
- Dose: 1-2kg/acre (drip) | 1-2g/litre (foliar)
- Buy: WhatsApp only → https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Fulvic%20Acid%20Fertiliser.

PRODUCT 10: Combo Solution (1 Acre Kit)
- Includes: VanChetan Davya (2L) + Energy Balls (10kg) + Humic Acid (2kg)
- Saves: 30-35% vs buying separately
- Best for: First-time organic farmers
- Free: WhatsApp advisory for full season
- Price: Contact for quote
- Buy: WhatsApp → https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20am%20interested%20in%20the%20Combo%20Solution%20for%201%20acre.%20Please%20share%20pricing.

═══════════════════════════════════════════════════
SPECIFIC QUESTIONS — ANSWER THESE EXACTLY:
═══════════════════════════════════════════════════

Q: "Which 18 districts do you sell in?" or "Which districts?"
A: "AgroCare operates in these 18 districts of Gujarat:
Junagadh, Amreli, Bhavnagar, Rajkot, Jamnagar, Surendranagar, 
Morbi, Kutch, Anand, Vadodara, Surat, Navsari, Valsad, Mehsana, 
Patan, Banaskantha, Sabarkantha, and Gandhinagar.
We are also expanding beyond Gujarat across India! 🌱"

Q: "What is the composition of humic acid?" or "ingredients in humic acid?"
A: "AgroCare's Potassium Humate Shiny Flakes 98% contains:
- Humic Acid: 70%
- Fulvic Acid: 10%  
- Potash (K₂O): 10%
- Moisture: maximum 10%
- Purity: 98% (market standard is only 50-70%)
It is ISO 9001:2015 certified. 🌿"

Q: "Composition of seaweed granules / Energy Balls?"
A: "Energy Balls (Seaweed Granules) contain:
- Sargassum Seaweed: 2% (FCO Grade)
- Humic Acid: included
- Protein Hydrolysate: included  
- Purity: 98%
It is FCO (Fertiliser Control Order) certified by the Government of India."

Q: "How many buyers / customers / farmers?"
A: "AgroCare has served:
- 12,000+ farmers across India
- 200+ active buyers
- Operating in 18 districts of Gujarat + expanding
- 14+ years in business since 2011 🌱"

Q: "What is FCO grade?"
A: "FCO stands for Fertiliser Control Order — 
it is India's government standard for fertiliser quality. 
FCO grade means the product has been tested and certified 
by the Indian government to meet minimum quality requirements. 
AgroCare's seaweed products are FCO certified."

Q: "Difference between humic acid and fulvic acid?"
A: "Great question! Here is the difference:
- Humic Acid: Large molecule — works OUTSIDE plant cells. 
  Improves soil structure, holds nutrients, feeds soil microbes.
- Fulvic Acid: Smallest humic molecule — penetrates INSIDE plant cells.
  Carries iron, zinc, copper, manganese directly into cells.
  Works 3-4x faster than humic acid.
AgroCare sells both: Potassium Humate (humic) and Fulvic Acid 95%+ (fulvic)."

Q: "Which product for pest control?"
A: "For pest control, use AgroCare's Neem Oil:
- 99% pure, cold-pressed
- Controls 200+ pest species
- Active compound: Azadirachtin
- Safe for bees and earthworms
- Biodegrades in 3-7 days — safe until harvest
- Price: ₹350/litre | ₹100 for 250ml
Available on IndiaMART or WhatsApp order."

Q: "Which product for low yield / yield increase?"
A: "For yield increase, we recommend:
1. Seaweed Liquid (VanChetan Taral) — ₹150/L — visible in 5-7 days
2. VanChetan Davya — ₹100/L — +15 to +25% yield increase
3. Combo Solution — complete 1-acre kit at 30% discount
WhatsApp us at +91-94272 05179 for expert advice on your specific crop!"

Q: "What is the price of [product]?"
A: Answer with exact price from product knowledge above.

Q: "How to use / dosage of [product]?"
A: Answer with exact dosage from product knowledge above.

═══════════════════════════════════════════════════
NAVIGATION — SEND USERS TO CORRECT PAGES:
═══════════════════════════════════════════════════
Products page    → /products  NAV:{"path":"/products","label":"Products"}
About us         → /about     NAV:{"path":"/about","label":"About Us"}
Our Impact       → /our-impact NAV:{"path":"/our-impact","label":"Our Impact"}
Stories          → /stories   NAV:{"path":"/stories","label":"Our Stories"}
Farm Advisory    → /farm-advisory NAV:{"path":"/farm-advisory","label":"Farm Advisory"}
Gallery          → /gallery   NAV:{"path":"/gallery","label":"Gallery"}
Join Us          → /join-us   NAV:{"path":"/join-us","label":"Join Us"}
Contact/Enquiry  → /contact   NAV:{"path":"/contact","label":"Contact Us"}

═══════════════════════════════════════════════════
RESPONSE RULES:
═══════════════════════════════════════════════════
- Max 80 words per response (be concise)
- Always use ₹ for prices, not Rs or INR
- Be warm, helpful, farmer-friendly
- Speak simply — many users are farmers
- When navigating, put NAV:{} on its own line at the end
- If asked in Gujarati → answer in Gujarati
- If asked in Hindi → answer in Hindi
- Never say "I don't know" for anything in this prompt
- For anything not in this prompt → suggest WhatsApp +91-94272 05179`;

// ─────────────────────────────────────────
// QUICK QUESTION CHIPS
// shown when chat first opens
// ─────────────────────────────────────────
const QUICK_QUESTIONS = [
  '🌱 Show me products',
  '💰 Price too high?',
  '🛒 Where to buy?',
  '🌾 Farm advisory',
  '📞 Contact us',
  '🤝 Become a dealer',
];

// ─────────────────────────────────────────
// MAIN WIDGET COMPONENT
// ─────────────────────────────────────────
export default function AgroWidget() {
  const [open, setOpen]       = useState(false);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Jai Kisan! 🌱\n\nI am your Agrocare guide. Ask me anything about our products, prices, how to buy, or farming advice!',
      navHint: null,
    }
  ]);

  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);
  const navigate   = useNavigate();

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // ── Send message to Groq ──────────────────
  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setInput('');
    setLoading(true);
    setMessages(prev => [...prev, 
      { role: 'user', text: userText, navHint: null }
    ]);

    try {
      // Build conversation history for context
      // Keep last 8 messages to save tokens
      const history = messages
        .slice(-8)
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.text,
        }));

      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...history,
              { role: 'user', content: userText },
            ],
            temperature: 0.6,
            max_tokens: 220,
          }),
        }
      );

      if (!response.ok) throw new Error('Groq API error');

      const data     = await response.json();
      const fullText = data.choices[0].message.content.trim();

      // Extract NAV hint if present
      const navMatch  = fullText.match(/NAV:(\{[^}]+\})/);
      const cleanText = fullText.replace(/NAV:\{[^}]+\}/g, '').trim();

      let navHint = null;
      if (navMatch) {
        try { navHint = JSON.parse(navMatch[1]); } catch {}
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        text: cleanText,
        navHint,
      }]);

    } catch (err) {
      console.error('[AgroWidget]', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'Sorry, I am having trouble connecting right now. 🙏\n\nPlease WhatsApp us directly at +91-XXXXXXXXXX for immediate help.',
        navHint: null,
      }]);
    }

    setLoading(false);
  };

  // ── Navigate and close widget ─────────────
  const goToPage = (path) => {
    navigate(path);
    setOpen(false);
  };

  // ── Render ────────────────────────────────
  return (
    <>
      {/* ── FLOATING BUTTON ───────────────── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open Agro Assistant'}
        style={{
          position:     'fixed',
          bottom:       '24px',
          right:        '24px',
          zIndex:       10000,
          width:        '60px',
          height:       '60px',
          borderRadius: '50%',
          background:   'linear-gradient(135deg, #2d5016 0%, #2d5016 100%)',
          border:       '3px solid #b87352',
          color:        'white',
          fontSize:     '26px',
          cursor:       'pointer',
          boxShadow:    '0 8px 32px rgba(45,80,22,0.45)',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'center',
          transition:   'all 0.3s ease',
          transform:    open ? 'rotate(90deg)' : 'rotate(0deg)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = open 
            ? 'rotate(90deg) scale(1.1)' 
            : 'scale(1.1)';
          e.currentTarget.style.boxShadow = 
            '0 12px 40px rgba(45,80,22,0.55)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = open 
            ? 'rotate(90deg)' 
            : 'scale(1)';
          e.currentTarget.style.boxShadow = 
            '0 8px 32px rgba(45,80,22,0.45)';
        }}
      >
        {open ? '✕' : '🌿'}
      </button>

      {/* ── CHAT WINDOW ───────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-label="Agro Assistant chat"
          style={{
            position:     'fixed',
            bottom:       '96px',
            right:        '24px',
            zIndex:       9999,
            width:        'min(370px, calc(100vw - 48px))',
            height:       'min(540px, 72vh)',
            background:   '#f5e6c8',
            borderRadius: '20px',
            border:       '1px solid rgba(74,94,42,0.18)',
            boxShadow:    '0 24px 64px rgba(28,46,15,0.22)',
            display:      'flex',
            flexDirection: 'column',
            overflow:     'hidden',
            fontFamily:   'Nunito, DM Sans, sans-serif',
            animation:    'widgetSlideUp 0.25s ease',
          }}
        >
          {/* Header */}
          <div style={{
            background:  'linear-gradient(135deg, #2d5016 0%, #2d5016 100%)',
            padding:     '14px 18px',
            display:     'flex',
            alignItems:  'center',
            gap:         '12px',
            flexShrink:  0,
          }}>
            <div style={{
              width:          '42px',
              height:         '42px',
              borderRadius:   '50%',
              background:     '#b87352',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              fontSize:       '22px',
              flexShrink:     0,
            }}>
              🌱
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                color:      'white',
                fontWeight: 700,
                fontSize:   '15px',
              }}>
                Agro Assistant
              </div>
              <div style={{
                color:    'rgba(255,255,255,0.65)',
                fontSize: '11px',
                display:  'flex',
                alignItems: 'center',
                gap:      '5px',
              }}>
                <span style={{
                  width:        '7px',
                  height:       '7px',
                  borderRadius: '50%',
                  background:   '#7fff7f',
                  display:      'inline-block',
                  flexShrink:   0,
                }} />
                Powered by Groq AI · Usually instant
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background:   'rgba(255,255,255,0.12)',
                border:       '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width:        '30px',
                height:       '30px',
                color:        'white',
                cursor:       'pointer',
                fontSize:     '14px',
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'center',
                flexShrink:   0,
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages area */}
          <div style={{
            flex:       1,
            overflowY:  'auto',
            padding:    '14px',
            display:    'flex',
            flexDirection: 'column',
            gap:        '10px',
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display:       'flex',
                flexDirection: 'column',
                alignItems:    msg.role === 'user' 
                  ? 'flex-end' 
                  : 'flex-start',
                gap: '6px',
              }}>
                {/* Bubble */}
                <div style={{
                  maxWidth:     '88%',
                  padding:      '10px 14px',
                  borderRadius: msg.role === 'user'
                    ? '18px 18px 4px 18px'
                    : '18px 18px 18px 4px',
                  background:   msg.role === 'user'
                    ? 'linear-gradient(135deg, #2d5016, #2d5016)'
                    : '#ffffff',
                  color:        msg.role === 'user' 
                    ? 'white' 
                    : '#1c2e0f',
                  fontSize:     '13.5px',
                  lineHeight:   '1.55',
                  whiteSpace:   'pre-wrap',
                  boxShadow:    msg.role === 'assistant'
                    ? '0 2px 8px rgba(28,46,15,0.08)'
                    : 'none',
                  border:       msg.role === 'assistant'
                    ? '1px solid rgba(74,94,42,0.1)'
                    : 'none',
                }}>
                  {msg.text}
                </div>

                {/* Navigation button */}
                {msg.navHint && (
                  <button
                    onClick={() => goToPage(msg.navHint.path)}
                    style={{
                      padding:      '6px 16px',
                      borderRadius: '999px',
                      background:   '#b87352',
                      color:        '#1c2e0f',
                      border:       'none',
                      fontSize:     '12px',
                      fontWeight:   700,
                      cursor:       'pointer',
                      letterSpacing: '0.3px',
                      transition:   'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#a56645';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#b87352';
                      e.currentTarget.style.color = '#1c2e0f';
                    }}
                  >
                    → Go to {msg.navHint.label}
                  </button>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{
                display:    'flex',
                alignItems: 'center',
                gap:        '5px',
                padding:    '10px 14px',
                background: 'white',
                borderRadius: '18px 18px 18px 4px',
                width:      'fit-content',
                border:     '1px solid rgba(74,94,42,0.1)',
                boxShadow:  '0 2px 8px rgba(28,46,15,0.08)',
              }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width:        '8px',
                    height:       '8px',
                    borderRadius: '50%',
                    background:   '#2d5016',
                    animation:    `widgetBounce 1.2s ${i * 0.2}s infinite ease-in-out`,
                  }} />
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick question chips — only show at start */}
          {messages.length <= 2 && !loading && (
            <div style={{
              padding:    '0 12px 10px',
              display:    'flex',
              flexWrap:   'wrap',
              gap:        '6px',
              flexShrink: 0,
            }}>
              {QUICK_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    padding:      '5px 12px',
                    borderRadius: '999px',
                    background:   '#e8f5e8',
                    border:       '1px solid rgba(45,80,22,0.2)',
                    color:        '#2d5016',
                    fontSize:     '12px',
                    fontWeight:   600,
                    cursor:       'pointer',
                    transition:   'all 0.2s',
                    fontFamily:   'Nunito, sans-serif',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#2d5016';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#e8f5e8';
                    e.currentTarget.style.color = '#2d5016';
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div style={{
            padding:    '10px 12px',
            borderTop:  '1px solid rgba(74,94,42,0.12)',
            background: 'white',
            display:    'flex',
            gap:        '8px',
            flexShrink: 0,
            alignItems: 'center',
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask anything about Agrocare..."
              disabled={loading}
              style={{
                flex:         1,
                border:       '1px solid rgba(74,94,42,0.2)',
                borderRadius: '999px',
                padding:      '9px 16px',
                fontSize:     '13px',
                outline:      'none',
                background:   '#f5e6c8',
                color:        '#1c2e0f',
                fontFamily:   'Nunito, sans-serif',
                transition:   'border 0.2s',
              }}
              onFocus={e => {
                e.target.style.border = '1px solid #2d5016';
              }}
              onBlur={e => {
                e.target.style.border = 
                  '1px solid rgba(74,94,42,0.2)';
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              style={{
                width:          '40px',
                height:         '40px',
                borderRadius:   '50%',
                background:     input.trim() && !loading 
                  ? '#2d5016' 
                  : '#d0d8c8',
                border:         'none',
                color:          'white',
                fontSize:       '16px',
                cursor:         input.trim() && !loading 
                  ? 'pointer' 
                  : 'not-allowed',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                transition:     'all 0.2s',
                flexShrink:     0,
              }}
              onMouseEnter={e => {
                if (input.trim() && !loading) {
                  e.currentTarget.style.background = '#2d5016';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 
                  input.trim() && !loading ? '#2d5016' : '#d0d8c8';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ➤
            </button>
          </div>

        </div>
      )}

      {/* ── KEYFRAME ANIMATIONS ───────────── */}
      <style>{`
        @keyframes widgetSlideUp {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.97); 
          }
          to   { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        @keyframes widgetBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%           { transform: translateY(-7px); }
        }
      `}</style>
    </>
  );
}
