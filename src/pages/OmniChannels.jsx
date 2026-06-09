export default function OmniChannels() {
  const channels = [
    {
      name: "IndiaMART",
      icon: "🏪",
      color: "#f5a623",
      desc: "Browse and enquire about our full product range on India's largest B2B marketplace.",
      link: "https://www.indiamart.com/agrocare-una/",
      cta: "Shop on IndiaMART",
      features: ["Verified seller", "Bulk pricing available", "Direct enquiry", "Fast response"],
    },
    {
      name: "Meesho",
      icon: "🛍️",
      color: "#9b2d7f",
      desc: "Order Agrocare products for home delivery anywhere in India through Meesho.",
      link: "https://www.meesho.com/s/p/9wuylx?utm_source=s_wb",
      cta: "Shop on Meesho",
      features: ["Home delivery", "Easy returns", "COD available", "Reseller discounts"],
    },
    {
      name: "Local Retail Stores",
      icon: "🏬",
      color: "#2d6a2d",
      desc: "Find Agrocare products at authorized agricultural input stores across Gujarat and India.",
      link: "mailto:agrocare.aquarev@gmail.com",
      cta: "Find Nearest Store",
      features: ["Same-day pickup", "Expert in-store advice", "Demo available", "Bulk purchase"],
    },
    {
      name: "Direct Order",
      icon: "📱",
      color: "#1a3d1a",
      desc: "Order directly via WhatsApp or call us. Best prices, fastest dispatch, direct from manufacturer.",
      link: "https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20need%20help%20choosing%20the%20right%20product%20for%20my%20farm.",
      cta: "Order via WhatsApp",
      features: ["Factory-direct pricing", "Custom quantities", "Same-day dispatch", "Personal support"],
    },
    {
      name: "LinkedIn",
      icon: "💼",
      color: "#0077b5",
      desc: "Connect with us for institutional purchases, partnerships, and B2B enquiries.",
      link: "https://www.linkedin.com/in/agrocare-aquarev-5b2a63413",
      cta: "Connect on LinkedIn",
      features: ["B2B enquiries", "Partnership discussions", "Bulk orders", "Export enquiries"],
    },
    {
      name: "Instagram",
      icon: "📸",
      color: "#e1306c",
      desc: "Follow our journey, see field results, and DM us for quick product queries.",
      link: "https://www.instagram.com/___agrocare___",
      cta: "Follow on Instagram",
      features: ["Field results daily", "Farmer stories", "Product demos", "Quick DM response"],
    },
  ];
  return (
    <main style={{ background: "#f5f0e8", minHeight: "100vh", fontFamily: "DM Sans,sans-serif" }}>
      <section
        style={{
          padding: "100px 24px 60px",
          textAlign: "center",
          background: "linear-gradient(180deg,#e8f5e8,#f5f0e8)",
        }}
      >
        <p
          style={{
            color: "#8b6914",
            fontSize: "11px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          WHERE TO FIND US
        </p>
        <h1
          style={{
            fontFamily: "Cormorant Garamond,Georgia,serif",
            fontSize: "clamp(36px,5vw,64px)",
            color: "#1a2e1a",
            fontWeight: 400,
            margin: "0 0 16px",
          }}
        >
          Buy Agrocare Anywhere
        </h1>
        <p style={{ color: "#7a8e6a", fontSize: "17px", maxWidth: "520px", margin: "0 auto" }}>
          Online, offline, or direct — we make it easy for every farmer to access certified organic inputs wherever they are.
        </p>
      </section>
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 24px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "24px",
        }}
      >
        {channels.map((c, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "32px",
              border: `1px solid ${c.color}22`,
              boxShadow: "0 4px 24px rgba(26,61,26,0.06)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 12px 32px ${c.color}22`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(26,61,26,0.06)";
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>{c.icon}</div>
            <h3
              style={{
                fontFamily: "Cormorant Garamond,Georgia,serif",
                fontSize: "24px",
                color: "#1a2e1a",
                margin: "0 0 12px",
              }}
            >
              {c.name}
            </h3>
            <p style={{ color: "#7a8e6a", fontSize: "14px", lineHeight: 1.7, marginBottom: "16px" }}>{c.desc}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
              {c.features.map((f, j) => (
                <li
                  key={j}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#4a5e3a",
                    fontSize: "13px",
                    marginBottom: "6px",
                  }}
                >
                  <span style={{ color: c.color, fontSize: "10px" }}>✦</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                padding: "12px 24px",
                borderRadius: "999px",
                background: c.color,
                color: "white",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "1px",
              }}
            >
              {c.cta} →
            </a>
          </div>
        ))}
      </section>
    </main>
  );
}
