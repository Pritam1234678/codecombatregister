'use client';

import Link from 'next/link';

export default function TermsOfService() {
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
                        Terms of <span className="text-red-500">Service</span>
                    </h1>
                    <p className="text-white/60">Last updated: January 24, 2026</p>
                </div>

                {/* Content */}
                <div className="space-y-8 text-white/80 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By registering for and participating in CODECOMBAT, you agree to be bound by these Terms of Service.
                            If you do not agree to these terms, please do not participate in the event.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">2. Eligibility</h2>
                        <p className="mb-4">
                            To participate in CODECOMBAT, you must:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Be a current college/university student</li>
                            <li>Provide accurate and truthful registration information</li>
                            <li>Have a valid email address and phone number</li>
                            <li>Comply with all event rules and regulations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">3. Event Rules</h2>
                        <p className="mb-4">
                            Participants must adhere to the following rules:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Individual participation only (no team submissions)</li>
                            <li>Original code submissions required</li>
                            <li>No plagiarism or code copying from external sources</li>
                            <li>Respectful conduct towards organizers and fellow participants</li>
                            <li>Adherence to time limits and submission deadlines</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">4. Disqualification</h2>
                        <p className="mb-4">
                            IEEE CTSoc reserves the right to disqualify participants who:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Violate event rules or code of conduct</li>
                            <li>Submit plagiarized or non-original work</li>
                            <li>Engage in cheating or unfair practices</li>
                            <li>Provide false registration information</li>
                            <li>Display disrespectful or inappropriate behavior</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">5. Prizes and Awards</h2>
                        <p>
                            Prize distribution is subject to verification of participant eligibility and compliance with event rules.
                            IEEE CTSoc reserves the right to withhold prizes in cases of rule violations or suspicious activity.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">6. Intellectual Property</h2>
                        <p>
                            All code submissions remain the intellectual property of the participants.
                            However, by participating, you grant IEEE CTSoc the right to showcase winning submissions
                            for promotional and educational purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">7. Liability</h2>
                        <p>
                            IEEE CTSoc is not liable for any technical issues, internet connectivity problems,
                            or other circumstances beyond our control that may affect your participation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">8. Changes to Terms</h2>
                        <p>
                            IEEE CTSoc reserves the right to modify these terms at any time.
                            Participants will be notified of significant changes via email.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">9. Contact Information</h2>
                        <p>
                            For questions regarding these Terms of Service, please contact:{' '}
                            <a href="mailto:support@codecombat.live" className="text-red-500 hover:text-red-400 transition-colors">
                                support@codecombat.live
                            </a>
                        </p>
                    </section>
                </div>

                {/* Footer Note */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <p className="text-white/40 text-sm">
                        By registering for CODECOMBAT, you acknowledge that you have read, understood,
                        and agree to be bound by these Terms of Service.
                    </p>
                </div>
            </div>
        </main>
    );
}
