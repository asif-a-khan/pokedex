# Pokedex

A modern, animated Pokedex built with Next.js 15 and the PokeAPI. Search any Pokemon and explore their stats, evolution chains, alternate forms, and related Pokemon — all in a smooth single-page scrolling experience with type-themed visuals.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Autocomplete search** — debounced type-ahead with hover prefetching for instant results
- **Detailed Pokemon cards** — base stats, abilities, types, height/weight displayed with colorful stat chips
- **Evolution chains** — interactive visual chain with clickable stages to navigate between evolutions
- **Alternate forms** — mega evolutions, regional variants, gigantamax forms
- **Related Pokemon** — 6 random Pokemon sharing the same primary type
- **Type-themed UI** — backgrounds, accents, buttons, and glows all adapt to the selected Pokemon's type
- **Paint-drip backgrounds** — scroll-driven fill animations inspired by the original project's paint splatter buttons
- **Sprite animations** — marble bounce on hover, pulsing type-colored glows
- **URL-driven state** — shareable links via `?pokemon=charizard`
- **Scroll-to-top** — smooth navigation back to search from anywhere

## Screenshots

> Search for any Pokemon, and the entire UI adapts to their type. Fire types turn the app red, water types turn it blue, and so on.

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) | SSR, routing, image optimization |
| Language | [TypeScript](https://www.typescriptlang.org/) | Type safety |
| State | React Context + useReducer | Split state/dispatch pattern, no external deps |
| Data Fetching | [TanStack Query v5](https://tanstack.com/query) | Caching, deduplication, abort signals |
| Animation | [Framer Motion](https://www.framer.com/motion/) | Scroll-driven animations, transitions |
| Styling | [SCSS Modules](https://sass-lang.com/) | 7-1 architecture, component-scoped styles |
| Icons | [Lucide React](https://lucide.dev/) | Tree-shakeable icon components |
| API | [PokeAPI v2](https://pokeapi.co/) | Pokemon data source |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/asif-a-khan/pokedex.git
cd pokedex
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with fonts and providers
│   ├── page.tsx            # Server component shell
│   └── api/pokemon-names/  # Cached route handler for autocomplete
│
├── components/             # UI components (co-located with SCSS modules)
│   ├── search/             # Search bar, dropdown, hero section
│   ├── pokemon-card/       # Main card, sprite, stats
│   ├── evolution-chain/    # Evolution visualization
│   ├── alternate-forms/    # Form variants grid
│   ├── related-pokemon/    # Same-type suggestions
│   ├── paint-button/       # Paint splatter CTA button
│   └── ui/                 # Shared components (sprites, headings, backgrounds)
│
├── context/                # React Context (split state/dispatch pattern)
│   ├── search/             # Search query, expansion, suggestions
│   └── pokedex/            # Preloader state
│
├── hooks/                  # Custom hooks
│   ├── use-pokemon.ts      # TanStack Query wrapper for /pokemon/{name}
│   ├── use-evolution-chain.ts
│   ├── use-related-pokemon.ts
│   ├── use-debounce.ts     # Generic debounce hook
│   └── use-scroll-to-section.ts
│
├── lib/
│   ├── api/                # Typed PokeAPI fetch wrappers with AbortSignal
│   ├── types/              # TypeScript interfaces for API responses
│   ├── constants/          # Type colors (standard + vibrant), config values
│   └── utils/              # Pure utility functions
│
└── styles/                 # Global SCSS (7-1 architecture)
    ├── abstracts/          # Variables, mixins, functions
    ├── base/               # Reset, typography, global styles
    └── animations/         # Keyframe definitions (bounce, flash)
```

### Key Design Decisions

**State management** — React Context with the split pattern (separate state and dispatch contexts per domain) to prevent unnecessary re-renders. The selected Pokemon lives in URL search params for shareability. No external state library needed.

**Data fetching** — TanStack Query with `staleTime: Infinity` since Pokemon data doesn't change mid-session. A Next.js route handler caches the full name list server-side with daily revalidation, replacing the original project's 807 parallel AJAX calls with a single cached request.

**Styling** — SCSS Modules for component scoping with a shared abstracts layer for design tokens. Dynamic type colors applied via inline styles and CSS custom properties since they're determined at runtime.

**Animations** — Framer Motion for scroll-driven effects (`useInView`), Framer Motion for interactive transitions, and CSS `@keyframes` for ambient animations (preloader bounce, scroll arrows, sprite bounce).

## Performance

- **On-demand fetching** — only fetches data for the selected Pokemon, not the entire Pokedex
- **Request deduplication** — TanStack Query prevents duplicate API calls
- **Infinite cache** — previously viewed Pokemon load instantly from cache
- **Debounced search** — 300ms debounce on autocomplete filtering
- **Hover prefetching** — 150ms debounced prefetch on autocomplete suggestions
- **Abort on navigation** — AbortController cancels in-flight requests when switching Pokemon
- **React.memo** — memoized list items prevent cascading re-renders
- **next/image** — automatic WebP conversion, responsive sizes, lazy loading

## API

All Pokemon data is sourced from [PokeAPI v2](https://pokeapi.co/). Artwork comes from the [PokeAPI sprites repository](https://github.com/PokeAPI/sprites).

### Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `pokemon/{name}` | Stats, types, abilities, sprites |
| `pokemon-species/{name}` | Evolution chain URL, alternate forms |
| `evolution-chain/{id}` | Full evolution tree |
| `type/{name}` | Pokemon list by type (for related section) |
| `pokemon?limit=1302` | Full name list (cached via route handler) |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for the comprehensive Pokemon data API
- Original project by [Asif Khan](https://github.com/asif-a-khan) — the aesthetic and animations in this app are an evolution of that work
