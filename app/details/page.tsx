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
    title: "About Code Combat",
    content: "Welcome to Code Combat, a thrilling competitive programming hackathon designed to test your logic, speed, and problem-solving skills.",
    highlights: [
      "2 Hours of Intense Battle",
      "6–8 Epic Coding Quests",
      "Multiple Samurai Difficulty Tiers"
    ]
  },
  {
    id: 2,
    title: "Battle Arena Setup",
    content: "Step into our battle-ready atmosphere with dark aesthetics, where warriors face algorithmic challenges in an epic Samurai-inspired environment.",
    highlights: [
      "Premium Coding Stations",
      "Real-time Leaderboard",
      "Samurai Battle Zones"
    ]
  },
  {
    id: 3,
    title: "Warrior's Toolkit",
    content: "Equip yourself with the right weapons. Any modern programming language is your sword, logic is your shield, and speed is your ultimate advantage.",
    highlights: [
      "Multi-language Support",
      "Advanced IDE Setup",
      "Debugging Arsenal"
    ]
  },
  {
    id: 4,
    title: "Glory & Rewards",
    content: "Champions don't just win — they claim legendary rewards. Battle through tiers, earn glory points, and secure your place in the hall of fame.",
    highlights: [
      "₹5k worth Goodies for Champion ",
      "₹3k worth Goodies for Runner Up",
      "₹1.5k worth Goodies for Second Runner Up"
    ]
  },
  {
    id: 5,
    title: "Join the Battle",
    content: "Registration is now open for all aspiring code warriors. Secure your spot in the arena and prepare for the ultimate test of skill and strategy.",
    highlights: [
      "Free Registration",
      "Limited Slots Available",
      "Instant Confirmation"
    ]
  },
  {
    id: 6,
    title: "Event Details",
    content: "Campus 25, KIIT University • Feb 15, 2026 at 11:00 AM. Check-in opens at 10:00 AM. Bring your laptop, charger, and warrior spirit!",
    highlights: [
      "Solo Warriors Welcome",
      "Any Programming Language",
      "Strategic Thinking Required"
    ]
  }
];

