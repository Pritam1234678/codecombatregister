'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
    return (
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300">
            <button
                onClick={onToggle}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:text-red-500 transition-colors"
            >
                <span className="font-semibold text-lg pr-4">{question}</span>
                <svg
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-6 pb-4 text-white/70 leading-relaxed border-t border-white/5 pt-4">
                    {answer}
                </div>
            </div>
        </div>
    );
}

export default function SupportPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'general',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('http://localhost:5000/api/support/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                setSubmitStatus('error');
                console.error('Support form error:', data.message);
                setTimeout(() => setSubmitStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Network error:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleFAQ = (index: number) => {
        setOpenFAQIndex(openFAQIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "When is the CODECOMBAT event?",
            answer: "Event dates will be announced soon via email to all registered participants. Stay tuned!"
        },
        {
            question: "What are the eligibility criteria?",
            answer: "The event is open to all students with valid college enrollment. You must register with your institutional email and roll number."
        },
        {
            question: "Is there a registration fee?",
            answer: "No, registration for CODECOMBAT is completely free for all participants."
        },
        {
            question: "What programming languages are allowed?",
            answer: "Details about allowed programming languages and contest rules will be shared closer to the event date."
        },
        {
            question: "Can I participate in a team?",
            answer: "Contest format details (individual/team) will be announced soon. Check your email for updates."
        },
        {
            question: "I didn't receive a confirmation email. What should I do?",
            answer: "Check your spam folder first. If you still don't see it, contact us using the form below with your registered email address."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black text-white">
            {/* Main Content */}
            <main className="pt-24 pb-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    {/* Page Title */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4 tracking-wider">
                            SUPPORT CENTER
                        </h1>
                        <p className="text-xl text-white/60">We're here to help you</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 mb-20">
                        {/* Contact Form */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-lg">
                            <h2 className="text-3xl font-heading font-bold mb-6 text-red-500">Get In Touch</h2>

                            {submitStatus === 'success' && (
                                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded text-green-400">
                                    ✓ Message sent successfully! We'll get back to you soon.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400">
                                    ✗ Failed to send message. Please try again or email us directly at support@codecombat.live
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-black/60 border border-white/10 text-white placeholder-white/30 focus:border-red-500 focus:bg-black/80 focus:outline-none transition-all"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-black/60 border border-white/10 text-white placeholder-white/30 focus:border-red-500 focus:bg-black/80 focus:outline-none transition-all"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-2">
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-black/60 border border-white/10 text-white focus:border-red-500 focus:bg-black/80 focus:outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Select a topic</option>
                                        <option value="registration">Registration Issue</option>
                                        <option value="technical">Technical Problem</option>
                                        <option value="event">Event Information</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        minLength={10}
                                        rows={6}
                                        className="w-full px-4 py-3 bg-black/60 border border-white/10 text-white placeholder-white/30 focus:border-red-500 focus:bg-black/80 focus:outline-none transition-all resize-none"
                                        placeholder="Describe your issue or question... (minimum 10 characters)"
                                    />
                                    <p className="text-xs text-white/40 mt-1">Minimum 10 characters required</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-8 py-4 bg-red-600 text-white font-heading uppercase tracking-widest hover:bg-red-700 hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] disabled:bg-red-900 disabled:cursor-not-allowed transition-all duration-300"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-lg">
                                <h2 className="text-3xl font-heading font-bold mb-6 text-red-500">Contact Info</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-red-600/20 rounded flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Email</h3>
                                            <a href="mailto:support@codecombat.live" className="text-white/60 hover:text-red-500 transition-colors">
                                                support@codecombat.live
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-red-600/20 rounded flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Response Time</h3>
                                            <p className="text-white/60">Within 24-48 hours</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-red-600/20 rounded flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Organized By</h3>
                                            <p className="text-white/60">IEEE CTSoc</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-lg">
                                <h3 className="text-xl font-heading font-bold mb-4">Quick Links</h3>
                                <div className="space-y-3">
                                    <Link href="/register" className="block text-white/60 hover:text-red-500 transition-colors">
                                        → Register for Event
                                    </Link>
                                    <Link href="/" className="block text-white/60 hover:text-red-500 transition-colors">
                                        → Back to Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-lg">
                        <h2 className="text-4xl font-heading font-bold mb-8 text-center text-red-500">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openFAQIndex === index}
                                    onToggle={() => toggleFAQ(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
