'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white p-6">

            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-900/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-600/5 blur-[150px] rounded-full" />

                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">

                {/* Animated 404 Glitch Text */}
                <div className="relative mb-8">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-[120px] md:text-[200px] font-heading font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 select-none"
                    >
                        404
                    </motion.h1>

                    {/* Glitch Overlay Layers */}
                    <motion.h1
                        className="absolute top-0 left-0 text-[120px] md:text-[200px] font-heading font-bold leading-none tracking-tighter text-red-600/30 select-none mix-blend-screen"
                        animate={{
                            x: [-2, 2, -1, 3, 0],
                            y: [1, -2, 2, -1, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 0.2,
                            repeatType: "mirror"
                        }}
                    >
                        404
                    </motion.h1>
                    <motion.h1
                        className="absolute top-0 left-0 text-[120px] md:text-[200px] font-heading font-bold leading-none tracking-tighter text-blue-600/30 select-none mix-blend-screen"
                        animate={{
                            x: [2, -2, 1, -3, 0],
                            y: [-1, 2, -2, 1, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 0.3,
                            repeatType: "mirror"
                        }}
                    >
                        404
                    </motion.h1>
                </div>

                {/* Status Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="space-y-6 max-w-lg"
                >
                    <div className="flex items-center justify-center gap-3 text-red-500 font-mono text-sm uppercase tracking-[0.2em] border border-red-900/30 bg-red-900/10 py-2 px-4 rounded-full w-fit mx-auto backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        Signal Lost in Void
                    </div>

                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white/90">
                        Sector Not Found
                    </h2>

                    <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed">
                        The coordinates you entered point to an empty battlefield.
                        Regroup at the base immediately, Soldier.
                    </p>

                    {/* Action Button */}
                    <div className="pt-8">
                        <Link
                            href="/"
                            className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-heading font-bold uppercase tracking-widest text-sm overflow-hidden transition-all hover:scale-105"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Return to Base
                            </span>
                        </Link>
                    </div>
                </motion.div>

            </div>

            {/* Decorative Code Fragments */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden font-mono text-xs text-red-500/40 select-none">
                <div className="absolute top-[10%] left-[5%] animate-pulse">
                    ERROR: 0x404_PAGE_FAULT<br />
                    TRACE: VOID_POINTER_EXCEPTION
                </div>
                <div className="absolute bottom-[20%] right-[10%] text-right animate-pulse animation-delay-500">
                    SYSTEM_HALT<br />
                    DESTINATION_UNREACHABLE
                </div>
            </div>
        </div>
    );
}
