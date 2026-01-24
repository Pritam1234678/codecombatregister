'use client';

export default function Footer() {
    return (
        <footer className="relative py-32 px-8 border-t border-white/[0.08] bg-[#020202] overflow-hidden font-sans">
            <div className="relative z-10 max-w-[1920px] mx-auto px-8 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-5">
                        <h3 className="text-3xl font-light tracking-tighter text-white mb-6">
                            CodeCombat<span className="opacity-40 ml-2">Registry</span>
                        </h3>
                        <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                            The ultimate competitive coding arena organized by IEEE CTSoc.
                            Engineering logic through pure competition.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1 md:col-span-3">
                        <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {['Home', 'Details', 'Support', 'Register'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                        className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-medium"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1 md:col-span-4">
                        <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-8">Contact</h4>
                        <div className="space-y-6">
                            <a href="mailto:support@codecombat.live" className="block text-xl font-light hover:opacity-60 transition-opacity">
                                support@codecombat.live
                            </a>
                            <p className="text-white/30 text-sm font-mono border-l border-white/10 pl-4">
                                IEEE CTSoc Technical Division<br />
                                System Node: 0x4FB2
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-white/20 text-xs font-mono uppercase tracking-widest">
                        © 2026 IEEE CTSoc // All operations authorized
                    </p>
                    <div className="flex gap-12 text-xs font-medium">
                        <a href="/privacy" className="text-white/20 hover:text-white transition-colors">Privacy</a>
                        <a href="/terms" className="text-white/20 hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
