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
                        <h3 className="text-2xl font-sans font-medium tracking-tight text-white mb-4">
                            CODECOMBAT
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Where logic meets battle. Join the ultimate competitive coding arena organized by IEEE CTSoc.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-sans font-medium uppercase tracking-widest text-red-500 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/details" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
                                    Details
                                </a>
                            </li>
                            <li>
                                <a href="/support" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
                                    Support
                                </a>
                            </li>
                          
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xs font-sans font-medium uppercase tracking-widest text-red-500 mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li>
                                <a href="mailto:support@codecombat.ieee" className="hover:text-white transition-colors">
                                   Email
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/ieee_ctsoc_kiit?igsh=MTE5b2s5cWZzbXFwdQ==" className="hover:text-white transition-colors">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://ctsoc.ieee.org/" className="hover:text-white transition-colors">
                                    IEEE CTSoc
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-xs">
                        © 2026 IEEE CTSoc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-white/40">
                        <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
