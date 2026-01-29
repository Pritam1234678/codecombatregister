'use client';

import { useEffect, useRef } from 'react';
import ThreeApp from './modules/ThreeApp';

export default function InteractiveDroplets() {
    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<ThreeApp | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Check WebGL availability first
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
            console.warn('WebGL not available, skipping interactive droplets');
            return;
        }

        try {
            // Initialize ThreeApp
            const app = new ThreeApp(containerRef.current);
            app.init();
            app.setup();
            app.render();

            appRef.current = app;

            // Cleanup on unmount
            return () => {
                // Remove event listeners and cleanup
                if (appRef.current) {
                    window.removeEventListener('resize', (appRef.current as any).resize);
                }
            };
        } catch (error) {
            console.warn('Failed to initialize interactive droplets:', error);
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none z-[1] mix-blend-screen hidden md:block"
        />
    );
}
