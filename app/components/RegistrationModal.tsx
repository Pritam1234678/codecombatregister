'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import SearchableSelect from './SearchableSelect';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        rollNumber: '',
        branch: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);

        // Reset after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                rollNumber: '',
                branch: ''
            });
            onClose();
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-linear-to-br from-[#0B0B0E] via-[#1A0005] to-[#0B0B0E] border border-red-600/30 shadow-[0_0_50px_rgba(177,18,38,0.3)] overflow-hidden">

                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-900/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-red-600/10 blur-[80px] rounded-full pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center border border-white/10 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 group"
                    aria-label="Close"
                >
                    <X className="w-5 h-5 text-white/60 group-hover:text-red-500 transition-colors" />
                </button>

                <div className="relative z-10 p-8 md:p-12">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-tighter text-white mb-2">
                            Join the Battle
                        </h2>
                        <p className="text-white/60 text-sm">
                            Register for CODECOMBAT and prove your coding prowess
                        </p>
                    </div>

                    {submitted ? (
                        // Success State
                        <div className="py-12 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 border-4 border-red-500 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-white mb-2">Registration Successful!</h3>
                            <p className="text-white/60">Welcome to the arena, warrior.</p>
                        </div>
                    ) : (
                        // Form
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white placeholder-white/30 focus:border-red-500 focus:outline-none transition-colors"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white placeholder-white/30 focus:border-red-500 focus:outline-none transition-colors"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    pattern="[0-9]{10}"
                                    className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white placeholder-white/30 focus:border-red-500 focus:outline-none transition-colors"
                                    placeholder="10-digit mobile number"
                                />
                            </div>

                            {/* Roll Number & Branch Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Roll Number */}
                                <div>
                                    <label htmlFor="rollNumber" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-2">
                                        Roll Number
                                    </label>
                                    <input
                                        type="text"
                                        id="rollNumber"
                                        name="rollNumber"
                                        value={formData.rollNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white placeholder-white/30 focus:border-red-500 focus:outline-none transition-colors"
                                        placeholder="Your roll number"
                                    />
                                </div>

                                {/* Branch */}
                                <div>
                                    <label htmlFor="branch" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-2">
                                        Branch
                                    </label>
                                    <SearchableSelect
                                        options={[
                                            "Civil Engineering",
                                            "Construction Technology",
                                            "Mechanical Engineering",
                                            "Mechanical Engineering(Automobile)",
                                            "Aerospace Engineering",
                                            "Mechatronics Engineering",
                                            "Electrical Engineering",
                                            "Electrical and Computer Engineering",
                                            "Electronics & Tele-Communication Engineering",
                                            "Electronics & Electrical Engineering",
                                            "Electronics and Computer Science Engineering",
                                            "Electronics Engineering VLSI Design and Technology",
                                            "Electronics and Instrumentation",
                                            "Computer Science & Engineering",
                                            "Computer Science & Communication Engineering",
                                            "Computer Science and Engineering with specialization Artificial Intelligence",
                                            "Computer Science and Engineering with specialization Cyber Security",
                                            "Computer Science and Engineering with specialization Data Science",
                                            "Computer Science and Engineering with specialization Internet of Things and Cyber Security Including Block Chain Technology",
                                            "Computer Science and Engineering with specialization Internet of Things",
                                            "Computer Science & Systems Engineering",
                                            "Computer Science and Engineering with specialization Artificial Intelligence and Machine Learning",
                                            "Information Technology",
                                            "Chemical Engineering",
                                            "Other"
                                        ]}
                                        value={formData.branch}
                                        onChange={(value) => setFormData({ ...formData, branch: value })}
                                        placeholder="Select your branch"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-8 px-8 py-4 bg-red-600 text-white font-heading uppercase tracking-widest hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    <>
                                        <span className="relative z-10">Register Now</span>
                                        <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
