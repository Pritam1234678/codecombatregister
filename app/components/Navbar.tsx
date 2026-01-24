'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Navbar() {
  const container = useRef(null);

  useGSAP(() => {
    // Initial fade in
    gsap.from('.nav-item', {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5,
    });
  }, { scope: container });

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const line = e.currentTarget.querySelector('.hover-line');
    if (line) {
      gsap.to(line, {
        width: '100%',
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const line = e.currentTarget.querySelector('.hover-line');
    if (line) {
      gsap.to(line, {
        width: '0%',
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  return (
    <nav ref={container} className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-50 mix-blend-difference text-white">
      {/* Left Branding */}
      <div className="nav-item">
        <span className="text-xl tracking-tight font-medium hover:opacity-70 transition-opacity">
          CodeCombat<span className="opacity-40 ml-2 font-normal">Registry</span>
        </span>
      </div>

      {/* Right Links */}
      <div className="flex gap-12 font-sans text-sm font-medium">
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
    </nav>
  );
}
