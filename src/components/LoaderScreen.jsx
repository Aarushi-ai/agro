import { useState, useEffect } from "react";

const leaves = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  size: 14 + Math.random() * 24,
  top: 6 + Math.random() * 88,
  delay: Math.random() * 3.2,
  duration: 3.5 + Math.random() * 4.5,
  spin: 120 + Math.random() * 240,
  dir: Math.random() > 0.5 ? 1 : -1,
  op: 0.55 + Math.random() * 0.4,
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
        @keyframes leafDrift {
          0%   { transform: translateX(calc(var(--dir) * -58vw)) translateY(0) rotate(0deg); opacity: 0; }
          8%   { opacity: var(--op); }
          45%  { transform: translateX(calc(var(--dir) * -8vw)) translateY(-14px) rotate(calc(var(--spin) * 0.5)); }
          55%  { transform: translateX(calc(var(--dir) * 8vw)) translateY(10px) rotate(calc(var(--spin) * 0.65)); }
          92%  { opacity: 0.45; }
          100% { transform: translateX(calc(var(--dir) * 58vw)) translateY(0) rotate(var(--spin)); opacity: 0; }
        }
        .leaf {
          position: absolute;
          top: var(--top);
          left: 50%;
          animation: leafDrift var(--dur) var(--delay) infinite linear;
          pointer-events: none;
        }
      `}</style>

      {leaves.map((l) => (
        <div
          key={l.id}
          className="leaf"
          style={{
            width: l.size,
            height: l.size,
            marginLeft: -l.size / 2,
            "--top": `${l.top}%`,
            "--dur": `${l.duration}s`,
            "--delay": `${l.delay}s`,
            "--spin": `${l.spin}deg`,
            "--dir": l.dir,
            "--op": l.op,
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
          src="assets/logo-loader.mp4"
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
