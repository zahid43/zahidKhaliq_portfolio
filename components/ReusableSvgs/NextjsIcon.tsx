import * as React from "react";

export default function NextjsIcon({ width = 24, height = 24, className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <title>Next.js</title>
      <mask id="njs-mask" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#njs-mask)">
        <circle cx="90" cy="90" r="90" fill="currentColor" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1V69.267L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="white"
          fillOpacity="0.85"
        />
        <rect x="115" y="54" width="12" height="72" fill="white" fillOpacity="0.85" />
      </g>
    </svg>
  );
}
