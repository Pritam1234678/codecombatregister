'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Card {
    id: number;
    title: string;
    content: string;
    headingColor: string;
    buttonColor: string;
    glowColor: string;
    highlightColor: string;
    highlights?: string[];
}

const cards: Card[] = [
    {
        id: 1,
        title: "About Code Combat",
        headingColor: "from-blue-400 to-blue-600",
        buttonColor: "border-blue-500 bg-blue-500/10 text-blue-500",
        glowColor: "shadow-[0_0_50px_rgba(96,165,250,0.4)]",
        highlightColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
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
        headingColor: "from-red-400 to-red-600",
        buttonColor: "border-red-500 bg-red-500/10 text-red-500",
        glowColor: "shadow-[0_0_50px_rgba(239,68,68,0.4)]",
        highlightColor: "bg-red-500/10 border-red-500/30 text-red-400",
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
        headingColor: "from-white to-gray-400",
        buttonColor: "border-white bg-white/10 text-white",
        glowColor: "shadow-[0_0_50px_rgba(255,255,255,0.4)]",
        highlightColor: "bg-white/10 border-white/30 text-white",
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
        headingColor: "from-purple-400 to-purple-600",
        buttonColor: "border-purple-500 bg-purple-500/10 text-purple-500",
        glowColor: "shadow-[0_0_50px_rgba(168,85,247,0.4)]",
        highlightColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
        content: "Champions don't just win — they claim legendary rewards. Battle through tiers, earn glory points, and secure your place in the hall of fame.",
        highlights: [
            "₹5k Champion Prize",
            "₹3k Runner Up",
            "₹1.5k Second Runner Up"
        ]
    },
    {
        id: 5,
        title: "Join the Battle",
        headingColor: "from-cyan-400 to-cyan-600",
        buttonColor: "border-cyan-500 bg-cyan-500/10 text-cyan-500",
        glowColor: "shadow-[0_0_50px_rgba(34,211,238,0.4)]",
        highlightColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
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
        headingColor: "from-pink-400 to-pink-600",
        buttonColor: "border-pink-500 bg-pink-500/10 text-pink-500",
        glowColor: "shadow-[0_0_50px_rgba(236,72,153,0.4)]",
        highlightColor: "bg-pink-500/10 border-pink-500/30 text-pink-400",
        content: "Campus 25, KIIT University • Feb 15, 2026 at 11:00 AM. Check-in opens at 10:00 AM. Bring your laptop, charger, and warrior spirit!",
        highlights: [
            "Solo Warriors Welcome",
            "Any Programming Language",
            "Strategic Thinking Required"
        ]
    }
];

export default function OurInitiatives() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % cards.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    const paginate = (newDirection: number) => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) return cards.length - 1;
            if (nextIndex >= cards.length) return 0;
            return nextIndex;
        });
    };

    // Calculate position offset for each card relative to current index
    const getCardOffset = (cardIndex: number) => {
        let diff = cardIndex - currentIndex;

        // Handle wrap-around for infinite loop
        if (diff > cards.length / 2) diff -= cards.length;
        if (diff < -cards.length / 2) diff += cards.length;

        return diff;
    };

    return (
        <section className="relative py-32 px-4 bg-black overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

            {/* Header */}
            <div className="relative z-10 text-center mb-10 md:mb-20">
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-heading font-black tracking-tighter mb-4">
                    <span className="text-white">Our </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-red-500">
                        Initiatives
                    </span>
                </h2>
                <p className="text-white/40 font-mono text-xs md:text-sm tracking-widest uppercase">
                    Pioneering the future through technology and innovation
                </p>
            </div>

            {/* 3D Carousel Container */}
            <div
                className="relative max-w-7xl mx-auto h-[480px] md:h-[450px] flex items-center justify-center perspective-[2000px]"
            >
                {/* Cards Stack */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {cards.map((card, index) => {
                        const offset = getCardOffset(index);
                        const isCenter = offset === 0;
                        const isVisible = Math.abs(offset) <= 2; // Show 2 cards on each side

                        if (!isVisible) return null;

                        return (
                            <motion.div
                                key={card.id}
                                className="absolute"
                                initial={false}
                                animate={{
                                    x: `${offset * 50}%`,
                                    scale: isCenter ? 1 : 0.75,
                                    opacity: isCenter ? 1 : 0.6,
                                    zIndex: isCenter ? 30 : 20 - Math.abs(offset),
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                            >
                                <motion.div
                                    className={`w-[85vw] md:w-[420px] h-[400px] md:h-[350px] bg-gradient-to-br from-zinc-950 to-black border rounded-2xl overflow-hidden transition-all duration-500 group ${isCenter
                                            ? 'border-white/20'
                                            : 'border-white/20'
                                        }`}
                                    whileHover={isCenter ? {
                                        scale: 1.05,
                                        boxShadow: card.glowColor.replace('shadow-', '')
                                    } : {}}
                                >
                                    {/* Card Number */}
                                    <div className="absolute top-4 right-4 text-white/20 font-mono text-sm">
                                        {String(card.id).padStart(2, '0')}.
                                    </div>

                                    {/* Top Glow Line - Only on hover */}
                                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.headingColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    {/* Card Content */}
                                    <div className="relative h-full p-6 flex flex-col justify-center">
                                        {/* Title */}
                                        <h3 className={`text-xl md:text-2xl font-heading font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${card.headingColor}`}>
                                            {card.title}
                                        </h3>

                                        {/* Main Content */}
                                        <p className="text-white/70 leading-relaxed mb-6 font-mono text-sm">
                                            {card.content}
                                        </p>

                                        {/* Highlights */}
                                        {card.highlights && (
                                            <div className="flex flex-wrap gap-2">
                                                {card.highlights.map((highlight, idx) => (
                                                    <div key={idx} className={`border px-2 md:px-3 py-1 md:py-1.5 rounded-full ${card.highlightColor}`}>
                                                        <span className="font-mono text-[10px] md:text-xs">{highlight}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={() => paginate(-1)}
                    className="absolute left-2 md:left-8 z-40 w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:border-red-500 hover:bg-red-500/10 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all duration-300 group"
                    aria-label="Previous card"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white/60 group-hover:text-red-500 transition-colors" />
                </button>

                <button
                    onClick={() => paginate(1)}
                    className="absolute right-2 md:right-8 z-40 w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:border-red-500 hover:bg-red-500/10 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all duration-300 group"
                    aria-label="Next card"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white/60 group-hover:text-red-500 transition-colors" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40">
                    {cards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-1 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'w-6 md:w-8 bg-red-500'
                                    : 'w-1 bg-white/20 hover:bg-white/40'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
