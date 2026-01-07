"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-client";
import LogoutButton from "./LogoutButton";
import Image from "next/image";


export default function Navbar() {
    const { user, loading } = useAuth();

    if (loading) return null;

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#020817]/80 backdrop-blur-md border-b border-gray-800 z-50">
            <div className="w-full flex items-center justify-between p-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/flowwired_logo_nobg.png"
                        alt="Flowwired Logo"
                        width={28}
                        height={28}
                        priority
                    />
                    <span className="text-xl font-bold text-white">
                        Flowwired
                    </span>
                </Link>


                {/* Nav links */}
                <div className="flex gap-6 items-center text-gray-300">
                    <Link href="/templates">Templates</Link>
                    <Link href="/custom">Custom</Link>
                    <Link href="/about">About</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/feedback">Feedback</Link>
                    <Link href="/contact">Contact</Link>

                    {/* Auth UI */}
                    {user ? (
                        <div className="flex items-center gap-4 ml-2">
                            <span className="text-sm text-gray-400">
                                {user.name ?? user.email}
                            </span>
                            <LogoutButton />
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="px-4 py-2 rounded-md border border-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
