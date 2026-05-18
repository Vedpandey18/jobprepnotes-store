"use client";

import { useState, type FormEvent } from "react";

const SUPPORT_EMAIL = "support@jobprepnotes.com";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sentHint, setSentHint] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[JobPrepNotes] Message from ${name || "visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${name || "(not provided)"}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    setSentHint(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5 rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700/80 dark:bg-slate-900/60"
    >
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-violet-500/30 placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Email <span className="text-rose-600 dark:text-rose-400">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-violet-500/30 placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Message <span className="text-rose-600 dark:text-rose-400">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-violet-500/30 placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
          placeholder="How can we help?"
        />
      </div>
      <button type="submit" className="btn-primary w-full px-6 py-3 text-center sm:w-auto">
        Open email to send
      </button>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        This opens your email app with your message pre-filled. If nothing opens, write to us
        directly at{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-violet-600 hover:underline dark:text-violet-400">
          {SUPPORT_EMAIL}
        </a>
        .
      </p>
      {sentHint ? (
        <p className="text-sm text-emerald-700 dark:text-emerald-400" role="status">
          If your mail client opened, send the message to complete your request.
        </p>
      ) : null}
    </form>
  );
}
