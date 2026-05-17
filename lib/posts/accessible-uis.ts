import type { BlogPost, ContentBlock } from "../blog-types";

// ─── Card Metadata ────────────────────────────────────────────────────────────

const meta = {
  id: 3,
  slug: "accessible-uis",
  title: "Accessible UIs from the Start",
  excerpt:
    "Around 15% of the world's population lives with some form of disability. Here's the practical side of building UIs that work for all of them ~ semantic HTML, keyboard nav, ARIA, contrast, forms, and a checklist you can use today.",
  date: "Apr 2026",
  category: "A11y",
  readTime: "8 min read",
  size: "normal",
  color: {
    gradient:
      "from-indigo-50 via-blue-50 to-sky-100 dark:from-[#04061a] dark:via-[#060a1e] dark:to-[#070d24]",
    glow: "bg-indigo-400/20 dark:bg-indigo-500/25",
    glowAlt: "bg-blue-400/15 dark:bg-blue-500/20",
    badge:
      "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-300/50 dark:border-indigo-500/30",
    accent: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
    border:
      "border-indigo-200/80 dark:border-indigo-500/20 hover:border-indigo-400/50 dark:hover:border-indigo-400/40",
  },
} satisfies Omit<BlogPost, "content">;

// ─── Article Content ──────────────────────────────────────────────────────────

