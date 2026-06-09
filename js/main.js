/**
 * AGRO — Main application script
 * Vanilla JS · no dependencies
 */
(function () {
  "use strict";

  /* ═══════════════════════════════════════════════════════════════════
     HELPERS
  ═══════════════════════════════════════════════════════════════════ */

  const LOADER_DURATION_MS = 15000;
  const IS_TOUCH =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches;

  const LANG_LABELS = { en: "EN", hi: "HI", gu: "GU" };

  const AI_PLACEHOLDERS = {
    en: "Ask about farming, products...",
    hi: "खेती, उत्पादों के बारे में पूछें...",
    gu: "ખેતી, ઉત્પાદનો વિશે પૂછો...",
  };

  /** @param {number} t 0–1 */
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function normalizePath(path) {
    if (!path || path === "/") return "/index.html";
    const clean = path.replace(/\/$/, "");
    return clean || "/index.html";
  }

  function pathsMatch(a, b) {
    const na = normalizePath(a);
    const nb = normalizePath(b);
    if (na === nb) return true;
    const fileA = na.split("/").pop() || "index.html";
    const fileB = nb.split("/").pop() || "index.html";
    return fileA === fileB;
  }

  /* ═══════════════════════════════════════════════════════════════════
     1. LOADING SCREEN
  ═══════════════════════════════════════════════════════════════════ */

  function populateSiteLoaderLeaves(root) {
    const fills = ["#2d6a2d", "#8b6914", "#4a7a4a", "#6b9e3c", "#3d7a34"];
    const leafSvg = (fill) =>
      `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2C6 2 2 8 2 14c0 4 2.5 6.5 6 7.5C10 23 12 23 12 23s2 0 4-.5c3.5-1 6-3.5 6-7.5 0-6-4-12-10-12z" fill="${fill}" opacity="0.82"/><line x1="12" y1="6" x2="12" y2="20" stroke="#1a3d1a" stroke-width="0.8" opacity="0.45"/></svg>`;

    for (let i = 0; i < 28; i++) {
      const el = document.createElement("div");
      el.className = "site-loader__leaf";
      const size = 14 + Math.random() * 24;
      const dir = Math.random() > 0.5 ? 1 : -1;
      el.style.setProperty("--size", `${size}px`);
      el.style.setProperty("--top", `${6 + Math.random() * 88}%`);
      el.style.setProperty("--dur", `${3.5 + Math.random() * 4.5}s`);
      el.style.setProperty("--delay", `${Math.random() * 3.2}s`);
      el.style.setProperty("--dir", String(dir));
      el.style.setProperty("--spin", `${120 + Math.random() * 240}deg`);
      el.style.setProperty("--op", `${0.55 + Math.random() * 0.4}`);
      el.innerHTML = leafSvg(fills[i % fills.length]);
      root.appendChild(el);
    }
  }

  function hideSiteLoader(loader) {
    sessionStorage.setItem("agrocare_loaded", "1");
    loader.classList.add("is-hiding");
    setTimeout(() => {
      loader.classList.add("hidden");
      document.body.classList.remove("is-loading");
      document.body.classList.add("loaded");
    }, 600);
  }

  function initSiteLoader(loader) {
    if (sessionStorage.getItem("agrocare_loaded")) {
      loader.classList.add("hidden");
      document.body.classList.add("loaded");
      return;
    }

    document.body.classList.add("is-loading");
    const leavesRoot = loader.querySelector(".site-loader__leaves");
    if (leavesRoot && !leavesRoot.childElementCount) {
      populateSiteLoaderLeaves(leavesRoot);
    }

    const video = loader.querySelector(".site-loader__video");
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      hideSiteLoader(loader);
    };

    if (video) {
      video.addEventListener("ended", finish, { once: true });
      video.addEventListener("error", () => setTimeout(finish, 3000), { once: true });
      video.play().catch(() => {});
    } else {
      setTimeout(finish, 4500);
    }
  }

  function initLoadingScreen() {
    const siteLoader = document.getElementById("site-loader");
    if (siteLoader) {
      initSiteLoader(siteLoader);
      return;
    }

    const loader = document.getElementById("loading-screen");
    if (!loader) {
      document.body.classList.add("loaded");
      return;
    }

    if (sessionStorage.getItem("agrocare_loaded")) {
      loader.classList.add("hidden");
      document.body.classList.add("loaded");
      return;
    }

    loader.style.display = "flex";
    document.body.classList.add("is-loading");
    loader.classList.add(prefersReducedMotion() ? "loader-reduced" : "loader-animate");

    const hideLoader = () => {
      sessionStorage.setItem("agrocare_loaded", "1");
      loader.classList.add("is-hiding");
      setTimeout(() => {
        loader.classList.add("hidden");
        document.body.classList.remove("is-loading");
        document.body.classList.add("loaded");
      }, 500);
    };

    setTimeout(hideLoader, LOADER_DURATION_MS);
  }

  /* ═══════════════════════════════════════════════════════════════════
     2. CUSTOM CURSOR
  ═══════════════════════════════════════════════════════════════════ */

  function initCustomCursor() {
    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");
    if (!cursor || !follower || IS_TOUCH) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followX = mouseX;
    let followY = mouseY;
    let lastFrame = performance.now();
    const lerpTauMs = 100;

    const hoverSelector = "a, button, [role='button'], input, select, textarea, label";

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    document.addEventListener("mouseover", (e) => {
      const target = e.target.closest(hoverSelector);
      const hovering = Boolean(target);
      cursor.classList.toggle("hovering", hovering);
      follower.classList.toggle("hovering", hovering);
    });

    function tick(now) {
      const dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;
      const alpha = 1 - Math.exp(-dt / (lerpTauMs / 1000));
      followX += (mouseX - followX) * alpha;
      followY += (mouseY - followY) * alpha;
      follower.style.left = `${followX}px`;
      follower.style.top = `${followY}px`;
      requestAnimationFrame(tick);
    }

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    follower.style.left = `${followX}px`;
    follower.style.top = `${followY}px`;
    requestAnimationFrame(tick);
  }

  /* ═══════════════════════════════════════════════════════════════════
     2B. BEFORE/AFTER SLIDER
  ═══════════════════════════════════════════════════════════════════ */

  function initBeforeAfterSlider() {
    /* Handled by initBeforeAfter() — clip-path slider on #before-after */
  }

  /* ═══════════════════════════════════════════════════════════════════
     3. NAVBAR
  ═══════════════════════════════════════════════════════════════════ */

  function initNavbar() {
    const header = document.getElementById("site-header");
    const hamburger = document.querySelector(".nav-hamburger");
    const mobileNav = document.querySelector(".mobile-nav");
    const closeBtn = document.querySelector(".mobile-nav-close");

    if (header) {
      const onScroll = () => {
        header.classList.toggle("scrolled", window.scrollY > 40);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    function setMobileNavOpen(open) {
      hamburger?.classList.toggle("open", open);
      mobileNav?.classList.toggle("open", open);
      document.body.classList.toggle("nav-open", open);
      hamburger?.setAttribute("aria-expanded", String(open));
    }

    hamburger?.addEventListener("click", () => {
      setMobileNavOpen(!mobileNav?.classList.contains("open"));
    });

    closeBtn?.addEventListener("click", () => setMobileNavOpen(false));

    mobileNav?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMobileNavOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    });

    markActiveNavLinks();
    window.addEventListener("hashchange", markActiveNavLinks);
  }

  function markActiveNavLinks() {
    const currentPath = normalizePath(window.location.pathname);
    const hash = window.location.hash;

    const links = document.querySelectorAll(".nav-links a, .mobile-nav a");

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      let isActive = false;

      if (href.startsWith("#")) {
        isActive = hash === href;
      } else {
        try {
          const linkUrl = new URL(href, window.location.href);
          isActive = pathsMatch(linkUrl.pathname, currentPath);
        } catch {
          isActive = false;
        }
      }

      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     4. LANGUAGE SWITCHER
  ═══════════════════════════════════════════════════════════════════ */

  function initLanguageSwitcher() {
    const switcher = document.querySelector(".lang-switcher");
    const btn = switcher?.querySelector(".lang-btn");
    const dropdown = switcher?.querySelector(".lang-dropdown");
    const btnLabel = btn?.querySelector("span");
    const options = document.querySelectorAll(".lang-option");

    let stored = localStorage.getItem("agro-lang") || "en";
    if (!["en", "hi", "gu"].includes(stored)) stored = "en";

    function applyLang(lang) {
      localStorage.setItem("agro-lang", lang);
      if (btnLabel) btnLabel.textContent = LANG_LABELS[lang] || "EN";
      options.forEach((opt) => {
        opt.classList.toggle("active", opt.getAttribute("data-lang") === lang);
      });
      document.documentElement.lang = lang === "hi" ? "hi" : lang === "gu" ? "gu" : "en";
    }

    applyLang(stored);

    btn?.addEventListener("click", (e) => {
      e.stopPropagation();
      switcher?.classList.toggle("open");
    });

    dropdown?.addEventListener("click", (e) => e.stopPropagation());

    document.addEventListener("click", () => switcher?.classList.remove("open"));

    options.forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = opt.getAttribute("data-lang");
        if (!lang) return;
        applyLang(lang);
        switcher?.classList.remove("open");
      });
    });

    initReviewCardLangPills();
    initFarmerReviewsGlobalLang();
  }

  function initReviewCardLangPills() {
    document.querySelectorAll(".review-card").forEach((card) => {
      const texts = card.querySelectorAll(".review-text[data-lang]");
      const pills = card.querySelectorAll(".review-lang-toggle .lang-pill");
      if (!texts.length || !pills.length) return;

      function showLang(lang) {
        texts.forEach((t) => {
          t.style.display = t.getAttribute("data-lang") === lang ? "block" : "none";
        });
        pills.forEach((p) => p.classList.toggle("active", p.getAttribute("data-lang") === lang));
      }

      const defaultLang =
        localStorage.getItem("agro-lang") ||
        pills[0]?.getAttribute("data-lang") ||
        "gu";
      showLang(defaultLang);

      pills.forEach((pill) => {
        pill.addEventListener("click", () => {
          const lang = pill.getAttribute("data-lang");
          if (lang) showLang(lang);
        });
      });
    });
  }

  function initFarmerReviewsGlobalLang() {
    const section = document.getElementById("farmer-reviews");
    if (!section) return;

    const langBtns = section.querySelectorAll(".reviews-section-lang .reviews-lang-btn");
    const cards = section.querySelectorAll(".review-card--v2");
    if (!langBtns.length || !cards.length) return;

    function showLang(lang) {
      cards.forEach((card) => {
        card.querySelectorAll(".review-text[data-lang]").forEach((t) => {
          t.style.display = t.getAttribute("data-lang") === lang ? "block" : "none";
        });
        const nameEl = card.querySelector(".review-name");
        const metaEl = card.querySelector(".review-meta");
        if (nameEl?.getAttribute(`data-name-${lang}`)) {
          nameEl.textContent = nameEl.getAttribute(`data-name-${lang}`);
        }
        if (metaEl?.getAttribute(`data-loc-${lang}`)) {
          metaEl.textContent = metaEl.getAttribute(`data-loc-${lang}`);
        }
      });
      langBtns.forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
      });
    }

    const defaultLang = localStorage.getItem("agro-lang") || "gu";
    showLang(defaultLang);

    langBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        if (lang) showLang(lang);
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     5. SCROLL REVEAL
  ═══════════════════════════════════════════════════════════════════ */

  function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    if (prefersReducedMotion()) {
      reveals.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          el.classList.add("in-view");

          const parent = el.closest("[data-stagger]");
          if (parent) {
            const step = parseFloat(parent.getAttribute("data-stagger")) || 0.1;
            const siblings = [...parent.querySelectorAll(".reveal")];
            const index = siblings.indexOf(el);
            if (index >= 0) {
              el.style.transitionDelay = `${index * step}s`;
            }
          }

          observer.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  /* ═══════════════════════════════════════════════════════════════════
     6. IMPACT COUNTER ANIMATION
  ═══════════════════════════════════════════════════════════════════ */

  function initImpactCounters() {
    const section = document.getElementById("impact");
    if (!section) return;

    const counters = section.querySelectorAll("[data-count]");
    if (!counters.length) return;

    let animated = false;

    const run = () => {
      if (animated) return;
      animated = true;

      counters.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-count") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 2000;
        const start = performance.now();

        const step = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const value = Math.round(easeOutQuart(t) * target);
          el.textContent = value.toLocaleString("en-IN") + suffix;
          if (t < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
  }

  /* ═══════════════════════════════════════════════════════════════════
     7. REVIEWS SLIDER
  ═══════════════════════════════════════════════════════════════════ */

  function initReviewsSlider() {
    const section = document.getElementById("farmers-speak-slider");
    const track = section?.querySelector(".reviews-track") || document.querySelector(".reviews-track");
    const prevBtn = section?.querySelector(".reviews-prev") || document.querySelector(".reviews-prev");
    const nextBtn = section?.querySelector(".reviews-next") || document.querySelector(".reviews-next");
    const wrap = section?.querySelector(".reviews-slider-wrap") || document.querySelector(".reviews-slider-wrap");
    if (!track) return;

    const isFarmersSpeak = !!section;
    let index = 0;
    let maxIndex = 0;
    let autoTimer = null;

    const slides = isFarmersSpeak ? track.querySelectorAll("[data-slide]") : track.querySelectorAll(".review-card");
    const getGap = () => parseFloat(getComputedStyle(track).gap) || 0;

    const getStep = () => {
      const slide = slides[0];
      return slide ? slide.offsetWidth + getGap() : wrap?.offsetWidth || 340;
    };

    const updateBounds = () => {
      const visible = isFarmersSpeak ? 1 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      maxIndex = Math.max(0, slides.length - visible);
      if (index > maxIndex) index = maxIndex;
      goTo(index, false);
    };

    const goTo = (i, animate = true) => {
      index = isFarmersSpeak ? ((i % slides.length) + slides.length) % slides.length : Math.max(0, Math.min(i, maxIndex));
      const offset = index * getStep();
      track.style.transition = animate ? "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)" : "none";
      track.style.transform = `translate3d(-${offset}px, 0, 0)`;
      if (!isFarmersSpeak) {
        if (prevBtn) prevBtn.disabled = index <= 0;
        if (nextBtn) nextBtn.disabled = index >= maxIndex;
      }
    };

    const resetAuto = () => {
      if (!isFarmersSpeak || prefersReducedMotion()) return;
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(index + 1), 5000);
    };

    prevBtn?.addEventListener("click", () => { goTo(index - 1); resetAuto(); });
    nextBtn?.addEventListener("click", () => { goTo(index + 1); resetAuto(); });

    window.addEventListener("resize", updateBounds);
    updateBounds();
    resetAuto();

    if (wrap && IS_TOUCH) {
      let startX = 0;
      let deltaX = 0;
      wrap.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; deltaX = 0; }, { passive: true });
      wrap.addEventListener("touchmove", (e) => { deltaX = e.touches[0].clientX - startX; }, { passive: true });
      wrap.addEventListener("touchend", () => {
        if (Math.abs(deltaX) < 40) return;
        goTo(deltaX < 0 ? index + 1 : index - 1);
        resetAuto();
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════════════
     8. PRODUCT FILTER
  ═══════════════════════════════════════════════════════════════════ */

  function initProductFilter() {
    const pills = document.querySelectorAll(".filter-pill");
    const cards = document.querySelectorAll(".product-card[data-category]");
    if (!pills.length || !cards.length) return;

    const filter = (category) => {
      cards.forEach((card) => {
        const match = category === "all" || card.getAttribute("data-category") === category;
        if (match) {
          card.classList.remove("is-filtered-out");
          card.classList.add("is-filtered-in");
          card.hidden = false;
        } else {
          card.classList.remove("is-filtered-in");
          card.classList.add("is-filtered-out");
          setTimeout(() => {
            if (card.classList.contains("is-filtered-out")) card.hidden = true;
          }, 320);
        }
      });
    };

    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const category = pill.getAttribute("data-filter") || "all";
        pills.forEach((p) => p.classList.toggle("active", p === pill));
        cards.forEach((c) => {
          c.hidden = false;
          c.classList.remove("is-filtered-out", "is-filtered-in");
        });
        filter(category);
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     9. VIDEO AUTOPLAY ON SCROLL
  ═══════════════════════════════════════════════════════════════════ */

  const MUTE_ICON_ON = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;

  const MUTE_ICON_OFF = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15 9a4 4 0 0 1 0 6"/><path d="M19 5a8 8 0 0 1 0 14"/></svg>`;

  function initVideoAutoplay() {
    const videos = document.querySelectorAll("video");

    document.querySelectorAll(".video-mute-btn").forEach((btn) => {
      const wrap = btn.closest(".video-cube-wrapper");
      const video = wrap?.querySelector("video");
      if (!video) return;

      const syncIcon = () => {
        btn.innerHTML = video.muted ? MUTE_ICON_ON : MUTE_ICON_OFF;
        btn.setAttribute("aria-label", video.muted ? "Unmute" : "Mute");
      };

      syncIcon();

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        syncIcon();
      });

      video.addEventListener("volumechange", syncIcon);
    });

    if (!videos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.4, 0.75] }
    );

    videos.forEach((video) => observer.observe(video));
  }

  /* ═══════════════════════════════════════════════════════════════════
     10. AI CHAT WIDGET
  ═══════════════════════════════════════════════════════════════════ */

  const MOCK_RESPONSES = {
    en: {
      default:
        "Thank you for reaching out. For product details and orders, visit our Products page or submit an Enquiry — our Gujarat team will respond shortly.",
      products:
        "We offer certified organic soil enrichers, bio-stimulants, crop protectants, and growth promoters — formulated for Indian soils. Browse the full catalogue on our Products page.",
      enquiry:
        "To place an enquiry, use the Enquiry form on our website or call our head office in Ahmedabad. Our team typically responds within one business day.",
      certifications:
        "AGRO holds FSSAI registration, organic certification, and ISO 9001:2015. Full details are on our Certifications page.",
      organic:
        "Organic farming builds healthier soil over time. We share practical guides on our Organic India section — and our products support the transition from chemical inputs.",
    },
    hi: {
      default:
        "संपर्क करने के लिए धन्यवाद। उत्पाद और ऑर्डर के लिए Products पेज देखें या Enquiry फॉर्म भरें।",
      products:
        "हम प्रमाणित जैविक मिट्टी समृद्धिक, बायो-स्टिमुलेंट, फसल सुरक्षा और विकास उत्प्राद प्रदान करते हैं।",
      enquiry:
        "पूछताछ के लिए वेबसाइट पर Enquiry फॉर्म का उपयोग करें या अहमदाबाद कार्यालय पर कॉल करें।",
      certifications:
        "AGRO के पास FSSAI पंजीकरण, जैविक प्रमाणन और ISO 9001:2015 है।",
      organic:
        "जैविक खेती से मिट्टी स्वस्थ होती है। हमारे उत्पाद रासायनिक इनपुट से बदलाव में मदद करते हैं।",
    },
    gu: {
      default:
        "સંપર્ક કરવા બદલ આભાર. ઉત્પાદનો અને ઓર્ડર માટે Products પેજ જુઓ અથવા Enquiry ફોર્મ ભરો.",
      products:
        "અમે પ્રમાણિત ઓર્ગેનિક માટી સમૃદ્ધિક, બાયો-સ્ટિમ્યુલન્ટ, પાક સંરક્ષણ અને વૃદ્ધિ ઉત્પાદનો પ્રદાન કરીએ છીએ.",
      enquiry:
        "પૂછપરછ માટે વેબસાઇટ પર Enquiry ફોર્મ વાપરો અથવા અમદાવાદ ઓફિસે કૉલ કરો.",
      certifications:
        "AGRO પાસે FSSAI નોંધણી, ઓર્ગેનિક પ્રમાણન અને ISO 9001:2015 છે.",
      organic:
        "ઓર્ગેનિક ખેતી થી માટી સ્વસ્થ બને છે. અમારા ઉત્પાદનો રાસાયનિક ઇનપુટથી બદલાવમાં મદદ કરે છે.",
    },
  };

  function pickAgroResponse(lang, text) {
    const k = window.AGRO_KNOWLEDGE;
    const lower = text.toLowerCase();
    const t = (en, hi, gu) => (lang === "hi" ? hi : lang === "gu" ? gu : en);

    if (k && /district|जिला|જિલ્લા|18\s*\+?|which.*district|કયા જિલ્લા/.test(lower)) {
      return t(
        `AgroCare actively serves ${k.districtsCount} districts across ${k.states.join(", ")}.\n\nGujarat (${k.gujaratDistricts.length} districts): ${k.gujaratDistricts.slice(0, 8).join(", ")}, and more.\n\nTamil Nadu: ${k.tamilNaduDistricts.join(", ")}.\n\nUttar Pradesh: ${k.upDistricts.join(", ")}.`,
        `AgroCare ${k.states.join(", ")} में ${k.districtsCount} जिलों में सक्रिय है। गुजरात: ${k.gujaratDistricts.slice(0, 6).join(", ")} आदि। तमिलनाडु: ${k.tamilNaduDistricts.join(", ")}। यूपी: ${k.upDistricts.join(", ")}।`,
        `AgroCare ${k.states.join(", ")} માં ${k.districtsCount} જિલ્લામાં સક્રિય છે. ગુજરાત: ${k.gujaratDistricts.slice(0, 6).join(", ")} વગેરે. તમિલનાડુ: ${k.tamilNaduDistricts.join(", ")}. યુપી: ${k.upDistricts.join(", ")}.`
      );
    }

    if (k && /humic|હ્યુમિક|ह्यूमिक|composition|ઘટક|संघटन/.test(lower)) {
      const h = k.humicAcidFCO;
      const p = k.potassiumHumate;
      return t(
        `Humic Acid 5% FCO Grade: ${h.composition}. ${h.benefits}.\n\nPotassium Humate (Power Gold): ${p.composition}. Certified ${p.certification}.`,
        `Humic Acid 5% FCO: ${h.composition}. लाभ: CEC बढ़ाता है, माइक्रोन्यूट्रिएंट उपलब्ध कराता है, यूरिया/डीएपी की जरूरत 20–30% कम।\n\nPotassium Humate: ${p.composition} (${p.certification}).`,
        `Humic Acid 5% FCO: ${h.composition}. ફાયદો: CEC વધારે, માઇક્રોન્યુટ્રિએન્ટ ઉપલબ્ધ, યુરિયા/ડીએપી 20–30% ઓછું.\n\nPotassium Humate: ${p.composition} (${p.certification}).`
      );
    }

    if (k && /buyer|customer|farmer.*reach|how many|કેટલા|कितने|2355|buyers till/.test(lower)) {
      return t(
        `AgroCare has reached ${k.farmersReached} farmers across ${k.states.join(", ")} in ${k.districtsCount} districts. We've replaced ${k.chemicalsReplaced} of chemical inputs and earned ${k.yearsTrust} years of farmer trust since ${k.founded}.`,
        `AgroCare ने ${k.farmersReached} किसानों तक पहुंच बनाई है — ${k.states.join(", ")} में ${k.districtsCount} जिलों में। ${k.chemicalsReplaced} रासायनिक उर्वरक प्रतिस्थापित। ${k.yearsTrust} वर्षों का भरोसा।`,
        `AgroCare એ ${k.farmersReached} ખેડૂતો સુધી પહોંચ બનાવી — ${k.states.join(", ")} માં ${k.districtsCount} જિલ્લામાં. ${k.chemicalsReplaced} રાસાયણિક ખાતર બદલ્યા. ${k.yearsTrust} વર્ષનો વિશ્વાસ.`
      );
    }

    if (k && /price|pricing|₹|કિંમત|कीमत|cost/.test(lower)) {
      const lines = k.products.slice(0, 7).map((p) => `• ${p.name}: ₹${p.price} (market ~₹${p.mrp}) — ${p.dose}`).join("\n");
      return t(
        `Direct-from-manufacturer pricing (vs market):\n${lines}\n\nFull catalogue: products.html | WhatsApp: ${k.phone}`,
        `सीधे निर्माता से कीमत:\n${lines}\n\nपूरा कैटलॉग: products.html`,
        `સીધી કિંમત:\n${lines}\n\nકેટલોગ: products.html`
      );
    }

    if (k && /product|catalogue|catalog|ઉત્પાદન|उत्पाद|vanchetan|energy ball|neem/.test(lower)) {
      const list = k.products.map((p) => `• ${p.name} (${p.form})`).join("\n");
      return t(
        `Our ${k.products.length} core products:\n${list}\n\nBrowse details, specs & buy links at products.html.`,
        `हमारे मुख्य उत्पाद:\n${list}\n\nविवरण: products.html`,
        `અમારા ઉત્પાદનો:\n${list}\n\nવિગત: products.html`
      );
    }

    if (k && /enquir|order|buy|whatsapp|ઓર્ડર|पूछताछ|ખરીદી/.test(lower)) {
      return t(
        `Order via WhatsApp ${k.phone}, IndiaMART store, Meesho (Potassium Humate), or enquiry.html. Our team responds within one business day.`,
        `ऑर्डर: WhatsApp ${k.phone}, IndiaMART, Meesho, या enquiry.html पर फॉर्म भरें।`,
        `ઓર્ડર: WhatsApp ${k.phone}, IndiaMART, Meesho, અથવા enquiry.html.`
      );
    }

    if (k && /certif|iso|fco|organic|પ્રમાણ|प्रमाण/.test(lower)) {
      return t(
        `AgroCare certifications: ${k.certifications.join(", ")}. Humic Acid & Seaweed products are FCO Grade where applicable.`,
        `प्रमाणन: ${k.certifications.join(", ")}।`,
        `પ્રમાણન: ${k.certifications.join(", ")}।`
      );
    }

    const dict = MOCK_RESPONSES[lang] || MOCK_RESPONSES.en;
    if (/organic|जैविक|ઓર્ગેનિક/.test(lower)) return dict.organic;
    return dict.default;
  }

  function initAIChat() {
    const panel = document.querySelector(".ai-chat-panel");
    const toggle = document.querySelector(".ai-chat-toggle");
    const closeBtn = document.querySelector(".ai-close-btn");
    const input = document.querySelector(".ai-chat-input");
    const sendBtn = document.querySelector(".ai-chat-send");
    const messages = document.getElementById("ai-messages");
    const langPills = document.querySelectorAll(".ai-lang-pill");

    if (!panel || !toggle) return;

    let chatLang = localStorage.getItem("agro-lang") || "en";
    if (!MOCK_RESPONSES[chatLang]) chatLang = "en";

    const setOpen = (open) => {
      panel.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", () => setOpen(!panel.classList.contains("open")));
    closeBtn?.addEventListener("click", () => setOpen(false));

    const applyChatLang = (lang) => {
      chatLang = lang;
      if (input) input.placeholder = AI_PLACEHOLDERS[lang] || AI_PLACEHOLDERS.en;
      langPills.forEach((p) => p.classList.toggle("active", p.getAttribute("data-lang") === lang));
    };

    applyChatLang(chatLang);

    langPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const lang = pill.getAttribute("data-lang");
        if (lang) applyChatLang(lang);
      });
    });

    function appendBubble(text, role) {
      if (!messages) return null;
      const div = document.createElement("div");
      div.className = `chat-msg ${role}`;
      div.textContent = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
      return div;
    }

    function showTyping() {
      if (!messages) return null;
      const el = document.createElement("div");
      el.className = "chat-msg bot typing-indicator";
      el.setAttribute("aria-label", "Assistant is typing");
      el.innerHTML = "<span></span><span></span><span></span>";
      messages.appendChild(el);
      messages.scrollTop = messages.scrollHeight;
      return el;
    }

    function sendMessage() {
      const text = input?.value.trim();
      if (!text || !messages) return;

      appendBubble(text, "user");
      if (input) input.value = "";

      const typing = showTyping();

      setTimeout(() => {
        typing?.remove();
        const reply = pickAgroResponse(chatLang, text);
        appendBubble(reply, "bot");
      }, 1200);
    }

    sendBtn?.addEventListener("click", sendMessage);
    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     11. DYNAMIC GALLERY (assets/gallery/)
  ═══════════════════════════════════════════════════════════════════ */

  const GALLERY_FALLBACK = ["farmer.jpg", "WhatsApp Image 2026-05-29 at 22.52.05.jpeg"];

  function initHomeGalleryMasonry() {
    const grid = document.getElementById("home-gallery-masonry");
    if (!grid) return;

    const imageExt = /\.(jpe?g|png|webp|gif)$/i;
    const videoExt = /\.(mp4|webm)$/i;
    grid.classList.add("gallery-masonry--bulletin");
    const render = (files) => {
      grid.innerHTML = "";
      [...files]
        .filter((file) => imageExt.test(file) || videoExt.test(file))
        .sort((a, b) => a.localeCompare(b))
        .forEach((file) => {
          const src = file.includes("/") ? file : `assets/gallery/${file}`;
          const label = (file.split("/").pop() || file).replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
          const isVideo = videoExt.test(file);
          const item = document.createElement("div");
          item.className = "gallery-item gallery-item--media" + (isVideo ? " gallery-item--video" : "");
          item.dataset.lightbox = "";
          item.dataset.type = isVideo ? "video" : "image";
          item.dataset.src = src;
          item.setAttribute("role", "button");
          item.setAttribute("tabindex", "0");
          item.setAttribute("aria-label", label);

          if (isVideo) {
            const vid = document.createElement("video");
            vid.src = src;
            vid.muted = true;
            vid.loop = true;
            vid.playsInline = true;
            vid.className = "gallery-item__media";
            item.appendChild(vid);
          } else {
            const img = document.createElement("img");
            img.src = src;
            img.alt = label;
            img.className = "gallery-item__media";
            img.loading = "lazy";
            item.appendChild(img);
          }

          const caption = document.createElement("span");
          caption.className = "gallery-item-caption";
          caption.textContent = label;
          item.appendChild(caption);
          grid.appendChild(item);
        });
    };

    fetch("assets/gallery/manifest.json")
      .then((r) => (r.ok ? r.json() : GALLERY_FALLBACK))
      .then((data) => render(Array.isArray(data) ? data : GALLERY_FALLBACK))
      .catch(() => render(GALLERY_FALLBACK));
  }

  function initDynamicGallery() {
    const grid = document.getElementById("galleryGrid");
    if (!grid || !grid.hasAttribute("data-gallery-dynamic")) return;

    const imageExt = /\.(jpe?g|png|webp|gif)$/i;
    const render = (files) => {
      grid.innerHTML = "";
      [...files]
        .filter((file) => imageExt.test(file))
        .forEach((file) => {
          const src = file.includes("/") ? file : `assets/gallery/${file}`;
          const label = (file.split("/").pop() || file).replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
          const wrap = document.createElement("div");
          wrap.className = "gallery-col-item";
          const img = document.createElement("img");
          img.src = src;
          img.alt = label;
          img.loading = "lazy";
          img.decoding = "async";
          img.dataset.full = src;
          wrap.appendChild(img);
          grid.appendChild(wrap);
        });
      initGalleryPageLightbox();
    };

    fetch("assets/gallery/manifest.json")
      .then((r) => (r.ok ? r.json() : GALLERY_FALLBACK))
      .then((data) => render(Array.isArray(data) ? data : GALLERY_FALLBACK))
      .catch(() => render(GALLERY_FALLBACK));
  }

  function initGalleryPageLightbox() {
    const overlay = document.getElementById("gallery-lightbox");
    const img = document.getElementById("gallery-lightbox-img");
    const close = document.getElementById("gallery-lightbox-close");
    if (!overlay || !img) return;

    document.querySelectorAll("#galleryGrid img").forEach((el) => {
      el.addEventListener("click", () => {
        img.src = el.getAttribute("data-full") || el.src;
        img.alt = el.alt;
        overlay.classList.add("open");
      });
    });

    close?.addEventListener("click", () => overlay.classList.remove("open"));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("open");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") overlay.classList.remove("open");
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     12. GALLERY LIGHTBOX (home page field journal)
  ═══════════════════════════════════════════════════════════════════ */

  function initGalleryLightbox() {
    const overlay = document.getElementById("lightbox-overlay");
    const imgEl = document.getElementById("lightbox-img");
    const videoEl = document.getElementById("lightbox-video");
    const closeBtn = document.getElementById("lightbox-close");
    if (!overlay) return;

    let scrollY = 0;

    const close = () => {
      overlay.classList.remove("open");
      document.body.classList.remove("lightbox-open");
      document.body.style.top = "";
      window.scrollTo(0, scrollY);

      if (imgEl) {
        imgEl.style.display = "none";
        imgEl.removeAttribute("src");
      }
      if (videoEl) {
        videoEl.pause();
        videoEl.style.display = "none";
        videoEl.removeAttribute("src");
      }
    };

    const open = (type, src) => {
      if (!src) return;

      scrollY = window.scrollY;
      document.body.classList.add("lightbox-open");
      document.body.style.top = `-${scrollY}px`;
      overlay.classList.add("open");

      if (type === "video" && videoEl) {
        if (imgEl) imgEl.style.display = "none";
        videoEl.style.display = "block";
        videoEl.src = src;
        videoEl.play().catch(() => {});
      } else if (imgEl) {
        if (videoEl) videoEl.style.display = "none";
        imgEl.style.display = "block";
        imgEl.src = src;
        imgEl.alt = "Gallery image";
      }
    };

    document.addEventListener("click", (e) => {
      const item = e.target.closest("[data-lightbox]");
      if (!item) return;
      const type = item.getAttribute("data-type") || "image";
      const src = item.getAttribute("data-src");
      open(type, src);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const item = e.target.closest("[data-lightbox]");
      if (!item) return;
      e.preventDefault();
      const type = item.getAttribute("data-type") || "image";
      const src = item.getAttribute("data-src");
      open(type, src);
    });

    closeBtn?.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("open")) close();
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     12. HERO HEADLINE (word stagger after loader)
  ═══════════════════════════════════════════════════════════════════ */

  function initHeroHeadline() {
    const h1 = document.getElementById("hero-headline");
    if (!h1) return;

    const reveal = () => {
      document.body.classList.add("hero-headline-ready");
    };

    if (prefersReducedMotion()) {
      reveal();
      return;
    }

    const wrapWords = () => {
      const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
      const textNodes = [];
      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node);
      }

      textNodes.forEach((textNode) => {
        const text = textNode.textContent;
        if (!text) return;
        const parent = textNode.parentNode;
        const frag = document.createDocumentFragment();

        text.split(/(\s+)/).forEach((part) => {
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else if (part.length) {
            const span = document.createElement("span");
            span.className = "hero-word";
            span.textContent = part;
            frag.appendChild(span);
          }
        });

        parent.replaceChild(frag, textNode);
      });

      h1.querySelectorAll(".hero-word").forEach((word, i) => {
        word.style.transitionDelay = `${i * 0.15}s`;
      });
    };

    const start = () => {
      wrapWords();
      requestAnimationFrame(reveal);
    };

    if (document.body.classList.contains("loaded")) {
      start();
      return;
    }

    const obs = new MutationObserver(() => {
      if (document.body.classList.contains("loaded")) {
        obs.disconnect();
        start();
      }
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  }

  /* ═══════════════════════════════════════════════════════════════════
     13. BEFORE / AFTER SLIDER
  ═══════════════════════════════════════════════════════════════════ */

  function initBeforeAfter() {
    const root = document.getElementById("before-after");
    if (!root) return;

    const beforeLayer = root.querySelector(".ba-layer--before, .ba-before, .ba-img.ba-before, [data-ba-before]");
    const divider = root.querySelector(".ba-divider, [data-ba-handle]");
    if (!beforeLayer) return;

    let dragging = false;
    let ratio = 0.5;

    const setRatio = (r) => {
      ratio = Math.max(0.05, Math.min(0.95, r));
      const pct = ratio * 100;
      beforeLayer.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      if (divider) {
        divider.style.left = `${pct}%`;
      }
      root.style.setProperty("--ba-split", `${pct}%`);
    };

    const pointerRatio = (clientX) => {
      const rect = root.getBoundingClientRect();
      return (clientX - rect.left) / rect.width;
    };

    const onMove = (clientX) => {
      if (!dragging) return;
      setRatio(pointerRatio(clientX));
    };

    root.addEventListener("mousedown", (e) => {
      dragging = true;
      setRatio(pointerRatio(e.clientX));
    });

    const stopDrag = () => {
      dragging = false;
    };

    window.addEventListener("mouseup", stopDrag);

    root.addEventListener("mouseleave", stopDrag);

    window.addEventListener("mousemove", (e) => onMove(e.clientX));

    root.addEventListener(
      "touchstart",
      (e) => {
        dragging = true;
        setRatio(pointerRatio(e.touches[0].clientX));
      },
      { passive: true }
    );

    root.addEventListener(
      "touchmove",
      (e) => {
        if (!dragging) return;
        setRatio(pointerRatio(e.touches[0].clientX));
      },
      { passive: true }
    );

    root.addEventListener("touchend", stopDrag);

    setRatio(0.5);
  }

  /* ═══════════════════════════════════════════════════════════════════
     14. CONTACT FORM
  ═══════════════════════════════════════════════════════════════════ */

  const AGRO_WA_NUMBER = "919427205179";

  function normalizeWaPhone(phone) {
    const digits = String(phone || "").replace(/\D/g, "");
    if (digits.length === 10) return "91" + digits;
    if (digits.length === 12 && digits.startsWith("91")) return digits;
    return digits || AGRO_WA_NUMBER;
  }

  function mapEnquiryType(subject) {
    const map = {
      "General query": "General Query",
      "Product enquiry": "Product Enquiry",
      Complaint: "Complaint",
      "Farming advice": "Farming Advice",
      Partnership: "General Query",
      "Press / media": "General Query",
    };
    return map[subject] || subject || "General Query";
  }

  function openWaTab(phone, text) {
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  function showAgroToast(message) {
    let toast = document.getElementById("agro-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "agro-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      Object.assign(toast.style, {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: "10001",
        maxWidth: "min(360px, calc(100vw - 32px))",
        padding: "14px 18px",
        borderRadius: "12px",
        background: "#1A1F0F",
        color: "#F5F0E8",
        boxShadow: "0 12px 36px rgba(0,0,0,0.28)",
        fontSize: "0.92rem",
        lineHeight: "1.5",
        opacity: "0",
        transform: "translateY(12px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      });
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    });
    clearTimeout(showAgroToast._timer);
    showAgroToast._timer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(12px)";
    }, 5000);
  }

  function handleWhatsAppEnquiry({ name, phone, type, message }) {
    const enquiryType = mapEnquiryType(type);
    const userPhone = normalizeWaPhone(phone);
    const userConfirm =
      `Thank you for your enquiry! 🌿 We have received your ${enquiryType} and our team will reach out to you within 24 hours. — AgroCare Team`;
    const teamAlert =
      `📩 New ${enquiryType} from ${name}:\n${message}\n\nPhone: ${phone}`;
    openWaTab(userPhone, userConfirm);
    setTimeout(() => openWaTab(AGRO_WA_NUMBER, teamAlert), 400);
    showAgroToast("Message registered successfully! You'll hear from us soon. 🌾");
  }

  function initComplaintForm() {
    const form = document.getElementById("complaint-form");
    if (!form) return;

    const statusEl = document.getElementById("complaint-status");
    const submitBtn = form.querySelector('[type="submit"]');
    const defaultBtnText = submitBtn?.textContent || "Submit Complaint →";

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("#complaint-name")?.value?.trim();
      const phone = form.querySelector("#complaint-phone")?.value?.trim();
      const product = form.querySelector("#complaint-product")?.value?.trim();
      const purchaseDate = form.querySelector("#complaint-purchase-date")?.value?.trim();
      const issue = form.querySelector("#complaint-message")?.value?.trim();

      if (!name || !phone || !product || !purchaseDate || !issue) {
        if (statusEl) {
          statusEl.style.display = "block";
          statusEl.className = "form-status form-status--error";
          statusEl.textContent = "Please fill in all required fields.";
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting…";
      }

      const msg = `🚨 COMPLAINT from ${name} | Phone: ${phone} | Product: ${product} | Issue: ${issue} | Date: ${purchaseDate}`;
      window.open(`https://wa.me/919427205179?text=${encodeURIComponent(msg)}`, "_blank");
      form.reset();

      if (statusEl) {
        statusEl.style.display = "block";
        statusEl.className = "form-status form-status--success";
        statusEl.textContent = "Complaint registered. Our team will contact you within 24 hours.";
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultBtnText;
      }
    });
  }

  function renderEnquiryFormStatus(formStatus, statusEl) {
    if (!statusEl) return;

    if (formStatus === "loading") {
      statusEl.innerHTML = `<div style="margin-top:14px;padding:14px 18px;border-radius:12px;background:#e8f5e8;border:1px solid rgba(45,80,22,0.2);color:#2d5016;font-size:14px;display:flex;align-items:center;gap:10px;font-family:Nunito,sans-serif"><span style="display:inline-block;animation:spin 1s linear infinite">🌱</span>Submitting your enquiry...</div>`;
      return;
    }

    if (formStatus === "success") {
      const waUrl = window._pendingWhatsApp || "https://wa.me/919427205179";
      statusEl.innerHTML = `<div style="margin-top:14px;padding:18px 20px;border-radius:12px;background:#e8f5e8;border:2px solid #2d5016;font-family:Nunito,sans-serif"><div style="font-weight:700;font-size:16px;color:#1a3d08;margin-bottom:8px">✅ Enquiry Submitted Successfully!</div><p style="color:#3d6b1f;font-size:14px;line-height:1.6;margin:0 0 14px 0">Thank you! Click the button below to send your enquiry directly to our team on WhatsApp. We will reply within a few hours. 🌿</p><a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:999px;background:#25d366;color:white;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:0.5px">💬 Continue on WhatsApp →</a></div>`;
      return;
    }

    if (formStatus === "error") {
      statusEl.innerHTML = `<div style="margin-top:14px;padding:14px 18px;border-radius:12px;background:#fff8f0;border:1px solid rgba(180,80,0,0.25);color:#8b3a00;font-size:14px;font-family:Nunito,sans-serif">⚠️ Something went wrong. Please try again or WhatsApp us directly at <strong>+91-9427205179</strong></div>`;
      return;
    }

    statusEl.innerHTML = "";
  }

  function initEnquiryForm() {
    const form = document.getElementById("enquiry-form");
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const prefill = params.get("msg") || params.get("message");
    const messageField = form.querySelector("#enquiry-message");
    if (prefill && messageField) {
      messageField.value = decodeURIComponent(prefill.replace(/\+/g, " "));
    }

    const statusEl = document.getElementById("enquiry-form-status");
    const submitBtn = form.querySelector('[type="submit"]');
    const defaultBtnText = submitBtn?.textContent || "Send Enquiry →";
    let formStatus = null;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = form.querySelector("#enquiry-name")?.value?.trim();
      const phone = form.querySelector("#enquiry-phone")?.value?.trim();
      const subject = form.querySelector("#enquiry-product")?.value?.trim();
      const message = form.querySelector("#enquiry-message")?.value?.trim();

      if (!name || !phone || !subject || !message) {
        formStatus = "error";
        renderEnquiryFormStatus(formStatus, statusEl);
        if (statusEl) {
          statusEl.innerHTML = `<div style="margin-top:14px;padding:14px 18px;border-radius:12px;background:#fff8f0;border:1px solid rgba(180,80,0,0.25);color:#8b3a00;font-size:14px;font-family:Nunito,sans-serif">Please fill in all required fields.</div>`;
        }
        return;
      }

      formStatus = "loading";
      renderEnquiryFormStatus(formStatus, statusEl);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      try {
        const { handleEnquirySubmit } = await import("../src/utils/enquiryHandler.js");
        await handleEnquirySubmit({ name, phone, subject, message });
        formStatus = "success";
        renderEnquiryFormStatus(formStatus, statusEl);
        form.querySelector("#enquiry-name").value = "";
        form.querySelector("#enquiry-phone").value = "";
        form.querySelector("#enquiry-product").value = "";
        form.querySelector("#enquiry-message").value = "";
        const emailField = form.querySelector("#enquiry-email");
        if (emailField) emailField.value = "";
      } catch (err) {
        console.error("[Agrocare Form Error]:", err);
        formStatus = "error";
        renderEnquiryFormStatus(formStatus, statusEl);
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultBtnText;
      }
    });
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const successEl = document.getElementById("form-success");
    const submitBtn = form.querySelector('[type="submit"]');
    const defaultBtnText = submitBtn?.textContent || "Send message →";

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("#contact-name")?.value?.trim();
      const phone = form.querySelector("#contact-phone")?.value?.trim();
      const subject = form.querySelector("#contact-subject")?.value?.trim();
      const message = form.querySelector("#contact-message")?.value?.trim();

      if (!name || !phone || !subject || !message) {
        if (successEl) {
          successEl.style.display = "block";
          successEl.style.background = "rgba(230,57,70,0.12)";
          successEl.style.color = "#c1121f";
          successEl.innerHTML = "Please fill in all fields.";
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      const companyMsg = `📩 New ${subject} | From: ${name} | Phone: ${phone} | Message: ${message}`;
      window.open(`https://wa.me/919427205179?text=${encodeURIComponent(companyMsg)}`, "_blank");
      form.reset();

      if (successEl) {
        successEl.innerHTML = "🌾 Message registered! We'll reach you soon.";
        successEl.style.display = "block";
        successEl.style.background = "rgba(116,198,157,0.15)";
        successEl.style.color = "#2D5A1B";
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultBtnText;
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     BOOT
  ═══════════════════════════════════════════════════════════════════ */

  function init() {
    initLoadingScreen();
    initCustomCursor();
    initBeforeAfterSlider();
    initNavbar();
    initLanguageSwitcher();
    initScrollReveal();
    initImpactCounters();
    initReviewsSlider();
    initProductFilter();
    initVideoAutoplay();
    initAIChat();
    initDynamicGallery();
    initHomeGalleryMasonry();
    initGalleryLightbox();
    initHeroHeadline();
    initBeforeAfter();
    initContactForm();
    initComplaintForm();
    initEnquiryForm();
    if (window.AgroProducts) {
      window.AgroProducts.initCataloguePage();
      window.AgroProducts.initHomePreview();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
