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

        tl.from('.hero-meta', {
            opacity: 0,
            y: 20,
            duration: 1.5,
            ease: 'power4.out',
        })
            .from('.hero-title', {
                opacity: 0,
                y: 60,
                scale: 0.98,
                duration: 2,
                ease: 'power4.out',
            }, '-=1')
            .from('.hero-subtitle', {
                opacity: 0,
                y: 20,
                duration: 1.5,
                ease: 'power3.out',
            }, '-=1.5')
            .from('.hero-cta', {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: 'power2.out',
            }, '-=1');

        // Prize Section Scroll Animations
        gsap.from('.prize-heading', {
            opacity: 0,
            y: 40,
            duration: 1.5,
            scrollTrigger: {
                trigger: '.prize-section',
                start: 'top 80%',
            }
        });

        gsap.utils.toArray('.prize-card').forEach((card: any) => {
            gsap.from(card, {
                opacity: 0,
                y: 60,
                duration: 1.2,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                }
            });
        });

    }, { scope: container });

    return (
        <main ref={container} className="relative w-full overflow-hidden bg-[#020202] text-white font-sans selection:bg-white selection:text-black">
            <InteractiveDroplets />

            {/* --- HERO SECTION --- */}
            <section className="relative h-screen flex flex-col items-center justify-center px-8 md:px-16 overflow-hidden border-b border-white/[0.08]">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image
                        src="/hero.png"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center gap-12">
                    <div className="hero-meta flex items-center gap-4">
                        <div className="h-px w-8 bg-white/20"></div>
                        <span className="text-xs font-mono uppercase tracking-[0.5em] text-white/40">IEEE CTSoc Presents</span>
                        <div className="h-px w-8 bg-white/20"></div>
                    </div>

                    <h1 className="hero-title text-7xl md:text-[10rem] font-light tracking-tighter leading-[0.8]">
                        CodeCombat
                        <br />
                        <span className="opacity-20">Registry</span>
                    </h1>

                    <div className="space-y-12">
                        <p className="hero-subtitle text-xl md:text-3xl font-light text-white/60 tracking-tight max-w-2xl mx-auto leading-relaxed">
                            The definitive arena for competitive problem solving.
                            Where engineering intuition meets algorithmic precision.
                        </p>

                        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-8">
                            <Link
                                href="/register"
                                className="px-12 py-5 bg-white text-black font-semibold text-sm tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors"
                            >
                                Initiate Entry
                            </Link>
                            <Link
                                href="/details"
                                className="text-sm font-semibold tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
                            >
                                Event Specs
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 opacity-20 flex flex-col items-center gap-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll to brief</span>
                    <div className="w-[1px] h-12 bg-white" />
                </div>
            </section>

            {/* --- PRIZE SECTION --- */}
            <section className="prize-section relative py-40 px-8 md:px-16 bg-[#020202]">
                <div className="prize-heading mb-32 flex flex-col items-center">
                    <span className="text-xs font-mono uppercase tracking-[0.5em] text-white/20 mb-8">Performance Awards</span>
                    <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-center">
                        Excellence
                        <br />
                        <span className="opacity-20">& Recognition</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-1 bg-white/[0.08] border-y border-white/[0.08] max-w-[1920px] mx-auto">
                    {/* Runner Up */}
                    <div className="prize-card group bg-[#020202] p-12 md:p-16 flex flex-col items-center justify-center hover:bg-white/[0.01] transition-colors duration-500">
                        <div className="mb-12 relative w-full aspect-[4/5] bg-white/[0.03] overflow-hidden">
                            <MarblingHover
                                frontImage="/runner.png"
                                backImage="/2nd.png"
                                alt="Silver"
                                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xs font-mono uppercase tracking-[0.4em] text-white/20 mb-4">Silver Tier</h3>
                            <p className="text-4xl font-light tracking-tight text-white mb-2">Runner Up</p>
                            <p className="text-xl font-mono text-white/60">₹3,000</p>
                        </div>
                    </div>

                    {/* Champion */}
                    <div className="prize-card group bg-[#020202] p-12 md:p-16 flex flex-col items-center justify-center hover:bg-white/[0.01] transition-colors duration-500 border-x border-white/[0.08]">
                        <div className="mb-12 relative w-full aspect-[4/5] bg-white/[0.03] overflow-hidden scale-110 shadow-2xl">
                            <MarblingHover
                                frontImage="/champion.png"
                                backImage="/1st.png"
                                alt="Gold"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="text-center pt-8">
                            <h3 className="text-xs font-mono uppercase tracking-[0.4em] text-emerald-500 mb-4 animate-pulse">Gold Tier Winner</h3>
                            <p className="text-5xl font-light tracking-tight text-white mb-2">Champion</p>
                            <p className="text-2xl font-mono text-white">₹5,000</p>
                        </div>
                    </div>

                    {/* Second Runner Up */}
                    <div className="prize-card group bg-[#020202] p-12 md:p-16 flex flex-col items-center justify-center hover:bg-white/[0.01] transition-colors duration-500">
                        <div className="mb-12 relative w-full aspect-[4/5] bg-white/[0.03] overflow-hidden">
                            <MarblingHover
                                frontImage="/bronze.png"
                                backImage="/3rd.png"
                                alt="Bronze"
                                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xs font-mono uppercase tracking-[0.4em] text-white/20 mb-4">Bronze Tier</h3>
                            <p className="text-4xl font-light tracking-tight text-white mb-2">2nd Runner Up</p>
                            <p className="text-xl font-mono text-white/60">₹1,500</p>
                        </div>
                    </div>
                </div>
            </section>

            <OurInitiatives />
            <InfiniteMarquee />

            <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
}
