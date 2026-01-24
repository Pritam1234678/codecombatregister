'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Users, Search, LogOut, Trash2, Edit2, X, Check, Save } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import SearchableSelect from '../../components/SearchableSelect';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    roll_number: string;
    branch: string;
    created_at: string;
}

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

export default function AdminDashboard() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
    const { showToast } = useToast();

    // Fetch Users
    const fetchUsers = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) throw new Error('Failed to fetch');

            const data = await res.json();
            setUsers(data.users);
            setFilteredUsers(data.users);
        } catch (error) {
            console.error(error);
            localStorage.removeItem('adminToken');
            router.push('/admin/login');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Search Logic
    useEffect(() => {
        const lowerTerm = searchTerm.toLowerCase();
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(lowerTerm) ||
            user.email.toLowerCase().includes(lowerTerm) ||
            user.roll_number.toLowerCase().includes(lowerTerm)
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
    };

    // Confirm Delete
    const confirmDelete = (id: number) => {
        setDeletingUserId(id);
    };

    // Execute Delete
    const handleDelete = async () => {
        if (!deletingUserId) return;

        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admin/users/${deletingUserId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setUsers(users.filter(u => u.id !== deletingUserId));
                setDeletingUserId(null);
                showToast('User deleted successfully', 'success');
            } else {
                showToast('Failed to delete user', 'error');
            }
        } catch (error) {
            console.error(error);
            showToast('An error occurred', 'error');
        }
    };

    // Update User
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;

        // Frontend Validation
        // Name: at least 2 chars
        if (editingUser.name.trim().length < 2) {
            alert('Name must be at least 2 characters long');
            return;
        }

        // Email: standard regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(editingUser.email)) {
            alert('Please enter a valid email address');
            showToast('Please enter a valid email address', 'error');
            return;
        }

        // Phone: exactly 10 digits
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(editingUser.phone)) {
            showToast('Phone number must be exactly 10 digits', 'error');
            return;
        }

        // Roll Number: non-empty
        if (!editingUser.roll_number.trim()) {
            showToast('Roll Number is required', 'error');
            return;
        }

        // Roll Number: numeric only
        const rollRegex = /^[0-9]+$/;
        if (!rollRegex.test(editingUser.roll_number)) {
            showToast('Roll Number must contain only numbers', 'error');
            return;
        }

        // Branch: non-empty
        if (!editingUser.branch.trim()) {
            showToast('Branch is required', 'error');
            return;
        }

        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admin/users/${editingUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: editingUser.name,
                    email: editingUser.email,
                    phone: editingUser.phone,
                    rollNumber: editingUser.roll_number, // Backend expects rollNumber
                    branch: editingUser.branch
                })
            });

            if (res.ok) {
                setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
                setEditingUser(null);
            } else {
                alert('Failed to update user');
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#020202] flex items-center justify-center">
                <div className="w-1 h-12 bg-white animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-white selection:text-black">

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-[#020202]/80 backdrop-blur-xl border-b border-white/[0.08]">
                <div className="max-w-[1920px] mx-auto px-8 md:px-16 h-20 flex items-center justify-between">
                    <span className="text-xl tracking-tight font-medium">
                        CodeCombat<span className="opacity-40 ml-2 font-normal">Registry</span>
                    </span>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-sm text-white/40 font-mono uppercase tracking-wider">System Active</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium hover:text-white/60 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-8 md:px-16 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-12 gap-6 mb-24">
                    {/* Header Text */}
                    <div className="col-span-12 lg:col-span-8">
                        <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-6">
                            Dashboard
                            <br />
                            <span className="opacity-30">Overview</span>
                        </h1>
                    </div>

                    {/* Stats Box - The "Bento" Block */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col justify-end">
                        <div className="bg-white/[0.03] border border-white/[0.08] p-8 hover:bg-white/[0.05] transition-all duration-500 group">
                            <p className="text-white/40 text-sm font-mono uppercase tracking-widest mb-4">Total Registrations</p>
                            <div className="flex items-baseline gap-4">
                                <span className="text-8xl md:text-9xl font-semibold tracking-tighter group-hover:scale-105 transition-transform duration-500 origin-left">
                                    {users.length}
                                </span>
                                <span className="text-emerald-500 text-lg font-mono">
                                    +Live
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toolbar & Search */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12 border-b border-white/[0.08] pb-12">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-light">Database</h2>
                        <p className="text-white/40 text-sm max-w-md">
                            Manage and monitor all participant entries.
                        </p>
                    </div>

                    <div className="w-full md:w-[400px]">
                        <input
                            type="text"
                            placeholder="Search by name, email or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 py-4 text-xl placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                        />
                    </div>
                </div>

                {/* Minimalist Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08]">
                                <th className="py-6 px-4 text-xs font-mono uppercase tracking-widest text-white/40 font-normal">ID</th>
                                <th className="py-6 px-4 text-xs font-mono uppercase tracking-widest text-white/40 font-normal">Participant</th>
                                <th className="py-6 px-4 text-xs font-mono uppercase tracking-widest text-white/40 font-normal">Contact</th>
                                <th className="py-6 px-4 text-xs font-mono uppercase tracking-widest text-white/40 font-normal">Academic</th>
                                <th className="py-6 px-4 text-xs font-mono uppercase tracking-widest text-white/40 font-normal text-right">Controls</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-white/[0.04] group hover:bg-white/[0.02] transition-colors">
                                    <td className="py-6 px-4 font-mono text-white/30 text-sm">
                                        #{user.id.toString().padStart(3, '0')}
                                    </td>
                                    <td className="py-6 px-4">
                                        <div className="font-medium text-lg text-white group-hover:indent-2 transition-all duration-300">
                                            {user.name}
                                        </div>
                                    </td>
                                    <td className="py-6 px-4">
                                        <div className="text-white/60 mb-1">{user.email}</div>
                                        <div className="text-white/30 text-sm font-mono">{user.phone}</div>
                                    </td>
                                    <td className="py-6 px-4">
                                        <div className="text-white/80">{user.branch}</div>
                                        <div className="text-white/30 text-sm font-mono mt-1">{user.roll_number}</div>
                                    </td>
                                    <td className="py-6 px-4 text-right">
                                        <div className="flex justify-end gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button
                                                onClick={() => setEditingUser(user)}
                                                className="text-sm border-b border-transparent hover:border-white transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => confirmDelete(user.id)}
                                                className="text-sm text-red-500/60 border-b border-transparent hover:border-red-500 hover:text-red-500 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredUsers.length === 0 && (
                        <div className="py-32 text-center">
                            <p className="text-white/20 text-xl font-light">No records found matching your search.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Premium Edit Modal */}
            {editingUser && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="w-full max-w-xl bg-[#090909] border border-white/[0.08] p-10 shadow-2xl">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h3 className="text-3xl font-light tracking-tight text-white mb-2">Edit Details</h3>
                                <p className="text-white/40 text-sm font-mono">ID: {editingUser.id}</p>
                            </div>
                            <button onClick={() => setEditingUser(null)} className="text-white/40 hover:text-white transition-colors text-2xl leading-none">
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40">Name</label>
                                    <input
                                        type="text"
                                        value={editingUser.name}
                                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white transition-colors text-lg"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40">Roll No</label>
                                    <input
                                        type="text"
                                        value={editingUser.roll_number}
                                        onChange={(e) => setEditingUser({ ...editingUser, roll_number: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white transition-colors text-lg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-xs font-mono uppercase tracking-widest text-white/40">Email</label>
                                <input
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white transition-colors text-lg"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40">Phone</label>
                                    <input
                                        type="text"
                                        value={editingUser.phone}
                                        onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white transition-colors text-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-3">Branch</label>
                                    <SearchableSelect
                                        options={ALLOWED_BRANCHES}
                                        value={editingUser.branch}
                                        onChange={(value) => setEditingUser({ ...editingUser, branch: value })}
                                        placeholder="Select Branch"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-6 mt-12 pt-8 border-t border-white/[0.08]">
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="text-sm text-white/40 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-white text-black text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors"
                                >
                                    Save Updates
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Minimalist Delete Modal */}
            {deletingUserId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-sm bg-[#090909] border border-white/[0.1] p-10 text-center">
                        <div className="w-2 h-2 bg-red-500 mx-auto mb-6 rounded-full"></div>
                        <h3 className="text-xl font-light text-white mb-2">Delete Record?</h3>
                        <p className="text-white/40 text-sm mb-8">This action cannot be undone.</p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setDeletingUserId(null)}
                                className="px-6 py-2 border border-white/10 text-sm hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm transition-colors"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
