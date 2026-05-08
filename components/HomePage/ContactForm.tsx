'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ContactFormCard from './ContactFormCard'; // Import the new card component

export default function ContactFormSection() { // Renamed to ContactFormSection
  return (
    <section id="contact-form" className="container py-16 lg:py-20 relative overflow-hidden">
      {/* Decorative dots */}
      <div className="pointer-events-none absolute top-8 left-1/4 h-1 w-1 rounded-full bg-darkBlue/20 dark:bg-white/40" />
      <div className="pointer-events-none absolute bottom-10 right-1/3 h-[3px] w-[3px] rounded-full bg-darkBlue/15 dark:bg-white/30" />
      <div className="pointer-events-none absolute top-1/2 right-[8%] h-1 w-1 rounded-full bg-darkBlue/10 dark:bg-white/25" />

      {/* Spinning stars */}
      <Image src="/images/star.svg" alt="" width={18} height={18}
        className="pointer-events-none absolute top-6 right-12 opacity-20 dark:opacity-40 animate-spin [animation-duration:16s]" />
      <Image src="/images/star.svg" alt="" width={11} height={11}
        className="pointer-events-none absolute bottom-8 left-10 opacity-15 dark:opacity-30 animate-spin [animation-duration:22s] [animation-direction:reverse]" />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            SEND A MESSAGE
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Let&apos;s Work Together
          </h2>
          <p className="mt-2 text-sm text-muted">
            Have a project in mind? Drop me a message and I&apos;ll get back to you.
          </p>
        </motion.div>

        {/* Card */}
        <ContactFormCard /> {/* Use the new card component here */}
      </div>
    </section>
  );
}
