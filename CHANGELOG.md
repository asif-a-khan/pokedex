# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-15

### Added

- **Autocomplete search** with debounced filtering (300ms) and hover prefetching (150ms)
- **Pokemon card** displaying all base stats, types, abilities, height, and weight with colorful stat chips using Press Start 2P pixel font
- **Evolution chain** section with clickable stages, type-colored glows, and level indicators
- **Alternate forms** section showing mega evolutions, regional variants, and gigantamax forms
- **Related Pokemon** section displaying 6 random Pokemon of the same primary type
- **Type-themed UI** — hero background, section paint-drip fills, accent colors, button colors, and heading underlines all adapt to the selected Pokemon's primary type
- **Paint-drip background animations** on each section, driven by scroll visibility via Framer Motion's `useInView` — fills on scroll-in, reverses on scroll-out
- **Sprite marble bounce** animation on hover (8 bounces with decreasing height)
- **Pulsing type-colored glow** behind all Pokemon sprites via shared `PokemonSprite` component
- **Scroll-driven content fade** — sections fade and slide in/out as you scroll (image from left, stats from right)
- **URL-driven state** — selected Pokemon stored in search params (`?pokemon=charizard`) for bookmarking and sharing
- **Pokeball bounce preloader** ported from the original jQuery project
- **Scroll arrows** with staggered flash animation in the hero section
- **Paint splatter buttons** ported from the original project using Framer Motion variants
- **Scroll-to-top** floating button and "Back to Top" paint button
- **React Context split pattern** — separate state and dispatch contexts for search and pokedex domains
- **TanStack Query v5** for all data fetching with `staleTime: Infinity`, request deduplication, and AbortController integration
- **SCSS Modules** with 7-1 architecture for component-scoped styling
- **Shared design tokens** — type colors (standard + vibrant), breakpoints, timing values, z-index layers
- **Next.js route handler** (`/api/pokemon-names`) caching the full Pokemon name list server-side with daily revalidation
- **Error boundaries** wrapping each section for independent error recovery
- **Responsive design** across 6 breakpoints (1200px, 1050px, 800px, 600px, 500px, 370px)
- **Accessibility** — ARIA labels, keyboard navigation in search dropdown, semantic HTML
- **Vibrant type color palette** for hero section, buttons, and scroll-to-top — intense saturated colors matching the original project's bold orange
- Per-type colored chips for Pokemon types and abilities in stat display
- Custom pokeball favicon

### Migration from Original Project

This is a complete rewrite of the original jQuery/vanilla JS Pokedex project. Key improvements:

- Replaced 807 parallel AJAX calls on page load with on-demand fetching and caching
- Replaced 600-line type switch statement with a single `useRelatedPokemon` hook
- Replaced jQuery DOM manipulation with React component architecture
- Replaced `Array.prototype.shuffle` mutation with pure `shuffleArray` utility
- Replaced Font Awesome CDN with tree-shaken Lucide React icons
- Added TypeScript for full type safety
- Added URL state for shareable links
- Added per-section error handling (one failed request no longer breaks everything)
- Added image optimization via `next/image`
