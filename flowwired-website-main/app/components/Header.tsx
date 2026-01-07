"use client";

import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import LogoutButton from "@/components/LogoutButton";

export default function Header() {
    const { user, loading } = useAuth();

    if (loading) return null;

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#0B1120]">
            <Link href="/" className="font-bold text-lg">
                Flowwired
            </Link>

            {user ? (
                <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">
            {user.name ?? user.email}
          </span>
                    <LogoutButton />
                </div>
            ) : (
                <Link
                    href="/login"
                    className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition"
                >
                    Sign In
                </Link>
            )}
        </header>
    );
}
