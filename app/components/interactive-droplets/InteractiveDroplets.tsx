'use client';

import { useEffect, useRef } from 'react';
import ThreeApp from './modules/ThreeApp';

export default function InteractiveDroplets() {
    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<ThreeApp | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

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
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none z-[1] mix-blend-screen"
        />
    );
}
