'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function Marquee() {
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);
    let xPercent = 0;
    let direction = -1;

    useGSAP(() => {
        requestAnimationFrame(animate);
    }, []);

    const animate = () => {
        if (xPercent <= -100) {
            xPercent = 0;
        }
        if (xPercent > 0) {
            xPercent = -100;
        }
        
        gsap.set(firstText.current, { xPercent: xPercent });
        gsap.set(secondText.current, { xPercent: xPercent });
        
        xPercent += 0.05 * direction; // Adjust speed here
        requestAnimationFrame(animate);
    };

    return (
        <div className="relative flex overflow-hidden py-8 bg-gradient-to-r from-red-950/20 via-black to-red-950/20 border-y border-white/10 select-none">
            {/* Overlay Gradient for Fade Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none"></div>

            <div ref={slider} className="relative whitespace-nowrap flex">
                <p ref={firstText} className="text-[10vw] font-heading font-bold uppercase text-white/10 m-0 pr-12 flex items-center">
                    CODE COMBAT <span className="text-red-600 mx-4">•</span> IEEE CTSoc 
                    <span className="text-stroke-1 text-transparent stroke-white mx-12 opacity-50">CODE COMBAT</span> 
                    <span className="text-red-600 mx-4">•</span> IEEE CTSoc
                </p>
                <p ref={secondText} className="absolute left-full top-0 text-[10vw] font-heading font-bold uppercase text-white/10 m-0 pr-12 flex items-center">
                    CODE COMBAT <span className="text-red-600 mx-4">•</span> IEEE CTSoc 
                    <span className="text-stroke-1 text-transparent stroke-white mx-12 opacity-50">CODE COMBAT</span> 
                    <span className="text-red-600 mx-4">•</span> IEEE CTSoc
                </p>
            </div>
            
            <style jsx>{`
                .text-stroke-1 {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </div>
    );
}
