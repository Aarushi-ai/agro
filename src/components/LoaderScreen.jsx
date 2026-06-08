import { useState, useEffect } from "react";

const leaves = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 16 + Math.random() * 24,
  left: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 4 + Math.random() * 4,
  rotate: Math.random() * 360,
  drift: (Math.random() - 0.5) * 120,
}));

export default function LoaderScreen() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("agrocare_loaded")) {
      setShow(false);
    }
  }, []);

  const handleEnd = () => {
    setFade(true);
    setTimeout(() => {
      sessionStorage.setItem("agrocare_loaded", "1");
      setShow(false);
    }, 600);
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#f5f0e8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: fade ? 0 : 1,
        transition: "opacity 0.6s ease",
      }}
    >
      <style>{`
        @keyframes leafFall {
          0%   { transform: translateY(-60px) translateX(0px) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.7; }
          100% { transform: translateY(110vh) translateX(var(--drift)) rotate(var(--rotate)); opacity: 0; }
        }
        .leaf { 
          position: absolute; 
          top: -60px;
          animation: leafFall var(--dur) var(--delay) infinite linear;
          pointer-events: none;
        }
      `}</style>

      {leaves.map((l) => (
        <div
          key={l.id}
          className="leaf"
          style={{
            left: `${l.left}%`,
            "--dur": `${l.duration}s`,
            "--delay": `${l.delay}s`,
            "--rotate": `${l.rotate}deg`,
            "--drift": `${l.drift}px`,
          }}
        >
          <svg width={l.size} height={l.size} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6 2 2 8 2 14c0 4 2.5 6.5 6 7.5C10 23 12 23 12 23s2 0 4-.5c3.5-1 6-3.5 6-7.5 0-6-4-12-10-12z"
              fill={l.id % 3 === 0 ? "#2d6a2d" : l.id % 3 === 1 ? "#8b6914" : "#4a7a4a"}
              opacity="0.7"
            />
            <line x1="12" y1="6" x2="12" y2="20" stroke="#1a3d1a" strokeWidth="0.8" opacity="0.5" />
          </svg>
        </div>
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <video
          autoPlay
          muted
          playsInline
          onEnded={handleEnd}
          style={{ width: "min(320px, 70vw)", borderRadius: "16px" }}
          src="/assets/logo-loader.mp4"
        />
        <p
          style={{
            color: "#2d6a2d",
            fontSize: "12px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            fontFamily: "DM Sans, sans-serif",
            animation: "pulse 2s infinite",
          }}
        >
          Growing naturally...
        </p>
      </div>
    </div>
  );
}
