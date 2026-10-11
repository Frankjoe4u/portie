"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const portraits = [
  { src: "/pix1.jpg", alt: "Frank Joe coding at his desk", position: "50% 30%" },
  { src: "/pix2.jpg", alt: "Portrait of Frank Joe", position: "50% 22%" },
  { src: "/dp.jpg", alt: "Frank Joe in a red sweater", position: "50% 20%" },
];

const INTERVAL = 6000;

export default function HeroPortraits() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % portraits.length),
      INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {portraits.map((p, i) => (
        <Image
          key={p.src}
          src={p.src}
          alt={p.alt}
          fill
          priority={i === 0}
          sizes="(min-width: 1024px) 464px, (min-width: 640px) 400px, 272px"
          style={{ objectPosition: p.position }}
          className={
            "object-cover contrast-[1.08] saturate-[1.12] transition-opacity duration-1000 " +
            (i === active ? "opacity-100" : "opacity-0")
          }
          aria-hidden={i !== active}
        />
      ))}

      <div className="absolute inset-x-0 bottom-[9%] z-10 flex justify-center gap-2">
        {portraits.map((p, i) => (
          <button
            key={p.src}
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
