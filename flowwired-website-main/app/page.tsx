export default function Home() {
  return (
    <main className="text-white bg-[#020817]">
      {/* HERO SECTION */}
      <section className="text-center py-32 px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Scalable <span className="text-indigo-400">AI Agent Flows</span> for Modern Businesses
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
          I design intelligent AI agent systems powered by n8n, OpenAI, and API integrations — automating
          communication, decision-making, and operations at scale. From processing inputs to executing
          complex business workflows, my agents handle it all.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/templates"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Explore AI Agent Packs
          </a>
          <a
            href="/custom"
            className="border border-indigo-500 px-6 py-3 rounded-lg text-white hover:bg-indigo-500/10 transition"
          >
            Request a Custom Flow
          </a>
        </div>
      </section>

      {/* WHAT I BUILD */}
      <section className="py-20 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10 text-indigo-400">
          AI Agents That Think, Act, and Scale
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-[#0B1120] p-6 rounded-xl border border-gray-800 hover:border-indigo-600 transition">
            <h3 className="text-xl font-semibold mb-3">Voice & Text Understanding</h3>
            <p className="text-gray-400">
            My AI agents understand any form of input — voice messages, text, PDFs, images, screenshots, spreadsheets, or emails.
            They extract intent, analyze context, summarize key points, detect sentiment, and respond automatically through email, chat, or APIs.
            Your business gets a digital assistant that listens, reads, and understands just like a human — but works 24/7.            </p>
          </div>

          <div className="bg-[#0B1120] p-6 rounded-xl border border-gray-800 hover:border-indigo-600 transition">
            <h3 className="text-xl font-semibold mb-3">Autonomous Decision Chains</h3>
            <p className="text-gray-400">
            Advanced multi-agent systems that analyze data, make decisions, and perform actions across your business without human supervision.
            From evaluating customer messages to choosing the correct workflow, generating content, updating databases, and triggering follow-up actions —
            your automations become fully autonomous instead of just reactive.

            These AI chains scale your operations and replace entire layers of repetitive work.            </p>
          </div>

          <div className="bg-[#0B1120] p-6 rounded-xl border border-gray-800 hover:border-indigo-600 transition">
            <h3 className="text-xl font-semibold mb-3">Cross-Platform Integrations</h3>
            <p className="text-gray-400">
            I connect AI agents to any tool your business uses — Notion, Slack, Gmail, Microsoft 365, CRMs, ERPs, WhatsApp, APIs, databases, and more.
            Your systems communicate with each other automatically, keeping information synced, updated, and routed correctly across your entire stack.

            The result is a unified, automated ecosystem that operates reliably 24/7 without manual intervention.            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 border-t border-gray-800 bg-[#0B1120]">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl font-semibold mb-12 text-indigo-400">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            {[
              {
                step: "1. Design",
                desc: "We define your automation goal and choose the right agents for the job (e.g. communicator, analyzer, executor).",
              },
              {
                step: "2. Build & Integrate",
                desc: "I develop your n8n-based agent flow, connect APIs, and test real-world cases with actual business data.",
              },
              {
                step: "3. Deploy & Scale",
                desc: "Your system runs on autopilot — and scales with your workload. Add more agents or upgrade as you grow.",
              },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-[#111827] rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold mb-2 text-indigo-300">{item.step}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">Let’s Build Your AI Agent System</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Whether you need a single automation or a full multi-agent architecture, I’ll help you design,
          build, and scale AI flows that transform how your business works.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/templates"
            className="bg-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            View Templates
          </a>
          <a
            href="/contact"
            className="border border-indigo-500 px-6 py-3 rounded-lg text-white hover:bg-indigo-500/10 transition"
          >
            Contact Me
          </a>
        </div>
      </section>
    </main>
  );
}
