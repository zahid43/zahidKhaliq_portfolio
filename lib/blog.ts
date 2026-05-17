export type { ContentBlock, PostSize, PostColor, BlogPost } from "./blog-types";

import tailwindV4 from "./posts/tailwind-v4";
import nextjsAppRouter from "./posts/nextjs-app-router";
import accessibleUis from "./posts/accessible-uis";
import framerMotion from "./posts/framer-motion";
import darkMode from "./posts/dark-mode";
import reactPerformance from "./posts/react-performance";
import cssHtmlCheatSheet from "./posts/css-html-cheat-sheet";
import jsSnippets from "./posts/js-snippets";

export const posts = [
  tailwindV4,
  nextjsAppRouter,
  accessibleUis,
  framerMotion,
  darkMode,
  reactPerformance,
  cssHtmlCheatSheet,
  jsSnippets,
];
