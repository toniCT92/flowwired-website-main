"use client";

import { useAuth } from "@/lib/auth-client";

export default function LogoutButton() {
    const { setUser } = useAuth();

    async function logout() {
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        setUser(null);
    }

    return (
        <button
            onClick={logout}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition text-white"
        >
            Sign Out
        </button>
    );
}
