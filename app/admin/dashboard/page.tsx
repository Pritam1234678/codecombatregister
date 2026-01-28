'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Users, Search, LogOut, Trash2, Edit2, X, Check, Save, Menu, Home, ClipboardList, Info, Download } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import SearchableSelect from '../../components/SearchableSelect';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    roll_number: string;
    branch: string;
    gender: string;
    year: string;
    created_at: string;
}

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

export default function AdminDashboard() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showGenderStats, setShowGenderStats] = useState(false);
    const [showYearStats, setShowYearStats] = useState(false);
    const [genderFilter, setGenderFilter] = useState<string | null>(null);
    const [yearFilter, setYearFilter] = useState<string | null>(null);
    const [genderFilterSearch, setGenderFilterSearch] = useState('');
    const [yearFilterSearch, setYearFilterSearch] = useState('');
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

    // Export to CSV
    const handleExportCSV = () => {
        // CSV Headers
        const headers = ['ID', 'Name', 'Email', 'Phone', 'Roll Number', 'Branch', 'Gender', 'Year', 'Registered At'];
        
        // CSV Rows
        const rows = filteredUsers.map(user => [
            user.id,
            user.name,
            user.email,
            user.phone,
            user.roll_number,
            user.branch,
            user.gender,
            user.year,
            new Date(user.created_at).toLocaleString()
        ]);

        // Create CSV content
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        // Create blob and download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `codecombat-registrations-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast(`Exported ${filteredUsers.length} registrations to CSV`, 'success');
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

        // Gender: non-empty
        if (!editingUser.gender.trim()) {
            showToast('Gender is required', 'error');
            return;
        }

        // Year: non-empty
        if (!editingUser.year.trim()) {
            showToast('Year is required', 'error');
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
                    branch: editingUser.branch,
                    gender: editingUser.gender,
                    year: editingUser.year
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
        <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-white selection:text-black uppercase">

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-[100] bg-[#020202]/80 backdrop-blur-xl border-b border-white/[0.08]">
                <div className="max-w-[1920px] mx-auto px-6 md:px-16 h-20 flex items-center justify-between">
                    <span className="text-xl tracking-tight font-medium">
                        CodeCombat<span className="opacity-40 ml-2 font-normal">Registry</span>
                    </span>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-12">
                        <div className="flex items-center gap-8 text-sm font-medium">
                            <Link href="/" className="text-white/40 hover:text-white transition-colors">Home</Link>
                            <Link href="/register" className="text-white/40 hover:text-white transition-colors">Register</Link>
                            <Link href="/details" className="text-white/40 hover:text-white transition-colors">Details</Link>
                        </div>
                        <div className="h-4 w-px bg-white/10"></div>
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">System Protocol Active</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-white/60 hover:text-white transition-colors z-[10001] relative"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-[#000000] z-[9999] transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl -z-10"></div>

                {/* Mobile Menu Header Spacer */}
                <div className="h-20 border-b border-white/[0.08] flex items-center justify-end px-6 md:px-16">
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 text-white/60 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex flex-col p-8 gap-0 h-[calc(100%-80px)] overflow-y-auto relative z-10">
                    <Link
                        href="/"
                        className="flex items-center gap-4 py-8 text-3xl font-light border-b border-white/[0.04] active:bg-white/5"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Home className="w-8 h-8 text-white/40" />
                        Home
                    </Link>
                    <Link
                        href="/register"
                        className="flex items-center gap-4 py-8 text-3xl font-light border-b border-white/[0.04] active:bg-white/5"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <ClipboardList className="w-8 h-8 text-white/40" />
                        Register
                    </Link>
                    <Link
                        href="/details"
                        className="flex items-center gap-4 py-8 text-3xl font-light border-b border-white/[0.04] active:bg-white/5"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Info className="w-8 h-8 text-white/40" />
                        Details
                    </Link>
                    <button
                        onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-4 py-8 text-3xl font-light text-red-500 active:bg-red-500/5 transition-colors border-b border-white/[0.04]"
                    >
                        <LogOut className="w-8 h-8" />
                        Logout
                    </button>

                    <div className="mt-auto pb-10 flex items-center gap-3 pt-12">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-xs text-white/30 font-mono uppercase tracking-[0.2em]">System Protocol Active</span>
                    </div>
                </div>
            </div>

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

                    {/* Stats Box */}
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
                    <div className="space-y-2 flex-1">
                        <h2 className="text-2xl font-light">Database</h2>
                        <p className="text-white/40 text-sm max-w-md">
                            Manage and monitor all participant entries.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4 w-full md:w-auto">
                        <button
                            onClick={() => setShowGenderStats(true)}
                            className="group relative overflow-hidden bg-white/[0.03] border border-white/[0.08] px-6 py-3 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                            <Users className="w-5 h-5" />
                            <span className="text-sm font-medium">Gender Stats</span>
                        </button>
                        
                        <button
                            onClick={() => setShowYearStats(true)}
                            className="group relative overflow-hidden bg-white/[0.03] border border-white/[0.08] px-6 py-3 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                            <ClipboardList className="w-5 h-5" />
                            <span className="text-sm font-medium">Year Stats</span>
                        </button>
                        
                        <button
                            onClick={handleExportCSV}
                            className="group relative overflow-hidden bg-white/[0.03] border border-white/[0.08] px-6 py-3 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                            <span className="text-sm font-medium">Export CSV</span>
                            <span className="text-xs text-white/40 font-mono">({filteredUsers.length})</span>
                        </button>

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
                </div>

                {/* Desktop Table View - Hidden on Mobile */}
                <div className="hidden md:block overflow-x-auto">
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
                                        <div className="text-white/30 text-xs font-mono mt-1">{user.gender} • {user.year}</div>
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

                {/* Mobile Card View - Visible on Mobile Only */}
                <div className="md:hidden space-y-4">
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="bg-white/[0.03] border border-white/[0.08] p-6 hover:bg-white/[0.05] transition-all">
                            {/* Header with ID and Controls */}
                            <div className="flex justify-between items-start mb-4 pb-4 border-b border-white/[0.08]">
                                <span className="font-mono text-white/40 text-xs">#{user.id.toString().padStart(3, '0')}</span>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setEditingUser(user)}
                                        className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-wider"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => confirmDelete(user.id)}
                                        className="text-xs text-red-500/60 hover:text-red-500 transition-colors uppercase tracking-wider"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* Participant Info */}
                            <h3 className="text-xl font-medium text-white mb-4">{user.name}</h3>
                            
                            {/* Details Grid */}
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between py-2 border-b border-white/[0.04]">
                                    <span className="text-white/40 uppercase text-xs tracking-wider">Email</span>
                                    <span className="text-white/80 text-right break-all pl-4">{user.email}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/[0.04]">
                                    <span className="text-white/40 uppercase text-xs tracking-wider">Phone</span>
                                    <span className="text-white/80 font-mono">{user.phone}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/[0.04]">
                                    <span className="text-white/40 uppercase text-xs tracking-wider">Roll No</span>
                                    <span className="text-white/80 font-mono">{user.roll_number}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/[0.04]">
                                    <span className="text-white/40 uppercase text-xs tracking-wider">Branch</span>
                                    <span className="text-white/80 text-right pl-4">{user.branch}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/[0.04]">
                                    <span className="text-white/40 uppercase text-xs tracking-wider">Gender</span>
                                    <span className="text-white/80">{user.gender}</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-white/40 uppercase text-xs tracking-wider">Year</span>
                                    <span className="text-white/80">{user.year}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredUsers.length === 0 && (
                        <div className="py-32 text-center">
                            <p className="text-white/20 text-lg font-light">No records found matching your search.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Premium Edit Modal */}
            {editingUser && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="w-full max-w-xl bg-[#090909] border border-white/[0.08] p-6 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-8 md:mb-12">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-2">Edit Details</h3>
                                <p className="text-white/40 text-xs md:text-sm font-mono">ID: {editingUser.id}</p>
                            </div>
                            <button onClick={() => setEditingUser(null)} className="text-white/40 hover:text-white transition-colors text-3xl leading-none px-2">
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-6 md:space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <div className="space-y-3">
                                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40">Gender</label>
                                    <select
                                        value={editingUser.gender}
                                        onChange={(e) => setEditingUser({ ...editingUser, gender: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white transition-colors text-lg"
                                    >
                                        <option value="" className="bg-[#090909]">Select Gender</option>
                                        <option value="Male" className="bg-[#090909]">Male</option>
                                        <option value="Female" className="bg-[#090909]">Female</option>
                                        <option value="Other" className="bg-[#090909]">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40">Year</label>
                                    <select
                                        value={editingUser.year}
                                        onChange={(e) => setEditingUser({ ...editingUser, year: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white transition-colors text-lg"
                                    >
                                        <option value="" className="bg-[#090909]">Select Year</option>
                                        <option value="1st" className="bg-[#090909]">1st Year</option>
                                        <option value="2nd" className="bg-[#090909]">2nd Year</option>
                                        <option value="3rd" className="bg-[#090909]">3rd Year</option>
                                        <option value="4th" className="bg-[#090909]">4th Year</option>
                                    </select>
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

            {/* Gender Statistics Modal */}
            {showGenderStats && (() => {
                const maleCount = users.filter(u => u.gender === 'Male').length;
                const femaleCount = users.filter(u => u.gender === 'Female').length;
                const otherCount = users.filter(u => u.gender === 'Other').length;
                const totalCount = users.length;
                
                return (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
                        <div className="w-full max-w-2xl bg-[#090909] border border-white/[0.08] p-6 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-start mb-8 md:mb-12">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-2">Gender Statistics</h3>
                                    <p className="text-white/40 text-xs md:text-sm font-mono">Distribution Overview</p>
                                </div>
                                <button onClick={() => setShowGenderStats(false)} className="text-white/40 hover:text-white transition-colors text-3xl leading-none px-2">
                                    &times;
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Total Count */}
                                <div className="bg-white/[0.03] border border-white/[0.08] p-6 hover:bg-white/[0.05] transition-all">
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/60 text-sm uppercase tracking-wider">Total Registrations</span>
                                        <span className="text-4xl font-bold text-white">{totalCount}</span>
                                    </div>
                                </div>

                                {/* Male Count */}
                                <div className="bg-white/[0.03] border border-white/[0.08] p-5 hover:bg-white/[0.05] transition-all">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-white/60 text-xs uppercase tracking-wider font-mono">Male</span>
                                        <span className="text-3xl font-bold text-white">{maleCount}</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-3">
                                        <div 
                                            className="h-full bg-white transition-all duration-500" 
                                            style={{ width: `${totalCount > 0 ? (maleCount / totalCount) * 100 : 0}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-white/40 font-mono">
                                            {totalCount > 0 ? ((maleCount / totalCount) * 100).toFixed(1) : 0}%
                                        </span>
                                        <button
                                            onClick={() => {
                                                setGenderFilter('Male');
                                                setShowGenderStats(false);
                                            }}
                                            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-xs uppercase tracking-wider transition-all duration-300"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>

                                {/* Female Count */}
                                <div className="bg-white/[0.03] border border-white/[0.08] p-5 hover:bg-white/[0.05] transition-all">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-white/60 text-xs uppercase tracking-wider font-mono">Female</span>
                                        <span className="text-3xl font-bold text-white">{femaleCount}</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-3">
                                        <div 
                                            className="h-full bg-white transition-all duration-500" 
                                            style={{ width: `${totalCount > 0 ? (femaleCount / totalCount) * 100 : 0}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-white/40 font-mono">
                                            {totalCount > 0 ? ((femaleCount / totalCount) * 100).toFixed(1) : 0}%
                                        </span>
                                        <button
                                            onClick={() => {
                                                setGenderFilter('Female');
                                                setShowGenderStats(false);
                                            }}
                                            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-xs uppercase tracking-wider transition-all duration-300"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>

                                {/* Other Count */}
                                <div className="bg-white/[0.03] border border-white/[0.08] p-5 hover:bg-white/[0.05] transition-all">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-white/60 text-xs uppercase tracking-wider font-mono">Other</span>
                                        <span className="text-3xl font-bold text-white">{otherCount}</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-3">
                                        <div 
                                            className="h-full bg-white transition-all duration-500" 
                                            style={{ width: `${totalCount > 0 ? (otherCount / totalCount) * 100 : 0}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-white/40 font-mono">
                                            {totalCount > 0 ? ((otherCount / totalCount) * 100).toFixed(1) : 0}%
                                        </span>
                                        <button
                                            onClick={() => {
                                                setGenderFilter('Other');
                                                setShowGenderStats(false);
                                            }}
                                            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-xs uppercase tracking-wider transition-all duration-300"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-8 pt-6 border-t border-white/[0.08]">
                                <button
                                    onClick={() => setShowGenderStats(false)}
                                    className="px-8 py-3 bg-white text-black text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Year Statistics Modal */}
            {showYearStats && (() => {
                const firstYearCount = users.filter(u => u.year === '1st' || u.year === '1st Year').length;
                const secondYearCount = users.filter(u => u.year === '2nd' || u.year === '2nd Year').length;
                const thirdYearCount = users.filter(u => u.year === '3rd' || u.year === '3rd Year').length;
                const fourthYearCount = users.filter(u => u.year === '4th' || u.year === '4th Year').length;
                const totalCount = users.length;
                
                return (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
                        <div className="w-full max-w-2xl bg-[#090909] border border-white/[0.08] p-6 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-start mb-8 md:mb-12">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-2">Year-wise Statistics</h3>
                                    <p className="text-white/40 text-xs md:text-sm font-mono">Academic Year Distribution</p>
                                </div>
                                <button onClick={() => setShowYearStats(false)} className="text-white/40 hover:text-white transition-colors text-3xl leading-none px-2">
                                    &times;
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Total Count */}
                                <div className="bg-white/[0.03] border border-white/[0.08] p-6 hover:bg-white/[0.05] transition-all">
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/60 text-sm uppercase tracking-wider">Total Registrations</span>
                                        <span className="text-4xl font-bold text-white">{totalCount}</span>
                                    </div>
                                </div>

                                {/* 1st Year */}
                                <div className="bg-white/[0.03] border border-white/[0.08] p-5 hover:bg-white/[0.05] transition-all">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-white/60 text-xs uppercase tracking-wider font-mono">1st Year</span>
                                        <span className="text-3xl font-bold text-white">{firstYearCount}</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-3">
                                        <div 
                                            className="h-full bg-white transition-all duration-500" 
                                            style={{ width: `${totalCount > 0 ? (firstYearCount / totalCount) * 100 : 0}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-white/40 font-mono">
                                            {totalCount > 0 ? ((firstYearCount / totalCount) * 100).toFixed(1) : 0}%
                                        </span>
                                        <button
                                            onClick={() => {
                                                setYearFilter('1st');
                                                setShowYearStats(false);
                                            }}
                                            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-xs uppercase tracking-wider transition-all duration-300"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>

                                {/* 2nd Year */}
                                <div className="bg-white/[0.03] border border-white/[0.08] p-5 hover:bg-white/[0.05] transition-all">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-white/60 text-xs uppercase tracking-wider font-mono">2nd Year</span>
                                        <span className="text-3xl font-bold text-white">{secondYearCount}</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-3">
                                        <div 
                                            className="h-full bg-white transition-all duration-500" 
                                            style={{ width: `${totalCount > 0 ? (secondYearCount / totalCount) * 100 : 0}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-white/40 font-mono">
                                            {totalCount > 0 ? ((secondYearCount / totalCount) * 100).toFixed(1) : 0}%
                                        </span>
                                        <button
                                            onClick={() => {
                                                setYearFilter('2nd');
                                                setShowYearStats(false);
                                            }}
                                            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-xs uppercase tracking-wider transition-all duration-300"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>

                                {/* 3rd Year */}
                                <div className="bg-white/[0.03] border border-white/[0.08] p-5 hover:bg-white/[0.05] transition-all">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-white/60 text-xs uppercase tracking-wider font-mono">3rd Year</span>
                                        <span className="text-3xl font-bold text-white">{thirdYearCount}</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-3">
                                        <div 
                                            className="h-full bg-white transition-all duration-500" 
                                            style={{ width: `${totalCount > 0 ? (thirdYearCount / totalCount) * 100 : 0}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-white/40 font-mono">
                                            {totalCount > 0 ? ((thirdYearCount / totalCount) * 100).toFixed(1) : 0}%
                                        </span>
                                        <button
                                            onClick={() => {
                                                setYearFilter('3rd');
                                                setShowYearStats(false);
                                            }}
                                            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-xs uppercase tracking-wider transition-all duration-300"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>

                                {/* 4th Year */}
                                <div className="bg-white/[0.03] border border-white/[0.08] p-5 hover:bg-white/[0.05] transition-all">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-white/60 text-xs uppercase tracking-wider font-mono">4th Year</span>
                                        <span className="text-3xl font-bold text-white">{fourthYearCount}</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-3">
                                        <div 
                                            className="h-full bg-white transition-all duration-500" 
                                            style={{ width: `${totalCount > 0 ? (fourthYearCount / totalCount) * 100 : 0}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-white/40 font-mono">
                                            {totalCount > 0 ? ((fourthYearCount / totalCount) * 100).toFixed(1) : 0}%
                                        </span>
                                        <button
                                            onClick={() => {
                                                setYearFilter('4th');
                                                setShowYearStats(false);
                                            }}
                                            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-xs uppercase tracking-wider transition-all duration-300"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-8 pt-6 border-t border-white/[0.08]">
                                <button
                                    onClick={() => setShowYearStats(false)}
                                    className="px-8 py-3 bg-white text-black text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Gender Filter Details Modal */}
            {genderFilter && (() => {
                const filteredByGender = users.filter(u => u.gender === genderFilter);
                
                // Apply search filter
                const searchFilteredUsers = filteredByGender.filter(user => {
                    const searchLower = genderFilterSearch.toLowerCase();
                    return user.name.toLowerCase().includes(searchLower) ||
                           user.email.toLowerCase().includes(searchLower) ||
                           user.phone.includes(searchLower) ||
                           user.roll_number.toLowerCase().includes(searchLower);
                });
                
                return (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
                        <div className="w-full max-w-4xl bg-[#090909] border border-white/[0.08] shadow-2xl max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="sticky top-0 bg-[#090909] border-b border-white/[0.08] p-6 md:p-8 z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-2">{genderFilter} Participants</h3>
                                        <p className="text-white/40 text-xs md:text-sm font-mono">{searchFilteredUsers.length} {searchFilteredUsers.length === 1 ? 'Registration' : 'Registrations'}</p>
                                    </div>
                                    <button onClick={() => { setGenderFilter(null); setGenderFilterSearch(''); }} className="text-white/40 hover:text-white transition-colors text-3xl leading-none px-2">
                                        &times;
                                    </button>
                                </div>
                                {/* Search Input */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, phone, or roll number..."
                                        value={genderFilterSearch}
                                        onChange={(e) => setGenderFilterSearch(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors text-sm"
                                    />
                                    {genderFilterSearch && (
                                        <button
                                            onClick={() => setGenderFilterSearch('')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* User List */}
                            <div className="p-6 md:p-8 space-y-3">
                                {searchFilteredUsers.length > 0 ? (
                                    searchFilteredUsers.map((user, index) => (
                                        <div key={user.id} className="bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] p-5 transition-all duration-300 group">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className="text-xs font-mono text-white/30">#{user.id.toString().padStart(3, '0')}</span>
                                                        <div className="h-3 w-px bg-white/10"></div>
                                                        <h4 className="text-lg font-medium text-white group-hover:text-white/80 transition-colors">{user.name}</h4>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white/40 text-xs uppercase tracking-wider">Email:</span>
                                                            <span className="text-white/70">{user.email}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white/40 text-xs uppercase tracking-wider">Phone:</span>
                                                            <span className="text-white/70 font-mono">{user.phone}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white/40 text-xs uppercase tracking-wider">Roll:</span>
                                                            <span className="text-white/70 font-mono">{user.roll_number}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white/40 text-xs uppercase tracking-wider">Year:</span>
                                                            <span className="text-white/70">{user.year}</span>
                                                        </div>
                                                        <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                                                            <span className="text-white/40 text-xs uppercase tracking-wider">Branch:</span>
                                                            <span className="text-white/70 text-xs">{user.branch}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Action Buttons */}
                                                <div className="flex flex-col gap-2 mt-4 md:mt-0">
                                                    <button
                                                        onClick={() => setEditingUser(user)}
                                                        className="p-2 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/60 hover:text-white transition-all duration-300 group/btn"
                                                        title="Edit User"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeletingUserId(user.id)}
                                                        className="p-2 border border-red-500/20 hover:border-red-500/40 hover:bg-red-500/10 text-red-500/60 hover:text-red-500 transition-all duration-300 group/btn"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-20 text-center">
                                        <p className="text-white/20 text-lg font-light">
                                            {genderFilterSearch ? 'No participants match your search.' : 'No participants found in this category.'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="sticky bottom-0 bg-[#090909] border-t border-white/[0.08] p-6 md:p-8">
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => { setGenderFilter(null); setGenderFilterSearch(''); setShowGenderStats(true); }}
                                        className="px-8 py-3 bg-white text-black text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors"
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Year Filter Details Modal */}
            {yearFilter && (() => {
                const filteredByYear = users.filter(u => u.year === yearFilter || u.year === `${yearFilter} Year`);
                
                // Apply search filter
                const searchFilteredUsers = filteredByYear.filter(user => {
                    const searchLower = yearFilterSearch.toLowerCase();
                    return user.name.toLowerCase().includes(searchLower) ||
                           user.email.toLowerCase().includes(searchLower) ||
                           user.phone.includes(searchLower) ||
                           user.roll_number.toLowerCase().includes(searchLower);
                });
                
                return (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
                        <div className="w-full max-w-4xl bg-[#090909] border border-white/[0.08] shadow-2xl max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="sticky top-0 bg-[#090909] border-b border-white/[0.08] p-6 md:p-8 z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-2">{yearFilter} Year Participants</h3>
                                        <p className="text-white/40 text-xs md:text-sm font-mono">{searchFilteredUsers.length} {searchFilteredUsers.length === 1 ? 'Registration' : 'Registrations'}</p>
                                    </div>
                                    <button onClick={() => { setYearFilter(null); setYearFilterSearch(''); }} className="text-white/40 hover:text-white transition-colors text-3xl leading-none px-2">
                                        &times;
                                    </button>
                                </div>
                                {/* Search Input */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, phone, or roll number..."
                                        value={yearFilterSearch}
                                        onChange={(e) => setYearFilterSearch(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors text-sm"
                                    />
                                    {yearFilterSearch && (
                                        <button
                                            onClick={() => setYearFilterSearch('')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* User List */}
                            <div className="p-6 md:p-8 space-y-3">
                                {searchFilteredUsers.length > 0 ? (
                                    searchFilteredUsers.map((user, index) => (
                                        <div key={user.id} className="bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] p-5 transition-all duration-300 group">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className="text-xs font-mono text-white/30">#{user.id.toString().padStart(3, '0')}</span>
                                                        <div className="h-3 w-px bg-white/10"></div>
                                                        <h4 className="text-lg font-medium text-white group-hover:text-white/80 transition-colors">{user.name}</h4>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white/40 text-xs uppercase tracking-wider">Email:</span>
                                                            <span className="text-white/70">{user.email}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white/40 text-xs uppercase tracking-wider">Phone:</span>
                                                            <span className="text-white/70 font-mono">{user.phone}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white/40 text-xs uppercase tracking-wider">Roll:</span>
                                                            <span className="text-white/70 font-mono">{user.roll_number}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white/40 text-xs uppercase tracking-wider">Gender:</span>
                                                            <span className="text-white/70">{user.gender}</span>
                                                        </div>
                                                        <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                                                            <span className="text-white/40 text-xs uppercase tracking-wider">Branch:</span>
                                                            <span className="text-white/70 text-xs">{user.branch}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Action Buttons */}
                                                <div className="flex flex-col gap-2 mt-4 md:mt-0">
                                                    <button
                                                        onClick={() => setEditingUser(user)}
                                                        className="p-2 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/60 hover:text-white transition-all duration-300 group/btn"
                                                        title="Edit User"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeletingUserId(user.id)}
                                                        className="p-2 border border-red-500/20 hover:border-red-500/40 hover:bg-red-500/10 text-red-500/60 hover:text-red-500 transition-all duration-300 group/btn"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-20 text-center">
                                        <p className="text-white/20 text-lg font-light">
                                            {yearFilterSearch ? 'No participants match your search.' : 'No participants found in this category.'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="sticky bottom-0 bg-[#090909] border-t border-white/[0.08] p-6 md:p-8">
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => { setYearFilter(null); setYearFilterSearch(''); setShowYearStats(true); }}
                                        className="px-8 py-3 bg-white text-black text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors"
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Minimalist Delete Modal */}
            {deletingUserId && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-sm bg-[#090909] border border-white/[0.1] p-8 md:p-10 text-center">
                        <div className="w-2 h-2 bg-red-500 mx-auto mb-6 rounded-full"></div>
                        <h3 className="text-xl font-light text-white mb-2">Delete Record?</h3>
                        <p className="text-white/40 text-sm mb-8">This action cannot be undone.</p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setDeletingUserId(null)}
                                className="flex-1 md:flex-none px-6 py-2 border border-white/10 text-sm hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 md:flex-none px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm transition-colors"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}
