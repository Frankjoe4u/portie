"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { budgetRanges, projectTypes, site, socials } from "@/data/site";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Watermark from "@/components/Watermark";
import SocialIcons from "./SocialIcons";

const SERVICE_ID = "service_ftquwmc";
const TEMPLATE_ID = "template_ydsdd9y";
const PUBLIC_KEY = "0_gOH9rbgzXR9IE98";

type Fields = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  company: string; // honeypot, must stay empty
};

type Errors = Partial<Record<"name" | "email" | "projectType" | "message", string>>;
type Status = "idle" | "loading" | "success" | "error" | "offline";

const emptyForm: Fields = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
  company: "",
};

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-(--cyan) focus:outline-none focus:ring-2 focus:ring-(--cyan)/25 transition-colors aria-[invalid=true]:border-red-500";

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = "Please enter a valid email address.";
  if (!f.projectType) e.projectType = "Please choose a project type.";
  if (f.message.trim().length < 20)
    e.message = "Please tell me a little more (at least 20 characters).";
  return e;
}

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-red-500">
      {text}
    </p>
  );
}

export default function Contact() {
  const [form, setForm] = useState<Fields>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status === "error" || status === "offline") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    // Bots fill the hidden field. Pretend success and send nothing.
    if (form.company) {
      setStatus("success");
      return;
    }

    const found = validate(form);
    setErrors(found);
    const firstInvalid = (["name", "email", "projectType", "message"] as const).find(
      (k) => found[k],
    );
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>("[name=" + firstInvalid + "]")?.focus();
      return;
    }

    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      setStatus("offline");
      return;
    }

    setStatus("loading");
    try {
      const details =
        "Project type: " +
        form.projectType +
        "\nBudget: " +
        (form.budget || "Not specified") +
        "\n\n" +
        form.message.trim();

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          title: form.projectType + " enquiry",
          message: details,
        },
        PUBLIC_KEY,
      );
      setStatus("success");
      setForm(emptyForm);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  const linkedin = socials.find((s) => s.label === "LinkedIn");
  const github = socials.find((s) => s.label === "GitHub");
  const x = socials.find((s) => s.label === "X");

  const details = [
    { label: "Email", value: site.email, href: "mailto:" + site.email, icon: "mail" },
    { label: "Location", value: "Nigeria \u00b7 Available remotely", href: undefined, icon: "pin" },
  ];

  return (
    <section id="contact" className="hero-glow relative overflow-hidden border-t border-line bg-bg py-16 md:py-24">
      <Watermark src="/pix2.jpg" position="50% 25%" fade="right" className="inset-y-0 left-0 hidden w-[38%] lg:block" />
      <div className="container-x relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-14">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-4xl">
            Have a project in mind? Let&apos;s build it.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
            Whether you need a SaaS platform, business management system, dashboard, API or
            custom web application, let&apos;s discuss your requirements.
          </p>

          <ul className="mt-8 space-y-4">
            {details.map((d) => (
              <li key={d.label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-(--cyan)">
                  <Icon name={d.icon} className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-ink">{d.label}</p>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="break-all text-sm text-muted transition-colors hover:text-ink"
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

          <p className="mt-6 text-sm text-muted">
            Prefer another channel? Find me on{" "}
            {linkedin && (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-(--cyan)"
              >
                LinkedIn
              </a>
            )}
            ,{" "}
            {github && (
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-(--cyan)"
              >
                GitHub
              </a>
            )}{" "}
            or{" "}
            {x && (
              <a
                href={x.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-(--cyan)"
              >
                X
              </a>
            )}
            .
          </p>

          <div className="mt-6">
            <SocialIcons />
          </div>
        </Reveal>

        <Reveal delay={100}>
          {status === "success" ? (
            <div
              role="status"
              className="rounded-2xl border border-line bg-card p-8 text-center shadow-xl md:p-10"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                <Icon name="check" className="h-6 w-6" strokeWidth={2.6} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">Message sent</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
                Thanks for reaching out. I&apos;ll read your message and reply by email soon.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="btn btn-outline mt-6 px-5 py-2.5 text-xs"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
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
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "err-name" : undefined}
                    className={inputClass}
                  />
                  <FieldError id="err-name" text={errors.name} />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-ink">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "err-email" : undefined}
                    className={inputClass}
                  />
                  <FieldError id="err-email" text={errors.email} />
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-type" className="mb-1.5 block text-xs font-semibold text-ink">
                    Project type
                  </label>
                  <select
                    id="contact-type"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    aria-invalid={!!errors.projectType}
                    aria-describedby={errors.projectType ? "err-type" : undefined}
                    className={inputClass}
                  >
                    <option value="">Select a type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <FieldError id="err-type" text={errors.projectType} />
                </div>
                <div>
                  <label htmlFor="contact-budget" className="mb-1.5 block text-xs font-semibold text-ink">
                    Budget range <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <select
                    id="contact-budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Prefer not to say</option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-ink">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, who it's for and what it needs to do."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "err-message" : undefined}
                  className={inputClass + " resize-none"}
                />
                <FieldError id="err-message" text={errors.message} />
              </div>

              {/* Honeypot: hidden from people and assistive tech */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>

              <div aria-live="polite" className="mt-4 min-h-5 text-center text-sm">
                {status === "error" && (
                  <p className="text-red-500">
                    Something went wrong sending your message. Please try again, or email me at{" "}
                    <a href={"mailto:" + site.email} className="underline">
                      {site.email}
                    </a>
                    .
                  </p>
                )}
                {status === "offline" && (
                  <p className="text-red-500">
                    You appear to be offline. Check your connection and try again.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Sending..." : "Start a Conversation"}
                <Icon name="arrow" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
