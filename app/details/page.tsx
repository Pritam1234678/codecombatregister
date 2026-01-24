'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const eventSections = [
  {
    id: 1,
    title: "About the Competition",
    content: "CodeCombat is a high-stakes competitive programming arena designed to push the boundaries of logical reasoning and algorithmic efficiency.",
    highlights: [
      "Two hours of intense problem solving",
      "Six to eight architected challenges",
      "Tiered difficulty progression"
    ]
  },
  {
    id: 2,
    title: "The Battleground",
    content: "Our arena is engineered for focus. A high-performance environment where participants face real-time challenges with live feedback.",
    highlights: [
      "Optimized coding stations",
      "Real-time global leaderboard",
      "High-bandwidth environment"
    ]
  },
  {
    id: 3,
    title: "Technical Stack",
    content: "Bring your preferred stack. Our submission engine supports all major programming languages with official compilers and runtime environments.",
    highlights: [
      "Universal language support",
      "Premium IDE environments",
      "Integrated debugging tools"
    ]
  },
  {
    id: 4,
    title: "Prize Pool",
    content: "Excellence is rewarded. Compete for substantial rewards and recognition within the engineering community.",
    highlights: [
      "₹5,000 Champion Prize",
      "₹3,000 Runner Up",
      "₹1,500 Second Runner Up"
    ]
  }
];

export default function Details() {
  const container = useRef(null);

  useGSAP(() => {
    // Title animation
    gsap.from('.page-title', {
      opacity: 0,
      y: 60,
      duration: 1.5,
      ease: 'power4.out',
    });

    // Content animation
    gsap.utils.toArray('.event-card').forEach((card: any) => {
      gsap.from(card, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
      });
    });

    gsap.from('.cta-section', {
      opacity: 0,
      scale: 0.98,
      duration: 1.5,
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 90%',
      },
    });
  }, { scope: container });

  return (
    <main ref={container} className="relative min-h-screen pt-40 pb-32 px-8 md:px-16 max-w-[1920px] mx-auto font-sans selection:bg-white selection:text-black">

      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.02] blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="mb-32">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] w-12 bg-white/20"></div>
          <span className="text-xs font-mono uppercase tracking-[0.4em] text-white/40">Technical Briefing</span>
        </div>

        <h1 className="page-title text-7xl md:text-9xl font-light tracking-tighter leading-[0.8] mb-12">
          Event
          <br />
          <span className="opacity-20">Specifications</span>
        </h1>

        <p className="page-subtitle text-white/40 text-xl md:text-2xl font-light max-w-2xl leading-relaxed">
          The structural parameters and mission-critical information for CodeCombat 2026.
        </p>
      </header>

      {/* Section Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-1 border-t border-white/[0.08] bg-white/[0.08]">
        {eventSections.map((section) => (
          <div key={section.id} className="event-card group bg-[#020202] p-12 md:p-16 hover:bg-white/[0.01] transition-colors duration-500">
            <div className="flex justify-between items-start mb-12">
              <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">SEC_{section.id.toString().padStart(2, '0')}</span>
              <div className="w-2 h-2 rounded-full border border-white/20 group-hover:bg-white group-hover:border-white transition-all duration-500"></div>
            </div>

            <h2 className="text-4xl font-light tracking-tight mb-6 transition-transform duration-500 group-hover:translate-x-2">
              {section.title}
            </h2>

            <p className="text-white/40 text-lg font-light mb-12 leading-relaxed h-24">
              {section.content}
            </p>

            <div className="space-y-4">
              {section.highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-medium text-white/60 group-hover:text-white transition-colors duration-300">
                  <div className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-white transition-colors"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Campus Details Section */}
      <div className="mt-40 border-t border-white/[0.08] pt-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <h3 className="text-5xl font-light tracking-tight mb-8">Deployment Details</h3>
          <p className="text-white/40 text-2xl font-light leading-relaxed">
            Campus 25, KIIT University.
            <br />
            February 15, 2026.
            <br />
            Check-in initiates at <span className="text-white">10:00 AM IST</span>.
          </p>
        </div>
        <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end">
          <div className="space-y-2 text-right">
            <p className="text-xs font-mono uppercase tracking-widest text-white/20">Operational Status</p>
            <div className="flex items-center gap-3 justify-end">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <span className="text-lg font-light">Mission Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <section className="cta-section mt-40">
        <div className="bg-white/[0.03] border border-white/[0.08] p-16 md:p-32 text-center group">
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-8 group-hover:scale-[1.02] transition-transform duration-700">
            Ready to initiate?
          </h2>
          <p className="text-white/30 text-xl font-light mb-16 max-w-md mx-auto">
            Limited slots available for the 2026 operational cycle.
          </p>
          <Link
            href="/register"
            className="inline-block px-12 py-5 bg-white text-black font-semibold text-sm tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors"
          >
            Register Base
          </Link>
        </div>
      </section>
    </main>
  );
}
