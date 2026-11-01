<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace

Single Next.js (App Router) app under `src/app`. No tests, no CI, one package.

## Commands

- `npm run dev` — dev server (Turbopack + React Compiler)
- `npm run lint` — ESLint flat config (`eslint.config.mjs`); run as `npx eslint <file>` to check specific files
- `npx tsc --noEmit` — typecheck (not wired into any script; run before finishing changes)
- `npm run build` — production build; `.next/` is generated output, never edit it

## Toolchain gotchas

- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`). Do not add manual `useMemo`/`useCallback` for memoization unless profiling shows a need; write idiomatic React and let the compiler handle it.
- **Tailwind v4** — configured via the `@tailwindcss/turbopack` plugin in `next.config.ts`, not PostCSS or a `tailwind.config` file. Theme tokens/CSS variables live in `src/app/globals.css`. `@custom-variant dark` and `@theme inline` are defined there.
- **shadcn UI is `base-nova` style** (`components.json`): primitives come from `@base-ui/react`, **not Radix**, so component APIs may differ from typical shadcn examples. Before building on a UI primitive, read its source in `src/components/ui/` (function-style components with `data-slot` attributes). Add new UI via `npx shadcn add <component>`.
- The `cn` helper re-exports the standalone **`cn` npm package** (`src/lib/utils.ts`), not clsx+tailwind-merge.
- Path alias: `@/*` → `src/*` (`tsconfig.json`).
