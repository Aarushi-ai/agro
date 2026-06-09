import { useState } from 'react';

const ASSET_FILES = [
  "assets/images/farmers/farmer-6.jpg",
  "assets/images/field-journal/Soil Transformation.jpg",
  "assets/images/products/Fulvic Acid Fertilizer.jpg",
  "assets/gallery/WhatsApp Image 2026-05-29 at 22.52.05.jpeg",
  "assets/images/farmers/farmer-4.jpg",
  "assets/images/field-journal/Healthy Crop Field.jpg",
  "assets/images/products/Potash Bio Fertilizer.jpg",
  "assets/our story/h_farmers-2.mp4",
  "assets/images/farmers/farmer-2.jpg",
  "assets/logo/agrocare-logo.png",
  "assets/images/products/Edta Chelated Micronutrients Powder.jpg",
  "assets/images/field-journal/Happy Farmers.jpg",
  "assets/products/potassium humate.jpg",
  "assets/products/Screenshot_3-6-2026_15227_gemini.google.com.jpeg",
  "assets/images/products/Chelated Iron Ferric Edta 12.jpg",
  "assets/images/products/Organic Plant Growth Promoter.jpg",
  "assets/images/products/Screenshot_3-6-2026_15227_gemini.google.com.jpeg",
  "assets/images/products/Magic Balls.jpg",
  "assets/products/Powder Seaweed Extract Fertilizer.jpg",
  "assets/images/products/Chelated Zinc Fertilizer.jpg",
  "assets/gallery/farmer.jpg",
  "assets/images/farmers/farmer-bilaspur.jpg",
  "assets/images/products/Amino Acid Powder 80%.jpg",
  "assets/images/field-journal/Farmer with harvest.jpg",
  "assets/products/Potash Bio Fertilizer.jpg",
  "assets/images/products/Zinc Chelate Fertilizer.jpg",
  "assets/products/Zinc Chelate Fertilizer.jpg",
  "assets/products/Potash Bio Fertilizer (2).jpg",
  "assets/products/Magic Balls.jpg",
  "assets/images/farmers/farmer-5.jpg",
  "assets/products/Gibberellic Acid 90 .jpg",
  "assets/products/Organic Plant Growth Promoter.jpg",
  "assets/images/farmers/farmer-1.jpg",
  "assets/images/farmers/farmer-una.jpg",
  "assets/images/farmers/farmer-songadh.jpg",
  "assets/products/Chelated Micro Nutrient Powder.jpg",
  "assets/images/farmers/farmer-rajkot.jpg",
  "assets/images/products/Powder Seaweed Extract Fertilizer.jpg",
  "assets/products/Chelated Zinc Fertilizer.jpg",
  "assets/products/Chelated Iron Ferric Edta 12.jpg",
  "assets/images/products/Potash Bio Fertilizer (2).jpg",
  "assets/our story/review-1.jpg",
  "assets/products/Humic Granuels.jpeg",
  "assets/images/products/Chelated Micro Nutrient Powder.jpg",
  "assets/images/products/potassium humate.jpg",
  "assets/products/Amino Acid Powder 80%.jpg",
  "assets/images/products/Humic Granuels.jpeg",
  "assets/images/products/Gibberellic Acid 90 .jpg",
  "assets/images/products/Granular Biozyme Fertilizer.jpg",
  "assets/products/Granular Biozyme Fertilizer.jpg",
  "assets/our story/review-3.jpg",
  "assets/images/farmers/farmer-3.jpg",
  "assets/after agrocare.jpg",
  "assets/images/founder/Founder.jpg",
  "assets/before agrocare.jpg",
  "assets/products/Fulvic Acid Fertilizer.jpg",
  "assets/products/Edta Chelated Micronutrients Powder.jpg",
];

const IMAGE_EXTS = /\.(jpe?g|png|webp)$/i;

function normalizeStem(value) {
  return value.toLowerCase().replace(/\.(jpe?g|png|webp)$/i, "").replace(/[_\s.\-%]+/g, "");
}

function resolveImage(imageLookup) {
  if (!imageLookup?.length) return null;

  for (const lookup of imageLookup) {
    const key = normalizeStem(lookup);
    for (const file of ASSET_FILES) {
      if (!IMAGE_EXTS.test(file)) continue;
      const fname = file.split("/").pop() || "";
      const stem = normalizeStem(fname);
      const pathNorm = normalizeStem(file);
      if (
        stem === key ||
        stem.includes(key) ||
        key.includes(stem) ||
        pathNorm.includes(key)
      ) {
        return `/${file.replace(/\\/g, "/")}`;
      }
    }
  }
  return null;
}

