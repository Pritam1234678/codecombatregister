'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Details() {
  const container = useRef(null);

  useGSAP(() => {
    // Animate sections on scroll
    gsap.utils.toArray('.detail-section').forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      });
    });

    // Draw timeline line
    gsap.from('.timeline-line', {
      height: 0,
      duration: 2,
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
    });
  }, { scope: container });

  return (
    <main ref={container} className="min-h-screen pt-32 pb-20 px-6 sm:px-20 max-w-7xl mx-auto text-gray-300 font-sans">
      <h1 className="text-4xl sm:text-6xl font-heading font-bold uppercase tracking-tighter mb-16 text-white detail-section">
        The Manifesto
      </h1>

      <section className="detail-section mb-24 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
           <h2 className="text-xl font-heading uppercase tracking-widest text-red-500 mb-4">01. About</h2>
           <p className="text-lg leading-relaxed text-white/80">
             CodeCombat is not just a hackathon. It is a battleground for the sharpest minds in engineering. 
             Organized by IEEE CTSoc, this event challenges participants to solve complex algorithmic problems 
             and build robust systems under extreme time pressure.
           </p>
        </div>
        <div className="border-l border-white/10 pl-8">
            <h2 className="text-xl font-heading uppercase tracking-widest text-red-500 mb-4">02. The Vibe</h2>
            <p className="text-lg leading-relaxed text-white/80">
                Pure code. No fluff. Elite competition. 
                We strip away the noise and focus on what matters: Logic, Efficiency, and Innovation.
            </p>
        </div>
      </section>

      <section className="detail-section mb-24">
        <h2 className="text-xl font-heading uppercase tracking-widest text-red-500 mb-12">03. Timeline & Format</h2>
        
        <div className="timeline-container relative pl-8 border-l border-white/10">
          {/* Animated red line overlay */}
          <div className="timeline-line absolute top-0 left-[-1px] w-[1px] bg-red-500" />
          
          <div className="space-y-16">
            {[
                { time: 'Round 1', title: 'The Qualifier', desc: 'Online algorithmic contest. Top 50 teams advance.' },
                { time: 'Round 2', title: 'The Sprint', desc: '24-hour rapid prototyping. Build a working MVP.' },
                { time: 'Round 3', title: 'The Showdown', desc: 'Final pitch and technical defense before strict judges.' }
            ].map((item, i) => (
                <div key={i} className="relative">
                    <span className="absolute -left-[37px] top-1 w-3 h-3 bg-black border border-red-500 rounded-full" />
                    <h3 className="text-2xl font-bold text-white mb-2">{item.time} // {item.title}</h3>
                    <p className="text-white/60">{item.desc}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-section grid grid-cols-1 sm:grid-cols-3 gap-8">
         <StatBox number="₹50k" label="Prize Pool" />
         <StatBox number="24h" label="Non-stop Coding" />
         <StatBox number="100+" label="Elite Developers" />
      </section>

    </main>
  );
}

function StatBox({ number, label }: { number: string, label: string }) {
    return (
        <div className="border border-white/10 p-8 hover:border-red-500/50 transition-colors duration-500 group">
            <div className="text-5xl font-heading font-bold text-white mb-2 group-hover:text-red-500 transition-colors">{number}</div>
            <div className="text-sm uppercase tracking-widest text-white/50">{label}</div>
        </div>
    )
}
