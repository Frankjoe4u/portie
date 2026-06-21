"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

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

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.title ||
      !formData.message
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setStatus("loading");

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
      setStatus("success");
      setFormData({ name: "", email: "", title: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-6"
      style={{
        background: "linear-gradient(180deg, #0d0020 0%, #1a003e 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Contact <span className="text-yellow-400">Me</span>
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Have a project in mind or want to work together? Feel free to reach
            out and I will get back to you as soon as possible.
          </p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-6 rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Contact Info */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div
                className="p-3 rounded-xl text-yellow-400 shrink-0"
                style={{ background: "rgba(124, 58, 237, 0.2)" }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Email</h4>
                <p className="text-gray-400 text-sm">frankjoe4u@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="p-3 rounded-xl text-yellow-400 shrink-0"
                style={{ background: "rgba(124, 58, 237, 0.2)" }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Location</h4>
                <p className="text-gray-400 text-sm">Enugu, Nigeria</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="p-3 rounded-xl text-yellow-400 shrink-0"
                style={{ background: "rgba(124, 58, 237, 0.2)" }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">GitHub</h4>
                <p className="text-gray-400 text-sm">github.com/Frankjoe4u</p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div
            className="flex-1 rounded-2xl p-8 border border-purple-800"
            style={{ background: "rgba(124, 58, 237, 0.08)" }}
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-gray-300 text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-transparent border border-purple-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-gray-300 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="bg-transparent border border-purple-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-300 text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Project subject"
                  className="bg-transparent border border-purple-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-300 text-sm font-medium">
                  Message
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="bg-transparent border border-purple-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                />
              </div>

              {status === "success" && (
                <p className="text-green-400 text-sm text-center">
                  Message sent successfully! I will get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm text-center">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="w-full bg-yellow-400 text-black font-bold py-3 rounded-full uppercase tracking-widest text-sm hover:bg-yellow-300 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
