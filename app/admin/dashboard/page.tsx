'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Users, Search, LogOut, Trash2, Edit2, X, Check, Save } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    roll_number: string;
    branch: string;
    created_at: string;
}

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
            return;
        }

        // Phone: exactly 10 digits
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(editingUser.phone)) {
            alert('Phone number must be exactly 10 digits');
            return;
        }

        // Roll Number: non-empty
        if (!editingUser.roll_number.trim()) {
            alert('Roll Number is required');
            return;
        }

        // Branch: non-empty
        if (!editingUser.branch.trim()) {
            alert('Branch is required');
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
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-red-900 border-t-red-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-red-500 font-mono tracking-widest animate-pulse">ACCESSING_SECURE_MAINFRAME...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans relative overflow-hidden selection:bg-red-500/30 selection:text-red-400">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-red-900/10 to-transparent pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Navbar */}
            <nav className="border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3 group cursor-default">
                            <div className="w-10 h-10 bg-red-900/20 border border-red-500/30 rounded flex items-center justify-center group-hover:border-red-500/60 transition-colors">
                                <Shield className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-xl tracking-wider leading-none">
                                    ADMIN<span className="text-red-600">_</span>PANEL
                                </span>
                                <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] group-hover:text-red-500/50 transition-colors">
                                    SYSTEM.ROOT.ACCESS
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/40">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                SYSTEM ONLINE
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-red-500/50 bg-white/5 hover:bg-red-500/10 text-xs font-mono tracking-wider text-white/70 hover:text-white transition-all duration-300 rounded-sm"
                            >
                                <LogOut className="w-3 h-3" />
                                DISCONNECT
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Users className="w-16 h-16 text-red-500" />
                        </div>
                        <p className="text-white/40 font-mono text-xs uppercase tracking-widest mb-1">Total Combatants</p>
                        <h2 className="text-4xl font-heading font-bold text-white mb-2">{users.length}</h2>
                        <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
                            <div className="h-full bg-red-600 w-3/4"></div>
                        </div>
                    </div>

                    <div className="col-span-2 bg-[#0A0A0A] border border-white/10 p-6 rounded-lg flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 to-transparent"></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-heading font-bold text-white mb-2">Operation Status</h3>
                            <p className="text-white/60 text-sm max-w-xl">
                                Registration portal is active. Monitor incoming data streams for anomalies.
                                Secure all user data as per protocol <span className="text-red-500 font-mono">IEEE-SEC-01</span>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-1 bg-red-600"></div>
                        <h2 className="text-2xl font-heading font-bold tracking-tight">REGISTRY_DATABASE</h2>
                    </div>

                    <div className="relative w-full md:w-80 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-white/30 group-focus-within:text-red-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by Name, Email or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-none bg-black/50 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 sm:text-sm font-mono transition-all duration-300"
                        />
                        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-red-500 transition-all duration-300 group-focus-within:w-full"></div>
                    </div>
                </div>

                {/* Data Grid */}
                <div className="bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden relative shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.02] border-b border-white/10 font-mono text-[#888] text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-normal">ID_REF</th>
                                    <th className="px-6 py-4 font-normal">OPERATIVE_NAME</th>
                                    <th className="px-6 py-4 font-normal">CONTACT_EMAIL</th>
                                    <th className="px-6 py-4 font-normal">ROLL_SEQ</th>
                                    <th className="px-6 py-4 font-normal">UNIT_BRANCH</th>
                                    <th className="px-6 py-4 font-normal">COMMS</th>
                                    <th className="px-6 py-4 font-normal text-right">CONTROLS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 font-mono text-sm">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-red-500/[0.03] transition-colors group">
                                        <td className="px-6 py-4 text-white/30">#{user.id.toString().padStart(4, '0')}</td>
                                        <td className="px-6 py-4 font-sans font-medium text-white group-hover:text-red-400 transition-colors">{user.name}</td>
                                        <td className="px-6 py-4 text-white/60">{user.email}</td>
                                        <td className="px-6 py-4 text-red-300/80">{user.roll_number}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded textxs font-medium bg-white/5 text-white/70 border border-white/10">
                                                {user.branch}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-white/40">{user.phone}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => setEditingUser(user)}
                                                    className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                                                    title="Edit Record"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete(user.id)}
                                                    className="p-2 text-red-500/60 hover:text-red-500 hover:bg-red-900/20 rounded transition-colors"
                                                    title="Terminate Record"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredUsers.length === 0 && (
                        <div className="p-12 text-center text-white/30 font-mono text-sm border-t border-white/5">
                            NO_DATA_FOUND_IN_SECTOR...
                        </div>
                    )}
                </div>
            </main>

            {/* Edit Modal */}
            {editingUser && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-lg bg-[#0A0A0A] border border-white/20 p-8 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>

                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-2xl font-heading font-bold text-white">EDIT_RECORD</h3>
                                <p className="text-white/40 font-mono text-xs mt-1">ID: #{editingUser.id.toString().padStart(4, '0')}</p>
                            </div>
                            <button onClick={() => setEditingUser(null)} className="text-white/40 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-xs font-mono text-red-500 tracking-wider">FULL_NAME</label>
                                    <input
                                        type="text"
                                        value={editingUser.name}
                                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                        className="w-full bg-black border border-white/10 px-4 py-2.5 text-white focus:border-red-500 focus:outline-none transition-colors font-mono text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-mono text-red-500 tracking-wider">ROLL_ID</label>
                                    <input
                                        type="text"
                                        value={editingUser.roll_number}
                                        onChange={(e) => setEditingUser({ ...editingUser, roll_number: e.target.value })}
                                        className="w-full bg-black border border-white/10 px-4 py-2.5 text-white focus:border-red-500 focus:outline-none transition-colors font-mono text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-mono text-red-500 tracking-wider">EMAIL_ADDRESS</label>
                                <input
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    className="w-full bg-black border border-white/10 px-4 py-2.5 text-white focus:border-red-500 focus:outline-none transition-colors font-mono text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-xs font-mono text-red-500 tracking-wider">PHONE_COMMS</label>
                                    <input
                                        type="text"
                                        value={editingUser.phone}
                                        onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                                        className="w-full bg-black border border-white/10 px-4 py-2.5 text-white focus:border-red-500 focus:outline-none transition-colors font-mono text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-mono text-red-500 tracking-wider">UNIT_BRANCH</label>
                                    <input
                                        type="text"
                                        value={editingUser.branch}
                                        onChange={(e) => setEditingUser({ ...editingUser, branch: e.target.value })}
                                        className="w-full bg-black border border-white/10 px-4 py-2.5 text-white focus:border-red-500 focus:outline-none transition-colors font-mono text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-white/5">
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="px-6 py-2 text-xs font-mono text-white/60 hover:text-white border border-transparent hover:border-white/20 transition-all uppercase tracking-wider"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold font-mono uppercase tracking-widest flex items-center gap-2 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all"
                                >
                                    <Save className="w-3 h-3" />
                                    Save_Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deletingUserId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-[#0A0A0A] border border-red-500/50 p-8 rounded-sm shadow-[0_0_50px_rgba(220,38,38,0.2)] relative overflow-hidden">

                        {/* Warning Striped Background */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#ef4444_10px,#ef4444_20px)] opacity-50"></div>

                        <div className="text-center relative z-10">
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
                                <Trash2 className="w-8 h-8 text-red-500" />
                            </div>

                            <h3 className="text-xl font-heading font-bold text-white mb-2 tracking-wide">CONFIRM_TERMINATION</h3>
                            <p className="text-sm font-mono text-white/50 mb-8 px-4 leading-relaxed">
                                Are you sure you want to permanently delete this user data? <br />
                                <span className="text-red-500">This action is irreversible.</span>
                            </p>

                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setDeletingUserId(null)}
                                    className="px-6 py-2.5 text-xs font-mono text-white/60 hover:text-white border border-white/10 hover:border-white/30 transition-all uppercase tracking-wider min-w-[100px]"
                                >
                                    Abort
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold font-mono uppercase tracking-widest min-w-[120px] hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
