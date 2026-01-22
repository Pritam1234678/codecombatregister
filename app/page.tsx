'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MarblingHover from './components/MarblingHover';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';

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
                        CODECOMBAT
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
                <h2 className="prize-heading text-4xl sm:text-6xl font-heading uppercase tracking-tighter mb-20 text-white">
                    Rewards of War
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl items-end justify-items-center">

                    {/* 2nd Place (Left) - Runner Up */}
                    <div className="prize-card-left order-2 md:order-1 flex flex-col items-center w-full max-w-sm">
                        <MarblingHover
                            frontImage="/runner.png"
                            backImage="/2nd.png"
                            alt="Runner Up - ₹15k Silver Tier"
                            className="h-[400px]"
                        />
                    </div>

                    {/* 1st Place (Center) - Champion */}
                    <div className="prize-card-center order-1 md:order-2 flex flex-col items-center w-full max-w-sm transform md:-translate-y-12">
                        <MarblingHover
                            frontImage="/champion.png"
                            backImage="/1st.png"
                            alt="Champion - ₹25k Gold Tier"
                            className="h-[500px]"
                        />
                    </div>

                    {/* 3rd Place (Right) - Second Runner Up */}
                    <div className="prize-card-right order-3 flex flex-col items-center w-full max-w-sm">
                        <MarblingHover
                            frontImage="/bronze.png"
                            backImage="/3rd.png"
                            alt="Second Runner Up - ₹10k Bronze Tier"
                            className="h-[400px]"
                        />
                    </div>


                </div>
            </section>

            {/* --- FOOTER SECTION --- */}
            <footer className="relative py-20 px-6 border-t border-white/10 bg-black overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Top Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

                        {/* Brand Column */}
                        <div>
                            <h3 className="text-2xl font-heading font-bold uppercase tracking-tighter text-white mb-4">
                                CODECOMBAT
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Where logic meets battle. Join the ultimate competitive coding arena organized by IEEE CTSoc.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-sm font-heading uppercase tracking-widest text-red-500 mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                {['Home', 'Details', 'Support', 'Register'].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-sm font-heading uppercase tracking-widest text-red-500 mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm text-white/60">
                                <li>support@codecombat.live</li>
                                <li>Alex Mercer || Coordinator</li>
                                <li>+91 98765 43210</li>
                            </ul>

                            {/* Social Links */}
                            <div className="flex gap-4 mt-6">
                                {['Twitter', 'Discord', 'GitHub'].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 group"
                                    >
                                        <span className="text-xs text-white/60 group-hover:text-red-500 transition-colors">
                                            {social[0]}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/40 text-xs">
                            © 2026 IEEE CTSoc. All rights reserved.
                        </p>
                        <nav className="flex gap-8">
                            <a href="#about" className="hover:text-red-500 transition-colors">About</a>
                            <a href="#features" className="hover:text-red-500 transition-colors">Features</a>
                            <Link href="/register" className="hover:text-red-500 transition-colors">Register</Link>
                            <Link href="/support" className="hover:text-red-500 transition-colors">Support</Link>
                        </nav>
                    </div>
                </div>
            </footer>

            <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </main>
    );
}
