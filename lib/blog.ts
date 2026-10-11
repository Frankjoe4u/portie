// Helpers shared by the blog article page and the markdown renderer.

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function stripInlineMarkdown(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

export type Heading = { id: string; text: string };

// Returns unique ids so duplicate headings still get distinct anchors.
export function uniqueId(base: string, seen: Map<string, number>) {
  const root = base || "section";
  const count = seen.get(root) ?? 0;
  seen.set(root, count + 1);
  return count === 0 ? root : root + "-" + count;
}

export function extractHeadings(markdown: string): Heading[] {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, "");
  const seen = new Map<string, number>();
  const headings: Heading[] = [];
  const re = /^#{1,2}\s+(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = re.exec(withoutCode)) !== null) {
    const text = stripInlineMarkdown(match[1]);
    headings.push({ id: uniqueId(slugifyHeading(text), seen), text });
  }
  return headings;
}

export function readingTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return minutes + " min read";
}
