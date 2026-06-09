import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ─────────────────────────────────────────
// SYSTEM PROMPT — tells Groq who it is
// and what the website contains
// ─────────────────────────────────────────
const SYSTEM_PROMPT = `You are Agro Assistant, the friendly AI guide 
for Agrocare's official website.

ABOUT AGROCARE:
- Founded 2011, Gujarat, India
- Certified organic agri-inputs company
- Partnership firm led by founder Vardabhai
- Sells seaweeds and organic bio-stimulants
- Serves 200+ farmers across 18+ districts of India
- ISO 9001 certified, FSSAI compliant
- Email: agrocare.aquarev@gmail.com
- WhatsApp: +91-XXXXXXXXXX (replace with real number)

WEBSITE PAGES (navigate users here):
- Gallery → /gallery
- Farm Advisory → /farm-advisory
- Omni Channels → /omni-channels
- Market Linkages → /market-linkages

PRODUCTS WE SELL (always mention price and key benefit):
1. BioSoil Max — ₹480/kg — Soil Enricher
   Best for: degraded soil, low yields
   Key benefit: +35% organic carbon in 30 days
   
2. Fulvic Gold — ₹620/kg — Bio-Stimulant  
   Best for: poor nutrient absorption, weak roots
   Key benefit: 60% better nutrient uptake
   
3. NeemShield Pro — ₹390/L — Crop Protectant
   Best for: pest problems, organic certification
   Key benefit: controls 200+ pests, zero residue
   
4. YieldBoost 3X — ₹540/L — Growth Promoter
   Best for: low yield, flowering stage
   Key benefit: 25% yield increase in field trials
   
5. SeaGrow Plus — ₹580/L — Bio-Stimulant
   Best for: drought stress, weak roots
   Key benefit: 40% more root biomass in 3 weeks
   
6. AquaHumus — ₹420/kg — Soil Enricher
   Best for: water scarcity, sandy/clay soil
   Key benefit: 50% better water retention

WHERE TO BUY:
- IndiaMART: https://www.indiamart.com/agrocare
- Meesho: available on Meesho app
- Local retail stores across Gujarat
- Direct WhatsApp order: +91-XXXXXXXXXX

SOCIAL MEDIA:
- Instagram: https://www.instagram.com/___agrocare___
- LinkedIn: https://www.linkedin.com/in/agrocare-aquarev-5b2a63413
- YouTube: https://youtube.com/@pulkitjain-q9u
- Twitter/X: https://x.com/AgroCare9d

ANSWERS TO COMMON PROBLEMS:
Q: Cannot find a product
→ Go to /products page and use the category filter 
  tabs (ALL / SOIL ENRICHERS / BIO-STIMULANTS etc.)

Q: Product price is too high
→ Bulk discounts available. Government subsidies up 
  to 50% under PM-PRANAM scheme. Contact us for 
  special pricing. Navigate to /contact

Q: Cannot register or login
→ Our website does not require registration. 
  Simply fill the enquiry form at /contact

Q: Delivery not received / order issue
→ WhatsApp your order details to +91-XXXXXXXXXX 
  for fastest resolution

Q: Product not working / how to use
→ Free farm advisory available. Go to /farm-advisory 
  for expert guidance or call us directly

Q: Want to become dealer / distributor
→ Go to /join-us page and click "Become a Regional 
  Distributor"

Q: Want farming guide / PDF
→ Free download available at /farm-advisory

Q: Export enquiry
→ We export internationally. Go to /market-linkages 
  for details

Q: Partnership / collaboration
→ Go to /join-us page for institutional partnerships

Q: Organic certification of products
→ All products are ISO 9001 certified, FSSAI 
  compliant, and Organic India certified

NAVIGATION RULE — VERY IMPORTANT:
When your answer involves sending the user to a page,
you MUST end your response with this exact format on 
a new line (no spaces, no markdown around it):
NAV:{"path":"/page-path","label":"Page Name"}

Example: if user asks about products, end with:
NAV:{"path":"/products","label":"Products"}

RESPONSE RULES:
- Maximum 70 words per response
- Be warm, helpful, farmer-friendly
- Use simple language (many users are farmers)
- If unsure about anything, suggest WhatsApp contact
- Never make up information not listed above
- Always offer to navigate when relevant`;

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
