import Link from "next/link";
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db/mongoose";
import { BlogPost } from "@/models/BlogPost";

async function getPost(slug: string) {
  await dbConnect();
  const post = await BlogPost.findOne({ slug, published: true }).lean();
  return post;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} Frank Joe`,
    description: post.excerpt,
  };
}

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith("```")) {
      const lang = line.trim().replace("```", "").trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div
          key={i}
          className="relative my-6 rounded-xl overflow-hidden border border-purple-800/40"
        >
          {lang && (
            <div
              className="flex items-center gap-2 px-4 py-2 border-b border-purple-800/40"
              style={{ background: "rgba(124,58,237,0.15)" }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              <span className="ml-2 text-xs text-gray-500 font-mono">
                {lang}
              </span>
            </div>
          )}
          <pre
            className="p-5 overflow-x-auto text-sm font-mono leading-relaxed text-gray-300"
            style={{ background: "rgba(13,0,32,0.8)" }}
          >
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>,
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-2xl font-extrabold text-white mt-12 mb-4 leading-snug"
        >
          {line.replace("## ", "")}
        </h2>,
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-bold text-yellow-400 mt-8 mb-3">
          {line.replace("### ", "")}
        </h3>,
      );
      i++;
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, pi) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={pi} className="text-yellow-400 font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      const codeParts = part.split(/(`[^`]+`)/g);
      return codeParts.map((cp, ci) => {
        if (cp.startsWith("`") && cp.endsWith("`")) {
          return (
            <code
              key={ci}
              className="text-yellow-300 bg-purple-900/40 px-1.5 py-0.5 rounded text-sm font-mono"
            >
              {cp.slice(1, -1)}
            </code>
          );
        }
        return cp;
      });
    });

    elements.push(
      <p key={i} className="text-gray-400 text-base leading-relaxed mb-4">
        {rendered}
      </p>,
    );
    i++;
  }

  return elements;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main
      className="min-h-screen px-6 py-24"
      style={{
        background: "linear-gradient(180deg, #0d0020 0%, #1a003e 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto mb-10">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-yellow-400 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              d="M19 12H5M12 5l-7 7 7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Blog
        </Link>
      </div>

      <article className="max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full border"
            style={{
              color: post.tagColor,
              borderColor: `${post.tagColor}55`,
              background: `${post.tagColor}10`,
            }}
          >
            {post.tag}
          </span>
          <span className="text-gray-500 text-xs">{post.date}</span>
          <span className="text-gray-500 text-xs">.</span>
          <span className="text-gray-500 text-xs">{post.readTime}</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
          {post.title}
        </h1>

        <p
          className="text-lg leading-relaxed mb-10 pb-10 border-b border-purple-800/30 font-medium"
          style={{ color: post.tagColor }}
        >
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 mb-12">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400/40 shrink-0">
            <img
              src="/pix1.jpg"
              alt="Frank Joe"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white text-sm font-bold">Franklin Emeka Agbo</p>
            <p className="text-gray-500 text-xs">
              Full Stack Developer Nigeria
            </p>
          </div>
        </div>

        <div
          className="w-full h-px mb-12"
          style={{
            background: `linear-gradient(90deg, ${post.tagColor}44, transparent)`,
          }}
        />

        <div className="prose-custom">{renderContent(post.content)}</div>

        <div className="mt-16 pt-10 border-t border-purple-800/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-sm mb-1">
              Enjoyed this article?
            </p>
            <p className="text-gray-500 text-sm">
              More posts on the way. Follow along on GitHub.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/#blog"
              className="text-sm font-bold text-gray-400 border border-purple-800/40 hover:border-yellow-400/50 hover:text-yellow-400 px-4 py-2 rounded-full transition-all duration-200"
            >
              All Posts
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-bold text-black bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded-full transition-all duration-200"
            >
              Let's Build
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
