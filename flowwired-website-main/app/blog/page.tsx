export default function BlogPage() {
  const posts = [
    {
      title: "How AI Agents Revolutionize Business Operations",
      date: "Nov 2025",
      excerpt: "Discover how n8n + AI workflows can reduce your manual workload by 80%.",
      slug: "ai-agents",
    },
    {
      title: "Top 5 Automation Flows Every Company Needs",
      date: "Oct 2025",
      excerpt: "From email handling to task syncing — these flows pay for themselves in weeks.",
      slug: "top-automation-flows",
    },
  ];


  return (
    <main className="max-w-4xl mx-auto py-24 px-6 text-white">
      <h1 className="text-4xl font-bold text-indigo-400 mb-8 text-center">Flowwired Blog</h1>
      <div className="space-y-10">
        {posts.map((post, i) => (
          <div key={i} className="bg-[#0B1120] p-6 border border-gray-800 rounded-xl hover:border-indigo-600 transition">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
            <p className="text-gray-300 mb-4">{post.excerpt}</p>
            <a
              href={`/blog/${post.slug}`}
              className="text-indigo-400 hover:underline"
            >
              Read More →
            </a>

          </div>
        ))}
      </div>
    </main>
  );
}
