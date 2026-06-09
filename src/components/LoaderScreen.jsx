import { useState, useEffect, useRef, useCallback } from "react";

export default function LoaderScreen() {
  const [show, setShow] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const videoRef = useRef(null);

  const handleDone = useCallback(() => {
    setOpacity(0);
    setTimeout(() => {
      sessionStorage.setItem("agrocare_loaded", "1");
      setShow(false);
    }, 700);
  }, []);

  useEffect(() => {
    // Only show if fresh browser session
    if (!sessionStorage.getItem("agrocare_loaded")) {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (show && videoRef.current) {
      // Force load and play
      const video = videoRef.current;

      video.addEventListener("error", (e) => {
        console.error("[AgroLoader] Video failed to load:", e);
        console.error("[AgroLoader] Video src was:", video.currentSrc);
        // Still dismiss loader after 3s even if video fails
        setTimeout(handleDone, 3000);
      });

      video.addEventListener("loadeddata", () => {
        console.log("[AgroLoader] Video loaded successfully:", video.currentSrc);
      });

      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked — still mark as loaded after 4s
          setTimeout(handleDone, 4000);
        });
      }
    }
  }, [show, handleDone]);

  if (!show) return null;

  // Leaf data — generated once
  const leaves = [
    { left: 8, delay: 0, dur: 5.2, size: 22, hue: "#4a5d23", drift: 40 },
    { left: 15, delay: 0.8, dur: 4.8, size: 16, hue: "#5a6f2e", drift: -30 },
    { left: 23, delay: 1.5, dur: 6.0, size: 28, hue: "#2d361e", drift: 60 },
    { left: 31, delay: 0.3, dur: 5.5, size: 18, hue: "#4a5d23", drift: -50 },
    { left: 42, delay: 1.1, dur: 4.5, size: 24, hue: "#3d4f1e", drift: 35 },
    { left: 50, delay: 2.0, dur: 5.8, size: 20, hue: "#4a5d23", drift: -40 },
    { left: 58, delay: 0.6, dur: 6.2, size: 26, hue: "#2d361e", drift: 55 },
    { left: 67, delay: 1.8, dur: 5.0, size: 17, hue: "#5a6f2e", drift: -25 },
    { left: 75, delay: 0.4, dur: 4.7, size: 23, hue: "#4a5d23", drift: 45 },
    { left: 83, delay: 1.3, dur: 5.5, size: 19, hue: "#2d361e", drift: -60 },
    { left: 90, delay: 0.9, dur: 6.0, size: 25, hue: "#3d4f1e", drift: 30 },
    { left: 5, delay: 2.2, dur: 5.3, size: 21, hue: "#4a5d23", drift: -35 },
  ];

  return (
    <>
      <style>{`
        @keyframes leafFall {
          0%   { transform: translateY(-80px) translateX(0px) rotate(0deg); opacity:0; }
          8%   { opacity: 0.85; }
          92%  { opacity: 0.6; }
          100% { 
            transform: translateY(110vh) translateX(var(--leaf-drift)) rotate(360deg); 
            opacity: 0; 
          }
        }
        @keyframes loaderPulse {
          0%,100% { opacity: 0.5; transform: scaleX(0.95); }
          50%      { opacity: 1;   transform: scaleX(1); }
        }
        .leaf-item {
          position: absolute;
          top: -80px;
          pointer-events: none;
          animation: leafFall var(--leaf-dur) var(--leaf-delay) infinite linear;
        }
      `}</style>

      {/* FULLSCREEN OVERLAY */}
      <div
        className="loader-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 99999,
          background: "#faf8f4",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          opacity: opacity,
          transition: "opacity 0.7s ease",
        }}
      >
        {/* FALLING LEAVES */}
        {leaves.map((l, i) => (
          <div
            key={i}
            className="leaf-item"
            style={{
              left: `${l.left}%`,
              "--leaf-dur": `${l.dur}s`,
              "--leaf-delay": `${l.delay}s`,
              "--leaf-drift": `${l.drift}px`,
            }}
          >
            <svg
              width={l.size}
              height={l.size}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2C8 2 2 9 2 17c0 5 3 8.5 7.5 10C12 28.5 16 29 16 29s4 .5 6.5-2C27 25.5 30 22 30 17 30 9 24 2 16 2z"
                fill={l.hue}
                opacity="0.75"
              />
              <line
                x1="16"
                y1="6"
                x2="16"
                y2="26"
                stroke="#1a3d08"
                strokeWidth="1"
                opacity="0.4"
              />
              <line x1="16" y1="14" x2="10" y2="10" stroke="#1a3d08" strokeWidth="0.7" opacity="0.3" />
              <line x1="16" y1="18" x2="22" y2="14" stroke="#1a3d08" strokeWidth="0.7" opacity="0.3" />
              <line x1="16" y1="22" x2="10" y2="18" stroke="#1a3d08" strokeWidth="0.7" opacity="0.3" />
            </svg>
          </div>
        ))}

        {/* VIDEO CONTAINER — transparent, no box */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <video
            ref={videoRef}
            className="loader-video"
            onEnded={handleDone}
            muted
            playsInline
            autoPlay
            preload="auto"
            src="/assets/logo-loader.mp4"
            style={{
              width: "min(340px, 72vw)",
              height: "auto",
              display: "block",
              background: "transparent",
              border: "none",
              outline: "none",
              boxShadow: "none",
              borderRadius: 0,
              mixBlendMode: "multiply",
            }}
          >
            <source src="/assets/logo-loader.mp4" type="video/mp4" />
          </video>

          {/* Loading bar */}
          <div
            style={{
              width: "min(200px, 50vw)",
              height: "2px",
              background: "rgba(45,80,22,0.15)",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #4a5d23, #5a6f2e)",
                borderRadius: "999px",
                animation: "loaderPulse 1.5s ease-in-out infinite",
              }}
            />
          </div>

          <p
            style={{
              color: "#4a5d23",
              fontSize: "11px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontFamily: "Nunito, DM Sans, sans-serif",
              margin: 0,
              opacity: 0.7,
            }}
          >
            Growing naturally...
          </p>
        </div>
      </div>
    </>
  );
}
