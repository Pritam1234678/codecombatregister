'use client';

import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,           // Faster interpolation (lower = faster response)
        duration: 0.8,        // Shorter animation duration for snappier feel
        smoothWheel: true,    // Smooth wheel scrolling
        wheelMultiplier: 1.2, // Faster scroll speed
        touchMultiplier: 1.5, // Better touch responsiveness
        infinite: false,      // Disable infinite scroll for better performance
      }}
    >
      {children}
    </ReactLenis>
  );
}
