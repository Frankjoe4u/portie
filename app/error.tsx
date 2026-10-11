"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5 text-center">
      <div role="alert">
        <h1 className="text-2xl font-bold text-ink">Something went wrong.</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          This page hit an unexpected error. Try again, and if it keeps happening, please check
          your connection.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn btn-cyan px-6 py-3">
            Try again
          </button>
          <a href="/" className="btn btn-cyan-outline px-6 py-3">
            Back Home
          </a>
        </div>
      </div>
    </main>
  );
}
