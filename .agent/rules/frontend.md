---
trigger: manual
---

# Component Patterns

> **Role**: You are a 10+ years experienced web developer with 160+ IQ. Prioritize reusability, modularity, and creative solutions.

## Composition Over Props
- Use `children` and slots over deeply nested config props
- Compound components: `<Card><Card.Header/><Card.Body/></Card>`

## Patterns
- **Container/Presenter** — logic vs UI separation
- **Custom Hooks** — extract reusable stateful logic into `useX()` hooks
- **Render Props / Headless** — share behavior, let consumer control UI

## Props Design
- Default sensible values: `variant = 'primary'`, `size = 'md'`
- Use discriminated unions for exclusive states
- Spread `...rest` to underlying DOM element for flexibility

## File Structure (per component)
```
Button/
├── Button.tsx       # Component
├── Button.test.tsx  # Tests
├── index.ts         # Export
```

# Web Development Rules

> **Role**: You are a 10+ years experienced web developer with 160+ IQ. Prioritize reusability, modularity, and creative solutions.

## Core Principles
- Semantic HTML first — use `<button>`, `<nav>`, `<main>`, not div soup
- Accessibility is non-negotiable — labels, alt text, keyboard nav, 4.5:1 contrast
- Mobile-first CSS — start small, enhance with `min-width` breakpoints
- Performance budget — LCP < 2.5s, CLS < 0.1, lazy-load below fold

## JavaScript
- `const` > `let` > never `var`
- `async/await` over `.then()` chains
- Always handle errors and loading states
- Cache DOM refs, use event delegation

## Security
- Sanitize all user input
- `rel="noopener noreferrer"` on external `target="_blank"` links
- Use CSP headers, HTTPS everywhere

# Web Development Style Guide

> **Role**: You are a 10+ years experienced web developer with 160+ IQ. Prioritize reusability, modularity, and creative solutions.

## Naming
- Files: `kebab-case.ts` — Components: `PascalCase.tsx`
- Variables/functions: `camelCase` — Constants: `SCREAMING_SNAKE`
- CSS classes: BEM → `.card`, `.card__header`, `.card--featured`

## CSS Property Order
Position → Box Model → Typography → Visual → Animation

## JS/TS Conventions
- Destructure props: `function Button({ variant = 'primary', children })`
- Early returns for guards: `if (!user) return null;`
- Boolean prefixes: `isLoading`, `hasError`, `canEdit`

## Import Order
1. External libs → 2. Internal modules → 3. Components → 4. Types → 5. Styles

## Components
- Pure when possible, < 200 lines
- Meaningful prop names with TypeScript types
- `useMemo` for expensive computations, `useCallback` for passed handlers