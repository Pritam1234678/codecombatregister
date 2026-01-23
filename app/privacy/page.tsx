'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-black text-white py-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors mb-8"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl md:text-6xl font-heading font-bold uppercase tracking-tighter mb-4">
                        Privacy <span className="text-red-500">Policy</span>
                    </h1>
                    <p className="text-white/60">Last updated: January 24, 2026</p>
                </div>

                {/* Content */}
                <div className="space-y-8 text-white/80 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">1. Information We Collect</h2>
                        <p className="mb-4">
                            When you register for CODECOMBAT, we collect the following information:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Full Name</li>
                            <li>Email Address</li>
                            <li>Phone Number</li>
                            <li>College/University Name</li>
                            <li>Year of Study</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">2. How We Use Your Information</h2>
                        <p className="mb-4">
                            We use the collected information for:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Event registration and participation management</li>
                            <li>Communication regarding event updates and announcements</li>
                            <li>Verification of participant eligibility</li>
                            <li>Prize distribution and winner notifications</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">3. Data Security</h2>
                        <p>
                            We implement appropriate security measures to protect your personal information.
                            Your data is stored securely and is only accessible to authorized IEEE CTSoc team members.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">4. Data Sharing</h2>
                        <p>
                            We do not sell, trade, or rent your personal information to third parties.
                            Your information is used solely for CODECOMBAT event purposes and IEEE CTSoc activities.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">5. Your Rights</h2>
                        <p className="mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Access your personal data</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Withdraw consent at any time</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">6. Contact Us</h2>
                        <p>
                            For any privacy-related concerns or requests, please contact us at:{' '}
                            <a href="mailto:support@codecombat.live" className="text-red-500 hover:text-red-400 transition-colors">
                                support@codecombat.live
                            </a>
                        </p>
                    </section>
                </div>

                {/* Footer Note */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <p className="text-white/40 text-sm">
                        By participating in CODECOMBAT, you acknowledge that you have read and understood this Privacy Policy.
                    </p>
                </div>
            </div>
        </main>
    );
}
