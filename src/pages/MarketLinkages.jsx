export default function MarketLinkages() {
  const markets = [
    {
      name: "IndiaMART B2B Portal",
      type: "Online B2B",
      desc: "Our verified seller profile on IndiaMART connects us with 5 crore+ buyers across India. Submit your bulk enquiry and get a quote within 24 hours.",
      link: "https://www.indiamart.com/agrocare-una/",
      stats: [
        { l: "Active Listings", v: "6 Products" },
        { l: "Response Time", v: "< 24 hrs" },
        { l: "Min Order", v: "5 kg / 5 L" },
      ],
    },
    {
      name: "Meesho Direct Sales",
      type: "D2C E-commerce",
      desc: "Individual farmers and home gardeners can order small quantities with home delivery across India. No minimum order.",
      link: "https://www.meesho.com/s/p/9wuylx?utm_source=s_wb",
      stats: [
        { l: "Delivery", v: "Pan India" },
        { l: "Min Order", v: "No minimum" },
        { l: "Payment", v: "COD + Online" },
      ],
    },
    {
      name: "Authorized Dealer Network",
      type: "Physical Retail",
      desc: "18+ districts covered by our authorized dealer network across Gujarat and expanding to Maharashtra, Rajasthan, and MP.",
      link: "mailto:agrocare.aquarev@gmail.com",
      stats: [
        { l: "Districts", v: "18+ active" },
        { l: "States", v: "Gujarat + expanding" },
        { l: "Dealers", v: "50+ partners" },
      ],
    },
    {
      name: "Export Markets",
      type: "International",
      desc: "We export seaweed extracts and organic bio-stimulants to select markets. Currently serving enquiries from UAE, UK, and Southeast Asia.",
      link: "mailto:agrocare.aquarev@gmail.com",
      stats: [
        { l: "Markets", v: "UAE, UK, SEA" },
        { l: "Certifications", v: "ISO 9001" },
        { l: "Min Export", v: "100 kg" },
      ],
    },
    {
      name: "Government Schemes",
      type: "Institutional",
      desc: "Registered supplier under PM-PRANAM and Atmanirbhar Bharat agricultural schemes. Farmers can avail subsidised rates through their local KVK/ATMA.",
      link: "mailto:agrocare.aquarev@gmail.com",
      stats: [
        { l: "Scheme", v: "PM-PRANAM" },
        { l: "Subsidy", v: "Up to 50%" },
        { l: "Contact", v: "Via KVK/ATMA" },
      ],
    },
    {
      name: "Farmer Producer Organizations",
      type: "FPO/Cooperative",
      desc: "Special pricing and direct supply arrangements for FPOs and cooperatives. Bulk supply with credit terms for established organizations.",
      link: "mailto:agrocare.aquarev@gmail.com",
      stats: [
        { l: "Min Volume", v: "50 kg / month" },
        { l: "Credit", v: "30-45 days" },
        { l: "Support", v: "Dedicated rep" },
      ],
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
          MARKET LINKAGES
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
          From Our Fields
          <br />
          To Your Market
        </h1>
        <p style={{ color: "#7a8e6a", fontSize: "17px", maxWidth: "520px", margin: "0 auto" }}>
          Multiple pathways to buy, sell, and partner with Agrocare — online, offline, institutional, and international.
        </p>
      </section>
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 24px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "24px",
        }}
      >
        {markets.map((m, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "32px",
              border: "1px solid rgba(45,106,45,0.12)",
              boxShadow: "0 4px 24px rgba(26,61,26,0.06)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 16px 40px rgba(26,61,26,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(26,61,26,0.06)";
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "999px",
                background: "#e8f5e8",
                color: "#2d6a2d",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2px",
                marginBottom: "16px",
              }}
            >
              {m.type}
            </span>
            <h3
              style={{
                fontFamily: "Cormorant Garamond,Georgia,serif",
                fontSize: "22px",
                color: "#1a2e1a",
                margin: "0 0 12px",
              }}
            >
              {m.name}
            </h3>
            <p style={{ color: "#7a8e6a", fontSize: "14px", lineHeight: 1.7, marginBottom: "16px" }}>{m.desc}</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              {m.stats.map((s, j) => (
                <div
                  key={j}
                  style={{
                    background: "#f5f0e8",
                    borderRadius: "10px",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: "#1a2e1a", fontWeight: 700, fontSize: "13px" }}>{s.v}</div>
                  <div style={{ color: "#7a8e6a", fontSize: "11px", marginTop: "2px" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <a
              href={m.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                padding: "12px 24px",
                borderRadius: "999px",
                background: "#2d6a2d",
                color: "white",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "1px",
              }}
            >
              Connect Now →
            </a>
          </div>
        ))}
      </section>
    </main>
  );
}
