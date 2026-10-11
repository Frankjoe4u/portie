"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={dir === "left" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
    </svg>
  );
}

export default function Gallery({ images, name }: { images: GalleryImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const startX = useRef<number | null>(null);
  const count = images.length;

  const go = useCallback(
    (delta: number) => setActive((i) => (i + delta + count) % count),
    [count],
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    const trigger = triggerRef.current;
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open, go]);

  if (count === 0) return null;
  const current = images[active];

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50 && count > 1) go(dx < 0 ? 1 : -1);
  };

  return (
    <div>
      {/* Preview */}
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          aria-label={"Open " + current.title + " fullscreen"}
          className="group relative block aspect-video w-full touch-pan-y overflow-hidden rounded-2xl border border-line bg-surface"
        >
          <Image
            src={current.src}
            alt={name + ": " + current.title}
            fill
            priority={active === 0}
            sizes="(min-width: 1024px) 760px, 100vw"
            className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </button>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous screenshot"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-card/90 text-ink backdrop-blur transition-colors hover:border-(--cyan)"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next screenshot"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-card/90 text-ink backdrop-blur transition-colors hover:border-(--cyan)"
            >
              <Chevron dir="right" />
            </button>
          </>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-4" aria-live="polite">
        <div>
          <p className="text-sm font-semibold text-ink">{current.title}</p>
          <p className="text-xs text-muted">{current.caption}</p>
        </div>
        <p className="kicker shrink-0">
          {active + 1} / {count}
        </p>
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <ul className="snap-row -mx-5 mt-4 flex gap-2.5 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0" aria-label="Screenshots">
          {images.map((img, i) => (
            <li key={img.src} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={"Show " + img.title}
                aria-current={i === active}
                className={cn(
                  "relative block h-16 w-28 overflow-hidden rounded-lg border bg-surface transition-all duration-200 sm:h-[4.5rem] sm:w-32",
                  i === active ? "border-(--cyan) opacity-100" : "border-line opacity-70 hover:opacity-100",
                )}
              >
                <Image src={img.src} alt="" fill sizes="128px" className="object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={name + " screenshots"}
          className="fixed inset-0 z-[70] flex flex-col bg-black/90 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center justify-between p-4 text-white" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-semibold">
              {current.title} <span className="ml-2 font-normal text-white/60">{active + 1} / {count}</span>
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close fullscreen"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-xl leading-none hover:bg-white/10"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div
            className="relative min-h-0 flex-1 touch-pan-y"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <Image
              src={current.src}
              alt={name + ": " + current.title}
              fill
              sizes="100vw"
              className="select-none object-contain"
              draggable={false}
            />
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white hover:bg-white/15 sm:flex"
                >
                  <Chevron dir="left" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white hover:bg-white/15 sm:flex"
                >
                  <Chevron dir="right" />
                </button>
              </>
            )}
          </div>

          <p className="p-4 text-center text-xs text-white/70" onClick={(e) => e.stopPropagation()}>
            {current.caption}
            {count > 1 && <span className="sm:hidden"> &middot; Swipe to browse</span>}
          </p>
        </div>
      )}
    </div>
  );
}
