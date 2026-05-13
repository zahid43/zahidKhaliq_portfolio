export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "terminal"; commands: string[]; title?: string }
  | { type: "code"; code: string; language: string; filename?: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "link"; href: string; text: string; description?: string; copyable?: boolean };

export type PostSize = "featured" | "wide" | "normal";

export interface PostColor {
  gradient: string;
  glow: string;
  glowAlt: string;
  badge: string;
  accent: string;
  border: string;
}

export interface BlogPost {
  id: number;
  slug?: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  size: PostSize;
  color: PostColor;
  content?: ContentBlock[];
}
