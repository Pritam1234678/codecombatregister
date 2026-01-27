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

    const ALLOWED_BRANCHES = [
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
            
            showToast('Registration successful! Redirecting...', 'success');

            // Redirect to home after 3 seconds
            setTimeout(() => {
                router.push('/');
            }, 3000);

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
                            // Success State
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
                                <div className="text-center py-20 px-6 animate-scale-in">
                                    <div className="w-24 h-24 mx-auto mb-8 border-4 border-red-500 rounded-full flex items-center justify-center">
                                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tighter text-white mb-4">
                                        Welcome to the Arena!
                                    </h2>
                                    <p className="text-white/60 text-lg mb-2">Registration successful, warrior.</p>
                                    <p className="text-white/40 text-sm">Redirecting you back...</p>
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
                                                placeholder="your.email@example.com"
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Gender */}
                                            <div className="group">
                                                <label htmlFor="gender" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-3 group-focus-within:text-red-400 transition-colors">
                                                    Gender
                                                </label>
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 sm:px-5 sm:py-4 bg-black/60 border ${errors.gender ? 'border-red-500' : 'border-white/10'} text-white placeholder-white/30 focus:border-red-500 focus:bg-black/80 focus:outline-none transition-colors duration-200 text-base sm:text-lg will-change-contents`}
                                                >
                                                    <option value="" className="bg-black">Select Gender</option>
                                                    <option value="Male" className="bg-black">Male</option>
                                                    <option value="Female" className="bg-black">Female</option>
                                                    <option value="Other" className="bg-black">Other</option>
                                                </select>
                                                {errors.gender && <p className="text-red-500 text-xs mt-1 font-mono">{errors.gender}</p>}
                                            </div>

                                            {/* Year */}
                                            <div className="group">
                                                <label htmlFor="year" className="block text-sm font-heading uppercase tracking-widest text-red-500 mb-3 group-focus-within:text-red-400 transition-colors">
                                                    Year
                                                </label>
                                                <select
                                                    id="year"
                                                    name="year"
                                                    value={formData.year}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 sm:px-5 sm:py-4 bg-black/60 border ${errors.year ? 'border-red-500' : 'border-white/10'} text-white placeholder-white/30 focus:border-red-500 focus:bg-black/80 focus:outline-none transition-colors duration-200 text-base sm:text-lg will-change-contents`}
                                                >
                                                    <option value="" className="bg-black">Select Year</option>
                                                    <option value="1st" className="bg-black">1st Year</option>
                                                    <option value="2nd" className="bg-black">2nd Year</option>
                                                    <option value="3rd" className="bg-black">3rd Year</option>
                                                    <option value="4th" className="bg-black">4th Year</option>
                                                </select>
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
