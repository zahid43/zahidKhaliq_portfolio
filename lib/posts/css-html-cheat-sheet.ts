import type { BlogPost, ContentBlock } from "../blog-types";

// ─── Card Metadata ────────────────────────────────────────────────────────────

const meta = {
  id: 8,
  slug: "css-html-cheat-sheet",
  title: "Frontend Cheat Sheet: HTML Basics, Media Queries & CSS Tricks",
  excerpt:
    "A personal reference covering the essentials ~ linking assets in HTML, responsive media queries, SCSS mixins, sticky footers, gradient text, scrollbar styling, browser-specific queries, and more. Everything I keep going back to.",
  date: "May 2026",
  category: "CSS",
  readTime: "7 min read",
  size: "wide",
  color: {
    gradient:
      "from-sky-50 via-blue-50 to-indigo-100 dark:from-[#040c18] dark:via-[#060e1e] dark:to-[#081224]",
    glow: "bg-sky-400/20 dark:bg-sky-500/25",
    glowAlt: "bg-blue-400/15 dark:bg-blue-500/20",
    badge:
      "bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 border-sky-300/50 dark:border-sky-500/30",
    accent: "group-hover:text-sky-600 dark:group-hover:text-sky-400",
    border:
      "border-sky-200/80 dark:border-sky-500/20 hover:border-sky-400/50 dark:hover:border-sky-400/40",
  },
} satisfies Omit<BlogPost, "content">;

// ─── Article Content ──────────────────────────────────────────────────────────

