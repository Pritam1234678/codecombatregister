'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MarblingHover from './components/MarblingHover';
import RegistrationModal from './components/RegistrationModal';
import InfiniteMarquee from './components/InfiniteMarquee';
import OurInitiatives from './components/OurInitiatives';
import InteractiveDroplets from './components/interactive-droplets/InteractiveDroplets';

export default function Home() {
    const container = useRef(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleLetters, setVisibleLetters] = useState(0);
    const text = "CODE COMBAT";

    useEffect(() => {
        const typingSpeed = 80; // ms per character (adjustable)
        if (visibleLetters < text.length) {
            const timer = setTimeout(() => {
                setVisibleLetters(prev => prev + 1);
            }, typingSpeed);
            return () => clearTimeout(timer);
        }
    }, [visibleLetters, text.length]);

    return (
        <main ref={container} className="relative w-full overflow-hidden bg-black text-center">

            {/* Preload All Images */}
            <div className="hidden">
                <Image src="/hero.png" alt="preload" width={100} height={100} priority quality={100} />
                <Image src="/runner.jpg" alt="preload" width={100} height={100} priority quality={100} />
                <Image src="/2nd.png" alt="preload" width={100} height={100} priority quality={100} />
                <Image src="/champion.jpg" alt="preload" width={100} height={100} priority quality={100} />
                <Image src="/1st.png" alt="preload" width={100} height={100} priority quality={100} />
                <Image src="/bronze.jpg" alt="preload" width={100} height={100} priority quality={100} />
                <Image src="/3rd.png" alt="preload" width={100} height={100} priority quality={100} />
            </div>


            {/* --- HERO SECTION --- */}
            <section className="hero-section relative h-screen flex flex-col items-center justify-center overflow-hidden">
                <InteractiveDroplets />
                <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1e0101] to-[#530303] opacity-90 z-0" />

                <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
                    <Image
                        src="/hero.png"
                        alt="Code Combat Samurai"
                        fill
                        className="object-cover samurai-img"
                        priority
                        quality={100}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 flex flex-col items-center gap-6 px-4">
                    <motion.p 
                        className="hero-meta font-heading text-base sm:text-lg tracking-[0.3em] uppercase text-gray-400 font-light"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 1.2, 
                            ease: [0.25, 0.1, 0.25, 1]
                        }}
                    >
                        IEEE CTS<span className=' lowercase'>oc</span> presents
                    </motion.p>

                    <h1 ref={titleRef} className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-sans font-bold tracking-tight text-white leading-none uppercase flex flex-col sm:flex-row items-center justify-center min-h-[1.2em] relative z-30">
                        <span className="flex items-center justify-center">
                            {"CODE".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block cursor-default"
                                    initial={{ 
                                        opacity: 0, 
                                        y: 20,
                                        scale: 1,
                                        filter: "drop-shadow(0 0 0px rgba(0,0,0,0))"
                                    }}
                                    animate={{ 
                                        opacity: i < visibleLetters ? 1 : 0,
                                        y: i < visibleLetters ? 0 : 20,
                                        scale: 1,
                                        filter: "drop-shadow(0 0 0px rgba(0,0,0,0))"
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        y: -4,
                                        filter: "drop-shadow(0 0 8px rgba(239,68,68,0.9)) drop-shadow(0 0 16px rgba(220,38,38,0.7))",
                                        transition: {
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 17,
                                        }
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.25, 0.1, 0.25, 1],
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                        <span className="flex items-center justify-center sm:ml-4">
                            {"COMBAT".split("").map((char, i) => {
                                const actualIndex = i + 5; // 4 letters in "CODE" + 1 space
                                return (
                                    <motion.span
                                        key={i}
                                        className="inline-block cursor-default"
                                        initial={{ 
                                            opacity: 0, 
                                            y: 20,
                                            scale: 1,
                                            filter: "drop-shadow(0 0 0px rgba(0,0,0,0))"
                                        }}
                                        animate={{ 
                                            opacity: actualIndex < visibleLetters ? 1 : 0,
                                            y: actualIndex < visibleLetters ? 0 : 20,
                                            scale: 1,
                                            filter: "drop-shadow(0 0 0px rgba(0,0,0,0))"
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            y: -4,
                                            filter: "drop-shadow(0 0 8px rgba(239,68,68,0.9)) drop-shadow(0 0 16px rgba(220,38,38,0.7))",
                                            transition: {
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 17,
                                            }
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.25, 0.1, 0.25, 1],
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                );
                            })}
                        </span>
                    </h1>

                    <p className="hero-subtitle text-xl sm:text-2xl md:text-3xl font-heading font-light tracking-wide text-red-500 mt-4 px-4">
                        Where logic meets battle.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.8, 
                            delay: 1.2,
                            ease: [0.25, 0.1, 0.25, 1]
                        }}
                    >
                        <Link
                            href="/register"
                            className="hero-cta mt-8 px-8 py-3 border border-white/30 bg-red-600/20 backdrop-blur-sm text-white text-lg font-heading tracking-widest uppercase hover:bg-red-600 hover:border-red-600 hover:scale-105 transition-all duration-300 group relative overflow-hidden z-20 inline-block"
                        >
                            <span className="relative z-10">Register Now</span>
                            <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0" />
                        </Link>
                    </motion.div>
                </div>

                <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20 pointer-events-none">
                    
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

                <motion.div 
                    className="prize-heading mb-10 md:mb-20 text-center relative z-10 w-full max-w-5xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ 
                        duration: 0.8, 
                        ease: [0.25, 0.1, 0.25, 1]
                    }}
                >
                    <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-heading uppercase tracking-tighter leading-[0.85] select-none">
                        <span className="block text-white/20 font-light" data-text="Rewards">Rewards</span>
                        <span className="block font-black text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-600 to-red-950" data-text="Of War">
                            Of War
                        </span>
                    </h2>
                    <div className="mt-12 flex items-center justify-center gap-6">
                        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-red-500/50" />
                        <p className="text-white/60 text-base md:text-lg font-sans tracking-[0.2em] uppercase">
                            Total Prizepool <span className="text-white font-medium ml-2">₹1,0000</span>
                        </p>
                        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-red-500/50" />
                    </div>
                </motion.div>

                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl items-end px-4 relative z-10 mb-8">

                    {/* 2nd Place - Smooth Spring Entry */}
                    <div className="prize-card-left order-2 md:order-1 relative group md:mb-24">
                        {/* Silver Glow */}
                        <div className="absolute -inset-4 bg-gradient-to-b from-gray-400/40 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-3xl" />
                        
                        {/* Premium Glass Card - NO PADDING */}
                        <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-0 text-center rounded-2xl overflow-hidden hover:bg-white/[0.05] hover:border-white/20 transition-all duration-700 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)] group-hover:-translate-y-2">

                            {/* Inner Container - NO PADDING */}
                            <div className="bg-[#050505] rounded-xl p-0 relative overflow-hidden">
                                {/* Rank Number - Adjusted Position */}
                                <div className="absolute -right-2 -top-2 text-[80px] md:text-[100px] font-heading font-black text-white/[0.03] select-none leading-none z-0 group-hover:text-white/[0.06] transition-colors duration-500">
                                    2
                                </div>

                                {/* Image Area - EDGE TO EDGE & CONTAIN */}
                                <div className="relative w-full aspect-[3/4] mb-0 border-b border-white/10 shadow-2xl z-10 group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                    <MarblingHover
                                        frontImage="/runner.jpg"
                                        backImage="/2nd.png"
                                        alt="Runner Up"
                                        className="w-full h-full object-contain"
                                    />
                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                </div>

                                {/* Details - Padded Separate Container */}
                                <div className="relative z-10 flex flex-col items-center p-4">
                                    <div className="px-3 py-1 bg-gray-400/10 rounded-full border border-gray-400/20 backdrop-blur-md mb-2">
                                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-400">Silver Tier</span>
                                    </div>
                                    <h3 className="text-white font-heading uppercase tracking-widest text-lg mb-1 group-hover:text-gray-300  transition-colors duration-300">Runner Up</h3>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 1st Place - The Champion's Pedestal */}
                    <div className="prize-card-center order-1 md:order-2 relative group z-20 md:mb-48">
                        {/* Golden Glow */}
                        <div className="absolute -inset-4 bg-gradient-to-b from-yellow-600/40 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-3xl" />

                        <div className="relative bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-yellow-500/20 p-0 text-center rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-700 hover:shadow-[0_0_80px_-20px_rgba(234,179,8,0.3)] hover:border-yellow-500/40">

                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />

                            {/* Inner Container */}
                            <div className="bg-[#080808] rounded-xl p-0 relative overflow-hidden">
                                {/* Rank Number */}
                                <div className="absolute -right-4 -top-4 text-[100px] md:text-[140px] font-heading font-black text-yellow-500/[0.05] select-none leading-none z-0 group-hover:text-yellow-500/[0.08] transition-colors duration-500">
                                    1
                                </div>

                                {/* Crown Icon (Minimal CSS) */}
                                <div className="absolute top-4 left-4 text-yellow-500 opacity-80 scale-75 z-20">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11h-14zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"></path></svg>
                                </div>

                                {/* Image Area - Heroic Scale */}
                                <div className="relative w-full aspect-[3/4] mb-0 border-b border-yellow-500/20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] z-10 group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                    <MarblingHover
                                        frontImage="/champion.jpg"
                                        backImage="/1st.png"
                                        alt="Champion"
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Details */}
                                <div className="relative z-10 flex flex-col items-center p-5">
                                    <div className="px-4 py-1.5 bg-yellow-500/10 rounded-full border border-yellow-500/20 backdrop-blur-md mb-3">
                                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-yellow-500 font-bold">Gold Tier</span>
                                    </div>
                                    <h3 className="text-white font-heading font-black uppercase tracking-[0.2em] text-xl md:text-2xl mb-1 group-hover:text-yellow-500 transition-colors duration-300">Champion</h3>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3rd Place - Smooth Spring Entry */}
                    <div className="prize-card-right order-3 relative group md:mb-24">
                        {/* Bronze Glow */}
                        <div className="absolute -inset-4 bg-gradient-to-b from-orange-700/40 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-3xl" />
                        
                        {/* Premium Glass Card */}
                        <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-0 text-center rounded-2xl overflow-hidden hover:bg-white/[0.05] hover:border-white/20 transition-all duration-700 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)] group-hover:-translate-y-2">

                            {/* Inner Container */}
                            <div className="bg-[#050505] rounded-xl p-0 relative overflow-hidden">
                                {/* Rank Number */}
                                <div className="absolute -right-2 -top-2 text-[80px] md:text-[100px] font-heading font-black text-white/[0.03] select-none leading-none z-0 group-hover:text-white/[0.06] transition-colors duration-500">
                                    3
                                </div>

                                {/* Image Area */}
                                <div className="relative w-full aspect-[3/4] mb-0 border-b border-white/10 shadow-2xl z-10 group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                    <MarblingHover
                                        frontImage="/bronze.jpg"
                                        backImage="/3rd.png"
                                        alt="Third Place"
                                        className="w-full h-full object-contain"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                </div>

                                {/* Details */}
                                <div className="relative z-10 flex flex-col items-center p-4">
                                    <div className="px-3 py-1 bg-orange-600/10 rounded-full border border-orange-600/20 backdrop-blur-md mb-2">
                                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-orange-600">Bronze Tier</span>
                                    </div>
                                    <h3 className="text-white font-heading uppercase tracking-widest text-lg mb-1 group-hover:text-orange-600 transition-colors duration-300">2nd Runner up</h3>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- COMPACT MOBILE PRIZE SECTION --- */}
                <div className="flex md:hidden flex-col gap-4 w-full px-2 relative z-10 mb-0">
                    {/* Champion - Gold Tier */}
                    <div className="relative bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 p-6 rounded-xl overflow-hidden">
                        <div className="absolute right-0 top-0 text-7xl font-heading font-black text-yellow-500/10 leading-none">1</div>
                        <div className="relative z-10 flex justify-between items-end">
                            <div className="text-left">
                                <h3 className="text-xl font-heading font-bold text-yellow-500 uppercase tracking-wider mb-1">Champion</h3>
                                <p className="text-sm font-mono text-yellow-500/60 uppercase tracking-widest">Gold Tier</p>
                            </div>
                            <div className="text-xl font-heading font-semibold text-yellow-400 text-right">
                                Goodies worth<br/>₹5,000
                            </div>
                        </div>
                    </div>

                    {/* Runner Up - Silver Tier */}
                    <div className="relative bg-gradient-to-b from-gray-400/10 to-transparent border border-gray-400/20 p-6 rounded-xl overflow-hidden">
                        <div className="absolute right-0 top-0 text-7xl font-heading font-black text-gray-400/10 leading-none">2</div>
                        <div className="relative z-10 flex justify-between items-end">
                            <div className="text-left">
                                <h3 className="text-xl font-heading font-bold text-gray-300 uppercase tracking-wider mb-1">Runner Up</h3>
                                <p className="text-sm font-mono text-gray-400/60 uppercase tracking-widest">Silver Tier</p>
                            </div>
                            <div className="text-xl font-heading font-semibold text-gray-300 text-right">
                                Goodies worth<br/>₹3,000
                            </div>
                        </div>
                    </div>

                    {/* 2nd Runner Up - Bronze Tier */}
                    <div className="relative bg-gradient-to-b from-orange-700/10 to-transparent border border-orange-700/20 p-6 rounded-xl overflow-hidden">
                        <div className="absolute right-0 top-0 text-7xl font-heading font-black text-orange-700/10 leading-none">3</div>
                        <div className="relative z-10 flex justify-between items-end">
                            <div className="text-left">
                                <h3 className="text-xl font-heading font-bold text-orange-400 uppercase tracking-wider mb-1">Third Place</h3>
                                <p className="text-sm font-mono text-orange-500/60 uppercase tracking-widest">Bronze Tier</p>
                            </div>
                            <div className="text-xl font-heading font-semibold text-orange-400 text-right">
                                Goodies worth<br/>₹1,500
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
