"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const selectedPack = searchParams.get("pack");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedPack) {
      setMessage(`I'm interested in the ${selectedPack}.`);
    }
  }, [selectedPack]);

  return (
    <main className="max-w-3xl mx-auto py-24 px-6 text-white">
      <h1 className="text-4xl font-bold text-indigo-400 mb-4">Let’s Automate Your Business</h1>
      <p className="text-gray-400 mb-10">
        Whether you’re ready to build a custom AI agent system or want to ask about one of my automation packs,
        fill out this form and I’ll get back to you personally by email within 24 hours.
      </p>

      <form
  onSubmit={async (e) => {
    e.preventDefault();

    const form = e.currentTarget; 
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        alert(" Message sent successfully! I'll reply soon.");
        form.reset(); 
      } else {
        alert(" Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert(" Network error. Please try again later.");
    }
  }}
  className="bg-[#0B1120] border border-gray-800 p-8 rounded-2xl flex flex-col gap-5"
>


        <label className="flex flex-col text-left">
          <span className="mb-1 text-gray-300">Full Name</span>
          <input
            type="text"
            name="name"
            required
            className="p-3 rounded bg-[#111827] border border-gray-700 focus:border-indigo-500 outline-none"
          />
        </label>

        <label className="flex flex-col text-left">
          <span className="mb-1 text-gray-300">Email Address</span>
          <input
            type="email"
            name="email"
            required
            className="p-3 rounded bg-[#111827] border border-gray-700 focus:border-indigo-500 outline-none"
          />
        </label>

        <label className="flex flex-col text-left">
          <span className="mb-1 text-gray-300">Message</span>
          <textarea
            name="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-3 rounded bg-[#111827] border border-gray-700 focus:border-indigo-500 outline-none"
          />
        </label>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-lg"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
