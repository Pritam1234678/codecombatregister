'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import RegistrationModal from './components/RegistrationModal';
import InfiniteMarquee from './components/InfiniteMarquee';
import OurInitiatives from './components/OurInitiatives';
import { useState } from 'react';

export default function Home() {
    const container = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    return (
        <main ref={container} className="relative w-full overflow-hidden bg-[#050505] text-center selection:bg-white selection:text-black">

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">

                {/* Minimalist Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center gap-8 max-w-[1200px]">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-mono text-sm tracking-[0.5em] uppercase text-white/40"
                    >
                        IEEE CTSoc Presents
                    </motion.p>

                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                className="text-[12vw] leading-[0.8] font-medium tracking-tight text-white mix-blend-difference"
                            >
                                CODE
                            </motion.h1>
                        </div>
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                className="text-[12vw] leading-[0.8] font-medium tracking-tight text-white/40 mix-blend-difference"
                            >
                                COMBAT
                            </motion.h1>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="flex flex-col items-center gap-8 mt-12"
                    >
                        <p className="text-xl md:text-2xl font-light text-white/60 max-w-2xl">
                            The ultimate competitive coding arena.
                            <br />
                            <span className="text-white">Prove your logic. Claim the throne.</span>
                        </p>

                        <Link
                            href="/register"
                            className="group relative px-8 py-4 bg-white text-black font-medium tracking-widest uppercase text-sm overflow-hidden"
                        >
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                                Register Now
                            </span>
                            <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                >
                    <div className="w-[1px] h-24 bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
                </motion.div>
            </section>

            {/* --- PRIZE SECTION --- */}
            <section className="relative py-40 px-6 bg-[#050505]">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-32 text-left"
                    >
                        <h2 className="text-6xl md:text-9xl font-medium tracking-tighter text-white opacity-10">
                            REWARDS
                        </h2>
                        <h2 className="text-6xl md:text-9xl font-medium tracking-tighter text-white -mt-4 md:-mt-12 ml-4 md:ml-24">
                            OF WAR
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 items-end">

                        {/* Silver */}
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="order-2 md:order-1 p-8 border-t border-white/10 text-left hover:bg-white/[0.02] transition-colors duration-500 group"
                        >
                            <div className="mb-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/40 font-mono text-sm group-hover:border-white/60 group-hover:text-white transition-colors">
                                02
                            </div>
                            <h3 className="text-3xl font-medium text-white mb-2">Runner Up</h3>
                            <p className="text-white/40 font-mono text-sm mb-8">SILVER TIER</p>
                            <div className="text-5xl font-light text-white">₹3,000</div>
                        </motion.div>

                        {/* Gold */}
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 md:order-2 p-8 md:p-12 border-t md:border-t-0 md:border-x border-white/10 text-left bg-white/[0.02] relative"
                        >
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
                            <div className="mb-12 w-16 h-16 rounded-full border border-yellow-500/30 flex items-center justify-center text-yellow-500 font-mono text-lg">
                                01
                            </div>
                            <h3 className="text-4xl md:text-5xl font-medium text-white mb-2">Champion</h3>
                            <p className="text-yellow-500/60 font-mono text-sm mb-12">GOLD TIER</p>
                            <div className="text-7xl font-light text-white">₹5,000</div>
                        </motion.div>

                        {/* Bronze */}
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="order-3 p-8 border-t border-white/10 text-left hover:bg-white/[0.02] transition-colors duration-500 group"
                        >
                            <div className="mb-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/40 font-mono text-sm group-hover:border-white/60 group-hover:text-white transition-colors">
                                03
                            </div>
                            <h3 className="text-3xl font-medium text-white mb-2">2nd Runner Up</h3>
                            <p className="text-white/40 font-mono text-sm mb-8">BRONZE TIER</p>
                            <div className="text-5xl font-light text-white">₹1,500</div>
                        </motion.div>

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
