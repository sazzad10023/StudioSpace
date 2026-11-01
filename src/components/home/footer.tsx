
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) return;

    // Connect your newsletter API here.
    console.log("Newsletter email:", email);
    setEmail("");
  }

  return (
    <footer className="border-t border-white/10 bg-[#0b0b10] text-gray-300">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-8 lg:px-12 lg:pt-16">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-2xl font-bold text-white">
                S
              </span>

              <span className="text-xl font-bold tracking-tight text-white">
                Studio<span className="text-violet-400">Space</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              A creative space for every big idea. Discover inspiring studios,
              connect with space owners, and bring your next production to life.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-sm font-bold transition hover:border-violet-400 hover:bg-violet-500/10 hover:text-violet-300"
              >
                ig
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-sm font-bold transition hover:border-violet-400 hover:bg-violet-500/10 hover:text-violet-300"
              >
                ▶
              </a>

              {/* X logo — not the old Twitter bird */}
              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 transition hover:border-violet-400 hover:bg-violet-500/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[17px] w-[17px] fill-current"
                  aria-hidden="true"
                >
                  <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.45L5.52 22H2.4l7.25-8.29L1.8 2h6.4l4.43 6.97L18.9 2Zm-1.1 17.86h1.73L7.27 4.03H5.41L17.8 19.86Z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-sm font-bold transition hover:border-violet-400 hover:bg-violet-500/10 hover:text-violet-300"
              >
                in
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link className="transition hover:text-violet-400" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="transition hover:text-violet-400"
                  href="/studios"
                >
                  Explore Studios
                </Link>
              </li>
              <li>
                <Link
                  className="transition hover:text-violet-400"
                  href="/#how-it-works"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  className="transition hover:text-violet-400"
                  href="/about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="transition hover:text-violet-400"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white">
              Popular Studios
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/studios?category=photography"
                  className="transition hover:text-violet-400"
                >
                  Photography
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=film"
                  className="transition hover:text-violet-400"
                >
                  Film & Video
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=podcast"
                  className="transition hover:text-violet-400"
                >
                  Podcast Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=music"
                  className="transition hover:text-violet-400"
                >
                  Music Studios
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=event"
                  className="transition hover:text-violet-400"
                >
                  Event Spaces
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-white">
              Stay in the Creative Loop
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Get studio discoveries, creative inspiration, and platform
              updates delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="mt-5">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>

              <div className="flex gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-1.5 focus-within:border-violet-500">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500"
                />

                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
                >
                  Subscribe
                </button>
              </div>
            </form>

            <p className="mt-3 text-xs text-gray-500">
              By subscribing, you agree to receive our updates.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} StudioSpace. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href="/privacy"
                className="transition hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="transition hover:text-white"
              >
                Terms of Service
              </Link>
            </div>

            <p>Made for creators, everywhere.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
