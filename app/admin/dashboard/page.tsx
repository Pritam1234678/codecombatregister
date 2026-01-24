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
                <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-500/30 selection:text-red-400">

            {/* Navbar */}
            <nav className="border-b border-white/10 bg-black sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-lg tracking-wide text-white">
                                CODECOMBAT <span className="text-white/40 font-normal">| Admin</span>
                            </span>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-white/60">Live</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-sm text-white/60 hover:text-white transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-lg">
                        <p className="text-white/40 text-sm mb-1">Total Registrations</p>
                        <h2 className="text-4xl font-light text-white">{users.length}</h2>
                    </div>

                    <div className="col-span-2 bg-[#0A0A0A] border border-white/10 p-6 rounded-lg flex flex-col justify-center">
                        <h3 className="text-lg font-medium text-white mb-1">System Status</h3>
                        <p className="text-white/60 text-sm">
                            Registration portal is active. Data is secure.
                        </p>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <h2 className="text-xl font-medium">Registered Users</h2>

                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full px-4 py-2 border border-white/10 rounded bg-[#0A0A0A] text-white placeholder-white/40 focus:outline-none focus:border-red-500 text-sm transition-colors"
                        />
                    </div>
                </div>

                {/* Data Grid */}
                <div className="bg-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-normal">ID</th>
                                    <th className="px-6 py-4 font-normal">Name</th>
                                    <th className="px-6 py-4 font-normal">Email</th>
                                    <th className="px-6 py-4 font-normal">Roll No</th>
                                    <th className="px-6 py-4 font-normal">Branch</th>
                                    <th className="px-6 py-4 font-normal">Phone</th>
                                    <th className="px-6 py-4 font-normal text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm text-white/80">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 text-white/40">#{user.id}</td>
                                        <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                                        <td className="px-6 py-4 text-white/60">{user.email}</td>
                                        <td className="px-6 py-4 text-white/60">{user.roll_number}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs bg-white/5 border border-white/10 text-white/60">
                                                {user.branch}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-white/60">{user.phone}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3 text-sm">
                                                <button
                                                    onClick={() => setEditingUser(user)}
                                                    className="text-white/40 hover:text-white transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete(user.id)}
                                                    className="text-red-500/60 hover:text-red-500 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredUsers.length === 0 && (
                        <div className="p-12 text-center text-white/30 text-sm">
                            No users found.
                        </div>
                    )}
                </div>
            </main>

            {/* Edit Modal */}
            {editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-[#0A0A0A] border border-white/10 p-8 rounded-lg shadow-xl">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-medium text-white">Edit User</h3>
                            <button onClick={() => setEditingUser(null)} className="text-white/40 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-xs uppercase text-white/40 tracking-wider">Name</label>
                                    <input
                                        type="text"
                                        value={editingUser.name}
                                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                        className="w-full bg-black border border-white/10 px-4 py-2 text-white focus:border-white/30 focus:outline-none transition-colors text-sm rounded"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs uppercase text-white/40 tracking-wider">Roll No</label>
                                    <input
                                        type="text"
                                        value={editingUser.roll_number}
                                        onChange={(e) => setEditingUser({ ...editingUser, roll_number: e.target.value })}
                                        className="w-full bg-black border border-white/10 px-4 py-2 text-white focus:border-white/30 focus:outline-none transition-colors text-sm rounded"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs uppercase text-white/40 tracking-wider">Email</label>
                                <input
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    className="w-full bg-black border border-white/10 px-4 py-2 text-white focus:border-white/30 focus:outline-none transition-colors text-sm rounded"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-xs uppercase text-white/40 tracking-wider">Phone</label>
                                    <input
                                        type="text"
                                        value={editingUser.phone}
                                        onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                                        className="w-full bg-black border border-white/10 px-4 py-2 text-white focus:border-white/30 focus:outline-none transition-colors text-sm rounded"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs uppercase text-white/40 tracking-wider">Branch</label>
                                    <input
                                        type="text"
                                        value={editingUser.branch}
                                        onChange={(e) => setEditingUser({ ...editingUser, branch: e.target.value })}
                                        className="w-full bg-black border border-white/10 px-4 py-2 text-white focus:border-white/30 focus:outline-none transition-colors text-sm rounded"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-white text-black text-sm font-medium rounded hover:bg-white/90 transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deletingUserId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-sm bg-[#0A0A0A] border border-white/10 p-6 rounded-lg shadow-xl">
                        <div className="text-center">
                            <h3 className="text-lg font-medium text-white mb-2">Confirm Delete</h3>
                            <p className="text-sm text-white/60 mb-6">
                                Are you sure you want to delete this user?
                            </p>
                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={() => setDeletingUserId(null)}
                                    className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors border border-white/10 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
