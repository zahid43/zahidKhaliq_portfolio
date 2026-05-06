'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NextjsIcon, TailwindIcon, ReactIcon, BootstrapIcon, FigmaIcon, GithubIcon } from '@/components/ReusableSvgs';

interface TechItem {
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  category: 'Frontend' | 'Backend' | 'Tooling' | 'Design';
  color: string;
}

const technologies: TechItem[] = [
  {
    name: 'Next.js',
    Icon: NextjsIcon,
    category: 'Frontend',
    description: 'My go-to for production-grade React apps. I leverage App Router and Server Actions for maximum performance and SEO.',
    color: 'text-darkBlue dark:text-white'
  },
  {
    name: 'React',
    Icon: ReactIcon,
    category: 'Frontend',
    description: 'Building dynamic and highly interactive user interfaces. I focus on component modularity and efficient state management.',
    color: 'text-cyan-400'
  },
  {
    name: 'Tailwind CSS',
    Icon: TailwindIcon,
    category: 'Frontend',
    description: 'Enables rapid UI development with a utility-first approach. I use it to build consistent, responsive design systems.',
    color: 'text-cyan-500'
  },
  {
    name: 'Figma',
    Icon: FigmaIcon,
    category: 'Design',
    description: 'Bridging the gap between design and code. I use Figma to prototype pixel-perfect interfaces before implementation.',
    color: 'text-purple-500'
  },
  {
    name: 'GitHub',
    Icon: GithubIcon,
    category: 'Tooling',
    description: 'Version control and collaboration. I follow GitFlow practices to maintain clean and organized codebases.',
    color: 'text-darkBlue dark:text-white'
  },
  {
    name: 'Bootstrap',
    Icon: BootstrapIcon,
    category: 'Frontend',
    description: 'Experienced in leveraging Bootstrap for structured, responsive layouts and rapid prototyping when traditional frameworks are preferred.',
    color: 'text-purple-600'
  }
];

export default function TechStack() {
  const [selectedTech, setSelectedTech] = useState<TechItem>(technologies[0]);

  return (
    <section id="tech-stack" className="relative overflow-hidden py-16 lg:py-24">
      {/* Galaxy Background Effects */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-blue-400/10 dark:bg-blue-600/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-accent/10 dark:bg-accent/15 blur-3xl" />
      
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Side: The Grid */}
          <div className="w-full lg:w-1/2">
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent mb-3">
                <span className="h-[2px] w-4 rounded-full bg-accent" />
                Stack
                <span className="h-[2px] w-4 rounded-full bg-accent" />
              </span>
              <h2 className="text-4xl font-bold tracking-tight">Technical <span className="text-accent">Arsenal</span></h2>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {technologies.map((tech) => (
                <motion.button
                  key={tech.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTech(tech)}
                  className={`p-4 md:p-6 rounded-2xl border transition-all flex flex-col items-center justify-center gap-3 backdrop-blur-sm ${
                    selectedTech.name === tech.name 
                    ? 'border-accent bg-accent/10 shadow-lg shadow-accent/5' 
                    : 'border-foreground/10 dark:border-white/10 hover:border-accent/30 bg-foreground/5 dark:bg-white/5'
                  }`}
                >
                  <tech.Icon className={`w-8 h-8 md:w-10 md:h-10 ${tech.color}`} />
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 text-center">{tech.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Side: The Detail Card */}
          <div className="w-full lg:w-1/2 h-full flex flex-col pt-4 lg:pt-16">
            <div className="relative bg-linear-to-br from-indigo-50/50 via-white/50 to-teal-50/50 dark:from-[#0d0b26] dark:via-indigo-950/40 dark:to-[#071a17] p-8 rounded-3xl border border-foreground/10 dark:border-white/10 shadow-2xl backdrop-blur-xl min-h-[320px] flex flex-col overflow-hidden">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTech.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest border border-accent/20">
                      {selectedTech.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <selectedTech.Icon className={`w-12 h-12 ${selectedTech.color}`} />
                    <h3 className="text-3xl font-bold">{selectedTech.name}</h3>
                  </div>

                  <p className="text-base text-darkBlue/70 dark:text-white/70 leading-relaxed mb-8">
                    {selectedTech.description}
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-foreground/5 dark:border-white/5">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">Proficiency</h4>
                      <span className="text-[10px] font-bold text-accent">95%</span>
                    </div>
                    <div className="w-full bg-foreground/5 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '95%' }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-accent h-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}