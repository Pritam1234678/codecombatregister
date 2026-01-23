'use client';

export default function InfiniteMarquee() {
    const text = "CODE COMBAT";
    const separator = "IEEE CTSoc";
    
    return (
        <div className="relative w-full overflow-hidden bg-black border-y border-white/10 py-8">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
            
            <div className="flex animate-marquee whitespace-nowrap">
                {/* Repeat the content multiple times for seamless loop */}
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex items-center">
                        <span className="text-5xl md:text-7xl font-black tracking-tighter text-white mx-8 font-heading">
                            {text}
                        </span>
                        <span className="text-2xl md:text-3xl font-bold tracking-wider text-red-500 mx-8 font-heading">
                            {separator}
                        </span>
                    </div>
                ))}
            </div>
            
            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
                
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
