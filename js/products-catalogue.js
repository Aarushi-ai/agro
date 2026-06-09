/* AgroCare product catalogue — shared by products.html & index.html */
(function () {
  const REVIEWS = {
    "vanchetan-davya": [
      { name: "Jayesh Solanki", location: "Junagadh, Gujarat", rating: 5, text: "Mitti maa jiv avi gayi chhe — mara khetarma. Highly recommend." },
      { name: "Bhavesh Agro Farm", location: "Amreli", rating: 4, text: "Roots are visibly stronger. Will use next season too." },
    ],
    "energy-balls": [
      { name: "Dinesh Patil", location: "Vadodara", rating: 4, text: "Applied at sowing with DAP. Good results on chilli crop." },
      { name: "Kiran Patel", location: "Mehsana", rating: 5, text: "Soil water retention improved. Less irrigation needed." },
    ],
    "potassium-humate": [
      { name: "Ramesh Patel", location: "Anand, Gujarat", rating: 5, text: "Used on cotton — yield increased noticeably. Soil feels softer after 2 seasons." },
      { name: "Suresh Desai", location: "Rajkot, Gujarat", rating: 4, text: "Good product, price is reasonable. Delivery was fast." },
      { name: "Meena Farms", location: "Surat", rating: 5, text: "Replaced 30% of our urea this kharif. No drop in yield, lower cost." },
    ],
    "seaweed-liquid": [
      { name: "Manjunath Reddy", location: "Kolar, Karnataka", rating: 5, text: "Used on tomato. Fruit size improved, less cracking. Visible in 6 days." },
      { name: "Suresh Patil", location: "Vijayapura, Karnataka", rating: 4, text: "Grape quality improved — berry size and brix both went up." },
    ],
    "neem-oil": [
      { name: "Haresh Thakor", location: "Gandhinagar", rating: 4, text: "Whitefly on tomato solved in 2 sprays." },
      { name: "Maniben Farms", location: "Bhavnagar", rating: 5, text: "100% organic and it works. Bees in field are safe." },
    ],
    "seaweed-gel": [
      { name: "Bhavesh Patel", location: "Amreli, Gujarat", rating: 4, text: "Applied via drip on chilli. Flowering improved noticeably." },
    ],
    "humic-acid-fco": [
      { name: "Ramesh Yadav", location: "Lucknow, UP", rating: 5, text: "Chemical fertiliser 25% kam lagaya aur yield same rahi." },
    ],
  };

  const IMAGE_MAP = {
    "vanchetan-davya": "assets/images/products/van chetan dravya.jpg",
    "energy-balls": "assets/images/products/Magic Balls.jpg",
    "seaweed-liquid": "assets/images/products/seaweed liquid.jpg",
    "powder-seaweed-extract": "assets/images/products/Powder Seaweed Extract Fertilizer.jpg",
    "seaweed-gel": "assets/images/products/seaweed gel.jpg",
    "potassium-humate": "assets/images/products/potassium humate.jpg",
    "humic-acid-fco": "assets/images/products/Humic Granuels.jpeg",
    "neem-oil": "assets/images/products/neem oil.jpg",
    "boron-21": "assets/images/products/boron.jpg",
    "fulvic-acid": "assets/images/products/Fulvic Acid Fertilizer.jpg",
    "combo-solution": null,
  };

  const PRODUCTS = [
    { id: "vanchetan-davya", name: "VanChetan Davya", nameGu: "વનચેતન દ્રવ્ય", tagline: "The Jivamrut of Organic Farming", keySpec: "🧬 Live Soil Microorganisms + Kappaphycus Seaweed", category: ["all", "organic-inputs", "new-arrivals", "best-sellers"], badges: ["Best Seller", "New"], form: "Liquid", price: 100, mrp: 130, unit: "per litre (2L/acre)", packSize: "2 Litre pack", discount: 23, rating: 4.5, reviewCount: 28, buyLinks: { whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20VanChetan%20Davya.%20Please%20share%20details.", whatsappLabel: "Connect With Us Directly" }, dosage: "2 litres per acre | Dilute in 200L water | Soil drench", suitableFor: ["Cotton", "Vegetables", "Pulses", "Wheat", "Paddy", "Sugarcane", "Fruits"], specTable: [["Microbial Action", "Live bacteria + fungi + actinomycetes", "Soil comes alive — roots grow 30% deeper"], ["Seaweed Base", "Kappaphycus extract", "Natural hormones trigger root growth"], ["Humic Content", "Humic substances included", "Nutrients stop washing away in rain"], ["Application", "Soil drench + foliar spray", "Works two ways — soil & leaf both benefit"], ["Visible Result", "7–14 days", "Greener leaves, softer soil within 2 weeks"], ["Organic Status", "100% organic", "Safe for soil biology, bees, earthworms"], ["Yield Impact", "+15 to +25%", "Tested across cotton, vegetables, cereals"]] },
    { id: "energy-balls", name: "Energy Balls", tagline: "One Application. All Season Benefits.", keySpec: "🌊 Sargassum 2% FCO Grade | 3-in-1 Formula", category: ["all", "organic-inputs", "best-sellers"], badges: ["Best Seller"], form: "Granules", price: 200, mrp: 270, unit: "per 10kg", packSize: "10 kg bag", discount: 26, rating: 4.4, reviewCount: 19, buyLinks: { indiamart: "https://www.indiamart.com/proddetail/sargassum-seaweed-granules-2-fco-grade-2850622755015.html", indiamartLabel: "Buy on IndiaMART", whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Energy%20Balls%20Seaweed%20Granules.", whatsappLabel: "WhatsApp to Order" }, dosage: "10 kg per acre | Broadcast and mix at sowing", suitableFor: ["Cotton", "Paddy", "Sugarcane", "Vegetables", "All Crops"], specTable: [["Seaweed Content", "2% Sargassum (FCO grade)", "Govt-certified quality — not cheap filler"], ["Formula", "3-in-1: Seaweed + Humic + Protein", "One product replaces three inputs"], ["Release Type", "Slow-release granules", "One application feeds soil for 60–90 days"], ["Water Retention", "+30% soil moisture holding", "Less irrigation, lower water bill"], ["Purity", "98%", "Near-zero fillers — you pay for active content"], ["Earthworm Impact", "Stimulates earthworm colonies", "More worms = naturally aerated soil"], ["Application", "Basal at sowing", "Mix with soil at planting — no extra labour"]] },
    { id: "seaweed-liquid", name: "Seaweed Liquid", tagline: "60+ Ocean Minerals. One Spray. Visible in 5 Days.", keySpec: "🌿 Sargassum tenerrimum 10% FCO | Cold Processed", category: ["all", "organic-inputs", "best-sellers"], badges: ["Best Seller"], form: "Liquid", price: 220, mrp: 295, unit: "per 2L acre dose", packSize: "1 Litre", discount: 25, rating: 4.3, reviewCount: 14, buyLinks: { website: "https://www.agrocare.co.in/seaweed-extract.html", websiteLabel: "Buy on AgroCare.co.in", indiamart: "https://www.indiamart.com/proddetail/ascophyllum-nodosum-15-liquid-fco-grade-2850622948630.html", indiamartLabel: "Buy on IndiaMART", whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Seaweed%20Liquid.", whatsappLabel: "WhatsApp to Order" }, dosage: "3–4 ml per litre water (foliar) | 2L per acre (soil drench)", suitableFor: ["Tomato", "Chilli", "Grapes", "Mango", "Cotton", "Wheat", "Flowers"], specTable: [["Star Ingredient", "Sargassum tenerrimum 10%", "FCO-certified — not diluted cheap extract"], ["Natural Hormones", "Cytokinins + Auxins + Gibberellins", "Plant hormones = faster growth and branching"], ["Trace Minerals", "60+ incl. iodine, zinc, iron, manganese", "Fills micronutrient gaps chemicals can't"], ["Stress Recovery", "Drought + heat + frost tolerance", "Crop bounces back from stress faster"], ["Visible Result", "5–7 days", "Deeper green colour visible within a week"], ["Processing", "Cold-processed liquid", "Heat destroys hormones — cold press keeps them active"], ["Grade", "FCO certified", "Meets Fertiliser Control Order govt standard"]] },
    { id: "powder-seaweed-extract", name: "Powder Seaweed Extract", tagline: "Concentrated Seaweed Power. Mix. Spray. Grow.", keySpec: "🌊 Water-Soluble Seaweed Powder | FCO Grade", category: ["all", "organic-inputs"], badges: [], form: "Powder", price: 180, mrp: 240, unit: "per kg", packSize: "1 kg | 25 kg bulk", discount: 25, rating: 4.2, reviewCount: 12, buyLinks: { whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Powder%20Seaweed%20Extract.", whatsappLabel: "WhatsApp to Order" }, dosage: "2–3 g per litre water (foliar) | 1–2 kg per acre (soil)", suitableFor: ["Tomato", "Chilli", "Cotton", "Vegetables", "Fruits", "Flowers"], specTable: [["Form", "Fine water-soluble powder", "Easy to mix — foliar or soil application"], ["Seaweed Base", "Marine extract concentrate", "Natural growth hormones + trace minerals"], ["Solubility", "100% water soluble", "No residue in spray tanks or drip lines"], ["Application", "Foliar spray + soil drench", "Flexible use through the season"], ["Visible Result", "7–10 days", "Greener leaves and stronger vegetative growth"], ["Organic Status", "100% organic", "Safe for soil, bees, and harvest"]] },
    { id: "seaweed-gel", name: "Seaweed Extract Gel", tagline: "Drip It. Spray It. Watch Your Crop Transform.", keySpec: "💧 Alginic Acid + Cytokinin Rich | 98% Pure", category: ["all", "organic-inputs"], badges: [], form: "Gel", price: 400, mrp: 490, unit: "per 5kg acre dose", packSize: "7 kg retail | 50 kg bulk", discount: 18, rating: 4.2, reviewCount: 11, buyLinks: { indiamart: "https://www.indiamart.com/proddetail/seaweed-extract-gel-2849560501488.html", indiamartLabel: "Buy on IndiaMART (50kg)", whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Seaweed%20Extract%20Gel.", whatsappLabel: "WhatsApp for 7kg Retail" }, dosage: "5 kg per acre | Drip: dissolve in header tank | Foliar: 5–10g per litre", suitableFor: ["Vegetables", "Fruits", "Sugarcane", "Flowers", "Grapes"], specTable: [["Key Compound", "Alginic Acid (high conc.)", "Locks moisture in soil — like a sponge at roots"], ["Cytokinin Content", "Rich — natural source", "Triggers new shoot growth and cell division"], ["Solubility", "100% water soluble", "Drip irrigation compatible — no clogging ever"], ["Purity", "98% seaweed extract", "You pay for active content, not fillers"], ["Shelf Life", "12 months", "Stable — no refrigeration needed"], ["Pack Options", "7 kg retail / 50 kg bulk", "Trial size before bulk buy"]] },
    { id: "potassium-humate", name: "Potassium Humate Shiny Flakes 98%", tagline: "98% Pure. ISO Certified. Unlocks Hidden Soil Reserves.", keySpec: "⚡ 98% Pure | 70% Humic Acid | ISO 9001:2015", category: ["all", "soil-conditioners", "best-sellers"], badges: ["Best Seller", "ISO Certified"], form: "Flakes", price: 120, mrp: 175, unit: "per 2kg acre dose", packSize: "1 kg retail | 25 kg bulk", discount: 31, rating: 4.6, reviewCount: 32, buyLinks: { meesho: "https://www.meesho.com/s/p/9wuylx", meeshoLabel: "Buy on Meesho", website: "https://www.agrocare.co.in/potassium-humate-shiny-flakes.html", websiteLabel: "Buy on AgroCare.co.in", whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Potassium%20Humate%2025kg%20bulk.", whatsappLabel: "WhatsApp for Bulk (25kg)" }, dosage: "2 kg per acre | Dissolve in 200L water or broadcast dry", suitableFor: ["All Crops", "Cotton", "Wheat", "Paddy", "Vegetables", "Sugarcane"], specTable: [["Purity", "98% Potassium Humate", "Premium — market products are only 50–70%"], ["Form", "Shiny Flakes", "Dissolves faster than powder — works quicker"], ["Humic Acid %", "70%", "The working compound that transforms soil"], ["Fulvic Acid %", "10%", "Mobile fraction — penetrates plant cells directly"], ["Potash %", "10%", "Built-in K — no need to buy potash separately"], ["Certification", "ISO 9001:2015", "Third-party quality verified"], ["Chemical Saving", "20–30% less urea + DAP", "Pays for itself in first season"], ["CEC Improvement", "Increases nutrient-holding capacity", "Fertilisers stop leaching — more for roots"]] },
    { id: "humic-acid-fco", name: "Humic Acid Powder 5% FCO Grade", tagline: "Government-Grade Humic Powder. Soil Health You Can Measure.", keySpec: "🏛️ FCO Certified | Fertiliser Control Order Govt Standard", category: ["all", "soil-conditioners"], badges: ["FCO Certified"], form: "Powder", price: 90, mrp: 130, unit: "per kg", packSize: "1 kg | 25 kg bulk", discount: 31, rating: 4.5, reviewCount: 21, buyLinks: { website: "https://www.agrocare.co.in/humic-aid-powder.html", websiteLabel: "Buy on AgroCare.co.in", whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Humic%20Acid%20Powder%20FCO%20Grade.", whatsappLabel: "WhatsApp to Order" }, dosage: "2–3 kg per acre | Mix in 200L water or with FYM", suitableFor: ["All Crops", "Cotton", "Wheat", "Vegetables", "Groundnut"], specTable: [["Humic Acid %", "5% FCO grade", "Govt-certified concentration — legally verified"], ["Grade", "FCO — Fertiliser Control Order", "Meets India's strictest fertiliser standard"], ["Form", "Powder", "Easy to dissolve, mix with irrigation water"], ["Soil Action", "Improves CEC + soil structure", "Nutrients stop washing away — more for roots"], ["Chemical Saving", "Reduces urea + DAP need", "Lower input cost from first season"], ["Organic Matter", "Builds long-term soil carbon", "Soil gets more fertile each season"], ["pH Range", "All soil types", "Effective in Gujarat's alkaline soils too"]] },
    { id: "neem-oil", name: "Neem Oil", tagline: "200 Pests. One Oil. Safe for Bees, Butterflies & You.", keySpec: "✅ 99% Pure | Cold Pressed | Azadirachtin Active", category: ["all", "pest-control", "organic-inputs"], badges: [], form: "Liquid", price: 250, mrp: 320, unit: "per litre", packSize: "250 ml | 1 Litre", discount: 22, rating: 4.3, reviewCount: 17, buyLinks: { indiamart: "https://www.indiamart.com/proddetail/250ml-neem-oil-2850623066330.html", indiamartLabel: "Buy on IndiaMART", whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Neem%20Oil.", whatsappLabel: "WhatsApp to Order" }, dosage: "3–5 ml per litre water | Spray morning or evening only", suitableFor: ["Tomato", "Chilli", "Cotton", "Brinjal", "Okra", "Grapes", "All Crops"], specTable: [["Active Compound", "Azadirachtin", "Disrupts pest hormones — stops feeding, breeding"], ["Purity", "99%", "Maximum active — no cheap carrier oil dilution"], ["Extraction", "Cold Pressed", "Heat destroys azadirachtin — cold press keeps it"], ["Colour", "Golden", "Sign of quality — dark = overheated extraction"], ["Pests Controlled", "200+ species", "Whitefly, aphids, mites, leaf miners, thrips"], ["Bee Safety", "100% safe for bees", "Doesn't harm pollinators — critical for fruit crops"], ["Antifungal", "Yes — active", "Controls powdery mildew, downy mildew, rust"], ["Residue", "Biodegrades in 3–7 days", "No soil buildup — safe right up to harvest"]] },
    { id: "boron-21", name: "Boron 21%", tagline: "The Missing Piece. Hollow Hearts Fixed. Fruit Set Boosted.", keySpec: "🔬 21% Boron — 2× Stronger Than Standard 10% Products", category: ["all", "soil-conditioners", "organic-inputs"], badges: [], form: "Powder", price: 250, mrp: 335, unit: "", packSize: "Standard packs", discount: 25, rating: 4.1, reviewCount: 8, buyLinks: { whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Boron%2021%25.", whatsappLabel: "Connect With Us to Order" }, dosage: "0.5–1 g per litre water (foliar) | 1–2 kg per acre (soil)", suitableFor: ["Potato", "Tomato", "Fruits", "Cotton", "All Crops"], specTable: [["Boron Content", "21%", "Most products 10–15% — this is 2× stronger"], ["Deficiency Fixed", "Hollow heart · tip burn · flower drop · fruit crack", "If crop shows these — this is the exact fix"], ["Pollen Impact", "Improves pollen germination", "Better pollination = more fruit = more income"], ["Sugar Movement", "Improves sugar translocation", "Higher brix in fruit = better market price"], ["Application", "Foliar + soil", "Spray on leaves OR apply to soil"], ["Critical Timing", "⚠️ Before flowering — CRITICAL", "Must apply before flowering for full effect"]] },
    { id: "fulvic-acid", name: "Fulvic Acid Fertiliser", tagline: "Nano-Nutrient Carrier. Penetrates Where Nothing Else Can.", keySpec: "⚡ 95%+ Fulvic Acid — Ultra Pure | 100% Drip Compatible", category: ["all", "soil-conditioners"], badges: [], form: "Powder", price: 130, mrp: 180, unit: "per kg", packSize: "1 kg | 25 kg", discount: 28, rating: 4.2, reviewCount: 9, buyLinks: { whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Fulvic%20Acid%20Fertiliser.", whatsappLabel: "Connect With Us to Order" }, dosage: "1–2 kg per acre (drip/fertigation) | 1–2 g per litre (foliar)", suitableFor: ["All Crops", "Vegetables", "Fruits", "Cotton"], specTable: [["Fulvic Acid %", "95%+", "Ultra-pure — market products are 50–70%"], ["Molecule Size", "Smallest humic fraction", "Penetrates plant cell membranes — humic cannot"], ["Nutrient Carrying", "Chelates Fe, Zn, Cu, Mn", "Carries locked minerals directly into cells"], ["Solubility", "100% water soluble", "Drip tank or foliar — no residue"], ["Visible Effect", "7–10 days", "Faster green-up than humic acid alone"], ["pH", "3–4 (slightly acidic)", "Corrects Gujarat's alkaline soils naturally"], ["Heavy Metal Block", "Reduces toxic uptake", "Safer produce — less lead, cadmium in crop"]] },
    { id: "combo-solution", name: "Combo Solution", tagline: "Everything Your Crop Needs. One Order. 30% Less Cost.", keySpec: "📦 VanChetan Davya + Energy Balls + Humic Acid — Complete Kit", category: ["all", "best-sellers", "new-arrivals"], badges: ["Most Popular", "New"], form: "Bundle", price: null, mrp: null, unit: "", packSize: "Customisable — 1 acre kit", discount: 35, rating: 4.7, reviewCount: 5, buyLinks: { whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20am%20interested%20in%20the%20Combo%20Solution%20for%201%20acre.%20Please%20share%20pricing.", whatsappLabel: "Get Custom Quote on WhatsApp" }, dosage: "Complete 1-acre kit — matched dosages for full season", suitableFor: ["All Crops", "First-Time Organic Farmers"], specTable: [["Includes", "VanChetan Davya (2L)", "Soil microbial activator — 1 acre coverage"], ["Includes", "Energy Balls (10kg)", "Slow-release seaweed granules — 1 acre"], ["Includes", "Humic Acid Powder (2kg)", "Soil transformer + fertiliser booster"], ["Savings", "30–35% vs buying separately", "Cheapest way to start organic farming"], ["Advisory", "Free WhatsApp guide included", "We tell you exactly when to apply what"]] },
  ];

  const FILTERS = [
    { id: "all", label: "All Products" },
    { id: "best-sellers", label: "🏆 Best Sellers" },
    { id: "new-arrivals", label: "🆕 New Arrivals" },
    { id: "organic-inputs", label: "🌿 Organic Inputs" },
    { id: "soil-conditioners", label: "🌍 Soil Conditioners" },
    { id: "pest-control", label: "🐛 Pest Control" },
  ];

  const PRICE_COMPARE = [
    { product: "VanChetan Davya (2L)", market: 130, ours: 100 },
    { product: "Energy Balls (10kg)", market: 270, ours: 200 },
    { product: "Seaweed Liquid (2L)", market: 295, ours: 220 },
    { product: "Magic Gel (5kg)", market: 490, ours: 400 },
    { product: "Power Gold (2kg)", market: 175, ours: 120 },
    { product: "Neem Oil (1L)", market: 320, ours: 250 },
    { product: "Boron 21%", market: 335, ours: 250 },
  ];

  const FULL_PRICING_TABLE = [
    { name: "VanChetan Davya — Microbial Booster", form: "Liquid", dose: "2 litres", ours: 100, market: 130 },
    { name: "Energy Balls — Seaweed Granules", form: "Granules", dose: "10 kg", ours: 200, market: 270 },
    { name: "Seaweed Liquid — VanChetan Taral", form: "Liquid", dose: "2 litres", ours: 220, market: 295 },
    { name: "Magic Gel — Seaweed Extract Gel", form: "Gel", dose: "5 kg", ours: 400, market: 490 },
    { name: "Power Gold — Potassium Humate 70%", form: "Flakes", dose: "2 kg", ours: 120, market: 175 },
    { name: "Neem Oil — Cold Pressed 99% Pure", form: "Liquid", dose: "3–5 ml/L water", ours: 250, market: 320, unit: "/L" },
    { name: "Boron 21% — Micronutrient", form: "Powder", dose: "As directed", ours: 250, market: 335 },
  ];

  function fullPricingTableHtml() {
    const rows = FULL_PRICING_TABLE.map((r) => {
      const save = r.market - r.ours;
      const pct = Math.round((save / r.market) * 100);
      const unit = r.unit || "";
      return `<div class="product-impact-row">
        <span>${r.name}</span>
        <span><span class="form-pill">${r.form}</span></span>
        <span>${r.dose}</span>
        <span>₹${r.ours}${unit} <span class="mrp-struck">₹${r.market}</span></span>
        <span class="save-col">Save ₹${save} (${pct}%)</span>
      </div>`;
    }).join("");
    return `<section class="catalogue-pricing-table" aria-labelledby="pricing-table-title">
      <h2 id="pricing-table-title">Every product. Every dose. Every result.</h2>
      <p>Full product range with dosages, pricing, and farmer savings vs market rate — Gujarat, Tamil Nadu &amp; Uttar Pradesh.</p>
      <div class="product-impact-rows">
        <div class="product-impact-row header"><span>Product</span><span>Form</span><span>Dosage/Acre</span><span>Our Price</span><span>Farmer Saving</span></div>
        ${rows}
      </div>
    </section>`;
  }

  function stars(rating) {
    return "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "") + "☆".repeat(5 - Math.ceil(rating));
  }

  function imgHtml(p, compact) {
    const src = IMAGE_MAP[p.id];
    const fit = compact ? "contain" : "cover";
    if (src) return `<img src="${src}" alt="${p.name}" loading="lazy" style="width:100%;height:100%;object-fit:${fit}"/>`;
    return `<div class="product-visual product-visual--soil" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:6px;background:linear-gradient(135deg,#eef0e8,#e5e8d4)"><span style="font-size:2rem">🌿</span><span style="font-size:0.75rem;font-weight:700;color:#4a5d23;text-align:center;padding:0 8px">${p.name}</span></div>`;
  }

  function buyButtons(p, compact) {
    const b = p.buyLinks;
    const parts = [];
    if (b.website) parts.push(`<a class="btn-buy btn-buy--outline" href="${b.website}" target="_blank" rel="noopener noreferrer">🌐 ${b.websiteLabel || "Buy Online"}</a>`);
    if (b.indiamart) parts.push(`<a class="btn-buy btn-buy--outline" href="${b.indiamart}" target="_blank" rel="noopener noreferrer">📦 ${b.indiamartLabel || "IndiaMART"}</a>`);
    if (b.meesho) parts.push(`<a class="btn-buy btn-buy--outline" href="${b.meesho}" target="_blank" rel="noopener noreferrer">🛍️ ${b.meeshoLabel || "Meesho"}</a>`);
    if (b.whatsapp) parts.push(`<a class="btn-buy btn-buy--wa" href="${b.whatsapp}" target="_blank" rel="noopener noreferrer">💬 ${compact ? "Order" : b.whatsappLabel || "WhatsApp"}</a>`);
    return parts.join("");
  }

  function cardHtml(p, compact) {
    const priceRow = p.price
      ? `<span class="product-price">₹${p.price}</span><span class="product-mrp">₹${p.mrp}</span><span class="product-discount">-${p.discount}%</span>`
      : `<span class="product-price product-price--quote">Contact for pricing</span>`;
    const badgeHtml = (p.badges || []).map((b) => `<span class="cat-badge">${b}</span>`).join("");
    const specs = p.specTable.slice(0, compact ? 2 : 3).map((r) => `<div class="product-spec-row"><span>${r[0]}</span><span>${r[1]}</span></div>`).join("");
    const cardClass = compact ? "product-card cat-product-card home-product-card" : "product-card cat-product-card";
    return `<article class="${cardClass}" data-categories="${p.category.join(" ")}">
      <div class="product-img">${imgHtml(p, compact)}${p.discount ? `<span class="product-discount-pill">-${p.discount}%</span>` : ""}<span class="product-form-pill">${p.form}</span></div>
      <div class="product-info">
        <div class="cat-badges">${badgeHtml}</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-tagline">${p.tagline}</p>
        ${compact ? "" : `<p class="product-key-spec">${p.keySpec}</p>`}
        <div class="product-specs">${specs}</div>
        <div class="product-rating">${stars(p.rating)} <span>(${p.reviewCount})</span></div>
        <div class="product-footer">${priceRow}</div>
        <div class="product-buy-row">${buyButtons(p, true)}</div>
      </div>
    </article>`;
  }

  function sidebarHtml() {
    const rows = PRICE_COMPARE.map((r) => {
      const save = r.market - r.ours;
      const pct = Math.round((save / r.market) * 100);
      return `<div class="price-compare-row"><span class="pc-name">${r.product}</span><span class="pc-market">₹${r.market}</span><span class="pc-ours">₹${r.ours}</span><span class="pc-save">Save ₹${save} (${pct}%)</span></div>`;
    }).join("");
    return `<aside class="catalogue-sidebar" aria-label="Price comparison">
      <h3>Direct from Manufacturer</h3>
      <p class="catalogue-sidebar-sub">Same product. No middleman. You keep the savings.</p>
      <div class="price-compare-head"><span>Product</span><span>Market</span><span>Ours</span><span>You Save</span></div>
      ${rows}
      <a class="btn-primary catalogue-sidebar-cta" href="https://www.indiamart.com/agrocare-una/" target="_blank" rel="noopener noreferrer">IndiaMART Store →</a>
    </aside>`;
  }

  function filterBarHtml(active) {
    return FILTERS.map((f) => `<button type="button" class="filter-pill cat-filter${active === f.id ? " active" : ""}" data-filter="${f.id}">${f.label}</button>`).join("");
  }

  function bindFilters(root) {
    root.querySelectorAll(".cat-filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.filter;
        root.querySelectorAll(".cat-filter").forEach((b) => b.classList.toggle("active", b === btn));
        root.querySelectorAll(".cat-product-card").forEach((card) => {
          const cats = card.dataset.categories || "";
          const show = id === "all" || cats.split(" ").includes(id);
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  function initCataloguePage() {
    const root = document.getElementById("catalogue-app");
    if (!root) return;
    root.innerHTML = `<div class="catalogue-layout">${sidebarHtml()}<div class="catalogue-main">
      <div class="products-filter cat-filters">${filterBarHtml("all")}</div>
      <div class="products-grid cat-grid" id="catalogue-grid">${PRODUCTS.map(cardHtml).join("")}</div>
    </div></div>${fullPricingTableHtml()}`;
    bindFilters(root);
  }

  function initHomePreview() {
    const grid = document.getElementById("home-products-grid");
    if (!grid) return;
    const featured = ["vanchetan-davya", "energy-balls", "seaweed-liquid", "powder-seaweed-extract", "potassium-humate", "humic-acid-fco", "seaweed-gel"];
    grid.innerHTML = featured.map((id) => cardHtml(PRODUCTS.find((p) => p.id === id), true)).join("");
  }

  window.AgroProducts = { PRODUCTS, REVIEWS, PRICE_COMPARE, FULL_PRICING_TABLE, FILTERS, IMAGE_MAP, initCataloguePage, initHomePreview, cardHtml, stars, buyButtons, imgHtml, fullPricingTableHtml };
})();
