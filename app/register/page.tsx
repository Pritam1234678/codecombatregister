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
                            <div className="fixed inset-0 z-[100] flex justify-center overflow-y-auto bg-gradient-to-br from-black via-zinc-950 to-black backdrop-blur-2xl animate-fade-in">
                                <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto my-auto p-4 sm:p-6 pt-32 sm:pt-32 pb-12">
                                    {/* Ambient Glow Effects */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-red-600/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

                                    {/* Main Card */}
                                    <div className="relative bg-linear-to-b from-zinc-900/90 to-black/90 backdrop-blur-xl border border-zinc-800/50 shadow-2xl shadow-red-950/50 animate-scale-in overflow-hidden rounded-2xl">
                                        {/* Top Accent Line */}
                                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

                                        <div className="p-5 sm:p-6 md:p-8 lg:p-10 text-center">
                                            <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6">
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
                                            {/* Heading */}
                                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold uppercase tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                                                Registration Complete
                                            </h2>

                                            <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-light tracking-wide mb-4 sm:mb-6 md:mb-8">
                                                Welcome to the arena, warrior
                                            </p>

                                            {/* Information Cards */}
                                            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 md:mb-8 text-left">
                                                {/* Email Check Card */}
                                                <div className="group relative bg-linear-to-br from-zinc-900/50 to-black/50 border border-zinc-800/50 p-3 sm:p-4 hover:border-zinc-700/50 transition-all duration-300">
                                                    <div className="flex gap-3 sm:gap-4">
                                                        {/* Icon Container */}
                                                        <div className="shrink-0">
                                                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
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
                                                <div className="group relative bg-linear-to-br from-zinc-900/50 to-black/50 border border-zinc-800/50 p-3 sm:p-4 hover:border-zinc-700/50 transition-all duration-300">
                                                    <div className="flex gap-3 sm:gap-4">
                                                        {/* Icon Container */}
                                                        <div className="shrink-0">
                                                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
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

                                                {/* WhatsApp Group Card */}
                                                <div className="group relative bg-linear-to-br from-zinc-900/50 to-black/50 border border-zinc-800/50 p-3 sm:p-4 hover:border-zinc-700/50 transition-all duration-300">
                                                    <div className="flex gap-3 sm:gap-4">
                                                        {/* Icon Container */}
                                                        <div className="shrink-0">
                                                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        {/* Content */}
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-white font-medium text-sm sm:text-base mb-1 sm:mb-1.5">
                                                                Join WhatsApp
                                                            </h3>
                                                            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
                                                                Join our official WhatsApp group for updates: {' '}
                                                                <a
                                                                    href="https://chat.whatsapp.com/EZHiSHJATdQ2NcCGuogZTx?mode=gi_t"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-red-400 hover:text-red-300 font-medium transition-colors underline decoration-red-500/30 underline-offset-2 hover:decoration-red-400/50 whitespace-nowrap"
                                                                >
                                                                    Join Now
                                                                </a>
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
