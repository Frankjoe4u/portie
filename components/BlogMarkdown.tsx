import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { slugifyHeading, uniqueId } from "@/lib/blog";

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement(node)) return nodeText((node.props as { children?: ReactNode }).children);
  return "";
}

const baseComponents: Components = {
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 text-xl font-bold text-brand">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-base leading-relaxed text-muted">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-ink">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => {
    const external = !!href && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="font-medium text-brand underline underline-offset-4 transition-opacity hover:opacity-80"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-muted marker:text-brand">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-muted marker:font-semibold marker:text-brand">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-brand bg-brand-soft py-2 pl-5 pr-4 italic text-muted">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-line" />,
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      className="my-6 w-full rounded-xl border border-line"
    />
  ),
  code: ({ className, children }) => (
    <code
      className={
        "rounded bg-brand-soft px-1.5 py-0.5 font-mono text-[0.85em] text-ink " +
        (className ?? "")
      }
    >
      {children}
    </code>
  ),
  pre: ({ children }) => {
    const first = Children.toArray(children)[0];
    let lang = "";
    if (isValidElement(first)) {
      const cls = (first.props as { className?: string }).className ?? "";
      const match = /language-(\S+)/.exec(cls);
      if (match) lang = match[1];
    }

    return (
      <div className="my-6 overflow-hidden rounded-xl border border-line bg-[#0a1128]">
        {lang && (
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-2 font-mono text-xs text-slate-400">{lang}</span>
          </div>
        )}
        <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-slate-200 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[13px] [&_code]:text-slate-200">
          {children}
        </pre>
      </div>
    );
  },
};

export default function BlogMarkdown({ content }: { content: string }) {
  // Fresh counter per render so duplicate headings get unique anchors that
  // match the table of contents.
  const seen = new Map<string, number>();
  const heading = (children: ReactNode) => {
    const id = uniqueId(slugifyHeading(nodeText(children)), seen);
    return (
      <h2
        id={id}
        className="mb-4 mt-12 scroll-mt-24 text-2xl font-extrabold leading-snug text-ink"
      >
        {children}
      </h2>
    );
  };

  const components: Components = {
    ...baseComponents,
    h1: ({ children }) => heading(children),
    h2: ({ children }) => heading(children),
  };

  return (
    <ReactMarkdown
      components={components}
      rehypePlugins={[[rehypeHighlight, { detect: false, ignoreMissing: true }]]}
    >
      {content.trim()}
    </ReactMarkdown>
  );
}
