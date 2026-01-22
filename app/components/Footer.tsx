'use client';

export default function Footer() {
    return (
        <footer className="relative py-20 px-6 border-t border-white/10 bg-black overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

                    {/* Brand Column */}
                    <div>
                        <h3 className="text-2xl font-heading font-bold uppercase tracking-tighter text-white mb-4">
                            CODECOMBAT
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Where logic meets battle. Join the ultimate competitive coding arena organized by IEEE CTSoc.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-heading uppercase tracking-widest text-red-500 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {['Home', 'Details', 'Support', 'Register'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-heading uppercase tracking-widest text-red-500 mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li>support@codecombat.ieee</li>
                            <li>Alex Mercer // Coordinator</li>
                            <li>+91 98765 43210</li>
                        </ul>

                        {/* Social Links */}
                        <div className="flex gap-4 mt-6">
                            {['Twitter', 'Discord', 'GitHub'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 group"
                                >
                                    <span className="text-xs text-white/60 group-hover:text-red-500 transition-colors">
                                        {social[0]}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-xs">
                        © 2026 IEEE CTSoc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-white/40">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Code of Conduct</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
