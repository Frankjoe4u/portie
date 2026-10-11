"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import SocialIcons from "./SocialIcons";

const SERVICE_ID = "service_ftquwmc";
const TEMPLATE_ID = "template_ydsdd9y";
const PUBLIC_KEY = "0_gOH9rbgzXR9IE98";

interface FormData {
  name: string;
  email: string;
  title: string;
  message: string;
  [key: string]: string;
}

type Status = "idle" | "loading" | "success" | "error";

const emptyForm: FormData = { name: "", email: "", title: "", message: "" };

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors";

const details = [
  {
    label: "Email",
    value: "frankjoe4u@gmail.com",
    href: "mailto:frankjoe4u@gmail.com",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  {
    label: "Location",
    value: "Enugu, Nigeria",
    href: undefined,
    icon: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/Frankjoe4u",
    href: "https://github.com/Frankjoe4u",
    icon: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
  },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "success" || status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
      setStatus("success");
      setFormData(emptyForm);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="hero-glow scroll-mt-16 border-t border-line bg-bg py-16 md:py-24"
    >
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-14">
        {/* Left: intro + details */}
        <div>
          <p className="eyebrow">Get In Touch</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-4xl">
            Let&apos;s Build Something Great
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            Have a project in mind, a question or just want to say hi? I&apos;d
            love to hear from you.
          </p>

          <ul className="mt-8 space-y-4">
            {details.map((d) => (
              <li key={d.label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {d.icon}
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold text-ink">{d.label}</p>
                  {d.href ? (
                    <a
                      href={d.href}
                      target={d.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm text-muted transition-colors hover:text-brand"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted">{d.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold text-ink">Follow Me</p>
            <SocialIcons />
          </div>
        </div>

        {/* Right: form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-line bg-card p-6 shadow-xl md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-ink">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-ink">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="contact-title" className="mb-1.5 block text-xs font-semibold text-ink">
              Subject
            </label>
            <input
              id="contact-title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Project subject"
              className={inputClass}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-ink">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              className={inputClass + " resize-none"}
            />
          </div>

          <div aria-live="polite" className="mt-4 min-h-5 text-center text-sm">
            {status === "success" && (
              <p className="text-emerald-500">
                Message sent successfully! I will get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500">
                Something went wrong. Please try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
