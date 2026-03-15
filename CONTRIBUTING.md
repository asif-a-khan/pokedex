# Contributing to Pokedex

Thanks for your interest in contributing! This document covers the guidelines and conventions used in this project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/pokedex.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Run the build to check for errors: `npm run build`
7. Commit and push your branch
8. Open a pull request against `main`

## Development

```bash
npm run dev    # start dev server on localhost:3000
npm run build  # production build (catches type errors)
npm start      # serve production build
```

## Project Structure

This project follows a feature-based component structure. Each component lives in its own directory alongside its SCSS module:

```
src/components/pokemon-card/
├── pokemon-card.tsx
├── pokemon-card.module.scss
├── pokemon-image.tsx
├── stat-list.tsx
├── stat-list.module.scss
├── stat-item.tsx
└── stat-item.module.scss
```

See the [README](README.md) for a full architecture overview.

## Style Guide

### TypeScript

- Strict mode is enabled. No `any` types unless absolutely necessary.
- Use `interface` for object shapes, `type` for unions and intersections.
- Prefer named exports over default exports (except for Next.js pages).
- Destructure props in function signatures.

### React

- Functional components only. No class components (except ErrorBoundary, which React requires).
- Use `memo()` for list items and components that receive stable props.
- Use `useCallback` for event handlers passed to memoized children.
- Custom hooks go in `src/hooks/` and start with `use`.
- Context follows the split pattern: separate state and dispatch contexts with custom hooks that throw if used outside their provider.

### SCSS

- **SCSS Modules** (`.module.scss`) for all component styles. No global class names.
- **camelCase** for class names in modules: `.searchBox`, `.statItem`, not `.search-box`.
- Import shared tokens via `@use '@/styles/abstracts' as *;` at the top of every module.
- Use the `respond-to()` mixin for media queries — don't write raw `@media` rules.
- Use variables from `_variables.scss` for colors, spacing, and timing. Don't hardcode values.
- Dynamic values (like type colors determined at runtime) use CSS custom properties set via `style` props in JSX.

```scss
// good
@use '@/styles/abstracts' as *;

.card {
  padding: 24px;
  transition: transform $transition-medium ease;

  @include respond-to('sm') {
    padding: 16px;
  }
}

// bad
.card {
  padding: 24px;
  transition: transform 0.8s ease;

  @media (max-width: 600px) {
    padding: 16px;
  }
}
```

### Naming Conventions

- **Files**: kebab-case (`pokemon-card.tsx`, `use-pokemon.ts`)
- **Components**: PascalCase (`PokemonCard`, `StatItem`)
- **Hooks**: camelCase prefixed with `use` (`usePokemon`, `useDebounce`)
- **Constants**: UPPER_SNAKE_CASE (`STAT_COLORS`, `MAX_AUTOCOMPLETE_RESULTS`)
- **CSS modules**: camelCase (`.glowPulse`, `.searchBox`)

### Comments

Write comments that explain **why**, not what. Keep them casual and practical — they should sound like a developer wrote them, not a documentation generator.

```typescript
// good
// the glow needs to be bigger than the sprite or it looks weird behind it

// bad
// This function sets the glow size to 1.3 times the sprite size
```

### Git Commits

- Use present tense: "Add evolution chain" not "Added evolution chain"
- Keep the subject line under 72 characters
- Reference issues if applicable: "Fix dropdown overlap (#12)"

## Adding a New Section

If you're adding a new content section (like a moves list or abilities detail):

1. Create a directory under `src/components/your-section/`
2. Add the section component and its `.module.scss`
3. Import shared design tokens from `@/styles/abstracts`
4. Use `TypeBackground` for the scroll-driven paint-drip fill
5. Use `ScrollFade` to fade content in/out on scroll
6. Use `SectionHeading` with a `color` prop for the section title
7. Use `PokemonSprite` for any Pokemon images (keeps glow/bounce consistent)
8. Add the section to `src/components/pokedex-app.tsx` wrapped in `ErrorBoundary` + `Suspense`

## Reporting Issues

- Check existing issues before opening a new one
- Include browser and OS info for visual bugs
- Include the Pokemon name if the bug is specific to certain data

## Questions?

Open an issue or start a discussion. Happy to help.
