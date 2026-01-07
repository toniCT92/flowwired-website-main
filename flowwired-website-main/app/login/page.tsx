"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useAuth } from "@/lib/auth-client";

export default function LoginModal() {
    const router = useRouter();
    const [mode, setMode] = useState<"login" | "signup">("login");

    const closeModal = () => router.back();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* DARK BACKDROP */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={closeModal}
            />

            {/* MODAL CARD */}
            <div className="relative w-full max-w-md mx-auto bg-[#0B1120] p-8 rounded-xl border border-gray-800 shadow-xl animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute right-4 top-4 text-gray-400 hover:text-white text-xl"
                    aria-label="Close"
                >
                    ×
                </button>

                {/* Tabs */}
                <div className="flex justify-center gap-6 mb-8 mt-2">
                    <button
                        onClick={() => setMode("login")}
                        className={`pb-2 text-lg ${
                            mode === "login"
                                ? "text-indigo-400 border-b-2 border-indigo-400"
                                : "text-gray-400"
                        }`}
                    >
                        Sign In
                    </button>

                    <button
                        onClick={() => setMode("signup")}
                        className={`pb-2 text-lg ${
                            mode === "signup"
                                ? "text-indigo-400 border-b-2 border-indigo-400"
                                : "text-gray-400"
                        }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* FORM */}
                <AuthForm mode={mode} onSuccess={closeModal} />
            </div>
        </div>
    );
}

function AuthForm({
                      mode,
                      onSuccess,
                  }: {
    mode: "login" | "signup";
    onSuccess: () => void;
}) {
    const router = useRouter();
    const { setUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // optional for signup
    const [confirm, setConfirm] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitLabel = useMemo(
        () => (mode === "login" ? "Sign In" : "Create Account"),
        [mode]
    );

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (mode === "signup") {
            if (password.length < 8) {
                setError("Password must be at least 8 characters.");
                return;
            }
            if (password !== confirm) {
                setError("Passwords do not match.");
                return;
            }
        }

        setLoading(true);
        try {
            const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
            const body =
                mode === "login"
                    ? { email, password }
                    : { email, password, name: name.trim() || undefined };

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(body),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError(data?.error ?? "Something went wrong.");
                return;
            }

            setUser(data.user);

            onSuccess();
            router.push("/");
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
                <input
                    type="text"
                    name="name"
                    placeholder="Name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 rounded-md bg-gray-900 border border-gray-700 outline-none focus:border-indigo-500"
                />
            )}

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded-md bg-gray-900 border border-gray-700 outline-none focus:border-indigo-500"
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 rounded-md bg-gray-900 border border-gray-700 outline-none focus:border-indigo-500"
                required
            />

            {mode === "signup" && (
                <input
                    type="password"
                    name="confirm"
                    placeholder="Confirm Password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="p-3 rounded-md bg-gray-900 border border-gray-700 outline-none focus:border-indigo-500"
                    required
                />
            )}

            {error && (
                <div className="text-sm text-red-300 border border-red-900/60 bg-red-950/30 rounded-md p-3">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:hover:bg-indigo-600 w-full py-3 rounded-md font-semibold transition"
            >
                {loading ? "Please wait..." : submitLabel}
            </button>
        </form>
    );
}
