"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-client";

const PACKS: Record<string, any> = {
    "Starter Pack": {
        price: "€99",
        description:
            "A ready-to-import n8n AI agent flow designed for simple communication or data tasks.",
        includes: [
            "n8n automation flow (.json)",
            "Basic import & setup guide",
            "Pre-configured single-agent logic",
        ],
    },
    "Pro Pack": {
        price: "€249",
        description:
            "A complete multi-agent setup for communication, analysis, and execution tasks.",
        includes: [
            "Everything in Starter Pack",
            "Full documentation + API config guide",
            "Integrations with Gmail, Notion, Slack & CRMs",
        ],
    },
    "Enterprise System": {
        price: "€699+",
        description:
            "A custom-built multi-agent architecture designed around your operations.",
        includes: [
            "Everything in Pro Pack",
            "Custom agent logic tailored to your company",
            "90-minute live build & deployment consultation",
            "Long-term scaling support",
        ],
    },
};

export default function CheckoutPage() {
    const params = useSearchParams();
    const router = useRouter();
    const { user, loading } = useAuth();

    const packName = params.get("pack");
    const pack = packName ? PACKS[packName] : null;

    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        company: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
        cardName: "",
    });

    const update = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    async function completePurchase() {
        if (!packName) return;

        setSubmitting(true);
        try {
            const res = await fetch("/api/templates/purchase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ pack: packName }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                alert(data?.error ?? "Something went wrong.");
                return;
            }

            alert(
                `You purchased pack "${packName}". You'll be contacted in maximum 24–48hrs after the purchase was completed.`
            );

            router.push("/templates");
        } catch {
            alert("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    if (loading || !user) return null;

    return (
        <div className="min-h-screen bg-[#020817] text-white pt-24 px-6">
            {!pack ? (
                <div className="text-center text-gray-300">
                    <h2 className="text-3xl font-bold mb-4">No Pack Selected</h2>
                    <p>Please return to Templates and choose a system.</p>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-2">
                        Checkout — {packName}
                    </h1>
                    <p className="text-gray-400 text-center mb-8">
                        {pack.description}
                    </p>

                    <div className="bg-[#0B1120] border border-gray-800 rounded-lg p-6 mb-10">
                        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
                        <p className="text-gray-300 mb-2">
                            <strong>{packName}</strong>
                        </p>
                        <p className="text-indigo-400 text-2xl font-bold">
                            {pack.price}
                        </p>
                    </div>

                    <div className="bg-[#0B1120] border border-gray-800 rounded-lg p-6 mb-10">
                        <h2 className="text-xl font-semibold mb-4">
                            Customer Information
                        </h2>

                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full mb-4 p-3 rounded bg-gray-900 border border-gray-700"
                            onChange={(e) => update("fullName", e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full mb-4 p-3 rounded bg-gray-900 border border-gray-700"
                            onChange={(e) => update("email", e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Company (optional)"
                            className="w-full mb-2 p-3 rounded bg-gray-900 border border-gray-700"
                            onChange={(e) => update("company", e.target.value)}
                        />
                    </div>

                    <div className="bg-[#0B1120] border border-gray-800 rounded-lg p-6 mb-10">
                        <h2 className="text-xl font-semibold mb-4">
                            Payment Information
                        </h2>

                        <input
                            type="text"
                            placeholder="Card Number"
                            //disabled
                            className="w-full mb-4 p-3 rounded bg-gray-900 border border-gray-700 opacity-60"
                        />

                        <div className="flex gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="MM/YY"
                                //disabled
                                className="w-1/2 p-3 rounded bg-gray-900 border border-gray-700 opacity-60"
                            />
                            <input
                                type="text"
                                placeholder="CVC"
                                //disabled
                                className="w-1/2 p-3 rounded bg-gray-900 border border-gray-700 opacity-60"
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Name on Card"
                            //disabled
                            className="w-full p-3 rounded bg-gray-900 border border-gray-700 opacity-60"
                        />
                    </div>

                    <button
                        disabled={submitting}
                        onClick={completePurchase}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-3 rounded-lg font-semibold transition mb-4"
                    >
                        {submitting ? "Processing..." : "Complete Purchase"}
                    </button>

                    <a
                        href="/contact"
                        className="block text-center text-indigo-400 hover:text-indigo-300 underline mt-4"
                    >
                        Need help? Contact me before purchasing
                    </a>
                </div>
            )}
        </div>
    );
}
