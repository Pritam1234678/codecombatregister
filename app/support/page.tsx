'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Mail, Clock, ChevronDown, Send, ArrowLeft, Cpu } from 'lucide-react';
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
        <div className="border-b border-white/10 last:border-0">
            <button
                onClick={onToggle}
                className="w-full py-6 flex items-start justify-between text-left group hover:bg-white/5 transition-colors px-4"
            >
                <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-red-500 pt-1">0{index + 1} //</span>
                    <span className={`font-heading text-lg transition-colors ${isOpen ? 'text-red-500' : 'text-white group-hover:text-red-400'}`}>
                        {question}
                    </span>
                </div>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-500' : 'text-white/40'}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-6 pl-6 sm:pl-14">
                            <div className="p-4 bg-red-950/20 border-l-2 border-red-500 font-mono text-sm text-white/80 leading-relaxed">
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

        // Simulating API call for demo purposes since backend might not be running
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: 'general', message: '' });
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }, 1500);
    };

    const faqs = [
        {
            question: "EVENT_TIMELINE_QUERY",
            answer: "CLASSIFIED DATA: Event dates will be transmitted via secure email channels to all registered operatives. Maintain communication silence until further notice."
        },
        {
            question: "ELIGIBILITY_PROTOCOLS",
            answer: "Protocol requires valid institutional identification. Operatives must register using official college credentials (email/ID) to bypass security filters."
        },
        {
            question: "ENTRY_FEE_STATUS",
            answer: "FEE WAIVED. Participation in CODECOMBAT operations is free for all qualified combatants."
        },
        {
            question: "LANGUAGE_PARAMETERS",
            answer: "System supports multiple combat languages. Specific allowable syntax and compilers will be briefed in the pre-deployment mission pack."
        },
        {
            question: "SQUAD_CONFIGURATION",
            answer: "Mission structure (Solo vs Squad) is currently pending declassification. Await updates via the command frequency (email)."
        },
        {
            question: "MISSING_CONFIRMATION_PACKET",
            answer: "Check stealth filters (Spam/Junk). If packet is lost, initiate manual recovery protocol via the transmission form below."
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-red-500/30 selection:text-red-500 font-sans">
            {/* Background Grid Removed */}

            <main className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="mb-16 border-b border-white/10 pb-8">
                    <div className="flex items-center justify-between mb-4">
                        <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-mono text-sm tracking-widest uppercase">Return to Base</span>
                        </Link>
                        <div className="flex items-center gap-2 text-red-500 font-mono text-xs animate-pulse">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            SYSTEM_ONLINE
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 mb-2">
                                SUPPORT<span className="text-red-600">_</span>HUB
                            </h1>
                            <p className="text-white/60 font-mono text-sm md:text-base max-w-xl">
                                // TACTICAL ASSISTANCE CENTER <br />
                                // INITIATE DIAGNOSTIC OR TRANSMIT INQUIRY
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <Cpu className="w-16 h-16 text-white/5" />
                        </div>
                    </div>
                </header>

                <div className="grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20">
                    {/* Left Column: FAQ & Contact Info */}
                    <div className="lg:col-span-5 space-y-12">
                        {/* Status Panel */}
                        <div className="bg-[#0A0A0A] border border-white/10 p-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                               
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-red-500" />
                                CHANNEL_INFO
                            </h3>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-start gap-4 p-4 bg-white/5 border-l-2 border-red-500/50 hover:bg-white/10 transition-colors">
                                    <Mail className="w-5 h-5 text-white/60 mt-1" />
                                    <div>
                                        <div className="font-mono text-xs text-white/40 mb-1">DIRECT_UPLINK</div>
                                        <a href="mailto:support@codecombat.live" className="text-lg hover:text-red-500 transition-colors">support@codecombat.live</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-white/5 border-l-2 border-white/10 hover:bg-white/10 transition-colors">
                                    <Clock className="w-5 h-5 text-white/60 mt-1" />
                                    <div>
                                        <div className="font-mono text-xs text-white/40 mb-1">LATENCY_EXPECTATION</div>
                                        <div className="text-lg">24-48 Hours</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div>
                            <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
                                <span className="text-red-500">//</span> KNOWLEDGE_BASE
                            </h3>
                            <div className="bg-[#0A0A0A] border-t border-white/10">
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

                    {/* Right Column: Transmission Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#0A0A0A] border border-white/10 p-5 sm:p-8 md:p-12 relative overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-20 h-20 border-l border-t border-red-500/20"></div>
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-r border-b border-red-500/20"></div>

                            <h2 className="text-3xl font-heading font-bold mb-2">INITIATE_TRANSMISSION</h2>
                            <p className="text-white/40 font-mono text-sm mb-10">All fields mandatory for secured encryption.</p>

                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-8 p-4 bg-green-500/10 border border-green-500/50 text-green-400 font-mono text-sm flex items-center gap-3"
                                >
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                                    TRANSMISSION_SUCCESSFUL // TICKET_GENERATED
                                </motion.div>
                            )}

                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-8 p-4 bg-red-500/10 border border-red-500/50 text-red-400 font-mono text-sm flex items-center gap-3"
                                >
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                    ERROR // UPLINK_FAILED // RETRY
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2 group">
                                        <label htmlFor="name" className="font-mono text-xs text-red-500 uppercase tracking-widest group-focus-within:text-white transition-colors">Operative ID (Name)</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 focus:border-red-500 transition-all font-mono"
                                            placeholder="ENTER_NAME"
                                        />
                                    </div>

                                    <div className="space-y-2 group">
                                        <label htmlFor="email" className="font-mono text-xs text-red-500 uppercase tracking-widest group-focus-within:text-white transition-colors">Comm Frequency (Email)</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 focus:border-red-500 transition-all font-mono"
                                            placeholder="ENTER_EMAIL"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label htmlFor="subject" className="font-mono text-xs text-red-500 uppercase tracking-widest group-focus-within:text-white transition-colors">Transmission Type</label>
                                    <div className="relative">
                                        <SearchableSelect
                                            options={[
                                                "GENERAL_INQUIRY",
                                                "REGISTRATION_ERROR",
                                                "TECHNICAL_MALFUNCTION",
                                                "MISSION_INTEL"
                                            ]}
                                            value={formData.subject.toUpperCase().replace('GENERAL', 'GENERAL_INQUIRY').replace('REGISTRATION', 'REGISTRATION_ERROR').replace('TECHNICAL', 'TECHNICAL_MALFUNCTION').replace('EVENT', 'MISSION_INTEL') === "GENERAL_INQUIRY" ? "GENERAL_INQUIRY" :
                                                (formData.subject === 'registration' ? "REGISTRATION_ERROR" :
                                                    (formData.subject === 'technical' ? "TECHNICAL_MALFUNCTION" :
                                                        (formData.subject === 'event' ? "MISSION_INTEL" : formData.subject)))}
                                            onChange={(val) => {
                                                const map: { [key: string]: string } = {
                                                    "GENERAL_INQUIRY": "general",
                                                    "REGISTRATION_ERROR": "registration",
                                                    "TECHNICAL_MALFUNCTION": "technical",
                                                    "MISSION_INTEL": "event"
                                                };
                                                setFormData({ ...formData, subject: map[val] || 'general' });
                                            }}
                                            placeholder="Select type"
                                            searchable={false}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label htmlFor="message" className="font-mono text-xs text-red-500 uppercase tracking-widest group-focus-within:text-white transition-colors">Data Packet (Message)</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        minLength={10}
                                        rows={6}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 focus:border-red-500 transition-all font-mono resize-none block"
                                        placeholder="INPUT_MESSAGE_DATA..."
                                    />
                                    <div className="flex justify-end">
                                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono">
                                            Chars: {formData.message.length} // Min: 10
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full group relative overflow-hidden bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-red-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="relative z-10 flex items-center justify-center gap-2">
                                        {isSubmitting ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                                                ENCRYPTING & SENDING...
                                            </>
                                        ) : (
                                            <>
                                                <span>Transmit Data</span>
                                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </div>
                                    {/* Scan line effect */}
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-[-100%] transition-transform duration-700 ease-in-out"></div>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
