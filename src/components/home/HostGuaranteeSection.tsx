import Link from "next/link";
import {
  ShieldCheck,
  BadgeCheck,
  Camera,
  Headset,
  ArrowUpRight,
  Aperture,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified People",
    description: "Trust starts with verified profiles.",
  },
  {
    icon: ShieldCheck,
    title: "Host Protection",
    description: "Added peace of mind for hosts.",
  },
  {
    icon: Camera,
    title: "Equipment Safety",
    description: "Responsible production practices.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Support when production needs it.",
  },
];

export default function HostGuaranteeSection() {
  return (
    <section
      id="about-us"
      className="scroll-mt-24 bg-white py-12 dark:bg-neutral-950 md:py-14"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#eaf5c9] dark:bg-neutral-800">
              <Aperture size={18} className="text-neutral-900 dark:text-white" />
            </div>

            <span className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">
              studiospace<span className="text-lime-600">.</span>
            </span>
          </div>

          <span className="text-[10px] font-semibold tracking-[0.2em] text-lime-700 dark:text-lime-400">
            OUR PROMISE
          </span>
        </div>

        {/* Main Content */}
        <div className="grid items-center gap-7 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Side */}
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-lime-700 dark:text-lime-400">
              01 — Trust Is Everything
            </p>

            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-white md:text-3xl">
              Make Space.
              <br />
              <span className="text-lime-700 dark:text-lime-400">
                Make Magic.
              </span>
              <br />
              We have Got Your Back.
            </h2>

            <p className="mt-3 max-w-md text-xs leading-6 text-neutral-600 dark:text-neutral-400 sm:text-sm">
              Great creative work starts with a space where you feel
              confident, protected and supported. We make every
              studio experience more trustworthy.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                About Us
                <ArrowUpRight size={14} />
              </Link>

              <Link
                href="/studios"
                className="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-4 py-2.5 text-xs font-semibold text-neutral-800 transition hover:border-neutral-900 hover:bg-white dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-400 dark:hover:bg-neutral-800"
              >
                Explore Studios
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-lg border border-neutral-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-lime-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-lime-700"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-md bg-lime-50 text-lime-700 transition group-hover:bg-lime-100 dark:bg-neutral-800 dark:text-lime-400 dark:group-hover:bg-neutral-700">
                    <Icon size={17} />
                  </div>

                  <h3 className="text-xs font-bold text-neutral-900 dark:text-white sm:text-sm">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-[11px] leading-5 text-neutral-500 dark:text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <p className="text-[9px] font-medium tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
            BUILT FOR THE CREATIVE COMMUNITY
          </p>

          <Link
            href="/about"
            className="flex items-center gap-1 text-[10px] font-semibold text-lime-700 transition hover:gap-2 dark:text-lime-400"
          >
            Discover Our Story
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}