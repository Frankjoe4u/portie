export type BlogPost = {
  slug: string;
  tag: string;
  tagColor: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  content: string;
};

export const posts: BlogPost[] = [
  {
    slug: "coverflow-3d",
    tag: "CSS / Animation",
    tagColor: "#facc15",
    date: "Apr 2026",
    readTime: "5 min read",
    title: "How I Built a 3D Coverflow Carousel in React",
    excerpt:
      "Breaking down rotateY, translateZ and perspective — the three CSS properties that make a flat list of cards feel like a physical object you can hold.",
    content: `
## The Problem With Normal Carousels

Most carousels are just a row of cards that slide left or right. They work, but they feel flat and boring. I wanted something that felt physical — like flipping through actual cards on a table. That is what the 3D coverflow effect does, and once you understand three CSS properties, it is surprisingly simple to build.

## The Three Properties That Make It Work

Everything in a 3D coverflow comes down to three CSS properties working together.

**perspective** tells the browser how far away the "eye" is from the screen. Think of it like setting up a camera. A small value like 400px makes the 3D effect very dramatic and distorted. A value like 1000px gives a more subtle, natural depth. I used 1000px on my portfolio.

\`\`\`tsx
<div style={{ perspective: "1000px" }}>
  {/* cards go here */}
</div>
\`\`\`

**transformStyle: "preserve-3d"** tells the browser that the children of this element should live in the same 3D space as their parent. Without this, all your 3D transforms get flattened and look wrong.

\`\`\`tsx
<div style={{ transformStyle: "preserve-3d" }}>
  {/* cards now share 3D space */}
</div>
\`\`\`

**transform** is where the magic actually happens. Each card gets three transforms applied at once: translateX (move left or right), translateZ (push toward or away from the viewer), and rotateY (tilt on the vertical axis).

## Calculating Each Card's Position

Every card needs to know how far it is from the active (center) card. I call this the offset.

\`\`\`tsx
const offset = i - active;
const abs = Math.abs(offset);
\`\`\`

If active is 3 and we are rendering card 5, offset is 2. Card 2 gives offset -1. The active card itself has offset 0. Once I have offset, I use it to calculate everything else.

\`\`\`tsx
const getStyle = (i: number): React.CSSProperties => {
  const offset = i - active;
  const abs = Math.abs(offset);

  // Hide cards that are too far away
  if (abs > 2) {
    return { opacity: 0, pointerEvents: "none" };
  }

  const tx = offset * 200;    // move sideways
  const tz = -abs * 120;      // push behind
  const ry = offset * -35;    // tilt
  const scale = 1 - abs * 0.15;
  const opacity = 1 - abs * 0.3;

  return {
    transform: \`translateX(\${tx}px) translateZ(\${tz}px) rotateY(\${ry}deg) scale(\${scale})\`,
    opacity,
    zIndex: 10 - abs,
    filter: abs > 0 ? "brightness(0.5)" : "brightness(1)",
  };
};
\`\`\`

## Why Each Number Was Chosen

**offset * 200** — cards 200px apart gives enough breathing room without them overlapping too much. Increase this if your cards are wider.

**-abs * 120** — negative Z pushes cards behind the active card. The further a card is, the deeper it sits. This is what creates the depth illusion.

**offset * -35 degrees** — tilting 35 degrees on each side looks natural without being too aggressive. Anything above 50 starts to look broken.

**scale 0.15 per step** — each step away from center reduces size by 15%. This reinforces the depth even on screens that do not render shadows well.

## Tracking the Active Card

The whole thing is driven by a single piece of state.

\`\`\`tsx
const [active, setActive] = useState<number>(3);
\`\`\`

Clicking a card calls setActive with that card's index. The CSS transition does the rest — everything animates smoothly because each card's transform is recalculated and the browser interpolates between values.

## One Thing That Caught Me Off Guard

When you stack absolutely positioned elements inside a preserve-3d container, the zIndex alone does not always determine what appears on top in 3D space — the browser uses the actual Z depth. So I had to make sure cards further back also had a lower zIndex as a fallback, and I applied a brightness filter to dim them visually even when Z depth was subtle.

## Final Thought

The 3D coverflow is just math applied to CSS. Offset tells you the position, and from offset you derive every visual property. Once you see that pattern, you can build any card-based 3D layout you want.
    `,
  },
  {
    slug: "evecircles-pwa",
    tag: "Next.js / PWA",
    tagColor: "#a78bfa",
    date: "Mar 2026",
    readTime: "7 min read",
    title: "Converting a Vanilla JS App to a Next.js PWA",
    excerpt:
      "The exact steps I took to turn Eve Circles from a plain HTML/JS project into a fully installable Progressive Web App with offline support and Vercel Analytics.",
    content: `
## Where Eve Circles Started

Eve Circles began as a simple HTML, CSS and JavaScript menstrual cycle tracker. It worked, but it had real limitations — no component structure, no TypeScript, no offline support, and sharing it meant sending someone a raw file. I wanted it to feel like a real app people could install on their phones. So I converted it to Next.js and turned it into a Progressive Web App.

## Step 1 — Moving to Next.js

The first step was creating a fresh Next.js project and moving my logic over.

\`\`\`bash
npx create-next-app@latest evecircles --typescript --tailwind --app
\`\`\`

I broke my old single HTML file into proper components. The cycle tracker logic,
 the calendar view, the settings panel — each became its own component file. TypeScript forced me to be explicit about every data shape,
  which actually caught three bugs that had been silently living in the vanilla version.

The old vanilla JS had used global variables to track cycle dates.
In Next.js I replaced those with React state and localStorage persistence so data survives page refreshes.

\`\`\`tsx
const [cycleStart, setCycleStart] = useState<string>(() => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("cycleStart") ?? "";
});
\`\`\`

The typeof window check is important in Next.js because server components run on Node where window does not exist.

## Step 2 — Creating the Web App Manifest

A PWA needs a manifest.json that tells the browser how to present the app when installed.

\`\`\`json
{
  "name": "Eve Circles",
  "short_name": "Eve",
  "description": "A gentle menstrual cycle tracker",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0d0020",
  "theme_color": "#a78bfa",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
\`\`\`

I put this file in the public folder and linked it in my root layout.

\`\`\`tsx
// app/layout.tsx
export const metadata = {
  manifest: "/manifest.json",
};
\`\`\`

The icon sizes 192 and 512 are both required. Chrome will reject the install prompt if either is missing.

## Step 3 — The Service Worker

Service workers are what give a PWA its offline capability. Next.js does not include one by default so I wrote a minimal one manually and registered it in layout.tsx.

\`\`\`javascript
// public/sw.js
const CACHE = "eve-v1";
const ASSETS = ["/", "/manifest.json", "/icon-192.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached ?? fetch(e.request))
  );
});
\`\`\`

Then in my layout I registered it with a useEffect.

\`\`\`tsx
useEffect(() => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }
}, []);
\`\`\`

## Step 4 — Adding Vercel Analytics

This took literally two lines. Install the package, add the component.

\`\`\`bash
npm install @vercel/analytics
\`\`\`

\`\`\`tsx
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
\`\`\`

Now I can see real visitor data in the Vercel dashboard without any third-party cookies or GDPR headaches.

## Step 5 — Deploying to Vercel

\`\`\`bash
git init
git add .
git commit -m "initial commit"
gh repo create evecircles --public --push
\`\`\`

Then I connected the GitHub repo to Vercel through the dashboard. Every push to main auto-deploys. The whole process from repo creation to live URL took about four minutes.

## What I Learned

The biggest surprise was how much TypeScript helped during the migration. Rewriting my old JavaScript into typed components forced me to think clearly about data shapes I had been lazy about. The three bugs it caught would have shipped to production unnoticed in vanilla JS.

The other thing I learned is that the PWA install prompt does not appear automatically — the browser decides when to show it based on engagement signals. If you want to trigger it manually, you have to listen for the beforeinstallprompt event and store the event, then call event.prompt() when the user clicks your own install button.

Eve Circles is now live at evecircles.vercel.app — fully installable on Android and accessible as a web app on iOS.
    `,
  },
  {
    slug: "typescript-tips",
    tag: "TypeScript",
    tagColor: "#60a5fa",
    date: "Feb 2026",
    readTime: "4 min read",
    title: "5 TypeScript Patterns I Use in Every Next.js Project",
    excerpt:
      "From typed API responses to discriminated unions — practical patterns that actually save me time and catch bugs before they reach production.",
    content: `
## Why I Bothered Learning TypeScript Properly

I used TypeScript for months before I actually understood it. I was just adding : string and : number everywhere and wondering why people said it saved time. The shift happened when I started treating types as documentation — not just annotations, but actual contracts between parts of my code. These are the five patterns that changed how I write Next.js apps.

## Pattern 1 — Type Your Data at the Source

The most common TypeScript mistake I see is typing data too late — in the component that renders it rather than where it is created. I now define all my data types in a single types.ts file and import from there everywhere.

\`\`\`typescript
// types/index.ts
export type Project = {
  slug: string;
  title: string;
  tech: string[];
  live: string;
  github: string;
  color: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
};
\`\`\`

When I change a type here, TypeScript immediately shows me every component that breaks. No more hunting through files trying to find where a property is used.

## Pattern 2 — Type Your API Responses

Fetch calls return unknown data. Most developers cast it to any and move on, which defeats the point of TypeScript entirely. I use a small typed wrapper instead.

\`\`\`typescript
async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`Fetch failed: \${res.status}\`);
  return res.json() as Promise<T>;
}

// Usage
const post = await fetchJSON<BlogPost>(\`/api/posts/\${slug}\`);
// post is now fully typed — no any, no guessing
\`\`\`

This one function has saved me from at least a dozen runtime errors where the API returned a shape I was not expecting.

## Pattern 3 — Discriminated Unions for State

When a component has multiple states — loading, error, success — I used to manage them with three separate booleans: isLoading, isError, hasData. The problem is that nothing stops isLoading and isError from both being true at the same time, which makes no sense. Discriminated unions fix this.

\`\`\`typescript
type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: T };

const [state, setState] = useState<FetchState<BlogPost[]>>({ status: "idle" });

// In JSX
if (state.status === "loading") return <Spinner />;
if (state.status === "error") return <p>{state.message}</p>;
if (state.status === "success") return <PostList posts={state.data} />;
\`\`\`

TypeScript knows that inside the success branch, state.data exists. Inside the error branch, state.message exists. You get full autocomplete and zero runtime surprises.

## Pattern 4 — const as const for Static Arrays

When I define static data like nav links or service cards, TypeScript widens the types by default. The string "About" becomes type string, which means I lose the specific literal type.

\`\`\`typescript
// Without as const — TypeScript sees string[]
const links = ["Home", "About", "Projects"];

// With as const — TypeScript sees readonly ["Home", "About", "Projects"]
const links = ["Home", "About", "Projects"] as const;

type NavLink = typeof links[number]; // "Home" | "About" | "Projects"
\`\`\`

This matters when I want to enforce that only valid nav links can be passed as props, not any arbitrary string.

## Pattern 5 — React.ComponentProps for Extending Native Elements

When I build wrapper components around native HTML elements, I want them to accept all the normal HTML attributes plus my own custom props. ComponentProps makes this clean.

\`\`\`typescript
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "outline";
  loading?: boolean;
};

export function Button({ variant = "primary", loading, children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className={\`rounded-full font-bold \${variant === "outline" ? "border border-yellow-400 text-yellow-400" : "bg-yellow-400 text-black"}\`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
\`\`\`

The ...rest spread passes through onClick, aria-label, type, and every other native button attribute automatically. No need to manually list them.

## The Honest Summary

TypeScript does not make you write less code. It makes you write more intentional code. The types you write upfront pay for themselves the first time you refactor something and TypeScript catches every broken consumer before you even run the app.
    `,
  },
  {
    slug: "fullstack-nigeria",
    tag: "Career",
    tagColor: "#34d399",
    date: "Jan 2026",
    readTime: "6 min read",
    title: "What It's Like Being a Self-Taught Dev in Nigeria",
    excerpt:
      "No bootcamp, no CS degree — just curiosity, GitHub, and a lot of broken builds. Here is my honest story of learning full-stack development from scratch.",
    content: `
## How It Started

I did not decide to become a developer. It happened gradually, the way most important things do. I was curious about how websites worked — not just what they looked like, but what was underneath. I opened the browser DevTools one afternoon, saw the HTML, changed some text, and something clicked. That was it.

There was no coding bootcamp near me. There was no budget for one either. What I had was a laptop, an internet connection, and a genuine need to build things that worked.

## The First Six Months Were Humbling

I started with HTML and CSS tutorials on YouTube. The first few weeks felt fast — I was building things that looked like real websites. Then I hit JavaScript and everything slowed down. Loops confused me. Functions confused me more. Asynchronous code made me want to close the laptop and walk away.

I did walk away. Multiple times. But I kept coming back, usually because I had an idea for something I wanted to build and I needed to know more to build it.

That is the thing nobody tells you about self-teaching — motivation from curiosity is more sustainable than motivation from discipline. Discipline gets you through a structured course. Curiosity gets you through two years of building things that break.

## What Actually Taught Me

Tutorials taught me syntax. Building projects taught me how to think.I was introduced to NEXTCOLLEGE by David a mentorship-based school for developers.

Getting in wasn’t just another step it was a breakthrough.

The first real project I built was FJ Tracker — a simple menstrual cycle tracker I made for a family member who was using a paper calendar. It was plain HTML, CSS and JavaScript. It was ugly. The code was messy. But it worked, and someone real used it. That felt different from tutorial projects.

After that I built a hospital incident management system called IncidentCare, then an Igbo cloth e-commerce store. Each project forced me to learn something I had been avoiding. The e-commerce store made me learn about state management. The incident system made me learn about forms, validation and data persistence.

The pattern became clear: pick something real to build, get stuck, figure out how to get unstuck, repeat.

## The Nigeria-Specific Challenges

Being a developer in Nigeria comes with specific frustrations that tutorials do not prepare you for.

Electricity is not reliable. I lost several hours of work early on before I learned to push to GitHub compulsively — every small change, committed and pushed. I still do this today.

Internet speeds are inconsistent. Downloading large packages or watching high-quality video tutorials sometimes meant waiting or watching at 144p. I learned to download documentation and resources when I had good connection and work offline when I did not.

Payment for international services is complicated. Getting access to certain tools and platforms required finding workarounds that developers in other countries do not think about.

None of these were insurmountable. They just required adaptation. The honest truth is that dealing with constraints makes you a more resourceful developer.

## When Things Started to Connect

About a year in, I discovered React. Then Next.js. Then TypeScript. This stack changed everything because it was not just about making things that looked right — it was about building things that scaled, that were maintainable, that other developers could read.

I rebuilt FJ Tracker as Eve Circles in Next.js and turned it into a PWA, the AgroCycle platform, the Simply Static clone,the taskmanager and plenty other one currently working on a very big projects that i call the big FIVE. Each one was a step up in complexity. TypeScript in particular changed how I thought about code — it forced precision that made me a better programmer.

## What I Would Tell Someone Starting Now

Read less, build more. Tutorials are comfortable because you always know what to do next. Real projects are uncomfortable because you do not. The discomfort is the learning.

Do not wait until you feel ready. You will not feel ready. Start with something small that you actually care about, build it badly, then build it again better.

Commit to GitHub constantly. Your commit history is your portfolio before you have a portfolio. It shows that you actually build things and that you are consistent.

Find a community. The developer communities on Twitter and Discord made a difference for me — not because they gave me answers but because they showed me that confusion and getting stuck is a normal part of the process, not evidence that you are not cut out for it.

## Where I Am Now

I build full-stack web applications with Next.js, TypeScript and Tailwind CSS. I have deployed projects on Vercel, integrated databases with PostgreSQL and MongoDB, and converted web apps to mobile apps using Capacitor.

I did not take a straight path to get here. But I am not sure a straight path would have taught me as much as the crooked one did.

If you are learning to code in Nigeria or anywhere else without the traditional support structures — keep going. The fundamentals are the same everywhere. What you build with them is up to you.
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
