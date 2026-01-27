'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const container = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Initial fade in for desktop elements
      gsap.from('.nav-item', {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5,
      });
    });

    // Ensure visibility on mobile immediately
    mm.add("(max-width: 767px)", () => {
      gsap.set('.nav-item', { opacity: 1, y: 0 });
    });
  }, { scope: container });

  // Handle Desktop Hover
  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const line = e.currentTarget.querySelector('.hover-line');
    if (line) {
      gsap.to(line, { width: '100%', duration: 0.4, ease: 'power2.out' });
    }
  };

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const line = e.currentTarget.querySelector('.hover-line');
    if (line) {
      gsap.to(line, { width: '0%', duration: 0.4, ease: 'power2.out' });
    }
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }
    }
  };

  const linkVariants = {
    closed: { y: 20, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.1 * i + 0.3, duration: 0.5, ease: "easeOut" as const }
    })
  };

  return (
    <nav ref={container} className="fixed top-0 left-0 w-full px-6 md:px-8 py-4 flex justify-between items-center z-50 text-white bg-black/180 backdrop-blur-md">
      {/* Left Branding */}
      <div className="nav-item z-50">
        <Link href="/" className="text-sm font-light tracking-[0.2em] uppercase opacity-80 font-sans">
          IEEE CTS<span className=' lowercase'>oc</span>
        </Link>
      </div>

      {/* Desktop Links - Hidden on Mobile */}
      <div className="hidden md:flex gap-12 font-heading text-sm uppercase tracking-widest">
        {[
          { name: 'Home', href: '/' },
          { name: 'Details', href: '/details' },
          { name: 'Support', href: '/support' },
        ].map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="nav-item relative group py-1"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            {link.name}
            <span className="hover-line absolute bottom-0 left-0 w-0 h-[1px] bg-red-500 block" />
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden z-50 relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
        aria-label="Toggle Menu"
      >
        <div className={`w-8 h-[1px] bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <div className={`w-8 h-[1px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
        <div className={`w-8 h-[1px] bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center h-screen w-screen"
          >
            {/* Background Noise for Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <div className="flex flex-col items-center gap-8">
              {[
                { name: 'Home', href: '/' },
                { name: 'Details', href: '/details' },
                { name: 'Support', href: '/support' },
              ].map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={linkVariants}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-heading font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 hover:to-red-500 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
