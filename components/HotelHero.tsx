"use client";

import { useEffect, useState } from "react";

// Responsive hotel photos: phone, tablet and desktop crops are swapped by the
// browser with <picture>, so nobody downloads more than they need.
const slides = [
  { id: "hero-1", alt: "5G Hotel Nsukka exterior at dusk, lit up in warm evening light", tablet: true },
  { id: "hero-2", alt: "Guest lounge and bar area inside 5G Hotel Nsukka", tablet: true },
  { id: "hero-3", alt: "Marble bar counter and shelving at 5G Hotel Nsukka", tablet: true },
];

const INTERVAL = 5500;

export default function HotelHero({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className={"group relative overflow-hidden bg-surface " + className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <picture key={s.id}>
          <source media="(max-width: 639px)" srcSet={"/5g-hotel/" + s.id + "-mobile.jpg"} />
          <source media="(max-width: 1023px)" srcSet={"/5g-hotel/" + s.id + "-tablet.jpg"} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={"/5g-hotel/" + s.id + "-desktop.jpg"}
            alt={s.alt}
            loading={priority && i === 0 ? "eager" : "lazy"}
            decoding="async"
            aria-hidden={i !== active}
            className={
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 " +
              (i === active ? "opacity-100" : "opacity-0")
            }
          />
        </picture>
      ))}

      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/10"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={"Show photo " + (i + 1)}
            aria-current={i === active}
            className={
              "h-2 rounded-full transition-all duration-300 " +
              (i === active ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80")
            }
          />
        ))}
      </div>
    </div>
  );
}
