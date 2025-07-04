import React, { useState } from "react";

export default function ContactPage({ onClose }) {
  const isModal = typeof onClose === "function";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      const apiBase = process.env.REACT_APP_API_BASE_URL || "";
      const res = await fetch(`${apiBase}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Message sent!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus(data.error || "❌ Failed to send");
      }
    } catch {
      setStatus("❌ Network error");
    }
  };

  return (
    <div className={
      isModal
        ? "fixed inset-0 z-50 flex items-center justify-center bg-[#ededed]"
        : "min-h-screen flex items-center justify-center bg-[black] px-4 py-12"
    }>
      <div className="flex w-full max-w-5xl h-[80vh] bg-white rounded-lg shadow-2xl overflow-hidden relative">
        <div className="hidden md:flex flex-1 items-center justify-center bg-[black]">
          <img
            src="/contact.jpg"
            alt="Contact Visual"
            className="object-cover rounded-xl shadow-2xl w-[380px] h-[550px]"
            style={{ background: "#ededed" }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-10 bg-white relative">
          {isModal && (
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-black text-2xl focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
          )}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-8" style={{ fontFamily: "Oswald, sans-serif" }}>
            Let's get in touch
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border border-gray-200 px-4 py-3 text-lg bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-black"
              required
              maxLength={100}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-gray-200 px-4 py-3 text-lg bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-black"
              required
              maxLength={100}
            />
            <textarea
              placeholder="What's your goal?"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-md border border-gray-200 px-4 py-3 text-lg bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-black resize-none"
              required
              maxLength={1000}
            />
            <button
              type="submit"
              className="mt-2 bg-black text-white rounded-full px-8 py-3 text-lg font-medium shadow hover:bg-gray-900 transition"
            >
              Send message
            </button>
            {status && <div className="mt-2 text-sm">{status}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
