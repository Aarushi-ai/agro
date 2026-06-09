import { useState } from "react";

const galleryImages = [
  "assets/gallery/farmer.webp",
  "assets/gallery/WhatsApp Image 2026-05-29 at 22.52.05.webp",
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  return (
    <main style={{ background: "#F5EED8", minHeight: "100vh", fontFamily: "DM Sans, sans-serif" }}>
      <section
        style={{
          padding: "100px 24px 60px",
          textAlign: "center",
          background: "#F5EED8",
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
          FIELD & FARM
        </p>
        <h1
          style={{
            fontFamily: "Cormorant Garamond,Georgia,serif",
            fontSize: "clamp(36px,6vw,64px)",
            color: "#1a2e1a",
            fontWeight: 400,
            margin: "0 0 16px",
          }}
        >
          Our Gallery
        </h1>
        <p style={{ color: "#7a8e6a", fontSize: "16px", maxWidth: "480px", margin: "0 auto" }}>
          Real fields. Real results. Real Agrocare.
        </p>
      </section>

      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 24px 80px",
          columns: "3 200px",
          gap: "12px",
        }}
      >
        {galleryImages.map((img, i) => (
          <div
            key={i}
            onClick={() => setSelected(img)}
            style={{
              breakInside: "avoid",
              marginBottom: "12px",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.3s",
              boxShadow: "0 4px 16px rgba(26,61,26,0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={img}
              alt={`Agrocare field ${i + 1}`}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        ))}
      </section>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
          }}
        >
          <img
            src={selected}
            alt="Full view"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: "12px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          />
          <button
            type="button"
            onClick={() => setSelected(null)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </main>
  );
}
