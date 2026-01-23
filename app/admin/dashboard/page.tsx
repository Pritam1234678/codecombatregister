'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Users, Search, LogOut, Trash2, Edit2, X, Check, Save } from 'lucide-react';

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

    // Delete User
    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admin/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setUsers(users.filter(u => u.id !== id));
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error(error);
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
            const res = await fetch(`http://localhost:5000/api/admin/users/${editingUser.id}`, {
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

    if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-red-500 font-mono">LOADING_SECURE_DATA...</div>;

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans">
            <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20"></div>

            {/* Navbar */}
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-red-500" />
                            <span className="font-heading font-bold text-lg tracking-wider">ADMIN<span className="text-red-600">_</span>PANEL</span>
                        </div>
                        <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-mono text-white/60 hover:text-red-500 transition-colors">
                            <LogOut className="w-4 h-4" />
                            LOGOUT
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                {/* Stats & Search */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-heading font-bold mb-1">Registrations</h1>
                        <p className="text-white/40 font-mono text-sm">Total Combatants: <span className="text-red-500">{users.length}</span></p>
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-sm py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden relative">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 border-b border-white/10 font-mono text-xs uppercase text-white/50">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Roll No</th>
                                    <th className="px-6 py-4">Branch</th>
                                    <th className="px-6 py-4">Phone</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 text-white/40 font-mono">#{user.id}</td>
                                        <td className="px-6 py-4 font-medium">{user.name}</td>
                                        <td className="px-6 py-4 text-white/60">{user.email}</td>
                                        <td className="px-6 py-4 font-mono text-red-400">{user.roll_number}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">
                                                {user.branch}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-white/60 font-mono">{user.phone}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => setEditingUser(user)}
                                                    className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-2 text-white/60 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
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
                </div>
            </main>

            {/* Edit Modal */}
            {editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-[#0A0A0A] border border-white/10 p-6 rounded-lg shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-heading font-bold">Edit User</h3>
                            <button onClick={() => setEditingUser(null)} className="text-white/40 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-white/40 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={editingUser.name}
                                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-red-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-white/40 mb-1">Roll No</label>
                                    <input
                                        type="text"
                                        value={editingUser.roll_number}
                                        onChange={(e) => setEditingUser({ ...editingUser, roll_number: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-red-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-white/40 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-red-500 focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-white/40 mb-1">Phone</label>
                                    <input
                                        type="text"
                                        value={editingUser.phone}
                                        onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-red-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-white/40 mb-1">Branch</label>
                                    <input
                                        type="text"
                                        value={editingUser.branch}
                                        onChange={(e) => setEditingUser({ ...editingUser, branch: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white focus:border-red-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="px-4 py-2 text-sm text-white/60 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold uppercase tracking-wide flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
