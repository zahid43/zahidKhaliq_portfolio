import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/HomePage/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import AutoTheme from "@/components/AutoTheme";
import ScrollProgress from "@/components/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zahidkhaliq.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zahid Khaliq — Frontend Engineer",
    template: "%s ~ Zahid Khaliq",
  },
  description:
    "Frontend Engineer building fast, accessible, and polished web experiences with React, Next.js, and TypeScript.",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Zahid Khaliq",
    title: "Zahid Khaliq — Frontend Engineer",
    description:
      "Frontend Engineer building fast, accessible, and polished web experiences with React, Next.js, and TypeScript.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zahid Khaliq — Frontend Engineer",
    description:
      "Frontend Engineer building fast, accessible, and polished web experiences with React, Next.js, and TypeScript.",
    creator: "@zaahidkhaliq",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AutoTheme />
          <ScrollProgress />
          <Navbar />
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
