export default function AvatarGraphic({ className }: { className?: string }) {
  return (
    <svg
      width="589"
      height="355"
      viewBox="0 0 589 355"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      className={className}
    >
      {/* Top-right purple circle — slow float */}
      <circle
        cx="467"
        cy="8"
        r="8"
        fill="#7B55EC"
        style={{
          animation: "floatY 4s ease-in-out infinite",
          transformOrigin: "467px 8px",
        }}
      />

      {/* Right blue circle — float with delay, slightly bigger pulse */}
      <circle
        cx="544"
        cy="236"
        r="13"
        fill="#63B8E7"
        style={{
          animation: "floatY 5s ease-in-out infinite 1s, pulse 5s ease-in-out infinite 1s",
          transformOrigin: "544px 236px",
        }}
      />

      {/* Bottom-left small purple circle — opposite float */}
      <circle
        cx="6"
        cy="349"
        r="6"
        fill="#583FBC"
        style={{
          animation: "floatY 3.5s ease-in-out infinite 0.5s",
          animationDirection: "reverse",
          transformOrigin: "6px 349px",
        }}
      />

      {/* Teal rectangle — slow continuous spin */}
      <rect
        x="547.873"
        y="98.0053"
        width="49.4086"
        height="49.4086"
        rx="12"
        fill="#7DE0EA"
        style={{
          animation: "spinSlow 8s linear infinite",
          transformOrigin: "572px 122px",
        }}
      />
    </svg>
  );
}
