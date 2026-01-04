'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
            <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-indigo-500" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                    ContentPilot
                </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                <Link href="#about" className="hover:text-white transition-colors">About</Link>
            </div>

            <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Log in
                </Link>
                <Link href="/generate">
                    <Button variant="premium" size="sm">
                        Get Started
                    </Button>
                </Link>
            </div>
        </nav>
    );
}
