
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
  className="scroll-mt-24 bg-[#f8f9f5] py-12 md:py-14"
>
      <div className="mx-auto max-w-6xl px-5 sm:px-6">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#eaf5c9]">
              <Aperture size={18} className="text-neutral-900" />
            </div>
            <span className="text-sm font-bold tracking-tight text-neutral-900">
              studiospace<span className="text-lime-600">.</span>
            </span>
          </div>

          <span className="text-[10px] font-semibold tracking-[0.2em] text-lime-700">
            OUR PROMISE
          </span>
        </div>

        {/* Main Content */}
        <div className="grid items-center gap-7 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Left Side */}
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-lime-700">
              01 — Trust Is Everything
            </p>

            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-neutral-900 md:text-3xl">
              Make Space.
              <br />
              <span className="text-lime-700">Make Magic.</span>
              <br />
              We have Got Your Back.
            </h2>

            <p className="mt-3 max-w-md text-xs leading-6 text-neutral-600 sm:text-sm">
              Great creative work starts with a space where you feel
              confident, protected and supported. We make every
              studio experience more trustworthy.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-neutral-700"
              >
                About Us
                <ArrowUpRight size={14} />
              </Link>

              <Link
                href="/studios"
                className="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-4 py-2.5 text-xs font-semibold text-neutral-800 transition hover:border-neutral-900 hover:bg-white"
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
                  className="group rounded-lg border border-neutral-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-lime-300 hover:shadow-md"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-md bg-lime-50 text-lime-700 transition group-hover:bg-lime-100">
                    <Icon size={17} />
                  </div>

                  <h3 className="text-xs font-bold text-neutral-900 sm:text-sm">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-[11px] leading-5 text-neutral-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-4">
          <p className="text-[9px] font-medium tracking-[0.15em] text-neutral-500">
            BUILT FOR THE CREATIVE COMMUNITY
          </p>

          <Link
            href="/about"
            className="flex items-center gap-1 text-[10px] font-semibold text-lime-700 transition hover:gap-2"
          >
            Discover Our Story
            <ArrowUpRight size={13} />
          </Link>
        </div>

      </div>
    </section>
  );
}
