'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send, ArrowLeft } from 'lucide-react';
import SearchableSelect from '../components/SearchableSelect';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
    index: number;
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
    return (
        <div className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.01] transition-colors">
            <button
                onClick={onToggle}
                className="w-full py-8 flex items-start justify-between text-left group px-4"
            >
                <div className="flex items-start gap-8">
                    <span className="font-mono text-[10px] text-white/20 pt-2 tracking-[0.2em]">0{index + 1}</span>
                    <span className={`text-xl lg:text-2xl font-light tracking-tight transition-all duration-300 ${isOpen ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>
                        {question.replace(/_/g, ' ')}
                    </span>
                </div>
                <div className={`mt-2 transition-transform duration-500 ${isOpen ? 'rotate-180 opacity-100' : 'opacity-20 group-hover:opacity-100'}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-10 pl-[5.5rem] max-w-3xl">
                            <div className="text-white/60 leading-relaxed text-lg font-light tracking-wide">
                                {answer}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
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
    const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: 'general', message: '' });
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }, 1500);
    };

    const faqs = [
        {
            question: "Event Timeline",
            answer: "Event dates and competition windows will be sent directly to your registered email. Please ensure your contact information is correct."
        },
        {
            question: "Eligibility Criteria",
            answer: "Participation is open to all students with a valid institutional ID. Please use your official university email for registration."
        },
        {
            question: "Participation Fees",
            answer: "CodeCombat is completely free to attend. Our mission is to provide an accessible platform for the coding community."
        },
        {
            question: "Technical Environment",
            answer: "The competition supports various programming languages. A detailed environment spec sheet will be provided before the mission starts."
        }
    ];

    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-white selection:text-black font-sans">
            <main className="relative pt-40 pb-32 px-8 md:px-16 max-w-[1920px] mx-auto">
                <header className="mb-32">
                    <div className="flex items-center justify-between mb-12">
                        <Link href="/" className="flex items-center gap-3 text-white/30 hover:text-white transition-all duration-300 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-mono uppercase tracking-[0.3em]">Home</span>
                        </Link>
                        <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Uplink Active</span>
                        </div>
                    </div>

                    <h1 className="text-7xl md:text-9xl font-light tracking-tighter leading-[0.8] mb-8">
                        Support
                        <br />
                        <span className="opacity-20">& Assistance</span>
                    </h1>
                </header>

                <div className="grid lg:grid-cols-12 gap-24">
                    {/* Left Column: FAQ & Contact Info */}
                    <div className="lg:col-span-12 xl:col-span-7">
                        <div className="space-y-1">
                            <h3 className="text-xs font-mono uppercase tracking-[0.4em] text-white/20 mb-12 flex items-center gap-4">
                                Knowledge Base
                                <div className="h-[1px] w-20 bg-white/10"></div>
                            </h3>
                            <div className="border-t border-white/[0.08]">
                                {faqs.map((faq, index) => (
                                    <FAQItem
                                        key={index}
                                        index={index}
                                        question={faq.question}
                                        answer={faq.answer}
                                        isOpen={openFAQIndex === index}
                                        onToggle={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-12 xl:col-span-5">
                        <div className="bg-white/[0.02] border border-white/[0.08] p-12 md:p-16">
                            <h2 className="text-4xl font-light tracking-tight mb-4">Send Inquiry</h2>
                            <p className="text-white/30 text-lg font-light mb-16 leading-relaxed">
                                Our technical team typically responds within 24-48 business hours.
                            </p>

                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mb-12 p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-light"
                                >
                                    Transmission successful. We will be in touch shortly.
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-12">
                                <div className="space-y-10">
                                    <div className="relative group">
                                        <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 group-focus-within:text-white transition-colors mb-4">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-transparent border-b border-white/20 py-2 text-xl focus:outline-none focus:border-white transition-colors"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 group-focus-within:text-white transition-colors mb-4">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-transparent border-b border-white/20 py-2 text-xl focus:outline-none focus:border-white transition-colors"
                                            placeholder="your@address.com"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 group-focus-within:text-white transition-colors mb-6">Subject</label>
                                        <SearchableSelect
                                            options={["General Inquiry", "Registration Error", "Technical Issue", "Partnership"]}
                                            value={formData.subject}
                                            onChange={(val) => setFormData({ ...formData, subject: val })}
                                            placeholder="Select mission type"
                                            searchable={false}
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 group-focus-within:text-white transition-colors mb-4">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="w-full bg-transparent border-b border-white/20 py-2 text-xl focus:outline-none focus:border-white transition-colors resize-none"
                                            placeholder="How can we assist you?"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-6 bg-white text-black font-semibold text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-all duration-300 disabled:opacity-30"
                                >
                                    {isSubmitting ? "Sending..." : "Transmit Inquiry"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
