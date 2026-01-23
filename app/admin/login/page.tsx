'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Login failed');

            // Store token
            localStorage.setItem('adminToken', data.token);
            router.push('/admin/dashboard');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20"></div>

            <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 p-8 rounded-lg shadow-2xl relative z-10">
                <h1 className="text-3xl font-heading font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                    ADMIN<span className="text-red-600">_</span>ACCESS
                </h1>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 mb-6 text-sm font-mono text-center">
                        // ERROR: {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-mono text-red-500 mb-2 uppercase tracking-widest">
                            Command ID (Email)
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors font-mono"
                            placeholder="admin@codecombat.ieee"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-red-500 mb-2 uppercase tracking-widest">
                            Access Key (Password)
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors font-mono"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-heading font-bold uppercase tracking-widest py-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                        <span className="relative z-10">
                            {isLoading ? 'AUTHENTICATING...' : 'INITIATE SESSION'}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
}
