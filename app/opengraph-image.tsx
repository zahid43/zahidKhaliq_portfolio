import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Zahid Khaliq — Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#07051a",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Indigo glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)",
          }}
        />
        {/* Teal glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -60,
            width: 440,
            height: 440,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20,184,166,0.25) 0%, transparent 70%)",
          }}
        />
        {/* Violet glow center-right */}
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 120,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", padding: "0 96px", gap: 0 }}>
          {/* Tag line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 28,
            }}
          >
            <div style={{ width: 32, height: 2, borderRadius: 99, background: "#6366f1" }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#6366f1", letterSpacing: "0.22em", textTransform: "uppercase" }}>
              Portfolio
            </span>
          </div>

          {/* Name */}
          <span
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            Zahid Khaliq
          </span>

          {/* Title */}
          <span
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#6366f1",
              marginBottom: 24,
              letterSpacing: "-0.01em",
            }}
          >
            Frontend Engineer
          </span>

          {/* Description */}
          <span
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.6,
              maxWidth: 680,
            }}
          >
            Building fast, accessible, and polished web experiences with React, Next.js &amp; TypeScript.
          </span>

          {/* URL */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 48 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#14b8a6" }} />
            <span style={{ fontSize: 16, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
              zahidkhaliq.dev
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
