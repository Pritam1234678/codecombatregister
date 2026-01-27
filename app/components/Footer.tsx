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
                            CODE  COMBAT
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
                                <a href="/" className="text-white/60 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group">
                                    <svg className="w-4 h-4 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/details" className="text-white/60 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group">
                                    <svg className="w-4 h-4 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Details
                                </a>
                            </li>
                            <li>
                                <a href="/support" className="text-white/60 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group">
                                    <svg className="w-4 h-4 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
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
                                <a href="mailto:support@codecombat.ieee" className="hover:text-white transition-colors flex items-center gap-2 group">
                                    <svg className="w-4 h-4 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Email: support@codecombat.ieee
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/ieee_ctsoc_kiit?igsh=MTE5b2s5cWZzbXFwdQ==" className="hover:text-white transition-colors flex items-center gap-2 group">
                                    <svg className="w-4 h-4 group-hover:text-red-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://ctsoc.ieee.org/" className="hover:text-white transition-colors flex items-center gap-2 group">
                                    <svg className="w-4 h-4 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
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
