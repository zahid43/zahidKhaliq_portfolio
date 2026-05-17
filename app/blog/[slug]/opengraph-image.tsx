import { ImageResponse } from "next/og";
import { posts } from "@/lib/blog";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const categoryColor: Record<string, { text: string; glow: string; badge: string; badgeText: string }> = {
  CSS:        { text: "#a78bfa", glow: "rgba(139,92,246,0.3)",  badge: "rgba(139,92,246,0.15)", badgeText: "#c4b5fd" },
  "Next.js":  { text: "#2dd4bf", glow: "rgba(20,184,166,0.3)",  badge: "rgba(20,184,166,0.15)", badgeText: "#5eead4" },
  A11y:       { text: "#818cf8", glow: "rgba(99,102,241,0.3)",  badge: "rgba(99,102,241,0.15)", badgeText: "#a5b4fc" },
  Animation:  { text: "#f472b6", glow: "rgba(236,72,153,0.3)",  badge: "rgba(236,72,153,0.15)", badgeText: "#f9a8d4" },
  React:      { text: "#22d3ee", glow: "rgba(6,182,212,0.3)",   badge: "rgba(6,182,212,0.15)",  badgeText: "#67e8f9" },
  JavaScript: { text: "#fb923c", glow: "rgba(249,115,22,0.3)",  badge: "rgba(249,115,22,0.15)", badgeText: "#fdba74" },
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  const title    = post?.title    ?? "Blog Post";
  const excerpt  = post?.excerpt  ?? "";
  const category = post?.category ?? "";
  const readTime = post?.readTime ?? "";
  const c = categoryColor[category] ?? categoryColor["Next.js"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07051a",
          padding: "64px 80px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Glow behind category color */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Top — category badge + read time */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {category && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 16px",
                borderRadius: 999,
                background: c.badge,
                border: `1px solid ${c.text}40`,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: c.badgeText, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                {category}
              </span>
            </div>
          )}
          {readTime && (
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>{readTime}</span>
          )}
        </div>

        {/* Middle — title + excerpt */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1, justifyContent: "center", padding: "32px 0" }}>
          <span
            style={{
              fontSize: title.length > 50 ? 48 : 58,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </span>
          {excerpt && (
            <span
              style={{
                fontSize: 20,
                color: "rgba(255,255,255,0.42)",
                lineHeight: 1.55,
                maxWidth: 860,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {excerpt}
            </span>
          )}
        </div>

        {/* Bottom — author + site */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #14b8a6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>Z</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
              Zahid Khaliq
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: c.text }} />
            <span style={{ fontSize: 15, color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>
              zahidkhaliq.dev/blog
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
