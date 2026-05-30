/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║                   AGRO — AI CHAT ASSISTANT                      ║
 * ║              Luxury Agricultural Intelligence UI                 ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Modular, vanilla JS. Zero dependencies.
 * Author: Agro Engineering · agro.in
 */

/* ─────────────────────────────────────────────────────────────────
   SYSTEM PROMPT — sent to Claude API on every new conversation
   ─────────────────────────────────────────────────────────────────
   When wiring to the real backend, include this object's `content`
   as the first message in the `messages` array with role: "system".

   SYSTEM_PROMPT.content is the full text to pass.
────────────────────────────────────────────────────────────────── */
const SYSTEM_PROMPT = {
  role: "system",
  content: `
You are the Agro AI Assistant — a warm, knowledgeable, and trustworthy agricultural intelligence guide for Agro, a premium Indian agri-tech company.

## Language
You speak English, Hindi (हिन्दी), and Gujarati (ગુજરાતી) natively.
- Detect the user's language from their first message and respond in the same language.
- You may gently mix languages only when it aids clarity (e.g., a technical term).
- Default to English if the language is ambiguous.

## Audiences you serve
1. **Farmers (Kheduto / किसान)** — Primary users. Give practical, jargon-free field guidance.
2. **Agri Input Sellers** — Advise on product selection, logistics, and compliance.
3. **Investors** — Provide market data, sector insights, and growth opportunity summaries.
4. **Visitors / General Public** — Offer accessible overviews of Agro's mission and offerings.

## Core Pillars — your areas of expertise
1. **Farm Advisory**
   Crop selection, soil health, pest & disease management, irrigation scheduling,
   weather-adaptive farming, and precision agriculture practices.

2. **Agri Inputs**
   Seeds, fertilisers, pesticides, bio-stimulants, and farming equipment.
   Help users identify the right product for their crop, soil type, and region.

3. **Omnichannel Access**
   Agro's network: physical agri-service centres, mobile advisory vans,
   WhatsApp helplines, the Agro app, and regional partner kiosks.
   Guide users to the most convenient access point for their need.

4. **Market Linkages**
   Connecting farmers and sellers to buyers, mandis (APMC), FPOs, export channels,
   commodity price discovery, and contract farming opportunities.

## Tone & Style
- Warm, respectful, and precise — never condescending.
- Use short paragraphs; bullet points when listing steps or options.
- Avoid jargon unless explaining it. Always relate advice to the user's context.
- When uncertain, say so honestly and suggest they speak to a local Agro agronomist.
- Never make up statistics or product claims.

## Boundaries
- Do not give medical or legal advice unrelated to agriculture.
- Do not discuss competitors negatively.
- If a question is outside agriculture or Agro's domain, politely redirect.
  `.trim()
};

/* ─────────────────────────────────────────────────────────────────
   CONFIG
────────────────────────────────────────────────────────────────── */
const CONFIG = {
  GREET_DELAY_MS: 520,
  STREAM_INTERVAL_MS: 28,   // ms between streamed characters (mock)
  API_ENDPOINT: "https://api.anthropic.com/v1/messages",
  MODEL: "claude-sonnet-4-20250514",
  MAX_TOKENS: 1024,
  USE_MOCK: true,            // ← flip to false when backend proxy is ready
};

/* ─────────────────────────────────────────────────────────────────
   STATE
────────────────────────────────────────────────────────────────── */
const state = {
  isOpen: false,
  isStreaming: false,
  history: [],              // { role: "user"|"assistant", content: string }[]
};

/* ─────────────────────────────────────────────────────────────────
   DOM REFERENCES
────────────────────────────────────────────────────────────────── */
const $ = (id) => document.getElementById(id);

const DOM = {
  fab:       () => $("agro-fab"),
  chat:      () => $("agro-chat"),
  messages:  () => $("chat-messages"),
  input:     () => $("chat-input"),
  send:      () => $("chat-send"),
  prompts:   () => $("chat-prompts"),
};

/* ═════════════════════════════════════════════════════════════════
   MODULE 1 — TOGGLE
═════════════════════════════════════════════════════════════════ */
const Toggle = (() => {
  function open() {
    state.isOpen = true;
    DOM.fab().classList.add("is-open");
    DOM.fab().setAttribute("aria-expanded", "true");
    DOM.chat().classList.add("is-visible");
    DOM.input().focus();
  }

  function close() {
    state.isOpen = false;
    DOM.fab().classList.remove("is-open");
    DOM.fab().setAttribute("aria-expanded", "false");
    DOM.chat().classList.remove("is-visible");
  }

  function toggle() {
    state.isOpen ? close() : open();
  }

  function init() {
    DOM.fab().addEventListener("click", toggle);

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && state.isOpen) close();
    });

    // Close on backdrop click (outside chat + fab)
    document.addEventListener("click", (e) => {
      if (!state.isOpen) return;
      const inChat = DOM.chat().contains(e.target);
      const inFab  = DOM.fab().contains(e.target);
      if (!inChat && !inFab) close();
    });
  }

  return { init, open, close, toggle };
})();

