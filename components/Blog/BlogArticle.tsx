"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CodeBlock, TerminalBlock, MagicLink } from "@/components/Blog";
import type { ContentBlock, PostColor } from "@/lib/blog-types";

// Detects inline code patterns in plain text and wraps them in a styled <code> tag.
// Handles: HTML tags, ARIA attributes, CSS at-rules, pseudo-classes, file names, and backtick syntax.
const INLINE_CODE_RE = new RegExp(
  [
    "`[^`]+`",                                                          // explicit `backtick` code
    "<\\/?[a-zA-Z][a-zA-Z0-9-]*(?:\\s[^<>]*)?>",                      // HTML tags <button>, </div>
    "aria-[\\w-]+(?:=\"[^\"]*\")?",                                     // aria-label, aria-required="true"
    "@[\\w-]+",                                                         // @theme, @custom-variant, @import
    ":(?:focus(?:-visible)?|root|hover|active|checked|disabled|placeholder|where)", // CSS pseudo-classes
    "[\\w][\\w.-]*\\.(?:js|ts|tsx|css|mjs|cjs|json|html|svg|md)",     // file names: globals.css
  ].join("|"),
  "g"
);

function InlineCode({ children }: { children: string }) {
  return (
    <code className="font-mono text-[0.82em] bg-indigo-100/80 dark:bg-indigo-500/15 text-indigo-700 dark:text-violet-300 px-1.5 py-[2px] rounded-md border border-indigo-300/50 dark:border-indigo-400/20 break-all">
      {children}
    </code>
  );
}

function renderText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  INLINE_CODE_RE.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = INLINE_CODE_RE.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const raw = match[0];
    const code = raw.startsWith("`") && raw.endsWith("`") ? raw.slice(1, -1) : raw;
    parts.push(<InlineCode key={match.index}>{code}</InlineCode>);
    lastIndex = INLINE_CODE_RE.lastIndex;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const toSlug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Block({ block, color }: { block: ContentBlock; color: PostColor }) {
  switch (block.type) {

    case "paragraph":
      return (
        <motion.p variants={fadeUp} className="text-[15px] leading-[1.9] text-darkBlue/80 dark:text-white/70 mb-6">
          {renderText(block.text)}
        </motion.p>
      );

    case "heading":
      if (block.level === 2) {
        return (
          <motion.div variants={fadeUp} id={toSlug(block.text)} className="mt-12 mb-5 scroll-mt-24">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
              <span className="h-[2px] w-4 rounded-full bg-accent" />
              {block.text}
              <span className="h-[2px] w-4 rounded-full bg-accent" />
            </span>
          </motion.div>
        );
      }
      return (
        <motion.div variants={fadeUp} id={toSlug(block.text)} className="mt-7 mb-3 flex items-center gap-2.5 scroll-mt-24">
          <span className="h-[6px] w-[6px] rounded-full bg-accent/70 shrink-0" />
          <span className="text-[1rem] font-bold text-darkBlue dark:text-foreground/90 leading-snug">
            {block.text}
          </span>
        </motion.div>
      );

    case "code":
      return (
        <motion.div variants={fadeUp}>
          <CodeBlock code={block.code} language={block.language} filename={block.filename} />
        </motion.div>
      );

    case "terminal":
      return (
        <motion.div variants={fadeUp}>
          <TerminalBlock commands={block.commands} title={block.title} />
        </motion.div>
      );

    case "list":
      return (
        <motion.ul variants={fadeUp} className="mb-6 flex flex-col gap-2.5">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-darkBlue/75 dark:text-white/70">
              <span className="mt-[3px] text-accent text-[10px] opacity-70 shrink-0">✦</span>
              <span>{renderText(item)}</span>
            </li>
          ))}
        </motion.ul>
      );

    case "quote":
      return (
        <motion.div
          variants={fadeUp}
          className={`relative my-8 bg-gradient-to-br ${color.gradient} border ${color.border} rounded-2xl p-6 lg:p-7 overflow-hidden`}
        >
          {/* Glow orb */}
          <div className={`pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full ${color.glow} blur-2xl`} />
          {/* Spinning star */}
          <Image src="/images/star.svg" alt="" width={13} height={13}
            className="pointer-events-none absolute top-3 right-5 opacity-20 dark:opacity-50 animate-spin [animation-duration:12s]" />
          {/* Galaxy dot */}
          <div className="pointer-events-none absolute bottom-4 left-1/3 h-1 w-1 rounded-full bg-darkBlue/15 dark:bg-white/35" />

          <div className="relative z-10">
            <div className="text-3xl text-accent/35 font-serif leading-none mb-3 select-none">"</div>
            <p className="text-[14.5px] leading-relaxed text-darkBlue/72 dark:text-white/62 italic">
              {block.text}
            </p>
          </div>
        </motion.div>
      );

    case "link":
      return (
        <motion.div variants={fadeUp}>
          <MagicLink href={block.href} text={block.text} description={block.description} copyable={block.copyable} />
        </motion.div>
      );

    default:
      return null;
  }
}

interface BlogArticleProps {
  content: ContentBlock[];
  color: PostColor;
}

export default function BlogArticle({ content, color }: BlogArticleProps) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {content.map((block, i) => (
        <Block key={i} block={block} color={color} />
      ))}
    </motion.div>
  );
}
