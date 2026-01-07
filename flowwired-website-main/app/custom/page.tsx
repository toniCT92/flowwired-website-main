"use client";
import { useState } from "react";

export default function CustomPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    useCase: "",
    budget: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert(" Request sent successfully! I’ll reply within 24 hours.");
        setFormData({ name: "", email: "", company: "", useCase: "", budget: "" });
      } else {
        alert(" Something went wrong. Please try again later.");
      }
    } catch (err) {
      alert(" Network error. Please try again.");
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-24 px-6 text-white">
      <h1 className="text-4xl font-bold text-indigo-400 mb-4 text-center">
        Request a Custom AI Automation Build
      </h1>
      <p className="text-gray-400 text-center mb-10">
        Need a tailored AI agent architecture for your business?  
        Describe your use case below — you’ll receive a quote within 24 hours.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-[#0B1120] border border-gray-800 p-8 rounded-2xl flex flex-col gap-5"
      >
        <label className="flex flex-col">
          <span className="text-gray-300 mb-1">Full Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 rounded bg-[#111827] border border-gray-700 focus:border-indigo-500 outline-none"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-gray-300 mb-1">Email Address</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded bg-[#111827] border border-gray-700 focus:border-indigo-500 outline-none"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-gray-300 mb-1">Company / Brand (optional)</span>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company name"
            className="p-3 rounded bg-[#111827] border border-gray-700 focus:border-indigo-500 outline-none"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-gray-300 mb-1">Describe Your Use Case</span>
          <textarea
            name="useCase"
            value={formData.useCase}
            onChange={handleChange}
            rows={5}
            required
            placeholder="Example: AI email agent that converts voice notes into customer replies."
            className="p-3 rounded bg-[#111827] border border-gray-700 focus:border-indigo-500 outline-none"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-gray-300 mb-1">Estimated Budget (optional)</span>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g. $500–$2000"
            className="p-3 rounded bg-[#111827] border border-gray-700 focus:border-indigo-500 outline-none"
          />
        </label>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-lg"
        >
          Send Request
        </button>
      </form>
    </main>
  );
}