const content: ContentBlock[] = [
  {
    type: "paragraph",
    text: "This is my personal reference sheet ~ the snippets and patterns I reach for constantly. Bookmark it, copy freely.",
  },

  // ── HTML Basics ──────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "HTML Basics ~ Linking Assets",
  },
  {
    type: "code",
    language: "html",
    filename: "Favicon",
    code: `<link rel="shortcut icon" href="" type="image/png"/>`,
  },
  {
    type: "code",
    language: "html",
    filename: "Stylesheet",
    code: `<link href="./stylesheet/style.css" rel="stylesheet" type="text/css">`,
  },
  {
    type: "code",
    language: "html",
    filename: "JavaScript",
    code: `<script type="text/javascript" src="yourfile.js"></script>`,
  },
  {
    type: "code",
    language: "html",
    filename: "Bootstrap 4 CDN",
    code: `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">`,
  },
  {
    type: "code",
    language: "html",
    filename: "Tailwind CDN",
    code: `<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css" rel="stylesheet">`,
  },
  {
    type: "code",
    language: "html",
    filename: "Google Material Icons",
    code: `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`,
  },

  // ── Default Placeholder Assets ────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Default Placeholder Assets",
  },
  {
    type: "paragraph",
    text: "Handy URLs for prototyping ~ click any to copy, then paste straight into your src attribute.",
  },
  {
    type: "link",
    href: "https://randomuser.me/api/portraits/men/20.jpg",
    text: "Random user avatar",
    description: "Change the number at the end (0–99) for a different person",
    copyable: true,
  },
  {
    type: "link",
    href: "https://source.unsplash.com/1600x900?male,portrait",
    text: "Unsplash placeholder image",
    description: "Change the keyword after ? to get a different subject",
    copyable: true,
  },
  {
    type: "link",
    href: "https://picsum.photos/1600/900?random",
    text: "Picsum placeholder image",
    description: "Swap 1600/900 for any width/height you need",
    copyable: true,
  },
  {
    type: "link",
    href: "https://www.rmp-streaming.com/media/bbb-360p.mp4",
    text: "Sample video (MP4)",
    description: "360p Big Buck Bunny clip ~ reliable for video element testing",
    copyable: true,
  },

  // ── Media Queries ─────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Media Queries",
  },
  {
    type: "paragraph",
    text: "A media query consists of an optional media type and any number of expressions that limit when it triggers ~ width, pixel density, orientation, etc.",
  },
  {
    type: "code",
    language: "scss",
    filename: "breakpoints.scss",
    code: `$phone-portrait-old: "only screen and (max-width : 360px)";
$phone-portrait:     "only screen and (max-width : 576px)";
$phone-landscape:    "only screen and (max-width: 767px)";
$tablet-start:       "only screen and (max-width : 768px)";
$tablet-mid:         "only screen and (max-width : 991px)";
$desktop-start:      "only screen and (max-width : 1200px)";
$desktop-lg-start:   "only screen and (max-width : 1440px)";`,
  },
  {
    type: "code",
    language: "css",
    filename: "Tablet ~ Landscape",
    code: `@media only screen and (max-width: 1024px) {
  /* styles here */
}`,
  },
  {
    type: "code",
    language: "css",
    filename: "Tablet ~ Portrait",
    code: `@media only screen and (max-width: 768px) {
  /* styles here */
}`,
  },

  // ── SCSS Mixins ───────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "SCSS Flexbox Mixins",
  },
  {
    type: "paragraph",
    text: "Cross-browser flexbox mixins using @mixin and @include ~ useful when you still need to support older WebKit targets.",
  },
  {
    type: "code",
    language: "scss",
    filename: "mixins.scss",
    code: `@mixin flexbox() {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

@mixin justify-content($justify) {
  -webkit-justify-content: $justify;
  -moz-justify-content: $justify;
  -ms-justify-content: $justify;
  justify-content: $justify;
  -ms-flex-pack: $justify;
}

@mixin align-items($align) {
  -webkit-align-items: $align;
  -moz-align-items: $align;
  -ms-align-items: $align;
  -ms-flex-align: $align;
  align-items: $align;
}

@mixin flex-direction($direction) {
  -webkit-flex-direction: $direction;
  -moz-flex-direction: $direction;
  -ms-flex-direction: $direction;
  flex-direction: $direction;
}

@mixin flex($values) {
  -webkit-box-flex: $values;
  -moz-box-flex: $values;
  -webkit-flex: $values;
  -ms-flex: $values;
  flex: $values;
}`,
  },

  // ── Sticky Footer ─────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Sticky Footer",
  },
  {
    type: "paragraph",
    text: "Wrap your page in an .off-canvas-container and give the main section .main-content. The footer stays pinned to the bottom regardless of content height.",
  },
  {
    type: "code",
    language: "css",
    filename: "Parent container",
    code: `.off-canvas-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-height: 100vh;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  min-height: calc(100vh - 90px);
}`,
  },
  {
    type: "code",
    language: "css",
    filename: "Child ~ main content",
    code: `.main-content {
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
}`,
  },

  // ── Hide Number Spinners ──────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Hide Spinners on input[type=\"number\"]",
  },
  {
    type: "code",
    language: "css",
    filename: "style.css",
    code: `input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: textfield; /* Chrome, Safari, Edge, Opera */
  -moz-appearance: textfield; /* Firefox */
}`,
  },

  // ── Browser-specific Queries ──────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Browser-Specific Queries",
  },
  {
    type: "code",
    language: "css",
    filename: "Safari only",
    code: `@supports (hanging-punctuation: first) and (font: -apple-system-body) and (-webkit-appearance: none) {
  .safari-only {
    background-color: red;
  }
}`,
  },
  {
    type: "code",
    language: "css",
    filename: "Firefox only",
    code: `@-moz-document url-prefix() {
  .firefox-only {
    color: green;
  }
}`,
  },

  // ── Gradient Text ─────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Gradient Text",
  },
  {
    type: "code",
    language: "css",
    filename: "gradient-text.css",
    code: `.gradient-text {
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}`,
  },

  // ── nth-child in SCSS ─────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: ":nth-child Selector in SCSS",
  },
  {
    type: "code",
    language: "scss",
    filename: "testimonials.scss",
    code: `$nth-testimonial: 2, 4, 5, 7, 10, 12, 13, 15, 18, 20, 23, 26, 28;

@each $n in $nth-testimonial {
  &:nth-child(#{$n}) {
    article {
      background: $white;
    }
  }
}`,
  },

  // ── Scrollbar Styling ─────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Custom Scrollbar Styling",
  },
  {
    type: "code",
    language: "css",
    filename: "scrollbar.css",
    code: `/* The entire scrollbar */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track (background) */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

/* Thumb (handle) */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Thumb on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}`,
  },

  // ── Auto-fit Grid ─────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Responsive Auto-fit Grid",
  },
  {
    type: "paragraph",
    text: "Creates a responsive grid that automatically adjusts column count based on available space ~ no media queries needed.",
  },
  {
    type: "code",
    language: "css",
    filename: "grid.css",
    code: `.grid {
  grid-template-columns: repeat(auto-fit, minmax(min(500px, 100%), 1fr));
}`,
  },

  // ── Resources ─────────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Worth Watching ~ Kevin Powell",
  },
  {
    type: "link",
    href: "https://youtu.be/qI5rXLJnxco",
    text: "3 modern CSS properties to add to your reset",
    description: "Collapsible accordion animation using modern CSS",
  },
  {
    type: "link",
    href: "https://youtu.be/CAK5kTApkMU",
    text: "Simplifying CSS animations",
    description: "Clean, readable animation patterns you'll actually reuse",
  },
  {
    type: "link",
    href: "https://www.youtube.com/shorts/k330_RUaSIE",
    text: "No more magic numbers with this modern CSS feature",
    description: "Modern badge positioning without hardcoded offsets",
  },
  {
    type: "link",
    href: "https://www.youtube.com/watch?v=svqu6FDiMAs",
    text: "10 NEW CSS Features You Need To Know For 2026",
    description: "Carousel, shapes, and layout tricks landing in browsers now",
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

const post: BlogPost = { ...meta, content };
export default post;
