
import Link from "next/link";
import { Home, Camera, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        {/* Creative Studio Illustration */}
        <div className="relative mx-auto mb-8 flex h-48 w-48 items-center justify-center rounded-full bg-primary/10">
          <div className="absolute h-32 w-32 rounded-3xl border-2 border-dashed border-primary/30 rotate-12" />

          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl">
            <Camera size={48} strokeWidth={1.5} />
          </div>

          <span className="absolute right-5 top-5 text-3xl">✦</span>
          <span className="absolute bottom-5 left-5 text-2xl">✧</span>
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          StudioSpace
        </p>

        <h1 className="text-7xl font-bold tracking-tight sm:text-8xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-semibold">
          Looks like this studio is missing!
        </h2>

        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you are looking for does not exist or may have been moved.
          Lets get you back to discovering creative spaces.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Home size={18} />
          Return to Home
        </Link>
      </div>
    </main>
  );
}
