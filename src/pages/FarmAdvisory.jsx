export default function FarmAdvisory() {
  const topics = [
    {
      icon: "🌱",
      title: "Soil Health Assessment",
      desc: "Free soil testing guidance and organic carbon improvement roadmap for your specific soil type. We analyze pH, NPK levels, and microbial health.",
      steps: [
        "Collect soil sample (0-6 inch depth)",
        "WhatsApp photo to +91-9427205179",
        "Receive detailed soil report in 48 hours",
        "Get customized input recommendation",
      ],
    },
    {
      icon: "💧",
      title: "Irrigation & Water Management",
      desc: "Optimize water usage with organic inputs. Our bio-stimulants reduce water requirement by up to 50% through improved soil water retention.",
      steps: [
        "Soil water retention audit",
        "Drip/sprinkler compatibility check",
        "SeaGrow Plus application schedule",
        "Monthly monitoring support",
      ],
    },
    {
      icon: "🐛",
      title: "Pest & Disease Management",
      desc: "Integrated pest management using Agrocare's organic protectants. Zero chemical residue approach for export-quality produce.",
      steps: [
        "Pest identification (photo-based)",
        "Organic treatment schedule",
        "NeemShield Pro application guide",
        "Preventive calendar planning",
      ],
    },
    {
      icon: "📈",
      title: "Yield Improvement Program",
      desc: "Structured 3-season program to increase yield by 25-40% using our bio-stimulant schedule. Includes field visits in select districts.",
      steps: [
        "Baseline yield documentation",
        "Custom input schedule",
        "Weekly advisory via WhatsApp",
        "Season-end yield comparison report",
      ],
    },
    {
      icon: "📋",
      title: "Organic Certification Help",
      desc: "We guide farmers through NPOP/PGS organic certification. Products support the 3-year conversion period required for certification.",
      steps: [
        "Eligibility assessment",
        "Document preparation guidance",
        "Input substitution plan",
        "Certification body introduction",
      ],
    },
    {
      icon: "🌾",
      title: "Crop-Specific Advisory",
      desc: "Tailored advice for Cotton, Wheat, Soybean, Vegetables, Fruits, and Cash Crops. Product combinations optimized per crop stage.",
      steps: [
        "Crop and stage identification",
        "Input combination recommendation",
        "Application schedule calendar",
        "Harvest-time quality tips",
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
          FARM ADVISORY
        </p>
        <h1
          style={{
            fontFamily: "Cormorant Garamond,Georgia,serif",
            fontSize: "clamp(36px,5vw,64px)",
            color: "#1a2e1a",
            fontWeight: 400,
            margin: "0 0 20px",
          }}
        >
          Expert Farming Guidance,
          <br />
          Free for Every Farmer
        </h1>
        <p style={{ color: "#7a8e6a", fontSize: "17px", maxWidth: "560px", margin: "0 auto 32px" }}>
          Our agri-experts are available Mon–Sat, 9AM–6PM. Call, WhatsApp, or fill the advisory request form below.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="tel:+919427205179"
            style={{
              padding: "12px 28px",
              borderRadius: "999px",
              background: "#2d6a2d",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            📞 Call an Expert
          </a>
          <a
            href="https://wa.me/919427205179?text=Hi%20AgroCare%2C%20I%20need%20help%20choosing%20the%20right%20product%20for%20my%20farm."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "12px 28px",
              borderRadius: "999px",
              background: "#25d366",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            💬 WhatsApp Advisory
          </a>
          <a
            href="assets/docs/farming-guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "12px 28px",
              borderRadius: "999px",
              border: "2px solid #2d6a2d",
              color: "#2d6a2d",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            📄 Download Farming Guide
          </a>
        </div>
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
        {topics.map((t, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "32px",
              border: "1px solid rgba(45,106,45,0.1)",
              boxShadow: "0 4px 24px rgba(26,61,26,0.06)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(26,61,26,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(26,61,26,0.06)";
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "16px" }}>{t.icon}</div>
            <h3
              style={{
                fontFamily: "Cormorant Garamond,Georgia,serif",
                fontSize: "22px",
                color: "#1a2e1a",
                margin: "0 0 12px",
              }}
            >
              {t.title}
            </h3>
            <p style={{ color: "#7a8e6a", fontSize: "14px", lineHeight: 1.7, marginBottom: "16px" }}>{t.desc}</p>
            <ol style={{ paddingLeft: "20px", margin: 0 }}>
              {t.steps.map((s, j) => (
                <li key={j} style={{ color: "#4a5e3a", fontSize: "13px", marginBottom: "6px", lineHeight: 1.5 }}>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </main>
  );
}
