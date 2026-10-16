"use client";

import { useState } from "react";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  const links = [
    { label: "Share on X", text: "X", href: "https://x.com/intent/post?text=" + enc(title) + "&url=" + enc(url) },
    {
      label: "Share on LinkedIn",
      text: "LinkedIn",
      href: "https://www.linkedin.com/sharing/share-offsite/?url=" + enc(url),
    },
    {
      label: "Share on WhatsApp",
      text: "WhatsApp",
      href: "https://wa.me/?text=" + enc(title + " " + url),
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="kicker mr-1">share</span>
      {links.map((l) => (
        <a
          key={l.text}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label + " (opens in a new tab)"}
          className="btn btn-outline px-3.5 py-1.5 text-xs"
        >
          {l.text}
        </a>
      ))}
      <button type="button" onClick={copy} className="btn btn-outline px-3.5 py-1.5 text-xs">
        {copied ? "Link copied" : "Copy link"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
