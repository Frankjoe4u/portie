import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="bg-bg">
      <Navbar />
      <main
        id="main"
        className="hero-glow-cyan flex min-h-[80vh] items-center justify-center px-5 py-32 text-center"
      >
        <div>
          <p className="text-hero-gradient text-7xl font-black tracking-tight md:text-8xl">404</p>
          <h1 className="mt-4 text-2xl font-bold text-ink md:text-3xl">
            Looks like this page went missing.
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
            The link may be broken or the page may have moved.
          </p>
          <Link href="/" className="btn btn-cyan mt-8 px-6 py-3">
            Back Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