const content: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Accessibility is one of those things that sounds optional until you realise how many people you're quietly locking out. Around 15% of the world's population lives with some form of disability. On a site with 10,000 visitors, that's 1,500 people who might not be able to use what you built. And beyond disability ~ keyboard navigation, screen reader support, and good contrast make the experience better for everyone, including power users and people in bright sunlight.",
  },
  {
    type: "quote",
    text: "Accessibility isn't a feature you add at the end. It's a quality of the thing you're building.",
  },

  // ── Semantic HTML ─────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Start with Semantic HTML",
  },
  {
    type: "paragraph",
    text: "The single highest-leverage thing you can do is use the right HTML element for the job. Browsers and screen readers already know how to handle a <button>, a <nav>, a <main>, or a <label>. When you replace those with styled divs, you throw away all that built-in behaviour and have to rebuild it manually ~ keyboard focus, ARIA roles, activation on Enter/Space, all of it.",
  },
  {
    type: "code",
    language: "html",
    filename: "bad.html",
    code: `<!-- ✗ A div pretending to be a button -->
<div class="btn" onclick="submit()">Submit</div>`,
  },
  {
    type: "code",
    language: "html",
    filename: "good.html",
    code: `<!-- ✓ A real button ~ keyboard focusable, activates on Enter/Space,
     announces itself as a button to screen readers -->
<button type="button" onclick="submit()">Submit</button>`,
  },
  {
    type: "list",
    items: [
      "Use <button> for actions, <a href> for navigation ~ never swap them",
      "Use <nav>, <main>, <header>, <footer>, <aside> as landmarks ~ screen reader users jump between these",
      "Use heading levels (h1–h6) in order ~ don't pick a heading size for its font size, use CSS for that",
      "Use <label> with every form input ~ either wrapping it or linked via htmlFor / for",
      "Use <ul> or <ol> for lists of items - even if you're going to style them to look like cards",
    ],
  },

  // ── Keyboard Navigation ───────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Keyboard Navigation",
  },
  {
    type: "paragraph",
    text: "A significant number of users never touch a mouse ~ whether due to motor impairments, preference, or just being a developer who lives in the keyboard. Tab should move through all interactive elements in a logical order, Enter should activate buttons and links, and Escape should close modals and dropdowns.",
  },
  {
    type: "code",
    language: "css",
    filename: "focus.css",
    code: `/* Never do this without a replacement */
:focus {
  outline: none;
}

/* Do this instead ~ visible but styled */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 4px;
}`,
  },
  {
    type: "paragraph",
    text: ":focus-visible is the modern way ~ it only shows the focus ring when the user is navigating by keyboard, not when clicking with a mouse. This keeps the design clean for mouse users while remaining fully functional for keyboard users.",
  },

  // ── ARIA ──────────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "ARIA ~ Use It Sparingly",
  },
  {
    type: "paragraph",
    text: "ARIA (Accessible Rich Internet Applications) lets you add semantic meaning to elements when HTML alone isn't enough. The first rule of ARIA is: don't use ARIA if you can use native HTML instead. But when you do need it ~ custom dropdowns, modals, tooltips, live regions ~ here are the attributes you'll reach for most.",
  },
  {
    type: "code",
    language: "html",
    filename: "aria-examples.html",
    code: `<!-- Label something that has no visible text -->
<button aria-label="Close dialog">✕</button>

<!-- Link a button to the content it controls -->
<button aria-expanded="false" aria-controls="menu-list">Menu</button>
<ul id="menu-list" hidden>...</ul>

<!-- Mark a region that updates dynamically -->
<div aria-live="polite" aria-atomic="true">
  Form saved successfully.
</div>

<!-- Hide decorative content from screen readers -->
<svg aria-hidden="true" focusable="false">...</svg>`,
  },
  {
    type: "list",
    items: [
      "aria-label ~ gives an element a name when there's no visible text",
      "aria-labelledby ~ points to another element's text as the label",
      "aria-describedby ~ points to helper/error text associated with an input",
      "aria-expanded ~ tells screen readers whether a disclosure is open or closed",
      "aria-hidden=\"true\" ~ removes decorative elements from the accessibility tree",
      "aria-live ~ announces dynamic content changes (use \"polite\" for most things, \"assertive\" only for urgent errors)",
    ],
  },

  // ── Color Contrast ────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Color Contrast",
  },
  {
    type: "paragraph",
    text: "WCAG 2.1 requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18px+ bold or 24px+ regular). This isn't a pedantic rule ~ low contrast is the most common accessibility failure on the web and affects users with low vision, colour blindness, and anyone reading in bright light.",
  },
  {
    type: "code",
    language: "css",
    filename: "contrast.css",
    code: `/* ✗ Fails ~ white on light grey is ~1.5:1 */
.badge {
  color: #ffffff;
  background: #cccccc;
}

/* ✓ Passes AA ~ dark text on light background */
.badge {
  color: #1a1a2e;
  background: #e8e8f0;
}`,
  },
  {
    type: "paragraph",
    text: "Use the browser DevTools colour picker ~ it shows the contrast ratio inline. Or paste values into the WebAIM Contrast Checker. Also check that focus rings, error states, and placeholder text all meet the threshold, not just body copy.",
  },

  // ── Images ────────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Images and Alt Text",
  },
  {
    type: "code",
    language: "html",
    filename: "images.html",
    code: `<!-- Informative image ~ describe what it conveys, not what it looks like -->
<img src="chart.png" alt="Monthly revenue grew 40% between January and March" />

<!-- Decorative image ~ empty alt tells screen readers to skip it entirely -->
<img src="background-swirl.svg" alt="" />

<!-- Icon button ~ label the action, not the icon -->
<button>
  <img src="search.svg" alt="Search" />
</button>

<!-- Next.js Image component -->
<Image src="/avatar.jpg" alt="Zahid Khaliq, Frontend Engineer" />`  },
  {
    type: "list",
    items: [
      "Don't start alt text with \"Image of\" or \"Photo of\" ~ screen readers already announce it as an image",
      "For decorative images (backgrounds, dividers, icons next to visible text) use alt=\"\"",
      "For complex images like charts, either write a detailed alt or link to a text description nearby",
      "SVGs used inline should have aria-hidden=\"true\" if decorative, or a <title> element if meaningful",
    ],
  },

  // ── Forms ─────────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Accessible Forms",
  },
  {
    type: "code",
    language: "html",
    filename: "form.html",
    code: `<div>
  <label for="email">
    Email address
    <span aria-hidden="true">*</span>
  </label>
  <input
    id="email"
    type="email"
    name="email"
    autocomplete="email"
    aria-required="true"
    aria-describedby="email-error"
  />
  <span id="email-error" role="alert" aria-live="polite">
    Please enter a valid email address.
  </span>
</div>`,
  },
  {
    type: "list",
    items: [
      "Every input needs a <label> ~ placeholder text alone is not a label (it disappears on focus)",
      "Mark required fields with aria-required=\"true\" ~ don't rely on colour alone",
      "Connect error messages with aria-describedby so they're read out alongside the input",
      "Use autocomplete attributes ~ they help users with cognitive disabilities and reduce friction for everyone",
      "Group related fields with <fieldset> and <legend> ~ especially radio buttons and checkboxes",
    ],
  },

  // ── Quick wins ────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    text: "Quick Wins Checklist",
  },
  {
    type: "list",
    items: [
      "Run axe DevTools or Lighthouse Accessibility audit ~ fixes the low-hanging fruit in minutes",
      "Tab through your entire page without a mouse ~ if you get stuck anywhere, something's broken",
      "Zoom to 200% in the browser ~ text and layout should still be usable, nothing should overflow or disappear",
      "Turn on a screen reader (VoiceOver on Mac, NVDA on Windows) and navigate your key flows",
      "Check that all interactive elements have a visible focus style",
      "Verify every image has meaningful alt text or an empty alt if decorative",
      "Test colour contrast on all text ~ especially muted/secondary text which often fails",
    ],
  },
];


// ─── Export ───────────────────────────────────────────────────────────────────

const post: BlogPost = { ...meta, content };
export default post;
