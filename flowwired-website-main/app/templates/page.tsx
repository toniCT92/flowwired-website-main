export default function TemplatesPage() {
    const packs = [
        {
            name: "Starter Pack",
            desc: "A ready-to-import n8n AI agent flow designed for simple communication or data tasks. Perfect for testing automation potential.",
            includes: [
                "n8n automation flow (.json)",
                "Basic import & setup guide",
                "Pre-configured single-agent logic",
            ],
            price: "€99",
            highlight: "For businesses starting with AI",
        },
        {
            name: "Pro Pack",
            desc: "A complete multi-agent setup for handling communication, analysis, and execution tasks. Includes documentation and integration support.",
            includes: [
                "Everything in Starter Pack",
                "Full documentation + API config guide",
                "Integrations with Gmail, Notion, Slack & CRMs",
            ],
            price: "€249",
            highlight: "Most popular for teams",
        },
        {
            name: "Enterprise System",
            desc: "A custom-built multi-agent architecture designed around your operations. Includes live setup session and scalability roadmap.",
            includes: [
                "Everything in Pro Pack",
                "Custom agent logic tailored to your company",
                "90-minute live build & deployment consultation",
                "Long-term scaling support",
            ],
            price: "€699+",
            highlight: "Custom-built for your business",
        },
    ];

    return (
        <main className="max-w-6xl mx-auto py-24 px-6 text-white">
            {/* Page Header */}
            <h1 className="text-4xl font-bold text-indigo-400 mb-4 text-center">
                AI Agent Systems — Scalable Automation Packs
            </h1>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
                Choose from prebuilt or custom AI agent systems that automate your
                communication, decision-making, and workflow execution. Scalable,
                modular, and ready to grow with your business.
            </p>

            {/* Pack Grid */}
            <div className="grid md:grid-cols-3 gap-8">
                {packs.map((p, i) => (
                    <div
                        key={i}
                        className="bg-[#0B1120] border border-gray-800 p-8 rounded-2xl hover:border-indigo-600 transition flex flex-col"
                    >
                        <h2 className="text-2xl font-semibold mb-2">{p.name}</h2>
                        <p className="text-gray-400 mb-4">{p.desc}</p>
                        <ul className="text-gray-300 text-sm mb-6 space-y-2 list-disc pl-4">
                            {p.includes.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <div className="mt-auto">
                            <p className="text-green-400 font-semibold mb-2">{p.price}</p>
                            <p className="text-indigo-400 text-xs mb-4">{p.highlight}</p>
                            <a
                                href={`/checkout?pack=${encodeURIComponent(p.name)}`}
                                className="block text-center bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                            >
                                Get This System
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            

            <div className="text-center mt-8">
                <p className="text-gray-500 text-sm">
                    Not sure which pack fits your needs?{" "}
                    <a
                        href="/contact"
                        className="text-indigo-400 hover:underline hover:text-indigo-300"
                    >
                        Contact me
                    </a>{" "}
                    and I’ll guide you.
                </p>
            </div>

        </main>
    );
}