// ── PRODUCT DATA ──────────────────────────────────
const products = [
  {
    id: "vanchetan-davya",
    name: "VanChetan Davya",
    nameGu: "વનચેતન દ્રવ્ય",
    tagline: "The Jivamrut of Organic Farming",
    keySpec: "🧬 Live Soil Microorganisms + Kappaphycus Seaweed",
    category: ["all", "organic-inputs", "best-sellers"],
    badges: ["Best Seller"],
    form: "Liquid",
    price: 100,
    mrp: 130,
    unit: "per litre",
    packSize: "2 Litre pack",
    discount: 23,
    rating: 4.5,
    reviewCount: 28,
    buyLinks: {
      whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20VanChetan%20Davya.%20Please%20share%20details.",
      whatsappLabel: "Connect With Us Directly"
    },
    dosage: "2 litres per acre | Dilute in 200L water | Soil drench",
    suitableFor: ["Cotton","Vegetables","Pulses","Wheat","Paddy","Sugarcane","Fruits"],
    specTable: [
      ["Microbial Action","Live bacteria + fungi + actinomycetes","Soil comes alive — roots grow 30% deeper"],
      ["Seaweed Base","Kappaphycus extract","Natural hormones trigger root growth"],
      ["Humic Content","Humic substances included","Nutrients stop washing away in rain"],
      ["Application","Soil drench + foliar spray","Works two ways — soil & leaf both benefit"],
      ["Visible Result","7–14 days","Greener leaves, softer soil within 2 weeks"],
      ["Yield Impact","+15 to +25%","Tested across cotton, vegetables, cereals"],
      ["Organic Status","100% organic","Safe for soil biology, bees, earthworms"]
    ],
    benefits: [
      "🦠 Boosts Live Soil Microbes — bacteria, fungi, actinomycetes",
      "🌱 Softens Compacted Soil — water infiltrates, roots breathe",
      "🌿 Strengthens Root System — deeper roots = less irrigation",
      "⚡ Faster Nutrient Uptake — especially nitrogen and phosphorus",
      "🔒 Stress Shield — drought and temperature shock protection",
      "♻️ 100% Organic — no residue, safe any stage of crop cycle"
    ],
    imageLookup: ["vanchetan-davya","VanChetan","vanchetan_davya","vanchetan"],
    reviews: [
      { name:"Jayesh Solanki", location:"Junagadh, Gujarat", rating:5,
        text:"Mitti maa jiv avi gayi chhe — mara khetarma. Highly recommend." },
      { name:"Bhavesh Agro Farm", location:"Amreli", rating:4,
        text:"Roots are visibly stronger. Will use next season too." }
    ]
  },
  {
    id: "energy-balls",
    name: "Energy Balls",
    tagline: "One Application. All Season Benefits.",
    keySpec: "🌊 Sargassum 2% FCO Grade | 3-in-1 Formula",
    category: ["all","organic-inputs","best-sellers"],
    badges: ["Best Seller","FCO Grade"],
    form: "Granules",
    price: 150,
    mrp: 200,
    unit: "per 10kg",
    packSize: "10 kg bag",
    discount: 25,
    rating: 4.4,
    reviewCount: 19,
    buyLinks: {
      indiamart: "https://www.indiamart.com/proddetail/sargassum-seaweed-granules-2-fco-grade-2850622755015.html",
      indiamartLabel: "Buy on IndiaMART",
      whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Energy%20Balls%20Seaweed%20Granules.",
      whatsappLabel: "WhatsApp to Order"
    },
    dosage: "10 kg per acre | Broadcast and mix at sowing",
    suitableFor: ["Cotton","Paddy","Sugarcane","Vegetables","All Crops"],
    specTable: [
      ["Seaweed Content","2% Sargassum (FCO grade)","Govt-certified quality — not cheap filler"],
      ["Formula","3-in-1: Seaweed + Humic + Protein","One product replaces three inputs"],
      ["Release Type","Slow-release granules","One application feeds soil for 60–90 days"],
      ["Water Retention","+30% soil moisture holding","Less irrigation, lower water bill"],
      ["Purity","98%","Near-zero fillers — you pay for active content"],
      ["Earthworm Impact","Stimulates earthworm colonies","More worms = naturally aerated soil"],
      ["Application","Basal at sowing","Mix with soil at planting — no extra labour"]
    ],
    benefits: [
      "🌊 Ocean-Sourced Nutrition — Sargassum trace minerals",
      "🔄 Slow Release — feeds soil for 2–3 months from one application",
      "💧 30% Better Water Retention — less irrigation needed",
      "🐛 Earthworm Activator — worm population increases naturally",
      "🛡️ Fungal Disease Resistance — strengthened cell walls",
      "🌱 Root Zone Health — protein hydrolysate feeds root microbes"
    ],
    imageLookup: ["energy-balls","energyballs","EnergyBalls","energy_balls","magic-balls","MagicBalls"],
    reviews: [
      { name:"Dinesh Patil", location:"Vadodara", rating:4,
        text:"Applied at sowing with DAP. Good results on chilli crop." },
      { name:"Kiran Patel", location:"Mehsana", rating:5,
        text:"Soil water retention improved. Less irrigation needed." }
    ]
  },
  {
    id: "seaweed-liquid",
    name: "Seaweed Liquid",
    tagline: "60+ Ocean Minerals. One Spray. Visible in 5 Days.",
    keySpec: "🌿 Sargassum tenerrimum 10% FCO | Cold Processed",
    category: ["all","organic-inputs","best-sellers"],
    badges: ["Best Seller","FCO Grade"],
    form: "Liquid",
    price: 150,
    mrp: 200,
    unit: "per litre",
    packSize: "1 Litre",
    discount: 25,
    rating: 4.3,
    reviewCount: 14,
    buyLinks: {
      website: "https://www.agrocare.co.in/seaweed-extract.html",
      websiteLabel: "Buy on AgroCare.co.in",
      indiamart: "https://www.indiamart.com/proddetail/ascophyllum-nodosum-15-liquid-fco-grade-2850622948630.html",
      indiamartLabel: "Buy on IndiaMART",
      whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Seaweed%20Liquid.",
      whatsappLabel: "WhatsApp to Order"
    },
    dosage: "3–4 ml per litre water (foliar) | 2L per acre (soil drench)",
    suitableFor: ["Tomato","Chilli","Grapes","Mango","Cotton","Wheat","Flowers"],
    specTable: [
      ["Star Ingredient","Sargassum tenerrimum 10%","FCO-certified — not diluted cheap extract"],
      ["Natural Hormones","Cytokinins + Auxins + Gibberellins","Plant hormones = faster growth and branching"],
      ["Trace Minerals","60+ incl. iodine, zinc, iron, manganese","Fills micronutrient gaps chemicals can't"],
      ["Stress Recovery","Drought + heat + frost tolerance","Crop bounces back from stress faster"],
      ["Visible Result","5–7 days","Deeper green colour visible within a week"],
      ["Processing","Cold-processed liquid","Heat destroys hormones — cold press keeps them active"],
      ["Grade","FCO certified","Meets Fertiliser Control Order govt standard"]
    ],
    benefits: [
      "🧬 Natural Plant Hormones — cytokinins, auxins, gibberellins",
      "🔬 60+ Trace Minerals — iodine, zinc, manganese, iron",
      "☀️ Heat & Drought Shield — reduces crop stress",
      "🌸 Reduces Flower Drop — higher fruit set, more income",
      "⚡ Visible in 5–7 Days — crops turn deeper green quickly",
      "🔗 Tank-Mix Friendly — add to existing spray routine"
    ],
    imageLookup: ["seaweed-liquid","vanchetan-taral","VanchetanTaral","seaweed_liquid","powder-seaweed-extract"],
    reviews: [
      { name:"Manjunath Reddy", location:"Kolar, Karnataka", rating:5,
        text:"Used on tomato. Fruit size improved, less cracking. Visible results in 6 days." },
      { name:"Suresh Patil", location:"Vijayapura, Karnataka", rating:4,
        text:"Grape quality improved — berry size and brix both went up." }
    ]
  },
  {
    id: "seaweed-gel",
    name: "Seaweed Extract Gel",
    tagline: "Drip It. Spray It. Watch Your Crop Transform.",
    keySpec: "💧 Alginic Acid + Cytokinin Rich | 98% Pure",
    category: ["all","organic-inputs"],
    badges: [],
    form: "Gel",
    price: 90,
    mrp: 110,
    unit: "per kg",
    packSize: "7 kg retail | 50 kg bulk",
    discount: 18,
    rating: 4.2,
    reviewCount: 11,
    buyLinks: {
      indiamart: "https://www.indiamart.com/proddetail/seaweed-extract-gel-2849560501488.html",
      indiamartLabel: "Buy on IndiaMART (50kg)",
      whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Seaweed%20Extract%20Gel.",
      whatsappLabel: "WhatsApp for 7kg Retail"
    },
    dosage: "5 kg per acre | Drip: dissolve in header tank | Foliar: 5–10g per litre",
    suitableFor: ["Vegetables","Fruits","Sugarcane","Flowers","Grapes"],
    specTable: [
      ["Key Compound","Alginic Acid (high conc.)","Locks moisture in soil — like a sponge at roots"],
      ["Cytokinin Content","Rich — natural source","Triggers new shoot growth and cell division"],
      ["Solubility","100% water soluble","Drip irrigation compatible — no clogging ever"],
      ["Purity","98% seaweed extract","You pay for active content, not fillers"],
      ["Shelf Life","12 months","Stable — no refrigeration needed"],
      ["Pack Options","7 kg retail / 50 kg bulk","Trial size before bulk buy"]
    ],
    benefits: [
      "💧 Alginic Acid = Soil Sponge — holds water where roots reach",
      "🌱 Cytokinin-Rich — stimulates new shoots and lateral branching",
      "🚿 Drip-System Ready — fully dissolves, won't block emitters",
      "🍅 Better Fruit Set — improvement in tomato, chilli, pomegranate",
      "🔒 No Synthetic Additives — 98% pure, organic certified safe",
      "📅 12-Month Shelf Life — buy bulk without wastage worry"
    ],
    imageLookup: ["magic-gel","energy-gel","MagicGel","seaweed-gel","seaweed_extract_gel","granular-biozyme"],
    reviews: [
      { name:"Bhavesh Patel", location:"Amreli, Gujarat", rating:4,
        text:"Applied via drip on chilli. Flowering improved noticeably." }
    ]
  },
  {
    id: "potassium-humate",
    name: "Potassium Humate Shiny Flakes 98%",
    tagline: "98% Pure. ISO Certified. Unlocks Hidden Soil Reserves.",
    keySpec: "⚡ 98% Pure | 70% Humic Acid | ISO 9001:2015 Certified",
    category: ["all","soil-conditioners","best-sellers"],
    badges: ["Best Seller","ISO 9001:2015"],
    form: "Flakes",
    price: 90,
    mrp: 130,
    unit: "per kg",
    packSize: "1 kg retail | 25 kg bulk",
    discount: 31,
    rating: 4.6,
    reviewCount: 32,
    buyLinks: {
      meesho: "https://www.meesho.com/s/p/9wuylx?utm_source=s_wb",
      meeshoLabel: "Buy on Meesho",
      website: "https://www.agrocare.co.in/potassium-humate-shiny-flakes.html",
      websiteLabel: "Buy on AgroCare.co.in",
      whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Potassium%20Humate%2025kg%20bulk.",
      whatsappLabel: "WhatsApp for Bulk (25kg)"
    },
    dosage: "2 kg per acre | Dissolve in 200L water or broadcast dry",
    suitableFor: ["All Crops","Cotton","Wheat","Paddy","Vegetables","Sugarcane"],
    specTable: [
      ["Purity","98% Potassium Humate","Premium — market products are only 50–70%"],
      ["Form","Shiny Flakes","Dissolves faster than powder — works quicker"],
      ["Humic Acid %","70%","The working compound that transforms soil"],
      ["Fulvic Acid %","10%","Mobile fraction — penetrates plant cells directly"],
      ["Potash %","10%","Built-in K — no need to buy potash separately"],
      ["Certification","ISO 9001:2015","Third-party quality verified"],
      ["Chemical Saving","20–30% less urea + DAP","Pays for itself in first season"],
      ["CEC Improvement","Increases nutrient-holding capacity","Fertilisers stop leaching — more for roots"]
    ],
    benefits: [
      "💛 98% Pure Shiny Flakes — fastest dissolving, most concentrated",
      "🔗 Chelation Power — grabs locked iron, zinc, manganese for roots",
      "🧲 CEC Booster — soil holds MORE of fertiliser you already apply",
      "📉 Cut Fertiliser Bills 20–30% — farmers replace 30% of urea",
      "🦠 Feeds Soil Biology — humic is preferred food for good bacteria",
      "✅ ISO 9001:2015 Certified — not just a label claim"
    ],
    imageLookup: ["potassium-humate","power-gold","PowerGold","humic-flakes","shiny-flakes","potassium humate"],
    reviews: [
      { name:"Ramesh Patel", location:"Anand, Gujarat", rating:5,
        text:"Used on cotton — yield increased noticeably. Soil feels softer after 2 seasons." },
      { name:"Suresh Desai", location:"Rajkot, Gujarat", rating:4,
        text:"Good product, price is reasonable. Delivery was fast." },
      { name:"Meena Farms", location:"Surat", rating:5,
        text:"Replaced 30% of our urea this kharif. No drop in yield, lower cost." }
    ]
  },
  {
    id: "humic-acid-fco",
    name: "Humic Acid 5% FCO Grade",
    tagline: "Government-Grade Humic. Soil Health You Can Measure.",
    keySpec: "🏛️ FCO Certified | Fertiliser Control Order Govt Standard",
    category: ["all","soil-conditioners"],
    badges: ["FCO Certified"],
    form: "Powder",
    price: 90,
    mrp: 130,
    unit: "per kg",
    packSize: "1 kg | 25 kg bulk",
    discount: 31,
    rating: 4.5,
    reviewCount: 21,
    buyLinks: {
      website: "https://www.agrocare.co.in/humic-aid-powder.html",
      websiteLabel: "Buy on AgroCare.co.in",
      whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Humic%20Acid%20FCO%20Grade%20Powder.",
      whatsappLabel: "WhatsApp to Order"
    },
    dosage: "2–3 kg per acre | Mix in 200L water or with FYM",
    suitableFor: ["All Crops","Cotton","Wheat","Vegetables","Groundnut"],
    specTable: [
      ["Humic Acid %","5% FCO grade","Govt-certified concentration — legally verified"],
      ["Grade","FCO — Fertiliser Control Order","Meets India's strictest fertiliser standard"],
      ["Form","Powder","Easy to dissolve, mix with irrigation water"],
      ["Soil Action","Improves CEC + soil structure","Nutrients stop washing away — more for roots"],
      ["Chemical Saving","Reduces urea + DAP need","Lower input cost from first season"],
      ["Organic Matter","Builds long-term soil carbon","Soil gets more fertile each season"],
      ["pH Range","All soil types","Effective in Gujarat's alkaline soils too"]
    ],
    benefits: [
      "🏛️ FCO Grade — meets India's Fertiliser Control Order standard",
      "🔗 Natural Chelator — makes locked micronutrients available",
      "🧲 Improves CEC — soil holds fertiliser, less leaching in monsoon",
      "📉 Reduce Chemical Input Cost — pair with DAP/urea, use less",
      "🌱 Builds Soil Carbon — long-term fertility improves every season",
      "💧 Better Water Use — improves soil structure and water-holding"
    ],
    imageLookup: ["humic-acid","humic-powder","HumicAcid","humic_acid","power-gold","humic granuels"],
    reviews: [
      { name:"Ramesh Yadav", location:"Lucknow, UP", rating:5,
        text:"Pehle baar humic acid use kiya gehu mein. Chemical fertiliser 25% kam lagaya aur yield same rahi." }
    ]
  },
  {
    id: "neem-oil",
    name: "Neem Oil",
    tagline: "200 Pests. One Oil. Safe for Bees, Butterflies & You.",
    keySpec: "✅ 99% Pure | Cold Pressed | Azadirachtin Active",
    category: ["all","pest-control","organic-inputs"],
    badges: [],
    form: "Liquid",
    price: 350,
    mrp: 450,
    unit: "per litre",
    packSize: "250 ml | 1 Litre",
    discount: 22,
    rating: 4.3,
    reviewCount: 17,
    buyLinks: {
      indiamart: "https://www.indiamart.com/proddetail/250ml-neem-oil-2850623066330.html",
      indiamartLabel: "Buy on IndiaMART",
      whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Neem%20Oil.",
      whatsappLabel: "WhatsApp to Order"
    },
    dosage: "3–5 ml per litre water | Spray morning or evening only",
    suitableFor: ["Tomato","Chilli","Cotton","Brinjal","Okra","Grapes","All Crops"],
    specTable: [
      ["Active Compound","Azadirachtin","Disrupts pest hormones — stops feeding, breeding"],
      ["Purity","99%","Maximum active — no cheap carrier oil dilution"],
      ["Extraction","Cold Pressed","Heat destroys azadirachtin — cold press keeps it"],
      ["Colour","Golden","Sign of quality — dark = overheated extraction"],
      ["Pests Controlled","200+ species","Whitefly, aphids, mites, leaf miners, thrips"],
      ["Bee Safety","100% safe for bees","Doesn't harm pollinators — critical for fruit crops"],
      ["Antifungal","Yes — active","Controls powdery mildew, downy mildew, rust"],
      ["Residue","Biodegrades in 3–7 days","No soil buildup — safe right up to harvest"]
    ],
    benefits: [
      "🐛 Controls 200+ Pest Species — all sucking and chewing insects",
      "🧬 Hormone Disruptor — pests stop feeding and reproducing",
      "🍄 Antifungal + Antibacterial — prevents mildew, rust, blight",
      "🐝 Bee & Earthworm Safe — safe for all beneficial insects",
      "♻️ Biodegradable — zero residue, safe right up to harvest",
      "💰 3-in-1 — pesticide + fungicide + soil improver"
    ],
    imageLookup: ["neem-oil","NeemOil","neem_oil","neem"],
    reviews: [
      { name:"Haresh Thakor", location:"Gandhinagar", rating:4,
        text:"Whitefly problem on tomato solved in 2 sprays. Happy." },
      { name:"Maniben Farms", location:"Bhavnagar", rating:5,
        text:"100% organic and it works. Bees in field are safe." }
    ]
  },
  {
    id: "boron-21",
    name: "Boron 21%",
    tagline: "The Missing Piece. Hollow Hearts Fixed. Fruit Set Boosted.",
    keySpec: "🔬 21% Boron — 2× Stronger Than Standard 10% Products",
    category: ["all","soil-conditioners","organic-inputs"],
    badges: [],
    form: "Powder",
    price: 150,
    mrp: 200,
    unit: "",
    packSize: "Standard packs",
    discount: 25,
    rating: 4.1,
    reviewCount: 8,
    buyLinks: {
      whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Boron%2021%25.",
      whatsappLabel: "Connect With Us to Order"
    },
    dosage: "0.5–1 g per litre water (foliar) | 1–2 kg per acre (soil)",
    suitableFor: ["Potato","Tomato","Fruits","Cotton","All Crops"],
    specTable: [
      ["Boron Content","21%","Most products 10–15% — this is 2× stronger"],
      ["Deficiency Fixed","Hollow heart · tip burn · flower drop · fruit crack","If crop shows these — this is the exact fix"],
      ["Pollen Impact","Improves pollen germination","Better pollination = more fruit = more income"],
      ["Sugar Movement","Improves sugar translocation","Higher brix in fruit = better market price"],
      ["Application","Foliar + soil","Spray on leaves OR apply to soil"],
      ["Critical Timing","⚠️ Before flowering — CRITICAL","Must apply before flowering for full effect"]
    ],
    benefits: [
      "🍎 Fixes Hollow Heart — the #1 problem in potato, sugar beet, radish",
      "🌸 Boosts Fruit Set — better pollen = more fruit from same flowers",
      "🍬 Sweeter Fruit — better brix = higher market price",
      "🌿 Fixes Tip Burn — corrects brown/dead leaf tips immediately",
      "💪 21% Strength — twice as concentrated as budget products"
    ],
    imageLookup: ["boron","boron21","Boron_21","Boron"],
    reviews: []
  },
  {
    id: "fulvic-acid",
    name: "Fulvic Acid Fertiliser",
    tagline: "Nano-Nutrient Carrier. Penetrates Where Nothing Else Can.",
    keySpec: "⚡ 95%+ Fulvic Acid — Ultra Pure | 100% Drip Compatible",
    category: ["all","soil-conditioners"],
    badges: [],
    form: "Powder",
    price: 130,
    mrp: 180,
    unit: "per kg",
    packSize: "1 kg | 25 kg",
    discount: 28,
    rating: 4.2,
    reviewCount: 9,
    buyLinks: {
      whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20want%20to%20order%20Fulvic%20Acid%20Fertiliser.",
      whatsappLabel: "Connect With Us to Order"
    },
    dosage: "1–2 kg per acre (drip/fertigation) | 1–2 g per litre (foliar)",
    suitableFor: ["All Crops","Vegetables","Fruits","Cotton"],
    specTable: [
      ["Fulvic Acid %","95%+","Ultra-pure — market products are 50–70%"],
      ["Molecule Size","Smallest humic fraction","Penetrates plant cell membranes — humic cannot"],
      ["Nutrient Carrying","Chelates Fe, Zn, Cu, Mn","Carries locked minerals directly into cells"],
      ["Solubility","100% water soluble","Drip tank or foliar — no residue"],
      ["Visible Effect","7–10 days","Faster green-up than humic acid alone"],
      ["pH","3–4 (slightly acidic)","Corrects Gujarat's alkaline soils naturally"],
      ["Heavy Metal Block","Reduces toxic uptake","Safer produce — less lead, cadmium in crop"]
    ],
    benefits: [
      "⚡ Penetrates Plant Cells — humic works outside, fulvic works INSIDE",
      "🔗 Natural Chelator — escorts iron, zinc, copper, manganese in",
      "☀️ Boosts Photosynthesis — measurable chlorophyll increase",
      "🚫 Blocks Heavy Metal Uptake — safer produce for your buyers",
      "💧 100% Drip Compatible — fully soluble, safe for all drip systems"
    ],
    imageLookup: ["fulvic-acid","fulvicacid","FulvicAcid","fulvic"],
    reviews: []
  },
  {
    id: "combo-solution",
    name: "Combo Solution",
    tagline: "Everything Your Crop Needs. One Order. 30% Less Cost.",
    keySpec: "📦 VanChetan Davya + Energy Balls + Humic Acid — Complete Kit",
    category: ["all","best-sellers","new-arrivals"],
    badges: ["Most Popular","New"],
    form: "Bundle",
    price: null,
    mrp: null,
    unit: "",
    packSize: "Customisable — 1 acre kit",
    discount: 35,
    rating: 4.7,
    reviewCount: 5,
    buyLinks: {
      whatsapp: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20am%20interested%20in%20the%20Combo%20Solution%20for%201%20acre.%20Please%20share%20pricing.",
      whatsappLabel: "Get Custom Quote on WhatsApp"
    },
    dosage: "Complete 1-acre kit — matched dosages for full season",
    suitableFor: ["All Crops","First-Time Organic Farmers"],
    specTable: [
      ["Includes","VanChetan Davya (2L)","Soil microbial activator — 1 acre coverage"],
      ["Includes","Energy Balls (10kg)","Slow-release seaweed granules — 1 acre"],
      ["Includes","Humic Acid Powder (2kg)","Soil transformer + fertiliser booster"],
      ["Savings","30–35% vs buying separately","Cheapest way to start organic farming"],
      ["Advisory","Free WhatsApp guide included","We tell you exactly when to apply what"]
    ],
    benefits: [
      "🎯 Complete Programme — soil health + root + foliar nutrition",
      "📋 No Guesswork — matched dosages, free WhatsApp usage guide",
      "💰 30–35% cheaper than buying each separately",
      "🌱 First-Timer Friendly — for farmers new to organic inputs",
      "📱 Free Advisory — WhatsApp support all season from our team"
    ],
    imageLookup: ["combo-solution","combo","ComboSolution","Combo"],
    reviews: []
  }
];

