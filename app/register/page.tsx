'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import SearchableSelect from '../components/SearchableSelect';
import { useToast } from '../context/ToastContext';

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        rollNumber: '',
        branch: '',
        gender: '',
        year: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const { showToast } = useToast();

    // Page loading animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Block scroll when success popup is shown
    useEffect(() => {
        if (submitted) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [submitted]);

    const ALLOWED_BRANCHES = [
     
        "Computer Science & Engineering",
        "Information Technology",
        "Computer Science & Communication Engineering",
        "Computer Science & Systems Engineering",
        "Computer Science and Engineering with specialization Artificial Intelligence and Machine Learning",
        "Computer Science and Engineering with specialization Artificial Intelligence",
        "Computer Science and Engineering with specialization Cyber Security",
        "Computer Science and Engineering with specialization Data Science",
        "Computer Science and Engineering with specialization Internet of Things and Cyber Security Including Block Chain Technology",
        "Computer Science and Engineering with specialization Internet of Things",
        
        
        "Electrical Engineering",
        "Electrical and Computer Engineering",
        "Electronics & Tele-Communication Engineering",
        "Electronics & Electrical Engineering",
        "Electronics and Computer Science Engineering",
        "Electronics Engineering VLSI Design and Technology",
        "Electronics and Instrumentation",


        "Chemical Engineering",
        "Civil Engineering",
        "Construction Technology",
        "Mechanical Engineering",
        "Mechanical Engineering(Automobile)",
        "Aerospace Engineering",
        "Mechatronics Engineering",
        "Other"
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        else if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email address";

        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Phone number must be exactly 10 digits";

        if (!formData.rollNumber.trim()) newErrors.rollNumber = "Roll Number is required";
        if (!formData.branch) newErrors.branch = "Please select a branch";
        if (!formData.gender) newErrors.gender = "Please select a gender";
        if (!formData.year) newErrors.year = "Please select a year";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            showToast('Please fix the errors in the form', 'error');
        }

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/registration/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                // Handle error response
                setIsSubmitting(false);
                showToast(data.message || 'Registration failed. Please try again.', 'error');
                return;
            }

            // Success
            setIsSubmitting(false);
            setSubmitted(true);
            
            // Smooth scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            

            // Redirect to home after 3 seconds
        

        } catch (error) {
            console.error('Registration error:', error);
            setIsSubmitting(false);
            showToast('Network error. Please check if the backend server is running.', 'error');
        }
    };

    return (
        <>
            {/* Loading Screen */}
            {isLoading && (
                <div className="fixed inset-0 z-[300] bg-gradient-to-br from-black via-[#1A0005] to-black flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-white/60 font-heading uppercase tracking-widest text-sm">Loading...</p>
                    </div>
                </div>
            )}

            {/* Main Page */}
            <div className="min-h-screen bg-gradient-to-br from-black via-[#1A0005] to-black relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/20 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/10 blur-[60px] rounded-full pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-800/5 blur-[100px] rounded-full pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-10 min-h-screen flex flex-col items-center pt-32 px-6 pb-20">
                    <div className="w-full max-w-3xl">

                        {submitted ? (
                            // Success State - Modern Award-Winning Design
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black backdrop-blur-2xl animate-fade-in p-4 sm:p-6">
                                <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto">
                                    {/* Ambient Glow Effects */}
                                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-red-600/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
                                    
                                    {/* Main Card */}
                                    <div className="relative bg-gradient-to-b from-zinc-900/90 to-black/90 backdrop-blur-xl border border-zinc-800/50 shadow-2xl shadow-red-950/50 animate-scale-in overflow-hidden">
                                        {/* Top Accent Line */}
                                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                                        
                                        <div className="p-6 sm:p-8 md:p-10 lg:p-12 text-center">
                                            {/* Success Icon - Elegant Minimal Design */}
                                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-6 sm:mb-8">
                                                {/* Outer Ring Glow */}
                                                <div className="absolute inset-0 rounded-full bg-red-500/10 blur-lg sm:blur-xl" />
                                                {/* Main Circle */}
                                                <div className="relative w-full h-full rounded-full border-2 border-zinc-800 bg-gradient-to-b from-zinc-900 to-black flex items-center justify-center">
                                                    {/* Inner Glow Ring */}
                                                    <div className="absolute inset-2 rounded-full border border-red-500/30" />
                                                    {/* Checkmark */}
                                                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
                                                        <path d="M20 6L9 17l-5-5" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Heading */}
                                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent mb-2 sm:mb-3">
                                                Registration Complete
                                            </h2>
                                            
                                            <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-light tracking-wide mb-6 sm:mb-8 md:mb-10">
                                                Welcome to the arena, warrior
                                            </p>

                                            {/* Information Cards */}
                                            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 md:mb-10 text-left">
                                                {/* Email Check Card */}
                                                <div className="group relative bg-gradient-to-br from-zinc-900/50 to-black/50 border border-zinc-800/50 p-4 sm:p-5 hover:border-zinc-700/50 transition-all duration-300">
                                                    <div className="flex gap-3 sm:gap-4">
                                                        {/* Icon Container */}
                                                        <div className="flex-shrink-0">
                                                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                                    <polyline points="22,6 12,13 2,6" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        {/* Content */}
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-white font-medium text-sm sm:text-base mb-1 sm:mb-1.5">
                                                                Check Your Email
                                                            </h3>
                                                            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
                                                                Confirmation and event details have been sent to your registered email address
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Support Card */}
                                                <div className="group relative bg-gradient-to-br from-zinc-900/50 to-black/50 border border-zinc-800/50 p-4 sm:p-5 hover:border-zinc-700/50 transition-all duration-300">
                                                    <div className="flex gap-3 sm:gap-4">
                                                        {/* Icon Container */}
                                                        <div className="flex-shrink-0">
                                                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                                                    <circle cx="12" cy="12" r="10" />
                                                                    <line x1="12" y1="8" x2="12" y2="12" />
                                                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        {/* Content */}
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-white font-medium text-sm sm:text-base mb-1 sm:mb-1.5">
                                                                Need Help?
                                                            </h3>
                                                            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
                                                                If you don't receive the email, visit our{' '}
                                                                <a 
                                                                    href="/support" 
                                                                    className="text-red-400 hover:text-red-300 font-medium transition-colors underline decoration-red-500/30 underline-offset-2 hover:decoration-red-400/50"
                                                                >
                                                                    Support Page
                                                                </a>
                                                                {' '}to raise a ticket
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CTA Button */}
                                            <button
                                                onClick={() => router.push('/')}
                                                className="group relative w-full sm:w-auto min-w-[200px] px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 overflow-hidden cursor-pointer"
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                                        <line x1="19" y1="12" x2="5" y2="12" />
                                                        <polyline points="12 19 5 12 12 5" />
                                                    </svg>
                                                    BACK TO HOME
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        </div>
                                        
                                        {/* Bottom Accent Line */}
                                        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Form
                            <div className="animate-slide-up">
                                {/* Header */}
                                <div className="text-center mb-8 md:mb-12">
                                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold uppercase tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-100 to-white">
                                        Join the Battle
                                    </h1>
                                    <p className="text-white/60 text-base sm:text-lg">
                                        Register for CODECOMBAT and prove your coding prowess
                                    </p>
                                    <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mt-6" />
                                </div>

                                {/* Form Card */}
                                <div className="bg-black/40 backdrop-blur-sm border border-red-600/20 p-6 sm:p-10 md:p-12 shadow-[0_0_80px_rgba(177,18,38,0.2)] relative flex flex-col items-center sm:block will-change-transform">
                                    {/* Back Button */}
                                    <button
                                        onClick={() => router.push('/')}
                                        className="mb-8 sm:mb-0 sm:absolute sm:top-6 sm:right-6 px-4 py-2 border cursor-pointer border-white/20 bg-black/60 text-white/80 text-sm font-heading uppercase tracking-widest hover:border-red-500 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300"
                                    >
                                        ← Back
                                    </button>

                                    <form onSubmit={handleSubmit} className="space-y-8">

                                        {/* Name Field */}
                                        <div className="group">
                                            <label htmlFor="name" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-3 group-focus-within:text-red-400 transition-colors">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 sm:px-5 sm:py-4 bg-black/60 border ${errors.name ? 'border-red-500' : 'border-white/10'} text-white placeholder-white/30 focus:border-red-500 focus:bg-black/80 focus:outline-none transition-colors duration-200 text-base sm:text-lg will-change-contents`}
                                                placeholder="Enter your full name"
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1 font-mono">{errors.name}</p>}
                                        </div>

                                        {/* Email Field */}
                                        <div className="group">
                                            <label htmlFor="email" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-3 group-focus-within:text-red-400 transition-colors">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 sm:px-5 sm:py-4 bg-black/60 border ${errors.email ? 'border-red-500' : 'border-white/10'} text-white placeholder-white/30 focus:border-red-500 focus:bg-black/80 focus:outline-none transition-colors duration-200 text-base sm:text-lg will-change-contents`}
                                                placeholder="your_roll@kiit.ac.in"
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1 font-mono">{errors.email}</p>}
                                        </div>

                                        {/* Phone Number */}
                                        <div className="group">
                                            <label htmlFor="phone" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-3 group-focus-within:text-red-400 transition-colors">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 sm:px-5 sm:py-4 bg-black/60 border ${errors.phone ? 'border-red-500' : 'border-white/10'} text-white placeholder-white/30 focus:border-red-500 focus:bg-black/80 focus:outline-none transition-colors duration-200 text-base sm:text-lg will-change-contents`}
                                                placeholder="10-digit mobile number"
                                                maxLength={10}
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs mt-1 font-mono">{errors.phone}</p>}
                                        </div>

                                        {/* Gender & Year Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                                            {/* Gender */}
                                            <div className="group">
                                                <label htmlFor="gender" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-3 group-focus-within:text-red-400 transition-colors">
                                                    Gender
                                                </label>

                                                <div className="relative">
                                                    <SearchableSelect
                                                        options={['Male', 'Female', 'Other']}
                                                        value={formData.gender}
                                                        onChange={(value) => {
                                                            setFormData(prev => ({ ...prev, gender: value }));
                                                            if (errors.gender) setErrors(prev => ({ ...prev, gender: '' }));
                                                        }}
                                                        placeholder="Select Gender"
                                                        className="w-full text-base sm:text-lg"
                                                        searchable={false}
                                                    />
                                                </div>
                                                {errors.gender && <p className="text-red-500 text-xs mt-1 font-mono">{errors.gender}</p>}
                                            </div>

                                            {/* Year */}
                                            <div className="group">
                                                <label htmlFor="year" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-3 group-focus-within:text-red-400 transition-colors">
                                                    Year
                                                </label>

                                                <div className="relative">
                                                    <SearchableSelect
                                                        options={['1st Year', '2nd Year', '3rd Year', '4th Year']}
                                                        value={formData.year}
                                                        onChange={(value) => {
                                                            setFormData(prev => ({ ...prev, year: value }));
                                                            if (errors.year) setErrors(prev => ({ ...prev, year: '' }));
                                                        }}
                                                        placeholder="Select Year"
                                                        className="w-full text-base sm:text-lg"
                                                        searchable={false}
                                                    />
                                                </div>
                                                {errors.year && <p className="text-red-500 text-xs mt-1 font-mono">{errors.year}</p>}
                                            </div>
                                        </div>

                                        {/* Roll Number & Branch Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Roll Number */}
                                            <div className="group">
                                                <label htmlFor="rollNumber" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-3 group-focus-within:text-red-400 transition-colors">
                                                    Roll Number
                                                </label>
                                                <input
                                                    type="text"
                                                    id="rollNumber"
                                                    name="rollNumber"
                                                    value={formData.rollNumber}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 sm:px-5 sm:py-4 bg-black/60 border ${errors.rollNumber ? 'border-red-500' : 'border-white/10'} text-white placeholder-white/30 focus:border-red-500 focus:bg-black/80 focus:outline-none transition-colors duration-200 text-base sm:text-lg will-change-contents`}
                                                    placeholder="Your roll number"
                                                />
                                                {errors.rollNumber && <p className="text-red-500 text-xs mt-1 font-mono">{errors.rollNumber}</p>}
                                            </div>

                                            {/* Branch */}
                                            <div className="group">
                                                <label htmlFor="branch" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-3 group-focus-within:text-red-400 transition-colors">
                                                    Branch
                                                </label>

                                                <div className="relative">
                                                    <SearchableSelect
                                                        options={ALLOWED_BRANCHES}
                                                        value={formData.branch}
                                                        onChange={(value) => {
                                                            setFormData(prev => ({ ...prev, branch: value }));
                                                            if (errors.branch) setErrors(prev => ({ ...prev, branch: '' }));
                                                        }}
                                                        placeholder="Select your branch"
                                                        className="w-full text-base sm:text-lg"
                                                    />
                                                </div>
                                                {errors.branch && <p className="text-red-500 text-xs mt-1 font-mono">{errors.branch}</p>}
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full mt-10 px-6 sm:px-10 py-4 sm:py-5 bg-red-600 text-white font-heading uppercase tracking-widest text-base sm:text-lg hover:bg-red-700 hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] disabled:bg-red-900 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center gap-3">
                                                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Processing...
                                                </span>
                                            ) : (
                                                <>
                                                    <span className="relative z-10 cursor-pointer">Register Now</span>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>

                                {/* Footer Note */}
                                <p className="text-center text-white/40 text-sm mt-8">
                                    By registering, you agree to our{' '}
                                    <a href="/terms" className="text-red-500 hover:text-red-400 transition-colors">Terms & Conditions</a>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from { 
            transform: scale(0);
          }
          to { 
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
        </>
    );
}
