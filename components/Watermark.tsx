import Image from "next/image";

// Large, faint photo used as a background watermark. Decorative only.
export default function Watermark({
  src,
  className = "",
  position = "50% 20%",
  fade = "left",
}: {
  src: string;
  className?: string;
  position?: string;
  fade?: "left" | "right";
}) {
  const dir = fade === "left" ? "to left" : "to right";
  const mask = "linear-gradient(" + dir + ", #000 25%, transparent 95%)";
  return (
    <div
      aria-hidden="true"
      className={"pointer-events-none absolute select-none overflow-hidden " + className}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1024px) 520px, 80vw"
        style={{ objectPosition: position }}
        className="object-cover opacity-[0.10] grayscale contrast-125 dark:opacity-[0.14]"
      />
    </div>
  );
}