const filters = [
  { id: "all",            label: "All Products" },
  { id: "best-sellers",  label: "🏆 Best Sellers" },
  { id: "new-arrivals",  label: "🆕 New Arrivals" },
  { id: "organic-inputs",label: "🌿 Organic Inputs" },
  { id: "soil-conditioners", label: "🌍 Soil Conditioners" },
  { id: "pest-control",  label: "🐛 Pest Control" },
];

const priceComparison = [
  { product:"Potassium Humate (1kg)", market:130, ours:90 },
  { product:"Seaweed Granules (10kg)", market:200, ours:150 },
  { product:"Seaweed Liquid (1L)", market:200, ours:150 },
  { product:"Seaweed Gel (1kg)", market:110, ours:90 },
  { product:"Neem Oil (1L)", market:450, ours:350 },
  { product:"Humic Acid FCO (1kg)", market:130, ours:90 },
];

function StarRating({ rating }) {
  return (
    <span style={{ color:'#2d5016', fontSize:'14px' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i}>{i <= Math.floor(rating) ? '★' : i - rating < 1 ? '½' : '☆'}</span>
      ))}
    </span>
  );
}

function ImageOrPlaceholder({ product }) {
  const src = resolveImage(product.imageLookup);
  if (src) {
    return (
      <img src={src} alt={product.name}
        style={{ width:'100%', height:'220px', objectFit:'cover',
                 display:'block' }} />
    );
  }
  const initials = product.name.split(' ').slice(0, 2).map(w => w[0]).join('');
  return (
    <div style={{ width:'100%', height:'220px',
                  background:'linear-gradient(135deg, #eef0e8, #e5e8d4)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexDirection:'column', gap:'8px' }}>
      <div style={{ fontSize:'40px' }}>🌿</div>
      <div style={{ color:'#2d5016', fontWeight:700, fontSize:'14px',
                    textAlign:'center', padding:'0 12px' }}>
        {product.name}
      </div>
      <div style={{ color:'#2d5016', fontSize:'12px', opacity:0.6 }}>{initials}</div>
    </div>
  );
}

function BadgePill({ label }) {
  const colors = {
    'Best Seller':    { bg:'#eef0e8', color:'#1c3a0f' },
    'ISO 9001:2015':  { bg:'#e5e8d4', color:'#3d4f1e' },
    'FCO Grade':      { bg:'#f0eee8', color:'#2d5016' },
    'FCO Certified':  { bg:'#f0eee8', color:'#2d5016' },
    'Most Popular':   { bg:'#eef0e8', color:'#1c3a0f' },
    'New':            { bg:'#f5ead8', color:'#2d5016' },
  };
  const c = colors[label] || { bg:'#eef0e8', color:'#2d5016' };
  return (
    <span style={{ padding:'2px 10px', borderRadius:'999px',
                   background:c.bg, color:c.color,
                   fontSize:'11px', fontWeight:700,
                   letterSpacing:'0.5px' }}>
      {label}
    </span>
  );
}

function BuyButtons({ buyLinks, size = 'card' }) {
  const btnStyle = (variant) => ({
    display: 'inline-flex', alignItems:'center', gap:'6px',
    padding: size === 'card' ? '8px 16px' : '10px 20px',
    borderRadius: '999px',
    fontSize: size === 'card' ? '12px' : '13px',
    fontWeight: 700,
    cursor: 'pointer',
    textDecoration: 'none',
    letterSpacing: '0.5px',
    transition: 'all 0.2s',
    border: variant === 'whatsapp'
      ? 'none'
      : '1px solid rgba(74,93,35,0.25)',
    background: variant === 'whatsapp'
      ? '#25d366'
      : variant === 'indiamart'
      ? '#2d5016'
      : variant === 'meesho'
      ? '#2d5016'
      : 'white',
    color: variant === 'whatsapp' || variant === 'indiamart' || variant === 'meesho'
      ? 'white'
      : '#2d5016',
  });

  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
      {buyLinks.website && (
        <a href={buyLinks.website} target="_blank" rel="noopener noreferrer"
           style={btnStyle('website')}>
          🌐 {buyLinks.websiteLabel || 'Buy Online'}
        </a>
      )}
      {buyLinks.indiamart && (
        <a href={buyLinks.indiamart} target="_blank" rel="noopener noreferrer"
           style={btnStyle('indiamart')}>
          📦 {buyLinks.indiamartLabel || 'IndiaMART'}
        </a>
      )}
      {buyLinks.meesho && (
        <a href={buyLinks.meesho} target="_blank" rel="noopener noreferrer"
           style={btnStyle('meesho')}>
          🛍️ {buyLinks.meeshoLabel || 'Meesho'}
        </a>
      )}
      {buyLinks.whatsapp && (
        <a href={buyLinks.whatsapp} target="_blank" rel="noopener noreferrer"
           style={btnStyle('whatsapp')}>
          💬 {buyLinks.whatsappLabel || 'WhatsApp'}
        </a>
      )}
    </div>
  );
}

function ProductModal({ product, onClose }) {
  if (!product) return null;
  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position:'fixed', inset:0, zIndex:2000,
               background:'rgba(45,54,30,0.5)',
               display:'flex', alignItems:'center', justifyContent:'center',
               padding:'20px', overflowY:'auto' }}>
      <div style={{ background:'#fdf6ec', borderRadius:'20px',
                    maxWidth:'900px', width:'100%',
                    maxHeight:'90vh', overflowY:'auto',
                    position:'relative', boxShadow:'0 24px 80px rgba(45,54,30,0.2)' }}>

        <button onClick={onClose}
          style={{ position:'absolute', top:16, right:16, zIndex:10,
                   width:36, height:36, borderRadius:'50%',
                   background:'rgba(45,54,30,0.08)', border:'none',
                   fontSize:18, cursor:'pointer', color:'#1c3a0f' }}>
          ✕
        </button>

        <div style={{ display:'grid',
                      gridTemplateColumns:'minmax(0,1fr) minmax(0,1.4fr)',
                      gap:0 }}>

          <div style={{ borderRadius:'20px 0 0 20px', overflow:'hidden' }}>
            <ImageOrPlaceholder product={product} />
            <div style={{ padding:'16px' }}>
              <p style={{ color:'#6b7560', fontSize:'11px',
                          letterSpacing:'2px', textTransform:'uppercase',
                          marginBottom:'8px' }}>
                Suitable For
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                {product.suitableFor.map(crop => (
                  <span key={crop} style={{ padding:'4px 12px',
                    borderRadius:'999px', background:'#eef0e8',
                    color:'#2d5016', fontSize:'12px', fontWeight:600 }}>
                    🌾 {crop}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding:'28px', overflowY:'auto' }}>
            <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'10px' }}>
              {product.badges.map(b => <BadgePill key={b} label={b} />)}
            </div>

            <h2 style={{ fontFamily:'Playfair Display,Georgia,serif',
                         fontSize:'24px', color:'#1c3a0f',
                         margin:'0 0 4px' }}>
              {product.name}
            </h2>
            {product.nameGu && (
              <p style={{ color:'#2d5016', fontSize:'14px',
                          margin:'0 0 6px' }}>{product.nameGu}</p>
            )}
            <p style={{ color:'#6b7560', fontSize:'14px',
                        fontStyle:'italic', margin:'0 0 12px' }}>
              {product.tagline}
            </p>

            <div style={{ display:'flex', alignItems:'center',
                          gap:'8px', marginBottom:'16px' }}>
              <StarRating rating={product.rating} />
              <span style={{ color:'#6b7560', fontSize:'13px' }}>
                {product.rating} ({product.reviewCount} farmers)
              </span>
            </div>

            <div style={{ background:'#eef0e8', border:'1px solid rgba(74,93,35,0.15)',
                          borderRadius:'10px', padding:'12px 16px',
                          marginBottom:'16px', fontSize:'14px',
                          fontWeight:700, color:'#1c3a0f' }}>
              {product.keySpec}
            </div>

            {product.price && (
              <div style={{ display:'flex', alignItems:'center',
                            gap:'12px', marginBottom:'16px' }}>
                <span style={{ fontSize:'24px', fontWeight:800,
                               color:'#2d5016' }}>
                  ₹{product.price}
                </span>
                <span style={{ fontSize:'14px', color:'#6b7560',
                               margin:'0' }}>{product.unit}</span>
                {product.mrp && (
                  <span style={{ fontSize:'14px', color:'#aaa',
                                 textDecoration:'line-through' }}>
                    MRP ₹{product.mrp}
                  </span>
                )}
                <span style={{ padding:'3px 10px', borderRadius:'999px',
                               background:'#e5e8d4', color:'#3d4f1e',
                               fontSize:'12px', fontWeight:700 }}>
                  SAVE {product.discount}%
                </span>
              </div>
            )}

            <p style={{ color:'#6b7560', fontSize:'11px', letterSpacing:'2px',
                        textTransform:'uppercase', marginBottom:'8px' }}>
              Specifications
            </p>
            <div style={{ borderRadius:'10px', overflow:'hidden',
                          border:'1px solid rgba(74,93,35,0.12)',
                          marginBottom:'16px' }}>
              <div style={{ display:'grid',
                            gridTemplateColumns:'1fr 1fr 1.5fr',
                            background:'#2d5016', padding:'8px 12px',
                            gap:'8px' }}>
                {['Spec','Value','What It Means For You'].map(h => (
                  <span key={h} style={{ color:'white', fontSize:'11px',
                                         fontWeight:700, letterSpacing:'1px',
                                         textTransform:'uppercase' }}>
                    {h}
                  </span>
                ))}
              </div>
              {product.specTable.map((row, i) => (
                <div key={i} style={{
                  display:'grid', gridTemplateColumns:'1fr 1fr 1.5fr',
                  padding:'8px 12px', gap:'8px',
                  background: i%2===0 ? '#fdf6ec' : '#f5ead8',
                  borderTop:'1px solid rgba(74,93,35,0.06)'
                }}>
                  <span style={{ color:'#6b7560', fontSize:'12px',
                                  fontWeight:600 }}>{row[0]}</span>
                  <span style={{ color:'#1c3a0f', fontSize:'12px',
                                  fontWeight:700 }}>{row[1]}</span>
                  <span style={{ color:'#2d5016', fontSize:'12px',
                                  fontStyle:'italic' }}>{row[2]}</span>
                </div>
              ))}
            </div>

            <p style={{ color:'#6b7560', fontSize:'11px', letterSpacing:'2px',
                        textTransform:'uppercase', marginBottom:'8px' }}>
              Key Benefits
            </p>
            <ul style={{ listStyle:'none', padding:0,
                         margin:'0 0 16px', display:'flex',
                         flexDirection:'column', gap:'6px' }}>
              {product.benefits.map((b,i) => (
                <li key={i} style={{ fontSize:'13px', color:'#1c3a0f',
                                      padding:'6px 10px', borderRadius:'8px',
                                      background: i%2===0 ? '#f5ead8' : 'white',
                                      lineHeight:'1.4' }}>
                  {b}
                </li>
              ))}
            </ul>

            <div style={{ background:'#f5ead8',
                          border:'1px solid rgba(74,93,35,0.15)',
                          borderRadius:'10px', padding:'14px',
                          marginBottom:'16px' }}>
              <p style={{ color:'#2d5016', fontSize:'11px',
                          letterSpacing:'2px', textTransform:'uppercase',
                          margin:'0 0 6px', fontWeight:700 }}>
                ⚗️ Dosage & Application
              </p>
              <p style={{ color:'#1c3a0f', fontSize:'13px',
                          lineHeight:'1.6', margin:0 }}>
                {product.dosage}
              </p>
            </div>

            <BuyButtons buyLinks={product.buyLinks} size="modal" />

            {product.reviews && product.reviews.length > 0 && (
              <div style={{ marginTop:'20px' }}>
                <p style={{ color:'#6b7560', fontSize:'11px',
                            letterSpacing:'2px', textTransform:'uppercase',
                            marginBottom:'10px' }}>
                  Farmer Reviews
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                  {product.reviews.map((r,i) => (
                    <div key={i} style={{ background:'white',
                                          border:'1px solid rgba(74,93,35,0.1)',
                                          borderRadius:'10px', padding:'12px' }}>
                      <div style={{ display:'flex', alignItems:'center',
                                    justifyContent:'space-between',
                                    marginBottom:'6px' }}>
                        <div>
                          <span style={{ fontWeight:700, fontSize:'13px',
                                          color:'#1c3a0f' }}>{r.name}</span>
                          <span style={{ color:'#6b7560', fontSize:'12px',
                                          marginLeft:'8px' }}>— {r.location}</span>
                        </div>
                        <StarRating rating={r.rating} />
                      </div>
                      <p style={{ color:'#2d5016', fontSize:'13px',
                                   fontStyle:'italic', margin:0,
                                   lineHeight:'1.5' }}>
                        "{r.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onViewDetails }) {
  const primaryBuyLink = product.buyLinks.website
    ? { href: product.buyLinks.website, label: product.buyLinks.websiteLabel }
    : product.buyLinks.indiamart
    ? { href: product.buyLinks.indiamart, label: product.buyLinks.indiamartLabel }
    : product.buyLinks.meesho
    ? { href: product.buyLinks.meesho, label: product.buyLinks.meeshoLabel }
    : { href: product.buyLinks.whatsapp, label: product.buyLinks.whatsappLabel };

  const primaryHref = primaryBuyLink.href;

  return (
    <div style={{ background:'white', borderRadius:'16px',
                  overflow:'hidden', boxShadow:'0 4px 20px rgba(45,54,30,0.06)',
                  border:'1px solid rgba(74,93,35,0.1)',
                  display:'flex', flexDirection:'column',
                  transition:'all 0.3s' }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(45,54,30,0.1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(45,54,30,0.06)';
      }}>

      <div style={{ position:'relative' }}>
        <ImageOrPlaceholder product={product} />
        {product.discount > 0 && (
          <div style={{ position:'absolute', top:12, left:12,
                        background:'#2d5016', color:'white',
                        padding:'3px 10px', borderRadius:'999px',
                        fontSize:'11px', fontWeight:800 }}>
            -{product.discount}%
          </div>
        )}
        <div style={{ position:'absolute', top:12, right:12,
                      background:'rgba(45,54,30,0.7)', color:'white',
                      padding:'3px 10px', borderRadius:'999px',
                      fontSize:'11px', fontWeight:600 }}>
          {product.form}
        </div>
      </div>

      <div style={{ padding:'16px', flex:1,
                    display:'flex', flexDirection:'column', gap:'8px' }}>

        {product.badges.length > 0 && (
          <div style={{ display:'flex', gap:'4px', flexWrap:'wrap' }}>
            {product.badges.map(b => <BadgePill key={b} label={b} />)}
          </div>
        )}

        <h3 style={{ fontFamily:'Playfair Display,Georgia,serif',
                     fontSize:'17px', color:'#1c3a0f',
                     margin:0, lineHeight:'1.3' }}>
          {product.name}
        </h3>

        <p style={{ color:'#6b7560', fontSize:'12px',
                    fontStyle:'italic', margin:0,
                    lineHeight:'1.4' }}>
          {product.tagline}
        </p>

        <div style={{ background:'#eef0e8', borderRadius:'8px',
                      padding:'8px 10px', fontSize:'12px',
                      fontWeight:700, color:'#1c3a0f' }}>
          {product.keySpec}
        </div>

        <div style={{ borderRadius:'8px', overflow:'hidden',
                      border:'1px solid rgba(74,93,35,0.1)' }}>
          {product.specTable.slice(0,3).map((row, i) => (
            <div key={i} style={{
              display:'flex', justifyContent:'space-between',
              padding:'5px 10px', fontSize:'11px',
              background: i%2===0 ? '#fdf6ec' : '#f5ead8',
              gap:'8px'
            }}>
              <span style={{ color:'#6b7560', flexShrink:0 }}>{row[0]}</span>
              <span style={{ color:'#1c3a0f', fontWeight:700,
                              textAlign:'right' }}>{row[1]}</span>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
          <StarRating rating={product.rating} />
          <span style={{ color:'#6b7560', fontSize:'12px' }}>
            ({product.reviewCount})
          </span>
        </div>

        <div style={{ display:'flex', alignItems:'center',
                      gap:'8px', flexWrap:'wrap' }}>
          {product.price ? (
            <>
              <span style={{ fontSize:'20px', fontWeight:800,
                             color:'#2d5016' }}>
                ₹{product.price}
              </span>
              <span style={{ fontSize:'12px', color:'#888',
                             textDecoration:'line-through' }}>
                ₹{product.mrp}
              </span>
              <span style={{ fontSize:'11px', color:'#3d4f1e',
                             fontWeight:700 }}>{product.unit}</span>
            </>
          ) : (
            <span style={{ fontSize:'14px', color:'#2d5016',
                           fontWeight:700 }}>
              Contact for pricing
            </span>
          )}
        </div>

        <div style={{ flex:1 }} />

        <div style={{ display:'flex', gap:'6px', marginTop:'4px' }}>
          <button onClick={() => onViewDetails(product)}
            style={{ flex:1, padding:'9px', borderRadius:'999px',
                     border:'1px solid rgba(74,93,35,0.25)',
                     background:'white', color:'#2d5016',
                     fontSize:'12px', fontWeight:700,
                     cursor:'pointer', transition:'all 0.2s' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#2d5016';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#2d5016';
            }}>
            View Details
          </button>
          <a href={primaryHref} target="_blank" rel="noopener noreferrer"
            style={{ flex:1, padding:'9px', borderRadius:'999px',
                     background:'#25d366', color:'white',
                     fontSize:'12px', fontWeight:700,
                     textDecoration:'none', textAlign:'center',
                     transition:'all 0.2s', display:'flex',
                     alignItems:'center', justifyContent:'center', gap:'4px' }}
            onMouseEnter={e => e.currentTarget.style.background='#1da851'}
            onMouseLeave={e => e.currentTarget.style.background='#25d366'}>
            💬 Order
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = activeFilter === 'all'
    ? products
    : products.filter(p => p.category.includes(activeFilter));

  return (
    <main style={{ background:'#fdf6ec', minHeight:'100vh',
                   fontFamily:'Nunito, DM Sans, sans-serif' }}>

      <section style={{ padding:'90px 24px 60px', textAlign:'center',
                        background:'linear-gradient(180deg, #f5ead8 0%, #fdf6ec 100%)',
                        borderBottom:'1px solid rgba(74,93,35,0.1)' }}>
        <p style={{ color:'#2d5016', fontSize:'11px', letterSpacing:'4px',
                    textTransform:'uppercase', marginBottom:'12px' }}>
          CERTIFIED ORGANIC INPUTS
        </p>
        <h1 style={{ fontFamily:'Playfair Display,Georgia,serif',
                     fontSize:'clamp(32px,5vw,60px)', color:'#1c3a0f',
                     fontWeight:400, margin:'0 0 16px', lineHeight:'1.15' }}>
          Pure Organic. Proven Results.
        </h1>
        <p style={{ color:'#6b7560', fontSize:'17px', maxWidth:'560px',
                    margin:'0 auto 28px', lineHeight:'1.6' }}>
          Seaweed-based agricultural inputs — certified, affordable, 
          trusted by 12,000+ farmers across India.
        </p>
        <div style={{ display:'flex', gap:'12px', justifyContent:'center',
                      flexWrap:'wrap' }}>
          <button
            onClick={() => document.getElementById('product-grid')?.scrollIntoView({ behavior:'smooth' })}
            style={{ padding:'12px 28px', borderRadius:'999px',
                     background:'#2d5016', color:'#fdf6ec',
                     border:'none', fontWeight:700, fontSize:'14px',
                     cursor:'pointer', letterSpacing:'0.5px' }}>
            Shop All Products ↓
          </button>
          <a href="https://www.indiamart.com/agrocare-una/"
             target="_blank" rel="noopener noreferrer"
             style={{ padding:'12px 28px', borderRadius:'999px',
                      border:'2px solid #2d5016', color:'#2d5016',
                      fontWeight:700, fontSize:'14px',
                      textDecoration:'none', letterSpacing:'0.5px' }}>
            View IndiaMART Store →
          </a>
        </div>
      </section>

      <section style={{ padding:'20px 24px 0',
                        position:'sticky', top:0, zIndex:100,
                        background:'#fdf6ec',
                        borderBottom:'1px solid rgba(74,93,35,0.1)',
                        boxShadow:'0 2px 12px rgba(45,54,30,0.04)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto',
                      display:'flex', gap:'8px',
                      overflowX:'auto', paddingBottom:'16px',
                      scrollbarWidth:'none' }}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)}
              style={{
                padding:'8px 20px', borderRadius:'999px',
                border: activeFilter === f.id
                  ? 'none'
                  : '1px solid rgba(74,93,35,0.2)',
                background: activeFilter === f.id ? '#2d5016' : 'white',
                color: activeFilter === f.id ? '#fdf6ec' : '#2d5016',
                fontSize:'13px', fontWeight:600, cursor:'pointer',
                whiteSpace:'nowrap', transition:'all 0.2s',
                flexShrink:0
              }}>
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section id="product-grid"
        style={{ maxWidth:'1200px', margin:'0 auto',
                 padding:'40px 24px 60px' }}>
        <div style={{ marginBottom:'20px', color:'#6b7560', fontSize:'14px' }}>
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </div>
        <div style={{ display:'grid',
                      gridTemplateColumns:
                        'repeat(auto-fill, minmax(300px, 1fr))',
                      gap:'24px' }}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p}
              onViewDetails={setSelectedProduct} />
          ))}
        </div>
      </section>

      <section style={{ background:'#f5ead8', padding:'60px 24px' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>
          <p style={{ color:'#2d5016', fontSize:'11px', letterSpacing:'4px',
                      textTransform:'uppercase', textAlign:'center',
                      marginBottom:'8px' }}>
            DIRECT FROM MANUFACTURER
          </p>
          <h2 style={{ fontFamily:'Playfair Display,Georgia,serif',
                       fontSize:'clamp(24px,4vw,40px)', color:'#1c3a0f',
                       textAlign:'center', fontWeight:400,
                       margin:'0 0 8px' }}>
            Why Buy From AgroCare Directly?
          </h2>
          <p style={{ color:'#6b7560', textAlign:'center',
                      marginBottom:'32px', fontSize:'15px' }}>
            Same product. No middleman. You keep the savings.
          </p>
          <div style={{ borderRadius:'16px', overflow:'hidden',
                        boxShadow:'0 8px 32px rgba(45,54,30,0.08)' }}>
            <div style={{ display:'grid',
                          gridTemplateColumns:'2fr 1fr 1fr 1fr',
                          background:'#2d5016', padding:'12px 20px',
                          gap:'8px' }}>
              {['Product','Market Price','AgroCare Price','You Save'].map(h => (
                <span key={h} style={{ color:'white', fontSize:'12px',
                                        fontWeight:700, textTransform:'uppercase',
                                        letterSpacing:'1px' }}>
                  {h}
                </span>
              ))}
            </div>
            {priceComparison.map((row, i) => (
              <div key={i} style={{
                display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr',
                padding:'12px 20px', gap:'8px',
                background: i%2===0 ? 'white' : '#fdf6ec',
                alignItems:'center'
              }}>
                <span style={{ color:'#1c3a0f', fontSize:'13px',
                                fontWeight:600 }}>
                  {row.product}
                </span>
                <span style={{ color:'#aaa', fontSize:'13px',
                                textDecoration:'line-through' }}>
                  ₹{row.market}
                </span>
                <span style={{ color:'#2d5016', fontSize:'15px',
                                fontWeight:800 }}>
                  ₹{row.ours}
                </span>
                <span style={{ color:'#3d4f1e', fontSize:'13px',
                                fontWeight:700,
                                background:'#e5e8d4',
                                padding:'3px 10px',
                                borderRadius:'999px',
                                display:'inline-block' }}>
                  Save ₹{row.market - row.ours}
                  {' '}({Math.round((row.market - row.ours)/row.market*100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ textAlign:'center', padding:'60px 24px',
                        background:'#fdf6ec' }}>
        <h2 style={{ fontFamily:'Playfair Display,Georgia,serif',
                     fontSize:'clamp(22px,3vw,36px)', color:'#1c3a0f',
                     fontWeight:400, margin:'0 0 12px' }}>
          Not sure which product you need?
        </h2>
        <p style={{ color:'#6b7560', fontSize:'16px',
                    marginBottom:'24px' }}>
          Our agri-expert will help you choose the right combination 
          for your crop, soil, and budget — free.
        </p>
        <a href="https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20need%20help%20choosing%20the%20right%20product%20for%20my%20farm."
           target="_blank" rel="noopener noreferrer"
           style={{ display:'inline-flex', alignItems:'center', gap:'8px',
                    padding:'14px 32px', borderRadius:'999px',
                    background:'#25d366', color:'white',
                    textDecoration:'none', fontWeight:700,
                    fontSize:'15px', letterSpacing:'0.5px' }}>
          💬 Ask an Expert on WhatsApp
        </a>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}
