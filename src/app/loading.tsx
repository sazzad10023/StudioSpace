
export default function Loading() {
  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-xl bg-primary/20" />
          <div className="h-5 w-32 animate-pulse rounded bg-muted" />
        </div>

        {/* Hero Skeleton */}
        <div className="space-y-3">
          <div className="h-9 w-2/3 animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        </div>

        {/* Studio Cards Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-xl border p-3"
            >
              <div className="aspect-video animate-pulse rounded-lg bg-muted" />
              <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-muted" />
              <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-muted" />
              <div className="mt-5 h-9 w-full animate-pulse rounded-lg bg-muted" />
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        <div className="flex items-center justify-center gap-3 py-6">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          <p className="text-sm text-muted-foreground">
            Preparing your creative space...
          </p>
        </div>
      </div>
    </div>
  );
}
