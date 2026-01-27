'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface SearchableSelectProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    searchable?: boolean;
}

export default function SearchableSelect({ options, value, onChange, placeholder = "Select option", className = "", searchable = true }: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`relative ${className}`} ref={wrapperRef}>
            <div
                className="w-full px-4 py-3 sm:px-5 sm:py-4 pr-14 sm:pr-16 bg-black/60 border border-white/10 text-white cursor-pointer flex items-center justify-between focus:border-red-500 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={value ? "text-white" : "text-white/30 truncate pr-2"}>
                    {value || placeholder}
                </span>
                <ChevronDown className={`w-5 h-5 text-white/50 transition-transform shrink-0 absolute right-4 sm:right-5 ${isOpen ? 'rotate-180' : ''}`} />
            </div>


            {isOpen && (
                <div className="absolute z-300 w-full mt-1 bg-[#0B0B0E] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] max-h-60 overflow-hidden flex flex-col">
                    {searchable && (
                        <div className="p-2 border-b border-white/10 sticky top-0 bg-[#0B0B0E] z-10">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40" />
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded py-2 pl-8 pr-3 text-sm text-white focus:outline-none focus:border-red-500/50 placeholder-white/20"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    autoFocus
                                />
                            </div>
                        </div>
                    )}
                    <div className="overflow-y-auto flex-1 custom-scrollbar">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option}
                                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors border-b border-white/5 last:border-0 ${value === option ? 'bg-red-600/20 text-red-500' : 'text-white/80 hover:bg-white/5 hover:text-white'}`}
                                    onClick={() => {
                                        onChange(option);
                                        setIsOpen(false);
                                        setSearchTerm("");
                                    }}
                                >
                                    {option}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-4 text-sm text-white/40 text-center italic">
                                No branches found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
