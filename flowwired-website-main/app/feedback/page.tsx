"use client";

import { useEffect, useState } from "react";

type FeedbackItem = {
    id: string;
    name: string | null;
    email: string | null;
    message: string;
    createdAt: string;
};

export default function FeedbackPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [items, setItems] = useState<FeedbackItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function load() {
        setLoading(true);
        try {
            const res = await fetch("/api/feedback", { cache: "no-store" });
            const data = await res.json();
            setItems(data.feedback ?? []);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError(data?.error ?? "Failed to submit feedback");
                return;
            }

            setMessage("");

            setItems((prev) => [data.feedback, ...prev]);
        } catch {
            setError("Network error");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Feedback</h1>

            <form onSubmit={submit} className="bg-[#0B1120] border border-gray-800 rounded-xl p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        className="p-3 rounded-md bg-gray-900 border border-gray-700 outline-none focus:border-indigo-500"
                        placeholder="Name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="p-3 rounded-md bg-gray-900 border border-gray-700 outline-none focus:border-indigo-500"
                        placeholder="Email (optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <textarea
                    className="w-full min-h-[120px] p-3 rounded-md bg-gray-900 border border-gray-700 outline-none focus:border-indigo-500"
                    placeholder="Your feedback..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                {error && (
                    <div className="text-sm text-red-300 border border-red-900/60 bg-red-950/30 rounded-md p-3">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 transition"
                >
                    {submitting ? "Sending..." : "Submit"}
                </button>
            </form>

            <h2 className="text-xl font-semibold mt-10 mb-4">Recent feedback</h2>

            {loading ? (
                <p className="text-gray-400">Loading...</p>
            ) : items.length === 0 ? (
                <p className="text-gray-400">No feedback yet.</p>
            ) : (
                <ul className="space-y-3">
                    {items.map((f) => (
                        <li key={f.id} className="bg-[#0B1120] border border-gray-800 rounded-xl p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="text-sm text-gray-300">
                                    <span className="font-semibold text-white">{f.name ?? "Anonymous"}</span>
                                    {f.email ? <span className="text-gray-400"> · {f.email}</span> : null}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {new Date(f.createdAt).toLocaleString()}
                                </div>
                            </div>
                            <p className="mt-2 text-gray-200 whitespace-pre-wrap">{f.message}</p>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
