'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MarblingHover from './components/MarblingHover';


import RegistrationModal from './components/RegistrationModal';
import InfiniteMarquee from './components/InfiniteMarquee';
import OurInitiatives from './components/OurInitiatives';
import InteractiveDroplets from './components/interactive-droplets/InteractiveDroplets';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const container = useRef(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDroplets, setShowDroplets] = useState(false);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline();

            // --- HERO ANIMATIONS ---
            // Split text animation for CODECOMBAT
            const chars = titleRef.current?.innerText.split('') || [];
            if (titleRef.current) {
                titleRef.current.innerHTML = '';
                chars.forEach((char) => {
                    const span = document.createElement('span');
                    span.innerText = char;
                    span.className = 'inline-block opacity-0 transform translate-y-10 cursor-pointer';

                    // Hover Glow Effect
                    span.addEventListener('mouseenter', () => {
                        gsap.to(span, {
                            textShadow: "0 0 20px #FF2E2E, 0 0 40px #FF2E2E",
                            color: "#FFFFFF",
                            scale: 1.1,
                            duration: 0.1,
                            ease: "power1.out"
                        });
                    });

                    span.addEventListener('mouseleave', () => {
                        gsap.to(span, {
                            textShadow: "none",
                            color: "#FFFFFF",
                            scale: 1,
                            duration: 0.3,
                            ease: "power1.out"
                        });
                    });

                    titleRef.current?.appendChild(span);
                });
            }

            tl.to(titleRef.current?.children || [], {
                y: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 1,
                ease: 'power4.out',
                onComplete: () => setShowDroplets(true)
            })
                .from('.hero-subtitle', {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                    ease: 'power3.out',
                }, '-=0.5')
                .from('.hero-meta', {
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power2.inOut',
                }, '-=1')
                .fromTo('.hero-cta', {
                    opacity: 0,
                    y: 20,
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                }, '-=0.5');

            gsap.to('.samurai-img', {
                yPercent: 10,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });

            // --- PRIZE SECTION ANIMATIONS ---
            const prizeTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.prize-section',
                    start: 'top 60%',
                }
            });

            prizeTl
                .from('.prize-heading', {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                })
                .from('.prize-card-left', {
                    y: 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'elastic.out(1, 0.75)'
                }, '-=0.5')
                .from('.prize-card-center', {
                    y: 100,
                    opacity: 0,
                    scale: 0.9,
                    duration: 1.2,
                    ease: 'elastic.out(1, 0.75)'
                }, '-=1')
                .from('.prize-card-right', {
                    y: 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'elastic.out(1, 0.75)'
                }, '-=1');
        });

        // Force show content on mobile if matchMedia doesn't run
        mm.add("(max-width: 767px)", () => {
            setShowDroplets(false); // Disable heavy droplets on mobile
            if (titleRef.current) {
                titleRef.current.style.opacity = '1';
                // Ensure children are visible if they exist
                Array.from(titleRef.current.children).forEach((child: any) => {
                    child.style.opacity = '1';
                    child.style.transform = 'none';
                })
            }
            gsap.set('.hero-subtitle', { opacity: 1, y: 0 });
            gsap.set('.hero-meta', { opacity: 1 });
            gsap.set('.hero-cta', { opacity: 1, y: 0 });
            gsap.set('.prize-heading', { opacity: 1, y: 0 });
            gsap.set('.prize-card-left', { opacity: 1, y: 0 });
            gsap.set('.prize-card-center', { opacity: 1, y: 0, scale: 1 });
            gsap.set('.prize-card-right', { opacity: 1, y: 0 });
        });

    }, { scope: container });

    return (
        <main ref={container} className="relative w-full overflow-hidden bg-black text-center">


            {/* --- HERO SECTION --- */}
            <section className="hero-section relative h-screen flex flex-col items-center justify-center overflow-hidden">
                {showDroplets && <InteractiveDroplets />}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1e0101] to-[#530303] opacity-90 z-0" />

                <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
                    <Image
                        src="/hero.png"
                        alt="Code Combat Samurai"
                        fill
                        className="object-cover samurai-img"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 flex flex-col items-center gap-6 px-4">
                    <p className="hero-meta font-heading text-sm sm:text-base tracking-[0.3em] uppercase text-gray-400 font-light">
                        IEEE CTSoc presents
                    </p>

                    <h1 ref={titleRef} className="text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] font-sans font-bold tracking-tighter text-white leading-none uppercase mix-blend-screen">
                        CODE COMBAT
                    </h1>

                    <p className="hero-subtitle text-base sm:text-lg md:text-2xl font-heading font-light tracking-wide text-red-500 mt-4 px-4">
                        Where logic meets battle.
                    </p>


                    <Link
                        href="/register"
                        className="hero-cta mt-8 px-8 py-3 border border-white/30 bg-red-600/20 backdrop-blur-sm text-white font-heading tracking-widest uppercase hover:bg-red-600 hover:border-red-600 hover:scale-105 transition-all duration-300 group relative overflow-hidden z-20 opacity-100 visible inline-block"
                    >
                        <span className="relative z-10">Register Now</span>
                        <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0" />
                    </Link>
                </div>

                <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20 pointer-events-none">
                    <span className="text-[10px] md:text-xs font-mono text-white/50 uppercase tracking-[0.3em]">Scroll</span>
                    <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-white/20 via-red-500 to-transparent" />
                </div>
            </section>

            {/* --- PRIZE SECTION --- */}
            {/* --- PRIZE SECTION --- */}
            <section className="prize-section relative py-4 md:py-12 px-4 md:px-6 flex flex-col items-center z-10 bg-black overflow-hidden">
                {/* Cinematic Background Glows */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full mix-blend-screen" />
                    <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-orange-900/5 blur-[100px] rounded-full mix-blend-screen" />
                </div>

                <div className="prize-heading mb-10 md:mb-20 text-center relative z-10 w-full max-w-5xl">
                    <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-heading uppercase tracking-tighter leading-[0.85] select-none">
                        <span className="block text-white/20 font-light" data-text="Rewards">Rewards</span>
                        <span className="block font-black text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-600 to-red-950" data-text="Of War">
                            Of War
                        </span>
                    </h2>
                    <div className="mt-12 flex items-center justify-center gap-6">
                        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-red-500/50" />
                        <p className="text-white/60 text-base md:text-lg font-sans tracking-[0.2em] uppercase">
                            Total Prizepool <span className="text-white font-medium ml-2">₹21,500</span>
                        </p>
                        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-red-500/50" />
                    </div>
                </div>

                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl items-end px-4 relative z-10 mb-8">

                    {/* 2nd Place - Smooth Spring Entry */}
                    <div className="prize-card-left order-2 md:order-1 relative group md:mb-12">
                        {/* Premium Glass Card */}
                        <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-2 text-center rounded-2xl overflow-hidden hover:bg-white/[0.05] hover:border-white/20 transition-all duration-700 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)] group-hover:-translate-y-2">

                            {/* Inner Container */}
                            <div className="bg-[#050505] rounded-xl p-6 pb-8 relative overflow-hidden">
                                {/* Rank Number - Massive & Overlapping */}
                                <div className="absolute -right-2 -top-4 md:-right-4 md:-top-8 text-[80px] md:text-[120px] font-heading font-black text-white/[0.03] select-none leading-none z-0 group-hover:text-white/[0.06] transition-colors duration-500">
                                    2
                                </div>

                                {/* Image Area - Clean Gallery Look */}
                                <div className="relative w-full aspect-[4/5] mb-6 rounded-lg overflow-hidden border border-white/10 shadow-2xl z-10 group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                    <MarblingHover
                                        frontImage="/runner.png"
                                        backImage="/2nd.png"
                                        alt="Runner Up"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                </div>

                                {/* Details */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="px-3 py-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-md mb-4">
                                        <span className="text-xs font-mono uppercase tracking-widest text-white/40">Silver Tier</span>
                                    </div>
                                    <h3 className="text-white font-heading uppercase tracking-widest text-lg mb-1">Runner Up</h3>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 1st Place - The Champion's Pedestal */}
                    <div className="prize-card-center order-1 md:order-2 relative group z-20">
                        {/* Golden Glow */}
                        <div className="absolute -inset-4 bg-gradient-to-b from-yellow-600/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-3xl" />

                        <div className="relative bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-yellow-500/20 p-2 text-center rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-700 hover:shadow-[0_0_80px_-20px_rgba(234,179,8,0.3)] hover:border-yellow-500/40">

                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />

                            {/* Inner Container */}
                            <div className="bg-[#080808] rounded-xl p-8 pb-12 relative overflow-hidden">
                                {/* Rank Number */}
                                <div className="absolute -right-4 -top-6 md:-right-6 md:-top-10 text-[100px] md:text-[180px] font-heading font-black text-yellow-500/[0.05] select-none leading-none z-0 group-hover:text-yellow-500/[0.08] transition-colors duration-500">
                                    1
                                </div>

                                {/* Crown Icon (Minimal CSS) */}
                                <div className="absolute top-6 left-6 text-yellow-500 opacity-80">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11h-14zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"></path></svg>
                                </div>

                                {/* Image Area - Heroic Scale */}
                                <div className="relative w-full aspect-[4/5] mb-8 rounded-lg overflow-hidden border border-yellow-500/20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] z-10 group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                    <MarblingHover
                                        frontImage="/champion.png"
                                        backImage="/1st.png"
                                        alt="Champion"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Details */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="px-4 py-1.5 bg-yellow-500/10 rounded-full border border-yellow-500/20 backdrop-blur-md mb-5">
                                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-yellow-500 font-bold">Gold Tier</span>
                                    </div>
                                    <h3 className="text-white font-heading font-black uppercase tracking-[0.2em] text-2xl mb-2 group-hover:text-yellow-500 transition-colors duration-300">Champion</h3>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3rd Place - Smooth Spring Entry */}
                    <div className="prize-card-right order-3 relative group md:mb-12">
                        {/* Premium Glass Card */}
                        <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-2 text-center rounded-2xl overflow-hidden hover:bg-white/[0.05] hover:border-white/20 transition-all duration-700 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)] group-hover:-translate-y-2">

                            {/* Inner Container */}
                            <div className="bg-[#050505] rounded-xl p-6 pb-8 relative overflow-hidden">
                                {/* Rank Number */}
                                <div className="absolute -right-2 -top-4 md:-right-4 md:-top-8 text-[80px] md:text-[120px] font-heading font-black text-white/[0.03] select-none leading-none z-0 group-hover:text-white/[0.06] transition-colors duration-500">
                                    3
                                </div>

                                {/* Image Area */}
                                <div className="relative w-full aspect-[4/5] mb-6 rounded-lg overflow-hidden border border-white/10 shadow-2xl z-10 group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                    <MarblingHover
                                        frontImage="/bronze.png"
                                        backImage="/3rd.png"
                                        alt="2nd Runner Up"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                </div>

                                {/* Details */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="px-3 py-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-md mb-4">
                                        <span className="text-xs font-mono uppercase tracking-widest text-white/40">Bronze Tier</span>
                                    </div>
                                    <h3 className="text-white font-heading uppercase tracking-widest text-lg mb-1">2nd Runner Up</h3>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- COMPACT MOBILE PRIZE SECTION --- */}
                <div className="flex md:hidden flex-col gap-4 w-full px-2 relative z-10 mb-0">
                    <div className="relative bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 p-6 rounded-xl overflow-hidden">
                        <div className="absolute right-0 top-0 text-7xl font-heading font-black text-yellow-500/10 leading-none">1</div>
                        <div className="relative z-10 flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-heading font-bold text-yellow-500 uppercase tracking-wider mb-1">Champion</h3>
                                <p className="text-sm font-mono text-yellow-500/60 uppercase tracking-widest">Gold Tier</p>
                            </div>
                            <div className="text-2xl font-heading font-bold text-white text-right">
                                ₹5,000
                            </div>
                        </div>
                    </div>

                    <div className="relative bg-white/5 border border-white/10 p-6 rounded-xl overflow-hidden">
                        <div className="absolute right-0 top-0 text-7xl font-heading font-black text-white/5 leading-none">2</div>
                        <div className="relative z-10 flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider mb-1">Runner Up</h3>
                                <p className="text-sm font-mono text-white/40 uppercase tracking-widest">Silver Tier</p>
                            </div>
                            <div className="text-xl font-heading font-bold text-white/90 text-right">
                                ₹3,000
                            </div>
                        </div>
                    </div>

                    <div className="relative bg-white/5 border border-white/10 p-6 rounded-xl overflow-hidden">
                        <div className="absolute right-0 top-0 text-7xl font-heading font-black text-white/5 leading-none">3</div>
                        <div className="relative z-10 flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider mb-1">2nd Runner Up</h3>
                                <p className="text-sm font-mono text-white/40 uppercase tracking-widest">Bronze Tier</p>
                            </div>
                            <div className="text-xl font-heading font-bold text-white/80 text-right">
                                ₹1,500
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- OUR INITIATIVES SLIDER --- */}
            <OurInitiatives />

            {/* --- INFINITE MARQUEE --- */}
            <InfiniteMarquee />



            <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </main>
    );
}