export default function Details() {
  const container = useRef(null);

  useGSAP(() => {
    // Page title animation - simplified
    const titleChars = document.querySelectorAll('.page-title-char');
    gsap.from(titleChars, {
      opacity: 0,
      y: 30,
      stagger: 0.03,
      duration: 0.6,
      ease: 'power2.out',
    });

    // Subtitle fade in
    gsap.from('.page-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.3,
      ease: 'power2.out',
    });

    // Animate cards with optimized effects
    gsap.utils.toArray('.event-card').forEach((card: any, index) => {
      // Card entrance - simplified
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Number badge animation - simplified
      gsap.from(card.querySelector('.card-number'), {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
        },
      });

      // Title reveal - simplified
      gsap.from(card.querySelector('.card-title'), {
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
        },
      });

      // Content fade - simplified
      gsap.from(card.querySelector('.card-content'), {
        opacity: 0,
        duration: 0.5,
        delay: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
        },
      });

      // Stagger highlights - simplified
      gsap.from(card.querySelectorAll('.highlight-item'), {
        opacity: 0,
        x: -20,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 70%',
        },
      });
    });

    // CTA section animation - simplified
    gsap.from('.cta-section', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 85%',
      },
    });
  }, { scope: container });

  return (
    <main ref={container} className="relative min-h-screen pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto overflow-hidden">
      {/* Background gradient effects - optimized */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[80px]" />
      </div>

      {/* Page Title */}
      <div className="relative mb-20 text-center">
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-heading font-bold uppercase tracking-tighter mb-6 flex flex-wrap justify-center gap-x-4 sm:gap-x-8">
          <span className="whitespace-nowrap">
            {['E', 'V', 'E', 'N', 'T'].map((char, i) => (
              <span
                key={i}
                className="page-title-char inline-block bg-gradient-to-b from-white via-white to-red-500 bg-clip-text text-transparent"
                style={{ textShadow: '0 0 80px rgba(255,46,46,0.5)' }}
              >
                {char}
              </span>
            ))}
          </span>
          <span className="whitespace-nowrap">
            {['D', 'E', 'T', 'A', 'I', 'L', 'S'].map((char, i) => (
              <span
                key={i}
                className="page-title-char inline-block bg-gradient-to-b from-white via-white to-red-500 bg-clip-text text-transparent"
                style={{ textShadow: '0 0 80px rgba(255,46,46,0.5)' }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>
        <p className="page-subtitle text-white/50 text-lg sm:text-xl max-w-3xl mx-auto font-light tracking-wide">
          Everything you need to know about the ultimate coding battleground
        </p>

        {/* Decorative line */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-red-500" />
          <div className="w-2 h-2 bg-red-500 rotate-45" />
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-red-500" />
        </div>
      </div>

      {/* Event Sections Grid */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {eventSections.map((section, index) => (
          <div
            key={section.id}
            className="event-card group relative will-change-transform"
          >
            {/* Card container with border effect */}
            <div className="relative h-full border border-white/10 bg-black/40 backdrop-blur-sm p-6 sm:p-8 
                          hover:border-red-500/50 transition-colors duration-500
                          before:absolute before:inset-0 before:bg-gradient-to-br before:from-red-500/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100">

              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
              </div>

              {/* Card Number Badge */}
              <div className="card-number absolute top-4 right-4 w-12 h-12 flex items-center justify-center 
                            border border-white/20 bg-black/60 backdrop-blur-sm
                            group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all duration-500 z-10">
                <span className="text-white/40 font-mono text-base font-bold group-hover:text-red-500 transition-colors duration-500">
                  0{section.id}
                </span>
              </div>

              {/* Section Title */}
              <h2 className="card-title text-2xl sm:text-3xl lg:text-4xl font-heading font-bold uppercase tracking-tight mb-4 pr-14
                           bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent
                           group-hover:from-red-500 group-hover:to-white transition-all duration-700">
                {section.title}
              </h2>

              {/* Content */}
              <p className="card-content text-white/60 leading-relaxed mb-6 text-sm sm:text-base font-light">
                {section.content}
              </p>

              {/* Highlights - Point wise list */}
              <div className="space-y-2.5">
                <div className="text-xs uppercase tracking-wider text-red-500/70 font-semibold mb-3">Key Features:</div>
                {section.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="highlight-item group/item flex items-start gap-3 py-2"
                  >
                    <div className="relative flex-shrink-0 mt-1.5">
                      <div className="w-1.5 h-1.5 bg-red-500 rotate-45 
                                    group-hover/item:scale-150 group-hover/item:rotate-180 transition-all duration-500" />
                      <div className="absolute inset-0 w-1.5 h-1.5 bg-red-500 blur-sm opacity-0 
                                    group-hover/item:opacity-100 transition-opacity duration-500" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-white/70 leading-relaxed
                                   group-hover/item:text-white transition-colors duration-500">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-red-500/20 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-red-500/20 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="cta-section relative mt-24 text-center">
        <div className="relative inline-block">
          {/* Glow background */}
          <div className="absolute inset-0 bg-red-500/10 blur-3xl" />

          <div className="relative border border-red-500/30 bg-black/60 backdrop-blur-sm p-12 sm:p-16">
            {/* Top decorative line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-red-500" />
              <div className="w-2 h-2 bg-red-500 rotate-45" />
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-red-500" />
            </div>

            <h3 className="text-3xl sm:text-4xl font-heading font-bold uppercase tracking-tight mb-4
                         bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
              Ready to Enter the Arena?
            </h3>
            <p className="text-white/50 mb-8 max-w-md mx-auto text-base sm:text-lg font-light">
              Registration closes soon. Secure your spot and prepare for battle.
            </p>

            <Link
              href="/register"
              className="group/btn relative inline-block px-10 py-4 border border-red-500 bg-red-500/10 
                       overflow-hidden transition-all duration-500 hover:border-white hover:shadow-[0_0_30px_rgba(255,46,46,0.5)]"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 
                            translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />

              <span className="relative text-red-500 font-bold uppercase tracking-wider text-sm sm:text-base
                             group-hover/btn:text-black transition-colors duration-500">
                Register Now
              </span>
            </Link>

            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center gap-2">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-red-500" />
              <div className="w-2 h-2 bg-red-500 rotate-45" />
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-red-500" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
