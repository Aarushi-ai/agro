# AgroCare — AQUAREVA

**Care for Growth, Care for Tomorrow.**

Official marketing website for **AgroCare** (Agriculture Through Services), an organic agri-input company based in Una, Gujarat, India. Products are marketed under the **AQUAREVA** brand — seaweed extracts, humic & fulvic formulations, bio-stimulants, and soil conditioners for Indian farmers.

**Live site:** [https://aquarev.in](https://aquarev.in)

---

## About

AgroCare supplies certified organic agri-inputs across India — from cotton fields in Saurashtra to sugarcane belts in Maharashtra. The site includes:

- Product catalogue with filters, sorting, and enquiry flows
- Farmer stories and reviews
- AI chat assistant
- Enquiry, complaint, and contact forms
- Multi-language support (English, Hindi, Gujarati)
- SEO metadata, structured data, and sitemap

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, vanilla JavaScript |
| Fonts | Cormorant Garamond, DM Sans (Google Fonts) |
| Icons | Tabler Icons |
| API (serverless) | Vercel Functions (`/api/chat`, `/api/send-whatsapp`) |
| Forms | Formspree (enquiry / contact) |
| Images | WebP (optimized); Sharp for build-time compression |
| Deploy | [Vercel](https://vercel.com) · GitHub Pages (Jekyll workflow) |

No React/Vue build step is required for the main site — pages are static HTML served from the repo root.

---

## Project Structure

```
agro/
├── index.html              # Homepage
├── products.html           # Product catalogue
├── about.html              # Company story & founder
├── contact.html            # Contact & offices
├── enquiry.html            # Product enquiry form
├── complaint.html          # Complaint form
├── gallery.html            # Field & farm gallery
├── our-stories.html        # Farmer stories
├── css/
│   ├── styles.css          # Global styles & design tokens
│   └── loader-animation.css
├── js/
│   ├── main.js             # Navigation, animations, chat widget
│   ├── products-catalogue.js  # Product data, filters, cards
│   ├── Ai-chat.js          # AI assistant logic
│   └── i18n.js             # Language strings
├── components/
│   ├── header.html
│   ├── footer.html
│   └── ai-assistant.html
├── assets/
│   ├── images/             # Product, farmer, gallery images (WebP)
│   ├── logo/
│   └── gallery/
├── api/                    # Vercel serverless functions
│   ├── chat/index.js
│   └── send-whatsapp.js
├── vercel.json
├── sitemap.xml
└── robots.txt
```

---

## Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/Aarushi-ai/agro.git
   cd agro
   ```

2. **Serve locally** (any static file server works)

   ```bash
   npx serve .
   # or
   python -m http.server 8080
   ```

   Open `http://localhost:8080` (or the port shown).

3. **Optional — image tooling**

   ```bash
   npm install
   node compress-images.js   # batch image compression (requires sharp)
   ```

---

## Environment Variables

For Vercel/serverless features, set these in the Vercel dashboard or a local `.env` (never commit `.env`):

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` | AI chat API (optional) |
| Formspree IDs | Configured in form `action` URLs on enquiry/contact pages |

---

## Deployment

### Vercel (recommended)

The repo includes `vercel.json` for serverless API routes. Connect the GitHub repo in Vercel and deploy from the `main` branch. Custom domain: **aquarev.in**.

### GitHub Pages

A Jekyll workflow (`.github/workflows/jekyll-gh-pages.yml`) deploys on push to `main`. A `.nojekyll` file is present so static assets are served as-is.

---

## Contact

| | |
|---|---|
| **Phone / WhatsApp** | +91 9427205179 |
| **Email** | agrocare.aquarev@gmail.com · globsynite@gmail.com |
| **Address** | Namah Siddh Nagar, Village Vyajpur, Bhavnagar Road, Una, Gujarat 362560, India |
| **Instagram** | [@___agrocare___](https://www.instagram.com/___agrocare___/) |
| **YouTube** | [Pulkit Jain](https://youtube.com/@pulkitjain-q9u) |
| **LinkedIn** | [AgroCare Aquarev](https://www.linkedin.com/in/agrocare-aquarev-5b2a63413) |

---

## License

Proprietary — © AgroCare 2026. All rights reserved.

---

*AgroCare (Agriculture Through Services) | AQUAREVA | Gujarat, India*
