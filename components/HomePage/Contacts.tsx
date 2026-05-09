'use client';

import React from 'react';
import { motion } from 'framer-motion'; // AnimatePresence is no longer needed here
import Image from 'next/image';
import SecondaryCard from "./SecondaryCard";
import LinkedinIcon from "@/components/ReusableSvgs/LinkedinIcon";
import WhatsAppIcon from "@/components/ReusableSvgs/WhatsAppIcon";
import XIcon from "@/components/ReusableSvgs/XIcon";
import ContactFormCard from './ContactFormCard'; // Import the new card component
import { FileText, Phone, Mail, ArrowDownToLine } from "lucide-react";

const contactLinks = [
  {
    label: "Call",
    href: "tel:+923213022223",
    icon: <Phone size={15} />,
    className: "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]",
  },
  {
    label: "Email",
    href: "mailto:zaahid.khaliq@gmail.com",
    icon: <Mail size={15} />,
    className: "bg-sky-500/5 text-sky-600 dark:text-sky-400 border-sky-500/20 hover:bg-sky-500/20 hover:border-sky-500/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/923213022223",
    icon: <WhatsAppIcon />,
    className: "bg-green-500/5 text-green-600 dark:text-green-400 border-green-500/20 hover:bg-green-500/20 hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/zaahidkhaliq",
    icon: <LinkedinIcon width={15} height={15} />,
    className: "bg-[#0A66C2]/5 text-[#0A66C2] dark:text-[#60a5fa] border-[#0A66C2]/20 hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50 hover:shadow-[0_0_20px_rgba(10,102,194,0.2)]",
  },
  {
    label: "X | Twitter",
    href: "https://x.com/zaahidkhaliq",
    icon: <XIcon />,
    className: "bg-zinc-900/5 dark:bg-white/5 text-zinc-900 dark:text-white border-zinc-900/20 dark:border-white/20 hover:bg-zinc-900/10 dark:hover:bg-white/10 hover:border-zinc-900/40 dark:hover:border-white/40",
  },
];

export default function Contacts() {
  return (
    <section id="contact" className="container py-16 lg:py-24 relative overflow-hidden">
      {/* Galaxy dust dots */}
      <div className="pointer-events-none absolute top-4 left-1/3 h-1 w-1 rounded-full bg-darkBlue/25 dark:bg-white/50" />
      <div className="pointer-events-none absolute bottom-6 right-1/4 h-[3px] w-[3px] rounded-full bg-darkBlue/20 dark:bg-white/40" />
      <div className="pointer-events-none absolute top-1/2 left-[12%] h-1 w-1 rounded-full bg-darkBlue/15 dark:bg-white/35" />

      {/* Spinning stars */}
      <Image src="/images/star.svg" alt="" width={22} height={22}
        className="pointer-events-none absolute top-2 right-8 opacity-20 dark:opacity-45 animate-spin [animation-duration:13s]" />
      <Image src="/images/star.svg" alt="" width={14} height={14}
        className="pointer-events-none absolute bottom-4 left-6 opacity-15 dark:opacity-35 animate-spin [animation-duration:18s] [animation-direction:reverse]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">

        {/* Unified Outer Card wrapping everything */}
        <div className="relative rounded-[2.5rem] border border-foreground/10 bg-surface/30 dark:bg-black/10 backdrop-blur-md p-6 md:p-10 lg:p-14 overflow-hidden shadow-2xl">
          
          {/* Large Code </> Watermark */}
          <div className="pointer-events-none absolute -right-12 -bottom-12 select-none text-[18rem] md:text-[24rem] font-mono font-black leading-none text-darkBlue/[0.03] dark:text-white/[0.05] rotate-[-12deg]">
            {`</>`}
          </div>

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center relative z-10"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              GET IN TOUCH
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Let&apos;s Build Something Great
            </h2>
            <p className="mt-3 text-sm text-muted max-w-md mx-auto">
              Open to new opportunities, collaborations, or just a friendly hello.
            </p>
          </motion.div>

          {/* Two-column layout - items-stretch ensures same height */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch relative z-10">

            {/* Left — HIRE ME module */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex"
            >
              <SecondaryCard
                heading={
                  <span className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span>HIRE ME</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
                    <span>20+ PROJECTS DELIVERED</span>
                  </span>
                }
                desc="Searching for a Frontend Partner?"
                bgUpdate="bg-linear-to-br from-indigo-100 via-white to-teal-50 dark:from-[#0a0524] dark:via-[#0d072e] dark:to-[#081a1a]"
                backBox="bg-linear-to-br from-indigo-200 via-violet-300 to-teal-200 dark:from-indigo-900/40 dark:via-violet-900/40 dark:to-teal-900/40"
                cardPadding="p-8 md:p-10"
                cardHeight="h-full"
              >
                <div className="flex flex-col gap-4 w-full max-w-[340px]">
                  {/* Resume Button */}
                  <motion.a
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    href="/resume/Zahid_Khaliq_Frontend_engineer.pdf"
                    download="Zahid Khaliq - Frontend Engineer.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-between w-full rounded-2xl bg-linear-to-r from-amber-300 to-amber-400 dark:from-amber-400 dark:to-yellow-400 px-5 py-4 text-zinc-900 shadow-[0_8px_20px_rgba(251,191,36,0.2)] hover:shadow-[0_12px_30px_rgba(251,191,36,0.4)] transition-all duration-300 overflow-hidden"
                  >
                    <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/12 shrink-0">
                        <FileText size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold leading-none">Download Resume</div>
                        <div className="text-[11px] text-zinc-900/55 mt-0.5 font-bold">PDF · Frontend Engineer</div>
                      </div>
                    </div>
                    <ArrowDownToLine size={16} className="shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </motion.a>

                  {/* Contact links grid */}
                  <div className="grid grid-cols-6 gap-2">
                    {contactLinks.map((link, i) => (
                      <motion.a
                        key={link.label}
                        whileHover={{ scale: 1.02, y: -2 }}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={link.label}
                        className={`flex flex-col items-center justify-center gap-2 rounded-xl border px-2 py-4 text-[10px] font-bold transition-all duration-300 backdrop-blur-md ${
                          i < 3 ? "col-span-2" : "col-span-3"
                        } ${link.className}`}
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </SecondaryCard>
            </motion.div>

            {/* Right — Contact Form module */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex"
            >
              <ContactFormCard />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
