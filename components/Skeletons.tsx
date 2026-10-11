function Bar({ className }: { className: string }) {
  return <div className={"animate-pulse rounded-lg bg-line/60 " + className} />;
}

export function ProjectsSkeleton() {
  return (
    <section
      id="projects"
      aria-busy="true"
      aria-label="Loading projects"
      className="border-t border-line bg-bg py-16 md:py-24"
    >
      <div className="container-x">
        <Bar className="h-3 w-20" />
        <Bar className="mt-4 h-8 w-2/3 max-w-md" />
        <Bar className="mt-10 h-80 w-full rounded-2xl" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Bar className="h-64 rounded-2xl" />
          <Bar className="hidden h-64 rounded-2xl sm:block" />
          <Bar className="hidden h-64 rounded-2xl lg:block" />
        </div>
      </div>
    </section>
  );
}

export function BlogSkeleton() {
  return (
    <section
      id="blog"
      aria-busy="true"
      aria-label="Loading articles"
      className="border-t border-line bg-bg py-16 md:py-24"
    >
      <div className="container-x">
        <Bar className="h-3 w-24" />
        <Bar className="mt-4 h-8 w-1/2 max-w-sm" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Bar className="h-64 rounded-2xl" />
          <Bar className="hidden h-64 rounded-2xl sm:block" />
          <Bar className="hidden h-64 rounded-2xl lg:block" />
        </div>
      </div>
    </section>
  );
}
