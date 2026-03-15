# Pokedex

A modern Pokedex application built with Next.js 15. Search for any Pokemon and view their stats, evolution chain, alternate forms, and related Pokemon by type.

## Features

- **Search with autocomplete** — type-ahead suggestions with debounced filtering and hover prefetching
- **Detailed Pokemon cards** — all base stats, abilities, type info, height/weight
- **Evolution chains** — visual evolution path with clickable stages
- **Alternate forms** — megas, regional variants, gigantamax forms
- **Related Pokemon** — 6 random Pokemon of the same primary type
- **URL-driven state** — shareable links via `?pokemon=charizard`
- **Smooth scroll navigation** — single-page scrolling experience with scroll-to-top

## Tech Stack

- **Next.js 15** (App Router) with TypeScript
- **React Context + useReducer** for state management (split state/dispatch pattern)
- **TanStack Query v5** for data fetching with caching
- **Framer Motion** for interactive animations
- **SCSS Modules** with a 7-1 architecture for styling
- **Lucide React** for icons

## Architecture

```
src/
├── app/              # Next.js App Router pages and API routes
├── components/       # UI components, co-located with SCSS modules
├── context/          # React Context providers (search, pokedex)
├── hooks/            # Custom hooks (data fetching, debounce, scroll)
├── lib/              # API layer, types, constants, utilities
└── styles/           # Global SCSS (abstracts, base, animations)
```

### State Management

Uses the React Context split pattern: state and dispatch live in separate contexts per domain, preventing unnecessary re-renders. The selected Pokemon lives in URL search params for shareability.

### Data Fetching

TanStack Query handles all PokeAPI requests with `staleTime: Infinity` (Pokemon data doesn't change). A Next.js route handler (`/api/pokemon-names`) caches the full name list server-side with daily revalidation.

### Styling

SCSS Modules for component-scoped styles. Shared design tokens (colors, breakpoints, timing) live in `styles/abstracts/` and are imported via `@use`. Type colors are applied as inline styles since they're determined at runtime.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Performance

- On-demand data fetching (no more 807 parallel requests on load)
- Debounced search input (300ms) and hover prefetching (150ms)
- `staleTime: Infinity` for cached Pokemon data
- AbortController integration for cancelled requests on rapid navigation
- `React.memo` on list items to prevent unnecessary re-renders
- `next/image` with responsive `sizes` for optimized image loading

## API

Data sourced from [PokeAPI v2](https://pokeapi.co/). Pokemon artwork from the [official PokeAPI sprites repo](https://github.com/PokeAPI/sprites).
