
import {
  Search,
  CalendarDays,
  ClipboardCheck,
  Clapperboard,
  ArrowUpRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Explore creative studios and find the perfect space for your project.",
    icon: Search,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
    hover: "group-hover:bg-blue-600",
    border: "hover:border-blue-500/40",
    shadow: "hover:shadow-blue-500/10",
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Choose your preferred date, starting time, and booking duration.",
    icon: CalendarDays,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-500/10",
    hover: "group-hover:bg-violet-600",
    border: "hover:border-violet-500/40",
    shadow: "hover:shadow-violet-500/10",
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Submit your reservation request and get ready for your session.",
    icon: ClipboardCheck,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    hover: "group-hover:bg-emerald-600",
    border: "hover:border-emerald-500/40",
    shadow: "hover:shadow-emerald-500/10",
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Bring your creative ideas to life in your chosen studio space.",
    icon: Clapperboard,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10",
    hover: "group-hover:bg-orange-600",
    border: "hover:border-orange-500/40",
    shadow: "hover:shadow-orange-500/10",
  },
];

export default function HowItWorks() {
  return (
  <section
    id="how-it-works"
    className="relative scroll-mt-24 overflow-hidden py-20 md:py-28"
  >
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 size-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 size-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            Simple & Seamless
          </span>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Your Creative Journey,
            <span className="text-primary"> Simplified.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-muted-foreground md:text-base">
            From discovering the perfect space to bringing your ideas to life,
            booking a studio has never been easier.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className={`group relative rounded-2xl border bg-card/80 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${step.border} ${step.shadow}`}
              >
                {/* Number and icon */}
                <div className="flex items-start justify-between">
                  <div
                    className={`flex size-14 items-center justify-center rounded-2xl ${step.bg} ${step.color} transition-all duration-300 ${step.hover} group-hover:text-white`}
                  >
                    <Icon size={25} strokeWidth={1.7} />
                  </div>

                  <span
                    className={`text-4xl font-bold tracking-tighter ${step.color} opacity-30`}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-10">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Bottom indicator */}
                <div className="mt-8 flex items-center justify-between border-t pt-4">
                  <span className="text-xs font-medium text-muted-foreground">
                    STEP {step.number}
                  </span>

                  <ArrowUpRight
                    size={18}
                    className={`transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${step.color}`}
                  />
                </div>

                {/* Connector */}
                {index !== steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full border bg-background lg:flex">
                    <span className={`size-1.5 rounded-full ${step.bg}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
