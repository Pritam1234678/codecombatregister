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

    useGSAP(() => {
        const tl = gsap.timeline();

        // --- HERO ANIMATIONS ---
        // Split text animation for CODECOMBAT
        const chars = titleRef.current?.innerText.split('') || [];
        if (titleRef.current) {
            titleRef.current.innerHTML = '';
            chars.forEach((char) => {
                const span = document.createElement('span');
                span.innerText = char;
                span.className = 'inline-block opacity-0 blur-sm transform translate-y-10 cursor-pointer';

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
            filter: 'blur(0px)',
            stagger: 0.1,
            duration: 1.2,
            ease: 'power4.out',
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

        // 1. Text Animation ("Rewards of War")
        gsap.from('.prize-heading', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.prize-section',
                start: 'top 70%',
            }
        });

        // 2. Left Card (Runner Up) - Slides from Left
        gsap.from('.prize-card-left', {
            x: -150,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.prize-section',
                start: 'top 60%',
            }
        });

        // 3. Right Card (Second Runner Up) - Slides from Right
        gsap.from('.prize-card-right', {
            x: 150,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.prize-section',
                start: 'top 60%',
            }
        });

        // 4. Center Card (Champion) - Scales up/Fades in
        gsap.from('.prize-card-center', {
            scale: 0.9,
            y: 50,
            opacity: 0,
            duration: 1.2,
            delay: 0.2,
            ease: 'elastic.out(1, 0.8)',
            scrollTrigger: {
                trigger: '.prize-section',
                start: 'top 60%',
            }
        });

    }, { scope: container });

    return (
        <main ref={container} className="relative w-full overflow-hidden bg-black text-center">
            <InteractiveDroplets />

            {/* --- HERO SECTION --- */}
            <section className="hero-section relative h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0E] via-[#1A0005] to-[#B11226] opacity-80 z-0" />

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

                    <h1 ref={titleRef} className="text-6xl sm:text-8xl md:text-[9rem] font-sans font-bold tracking-tighter text-white leading-none uppercase mix-blend-screen">
                        CODE COMBAT
                    </h1>

                    <p className="hero-subtitle text-lg sm:text-2xl font-heading font-light tracking-wide text-red-500 mt-4">
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

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-red-500 to-transparent" />
                </div>
            </section>

            {/* --- PRIZE SECTION --- */}
            <section className="prize-section relative py-32 px-6 flex flex-col items-center z-10 bg-black overflow-hidden">
                <div className="prize-heading mb-20 text-center">
                    <h2 className="text-5xl sm:text-7xl lg:text-7xl font-heading font-black uppercase tracking-tighter">
                        <span className="text-white">Rewards of </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-red-500">
                            War
                        </span>
                    </h2>
                    <div className="mt-6 flex items-center justify-center gap-4 opacity-50">
                        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-red-600" />
                        <div className="w-2.5 h-2.5 bg-red-600 rotate-45" />
                        <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-red-600" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl items-end justify-items-center px-4">

                    {/* 2nd Place (Left) - Runner Up */}
                    <div className="prize-card-left order-2 md:order-1 flex flex-col items-center w-full max-w-sm group">
                        <div className="relative w-full">
                            <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <MarblingHover
                                frontImage="/runner.png"
                                backImage="/2nd.png"
                                alt="Runner Up - ₹15k Silver Tier"
                                className="h-[400px] w-full border border-blue-500/30 rounded-lg overflow-hidden group-hover:border-blue-500 transition-colors duration-500"
                            />
                        </div>
                        <div className="mt-6 text-center">
                            <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wider mb-2 group-hover:text-blue-400 transition-colors">
                                Runner Up
                            </h3>
                            <p className="text-blue-500 font-mono text-xl tracking-widest">
                                ₹3,000
                            </p>
                            <div className="mt-2 text-white/40 text-sm font-light uppercase tracking-widest">
                                Silver Tier
                            </div>
                        </div>
                    </div>

                    {/* 1st Place (Center) - Champion */}
                    <div className="prize-card-center order-1 md:order-2 flex flex-col items-center w-full max-w-sm transform md:-translate-y-16 group z-10">
                        <div className="relative w-full">
                            <div className="absolute inset-0 bg-yellow-500/30 blur-[80px] rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
                            <MarblingHover
                                frontImage="/champion.png"
                                backImage="/1st.png"
                                alt="Champion - ₹25k Gold Tier"
                                className="h-[500px] w-full border border-yellow-500/30 rounded-lg overflow-hidden group-hover:border-yellow-500 transition-colors duration-500 shadow-[0_0_50px_rgba(234,179,8,0.1)]"
                            />
                        </div>
                        <div className="mt-8 text-center scale-110">
                            <h3 className="text-3xl font-heading font-black text-white uppercase tracking-wider mb-2 group-hover:text-yellow-400 transition-colors">
                                Champion
                            </h3>
                            <p className="text-yellow-500 font-mono text-3xl font-bold tracking-widest text-shadow-gold">
                                ₹5,000
                            </p>
                            <div className="mt-2 text-white/40 text-sm font-light uppercase tracking-widest flex items-center justify-center gap-2">
                                <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                                Gold Tier
                                <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* 3rd Place (Right) - Second Runner Up */}
                    <div className="prize-card-right order-3 flex flex-col items-center w-full max-w-sm group">
                        <div className="relative w-full">
                            <div className="absolute inset-0 bg-orange-700/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <MarblingHover
                                frontImage="/bronze.png"
                                backImage="/3rd.png"
                                alt="Second Runner Up - ₹10k Bronze Tier"
                                className="h-[400px] w-full border border-orange-700/30 rounded-lg overflow-hidden group-hover:border-orange-500 transition-colors duration-500"
                            />
                        </div>
                        <div className="mt-6 text-center">
                            <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wider mb-2 group-hover:text-orange-500 transition-colors">
                                2nd Runner Up
                            </h3>
                            <p className="text-orange-500 font-mono text-xl tracking-widest">
                                ₹1,500
                            </p>
                            <div className="mt-2 text-white/40 text-sm font-light uppercase tracking-widest">
                                Bronze Tier
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