/* ═════════════════════════════════════════════════════════════════
   MODULE 2 — MESSAGES
═════════════════════════════════════════════════════════════════ */
const Messages = (() => {
  /** Format a timestamp as "10:34 AM" */
  function _time() {
    return new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  /** Scroll the messages panel to the bottom */
  function _scrollToBottom() {
    const el = DOM.messages();
    el.scrollTop = el.scrollHeight;
  }

  /** Create and insert a message bubble; returns the bubble element */
  function append(role, text = "") {
    const msgEl = document.createElement("div");
    msgEl.className = `msg ${role}`;

    const bubble = document.createElement("div");
    bubble.className = "msg-bubble";
    bubble.textContent = text;

    const time = document.createElement("div");
    time.className = "msg-time";
    time.textContent = _time();

    msgEl.appendChild(bubble);
    msgEl.appendChild(time);
    DOM.messages().appendChild(msgEl);
    _scrollToBottom();
    return bubble;         // return ref for streaming updates
  }

  /** Show the animated typing indicator; returns the indicator element */
  function showTyping() {
    const indicator = document.createElement("div");
    indicator.className = "msg bot typing-indicator";
    indicator.id = "typing-indicator";
    indicator.innerHTML = `
      <div class="msg-bubble">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>`;
    DOM.messages().appendChild(indicator);
    _scrollToBottom();
    return indicator;
  }

  /** Remove the typing indicator */
  function hideTyping() {
    const el = document.getElementById("typing-indicator");
    if (el) el.remove();
  }

  /** Hide quick-prompt chips after first interaction */
  function hidePrompts() {
    const el = DOM.prompts();
    if (el) {
      el.style.transition = "opacity 0.3s ease, max-height 0.4s ease";
      el.style.opacity = "0";
      el.style.maxHeight = "0";
      el.style.overflow = "hidden";
      el.style.padding = "0";
    }
  }

  return { append, showTyping, hideTyping, hidePrompts, _scrollToBottom };
})();

/* ═════════════════════════════════════════════════════════════════
   MODULE 3 — API
═════════════════════════════════════════════════════════════════ */
const API = (() => {

  /* ── MOCK STREAM ─────────────────────────────────────────────
     Simulates a streaming response for development.
     Replace this entire function body with a real
     ReadableStream reader from your backend proxy.
  ──────────────────────────────────────────────────────────── */
  async function _mockStream(userMessage, onChunk, onDone) {
    const mockReplies = {
      default: "Thank you for reaching out. I'm Agro's AI assistant — here to help with farm advisory, agri inputs, market linkages, and more. How can I assist you today?",
      crop:    "For this Kharif season in Gujarat, cotton, groundnut, and bajra are strong choices depending on your soil type. Cotton thrives in black clay soils with good drainage. Groundnut prefers sandy loam. Shall I help you choose based on your land area and water availability?",
      input:   "Agro carries a curated range of certified seeds, bio-fertilisers, and crop protection products. Our input advisors can help you select the right combination for your crop and region. Would you like recommendations for a specific crop?",
      market:  "Agro's market linkage programme connects you directly to verified buyers, FPOs, and mandis. We offer real-time price feeds for major commodities. Which crop or commodity are you looking to sell or source?",
      hindi:   "नमस्ते! मैं आपकी मदद के लिए यहाँ हूँ। कृपया बताइए — आपको फसल सलाह, कृषि इनपुट, या बाज़ार से जुड़ी जानकारी चाहिए?",
      gujarati:"નમસ્તે! હું Agro AI Assistant છું. આપ ખેતી, ઈનપુટ, બજાર-જોડાણ, કે અન્ય કૃષિ વિષય વિશે મને પૂછી શકો છો.",
    };

    const lower = userMessage.toLowerCase();
    let reply = mockReplies.default;

    if (/crop|season|kharif|rabi|sow|plant|harvest/i.test(lower)) reply = mockReplies.crop;
    else if (/input|seed|fertiliz|pesticide|product/i.test(lower))  reply = mockReplies.input;
    else if (/market|sell|buyer|mandi|price|fpo/i.test(lower))      reply = mockReplies.market;
    else if (/\u0939\u093f|\u092b\u0938\u0932|\u0915\u0943\u0937\u093f/i.test(lower) || /hindi|फसल|किसान/.test(lower)) reply = mockReplies.hindi;
    else if (/\u0a97\u0ac1\u0a9c|\u0a96\u0ac7\u0aa4|\u0aae\u0abe\u0ab9\u0abf/.test(lower)) reply = mockReplies.gujarati;

    // Stream it character by character
    for (let i = 0; i < reply.length; i++) {
      await new Promise((res) => setTimeout(res, CONFIG.STREAM_INTERVAL_MS));
      onChunk(reply[i]);
    }
    onDone(reply);
  }

  /* ── REAL STREAM ────────────────────────────────────────────
     Uncomment and adapt when your backend proxy is live.
     Your proxy endpoint should:
       POST /api/chat  { messages: [...history] }
       → text/event-stream  (SSE with data: { delta: "..." })
     This keeps the Anthropic API key server-side.
  ──────────────────────────────────────────────────────────── */
  /*
  async function _realStream(userMessage, onChunk, onDone) {
    const messages = [
      ...state.history,
      { role: "user", content: userMessage }
    ];

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, system: SYSTEM_PROMPT.content }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      // Parse SSE: "data: {...}\n\n"
      const lines = chunk.split("\n").filter(l => l.startsWith("data: "));
      for (const line of lines) {
        try {
          const json = JSON.parse(line.slice(6));
          const delta = json?.delta ?? "";
          fullText += delta;
          onChunk(delta);
        } catch {}
      }
    }
    onDone(fullText);
  }
  */

  /** Public: send a message, stream the response into the provided bubble element */
  async function sendMessage(userMessage, botBubble) {
    const onChunk = (char) => {
      botBubble.textContent += char;
      DOM.messages()._scrollToBottom?.();
      // keep scroll locked to bottom during stream
      const msgs = DOM.messages();
      msgs.scrollTop = msgs.scrollHeight;
    };

    const onDone = (fullText) => {
      state.history.push({ role: "assistant", content: fullText });
    };

    if (CONFIG.USE_MOCK) {
      await _mockStream(userMessage, onChunk, onDone);
    } else {
      // await _realStream(userMessage, onChunk, onDone);  // ← real API
    }
  }

  return { sendMessage };
})();

/* ═════════════════════════════════════════════════════════════════
   MODULE 4 — INPUT HANDLING
═════════════════════════════════════════════════════════════════ */
const Input = (() => {
  let _firstMessage = true;

  async function submit() {
    if (state.isStreaming) return;

    const rawText = DOM.input().value.trim();
    if (!rawText) return;

    // Clear input & lock
    DOM.input().value = "";
    DOM.input().style.height = "auto";
    DOM.send().disabled = true;
    state.isStreaming = true;

    // Hide quick prompts on first real send
    if (_firstMessage) {
      Messages.hidePrompts();
      _firstMessage = false;
    }

    // Render user message
    Messages.append("user", rawText);
    state.history.push({ role: "user", content: rawText });

    // Show typing indicator briefly, then stream bot reply
    const typingEl = Messages.showTyping();
    await new Promise((res) => setTimeout(res, 600));
    Messages.hideTyping();

    // Create empty bot bubble and stream into it
    const botBubble = Messages.append("bot", "");
    await API.sendMessage(rawText, botBubble);

    // Unlock
    state.isStreaming = false;
    DOM.send().disabled = false;
    DOM.input().focus();
  }

  function _autoResize() {
    const el = DOM.input();
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 110) + "px";
  }

  function init() {
    DOM.input().addEventListener("input", _autoResize);

    DOM.input().addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submit();
      }
    });

    DOM.send().addEventListener("click", submit);

    // Quick prompt chips
    DOM.prompts()?.querySelectorAll(".prompt-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        DOM.input().value = chip.dataset.prompt;
        _autoResize();
        submit();
      });
    });
  }

  return { init };
})();

/* ═════════════════════════════════════════════════════════════════
   MODULE 5 — GREETING
═════════════════════════════════════════════════════════════════ */
const Greeting = (() => {
  const GREET = "Namaste 🌿 I'm your Agro Assistant — here to help with farm advice, agri inputs, market connections, and more. How can I help you today?";

  function show() {
    setTimeout(() => {
      Messages.append("bot", GREET);
    }, CONFIG.GREET_DELAY_MS);
  }

  return { show };
})();

/* ═════════════════════════════════════════════════════════════════
   BOOT
═════════════════════════════════════════════════════════════════ */
(function init() {
  Toggle.init();
  Input.init();
  Greeting.show();

  console.log(
    "%c 🌿 Agro AI Chat %c v1.0 ",
    "background:#5C7A58;color:#FAF9F6;font-weight:bold;padding:4px 8px;border-radius:4px 0 0 4px;",
    "background:#E8EDE7;color:#5C7A58;padding:4px 8px;border-radius:0 4px 4px 0;"
  );
})();