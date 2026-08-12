# Fio do Bigode Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a one-page, animated, old-school-barbershop landing site for the real business Barbearia Fio do Bigode (Pato Branco-PR), built from its actual Instagram identity.

**Architecture:** Static Vite + React + TypeScript single-page app, no backend. Content lives in one typed data module; each page section is an isolated, independently-testable component; a shared `usePrefersReducedMotion` hook and `buildWhatsAppLink` utility are consumed everywhere motion or a WhatsApp CTA appears. `App.tsx` composes the sections in document order.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS v3, Framer Motion, Vitest + React Testing Library, pnpm.

## Global Constraints

- All user-facing copy in Brazilian Portuguese (pt-BR); `index.html` declares `<html lang="pt-BR">`.
- Real shop data only (address, phones, Instagram handle, tagline) as verified live from `@fiodobigodebarbearia` — see design spec `docs/superpowers/specs/2026-08-11-fio-do-bigode-landing-design.md`. No invented testimonials. No fabricated service prices — unconfirmed prices render as the literal string `"Consulte"`.
- Single accent color: `brass` (`#c9a227`) is the only color used for interactive/CTA elements. No second accent color is introduced anywhere.
- Corners: `rounded-none`–`rounded-sm` on content containers. Full circles (`rounded-full`) are reserved for badge/seal/FAB elements only.
- Every animation must degrade under `prefers-reduced-motion: reduce` via the shared `usePrefersReducedMotion` hook — each animated component has its own static fallback, not a blanket kill-switch.
- Package manager: pnpm (matches the sibling `sheikh-barbearia` project in `C:\Projetos Pine\`).
- No backend, no forms, no environment variables. The only external integration is WhatsApp deep links (`https://wa.me/...`).
- No testimonials/reviews section ships in this plan.

---

### Task 1: Project Scaffold, Design Tokens & Test Infrastructure

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `postcss.config.js`, `tailwind.config.ts`, `index.html`, `.gitignore`
- Create: `src/main.tsx`, `src/index.css`, `src/App.tsx`, `src/App.test.tsx`, `src/test/setup.ts`
- Create: `public/logo-transparent.png` (copy of the already-fixed logo at project root)

**Interfaces:**
- Consumes: nothing (first task).
- Produces: a working Vite+React+TS+Tailwind dev/build toolchain; Vitest wired to run `*.test.tsx`/`*.test.ts` anywhere under `src/` with jsdom + `@testing-library/jest-dom` matchers; `src/test/setup.ts` auto-loaded by every test, providing a `window.IntersectionObserver` mock and a default `window.matchMedia` stub (individual tests may override `window.matchMedia` per-case). Tailwind tokens available in every component via className: `bg-ink` / `text-ink`, `bg-paper` / `text-paper`, `bg-brass` / `text-brass`, `font-display` (Fraunces), `font-body` (Work Sans, applied globally via `body`). CSS utility class `.grain-overlay` for the paper-grain texture. Static asset served at `/logo-transparent.png`. Placeholder `App` default export at `src/App.tsx` (replaced in Task 14).

- [ ] **Step 1: Initialize the project and install dependencies**

Run from `C:\Projetos Pine\fio-do-bigode-barb`:

```bash
pnpm init
pnpm add react react-dom framer-motion @fontsource/fraunces @fontsource/work-sans
pnpm add -D vite @vitejs/plugin-react typescript @types/react @types/react-dom tailwindcss postcss autoprefixer vitest jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 2: Create the build/tooling configuration files**

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "vite.config.ts"]
}
```

`vite.config.ts`:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: './src/test/setup.ts',
  },
})
```

`postcss.config.js`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

`tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0d0c0a',
        paper: '#f2e8d5',
        brass: '#c9a227',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

`index.html`:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/logo-transparent.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Barbearia Fio do Bigode — tradição old school em Pato Branco desde 2015. Corte, barba e navalha. Agende pelo WhatsApp."
    />
    <title>Fio do Bigode Barbearia — Pato Branco</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`.gitignore`:

```
node_modules
dist
*.local
```

Add to `package.json` `"scripts"` (edit the file `pnpm init` created):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  }
}
```

Also add `"type": "module"` at the top level of `package.json` if `pnpm init` didn't already set it.

- [ ] **Step 3: Copy the fixed logo into `public/`**

```bash
cp "logo-transparent.png" "public/logo-transparent.png"
```

(`mkdir -p public` first if it doesn't exist.)

- [ ] **Step 4: Write the test setup file**

`src/test/setup.ts`:

```ts
import '@testing-library/jest-dom'
import { vi } from 'vitest'

class IntersectionObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])
  root = null
  rootMargin = ''
  thresholds: number[] = []
}

// @ts-expect-error jsdom does not implement IntersectionObserver
window.IntersectionObserver = IntersectionObserverMock

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia
}
```

- [ ] **Step 5: Write the failing test for the App shell**

`src/App.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App scaffold', () => {
  it('renders the app root landmark', () => {
    render(<App />)
    expect(screen.getByTestId('app-root')).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run the test and confirm it fails**

Run: `pnpm test`
Expected: FAIL — `src/App.tsx` does not exist yet (module resolution error).

- [ ] **Step 7: Write the minimal App, entry point and global styles**

`src/App.tsx`:

```tsx
function App() {
  return (
    <main data-testid="app-root">
      <p>Fio do Bigode — em construção</p>
    </main>
  )
}

export default App
```

`src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0d0c0a;
  font-family: 'Work Sans', sans-serif;
}

.grain-overlay {
  position: relative;
}

.grain-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.06;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

`src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/fraunces/900.css'
import '@fontsource/work-sans/400.css'
import '@fontsource/work-sans/500.css'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element #root not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

- [ ] **Step 8: Run the test and confirm it passes**

Run: `pnpm test`
Expected: PASS

- [ ] **Step 9: Confirm the dev server boots**

Run: `pnpm dev`, open the printed local URL, confirm "Fio do Bigode — em construção" renders on a black background. Stop the server.

- [ ] **Step 10: Commit**

```bash
git add package.json pnpm-lock.yaml tsconfig.json vite.config.ts postcss.config.js tailwind.config.ts index.html .gitignore public/logo-transparent.png src/
git commit -m "chore: scaffold Vite+React+TS+Tailwind project with test infra"
```

---

### Task 2: WhatsApp Link Utility

**Files:**
- Create: `src/lib/whatsapp.ts`
- Test: `src/lib/whatsapp.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `WHATSAPP_NUMBER: string` (`'5546991123543'`) and `buildWhatsAppLink(message?: string): string` — every later component that renders a WhatsApp CTA imports `buildWhatsAppLink` from this file.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest'
import { buildWhatsAppLink, WHATSAPP_NUMBER } from './whatsapp'

describe('buildWhatsAppLink', () => {
  it('returns the bare wa.me link when no message is given', () => {
    expect(buildWhatsAppLink()).toBe(`https://wa.me/${WHATSAPP_NUMBER}`)
  })

  it('appends a URL-encoded prefilled message', () => {
    const link = buildWhatsAppLink('Olá! Quero agendar.')
    expect(link).toBe(`https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1!%20Quero%20agendar.`)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/lib/whatsapp.test.ts`
Expected: FAIL — `src/lib/whatsapp.ts` does not exist.

- [ ] **Step 3: Write the implementation**

```ts
export const WHATSAPP_NUMBER = '5546991123543'

export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/lib/whatsapp.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/whatsapp.ts src/lib/whatsapp.test.ts
git commit -m "feat: add WhatsApp deep link utility"
```

---

### Task 3: `usePrefersReducedMotion` Hook

**Files:**
- Create: `src/hooks/usePrefersReducedMotion.ts`
- Test: `src/hooks/usePrefersReducedMotion.test.ts`

**Interfaces:**
- Consumes: browser `window.matchMedia` (mocked per-test; default-stubbed by Task 1's `src/test/setup.ts`).
- Produces: `usePrefersReducedMotion(): boolean` — used by every animated component (SeloReveal, Hero, WhatsAppFAB).

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

describe('usePrefersReducedMotion', () => {
  it('returns false when the media query does not match', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
  })

  it('returns true when the media query matches', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/hooks/usePrefersReducedMotion.test.ts`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Write the implementation**

```ts
import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY)
    const handleChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReduced
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/hooks/usePrefersReducedMotion.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/hooks/usePrefersReducedMotion.ts src/hooks/usePrefersReducedMotion.test.ts
git commit -m "feat: add usePrefersReducedMotion hook"
```

---

### Task 4: Site Content Data Module

**Files:**
- Create: `src/data/content.ts`
- Test: `src/data/content.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces (all named exports from `src/data/content.ts`):
  - `type NavLink = { label: string; href: string }`
  - `NAV_LINKS: NavLink[]`
  - `SITE_INFO: { name, address, whatsappDisplay, landlineDisplay, landlineTel, instagram, hoursPlaceholder, foundedYear }`
  - `TAGLINE: string`
  - `WHATSAPP_GREETING: string` — the single shared prefilled WhatsApp message, used by every CTA (Header, Hero, Localizacao, Footer, WhatsAppFAB)
  - `type Service = { name: string; price: string }`
  - `SERVICES: Service[]`
  - `type GalleryItem = { alt: string; src?: string }`
  - `ABOUT_PHOTO: GalleryItem`
  - `GALLERY: GalleryItem[]`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest'
import { NAV_LINKS, SITE_INFO, WHATSAPP_GREETING, SERVICES, GALLERY } from './content'

describe('content', () => {
  it('has one nav link per main section, in page order', () => {
    expect(NAV_LINKS.map((link) => link.href)).toEqual([
      '#sobre',
      '#servicos',
      '#galeria',
      '#localizacao',
    ])
  })

  it('has the real shop contact info', () => {
    expect(SITE_INFO.address).toBe('Rua Jaciretã, 17 - Centro, Pato Branco - PR')
    expect(SITE_INFO.whatsappDisplay).toBe('(46) 99112-3543')
  })

  it('has a non-empty shared WhatsApp greeting', () => {
    expect(WHATSAPP_GREETING.length).toBeGreaterThan(0)
  })

  it('has at least one service, each with a name and a price', () => {
    expect(SERVICES.length).toBeGreaterThan(0)
    SERVICES.forEach((service) => {
      expect(service.name.length).toBeGreaterThan(0)
      expect(service.price.length).toBeGreaterThan(0)
    })
  })

  it('has at least 6 gallery slots ready for real photos', () => {
    expect(GALLERY.length).toBeGreaterThanOrEqual(6)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/data/content.test.ts`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Write the implementation**

```ts
export type NavLink = { label: string; href: string }

export const NAV_LINKS: NavLink[] = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Localização', href: '#localizacao' },
]

export const SITE_INFO = {
  name: 'Barbearia Fio do Bigode',
  address: 'Rua Jaciretã, 17 - Centro, Pato Branco - PR',
  whatsappDisplay: '(46) 99112-3543',
  landlineDisplay: '(46) 3225-8653',
  landlineTel: '+554632258653',
  instagram: 'https://www.instagram.com/fiodobigodebarbearia',
  hoursPlaceholder: 'Segunda a Sábado — confirme o horário pelo WhatsApp',
  foundedYear: 2015,
}

export const TAGLINE = 'Cuidar do seu estilo é o nosso negócio.'

export const WHATSAPP_GREETING = 'Olá! Vim pelo site e quero agendar um horário na Fio do Bigode.'

export type Service = { name: string; price: string }

// Nomes de serviço seguem a linha old school clássica da barbearia.
// Preços ainda não confirmados pelo cliente: usar "Consulte" até a
// barbearia enviar a tabela de preços definitiva (ver Open Items no spec).
export const SERVICES: Service[] = [
  { name: 'Corte Old School', price: 'Consulte' },
  { name: 'Barba na Navalha', price: 'Consulte' },
  { name: 'Corte + Barba', price: 'Consulte' },
  { name: 'Sobrancelha na Navalha', price: 'Consulte' },
  { name: 'Acabamento (Pezinho)', price: 'Consulte' },
  { name: 'Coloração', price: 'Consulte' },
]

export type GalleryItem = { alt: string; src?: string }

export const ABOUT_PHOTO: GalleryItem = {
  alt: 'Fachada da Barbearia Fio do Bigode',
}

export const GALLERY: GalleryItem[] = [
  { alt: 'Corte clássico na tesoura' },
  { alt: 'Barba feita na navalha' },
  { alt: 'Ambiente da barbearia' },
  { alt: 'Detalhe do balcão old school' },
  { alt: 'Cliente satisfeito com o corte' },
  { alt: 'Equipe Fio do Bigode' },
]
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/data/content.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/content.ts src/data/content.test.ts
git commit -m "feat: add site content data module"
```

---

### Task 5: `SeloReveal` Signature Divider Component

**Files:**
- Create: `src/components/SeloReveal.tsx`
- Test: `src/components/SeloReveal.test.tsx`

**Interfaces:**
- Consumes: `usePrefersReducedMotion` from `src/hooks/usePrefersReducedMotion.ts` (Task 3).
- Produces: `SeloReveal` component (named export) rendering a root element with `data-testid="selo-reveal"`. Used as a section divider by Sobre, Servicos, Galeria and Localizacao.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SeloReveal } from './SeloReveal'

describe('SeloReveal', () => {
  it('renders the divider medallion', () => {
    render(<SeloReveal />)
    expect(screen.getByTestId('selo-reveal')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/SeloReveal.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Write the implementation**

```tsx
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function SeloReveal() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="flex items-center justify-center gap-4 py-8" data-testid="selo-reveal">
      <span aria-hidden="true" className="h-px max-w-24 flex-1 bg-brass/30" />
      <motion.svg
        aria-hidden="true"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        initial={prefersReducedMotion ? false : { scale: 1.15, rotate: -4, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <circle cx="20" cy="20" r="18" fill="none" stroke="#c9a227" strokeWidth="1.5" />
        <line x1="10" y1="10" x2="30" y2="30" stroke="#c9a227" strokeWidth="1.5" />
        <line x1="30" y1="10" x2="10" y2="30" stroke="#c9a227" strokeWidth="1.5" />
      </motion.svg>
      <span aria-hidden="true" className="h-px max-w-24 flex-1 bg-brass/30" />
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/components/SeloReveal.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/SeloReveal.tsx src/components/SeloReveal.test.tsx
git commit -m "feat: add SeloReveal signature section divider"
```

---

### Task 6: Header Component (with mobile menu)

**Files:**
- Create: `src/components/Header.tsx`
- Test: `src/components/Header.test.tsx`

**Interfaces:**
- Consumes: `buildWhatsAppLink` (Task 2), `NAV_LINKS`, `SITE_INFO` and `WHATSAPP_GREETING` (Task 4).
- Produces: `Header` component (named export).

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  it('renders all nav links pointing at their sections', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: 'Sobre' })).toHaveAttribute('href', '#sobre')
    expect(screen.getByRole('link', { name: 'Serviços' })).toHaveAttribute('href', '#servicos')
    expect(screen.getByRole('link', { name: 'Galeria' })).toHaveAttribute('href', '#galeria')
    expect(screen.getByRole('link', { name: 'Localização' })).toHaveAttribute('href', '#localizacao')
  })

  it('renders a WhatsApp CTA pointing at the shop number', () => {
    render(<Header />)
    const cta = screen.getByRole('link', { name: 'WhatsApp' })
    expect(cta.getAttribute('href')).toContain('https://wa.me/5546991123543')
  })

  it('opens the mobile menu on toggle click', () => {
    render(<Header />)
    expect(screen.queryByLabelText('Navegação móvel')).not.toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Abrir menu'))

    expect(screen.getByLabelText('Navegação móvel')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/Header.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Write the implementation**

```tsx
import { useState } from 'react'
import { NAV_LINKS, SITE_INFO, WHATSAPP_GREETING } from '../data/content'
import { buildWhatsAppLink } from '../lib/whatsapp'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brass/20 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#top" className="shrink-0">
          <img src="/logo-transparent.png" alt={SITE_INFO.name} className="h-12 w-auto" />
        </a>

        <nav aria-label="Navegação principal" className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-[0.2em] text-paper transition-colors hover:text-brass"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={buildWhatsAppLink(WHATSAPP_GREETING)}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm bg-brass px-4 py-2 text-sm font-semibold uppercase tracking-wide text-ink"
          >
            WhatsApp
          </a>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={isMobileMenuOpen}
            className="text-paper md:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav
          aria-label="Navegação móvel"
          className="flex flex-col gap-4 border-t border-brass/20 bg-ink px-6 py-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-[0.2em] text-paper hover:text-brass"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/components/Header.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx src/components/Header.test.tsx
git commit -m "feat: add Header with WhatsApp CTA and mobile menu"
```

---

### Task 7: Hero Component

**Files:**
- Create: `src/components/Hero.tsx`
- Test: `src/components/Hero.test.tsx`

**Interfaces:**
- Consumes: `buildWhatsAppLink` (Task 2), `usePrefersReducedMotion` (Task 3), `SITE_INFO`, `TAGLINE` and `WHATSAPP_GREETING` (Task 4).
- Produces: `Hero` component (named export), rendering a `<section id="top">`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'
import { SITE_INFO, TAGLINE } from '../data/content'

describe('Hero', () => {
  it('renders the shop name as the main heading', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: SITE_INFO.name })).toBeInTheDocument()
  })

  it('renders the real tagline', () => {
    render(<Hero />)
    expect(screen.getByText(TAGLINE)).toBeInTheDocument()
  })

  it('renders a WhatsApp CTA', () => {
    render(<Hero />)
    const cta = screen.getByRole('link', { name: /agendar no whatsapp/i })
    expect(cta.getAttribute('href')).toContain('https://wa.me/5546991123543')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/Hero.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Write the implementation**

```tsx
import { motion } from 'framer-motion'
import { SITE_INFO, TAGLINE, WHATSAPP_GREETING } from '../data/content'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section
      id="top"
      className="grain-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center"
    >
      <motion.div
        aria-hidden="true"
        className="mb-8 h-24 w-24 rounded-full border-2 border-brass"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={prefersReducedMotion ? undefined : { duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <h1 className="font-display text-5xl font-black uppercase text-paper sm:text-6xl">
        {SITE_INFO.name}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-paper/80">{TAGLINE}</p>
      <a
        href={buildWhatsAppLink(WHATSAPP_GREETING)}
        target="_blank"
        rel="noreferrer"
        className="mt-10 rounded-sm bg-brass px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink shadow-lg"
      >
        Agendar no WhatsApp
      </a>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/components/Hero.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/Hero.test.tsx
git commit -m "feat: add Hero section"
```

---

### Task 8: Sobre (About) Component

**Files:**
- Create: `src/components/Sobre.tsx`
- Test: `src/components/Sobre.test.tsx`

**Interfaces:**
- Consumes: `SITE_INFO.foundedYear` and `ABOUT_PHOTO` (Task 4), `SeloReveal` (Task 5).
- Produces: `Sobre` component (named export), rendering a `<section id="sobre">`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sobre } from './Sobre'
import { SITE_INFO, ABOUT_PHOTO } from '../data/content'

describe('Sobre', () => {
  it('renders the founding year heading', () => {
    render(<Sobre />)
    expect(screen.getByRole('heading', { name: `Desde ${SITE_INFO.foundedYear}` })).toBeInTheDocument()
  })

  it('renders a labeled placeholder for the about photo (no real photo yet)', () => {
    render(<Sobre />)
    expect(screen.getByLabelText(ABOUT_PHOTO.alt)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/Sobre.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Write the implementation**

```tsx
import { SeloReveal } from './SeloReveal'
import { SITE_INFO, ABOUT_PHOTO } from '../data/content'

export function Sobre() {
  const yearsActive = new Date().getFullYear() - SITE_INFO.foundedYear

  return (
    <section id="sobre" className="bg-ink px-6 py-24 text-paper">
      <SeloReveal />
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
        {ABOUT_PHOTO.src ? (
          <img
            src={ABOUT_PHOTO.src}
            alt={ABOUT_PHOTO.alt}
            className="aspect-[4/5] w-full -rotate-2 rounded-sm object-cover shadow-xl"
          />
        ) : (
          <div
            role="img"
            aria-label={ABOUT_PHOTO.alt}
            className="flex aspect-[4/5] w-full -rotate-2 items-center justify-center rounded-sm bg-paper/10 text-center text-xs uppercase tracking-wide text-paper/50 shadow-xl"
          >
            Foto em breve
          </div>
        )}
        <div>
          <h2 className="font-display text-3xl font-black uppercase text-paper sm:text-4xl">
            Desde {SITE_INFO.foundedYear}
          </h2>
          <p className="mt-4 text-paper/80">
            Há {yearsActive} anos cuidando do visual de Pato Branco com técnica clássica de navalha,
            tesoura e muita conversa de barbearia.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/components/Sobre.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Sobre.tsx src/components/Sobre.test.tsx
git commit -m "feat: add Sobre section"
```

---

### Task 9: Serviços Component

**Files:**
- Create: `src/components/Servicos.tsx`
- Test: `src/components/Servicos.test.tsx`

**Interfaces:**
- Consumes: `SERVICES` (Task 4), `SeloReveal` (Task 5).
- Produces: `Servicos` component (named export), rendering a `<section id="servicos">`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Servicos } from './Servicos'
import { SERVICES } from '../data/content'

describe('Servicos', () => {
  it('renders every service name from content.ts', () => {
    render(<Servicos />)
    SERVICES.forEach((service) => {
      expect(screen.getByText(service.name)).toBeInTheDocument()
    })
  })

  it('renders a price for each service', () => {
    render(<Servicos />)
    const prices = screen.getAllByText('Consulte')
    expect(prices).toHaveLength(SERVICES.length)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/Servicos.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Write the implementation**

```tsx
import { SeloReveal } from './SeloReveal'
import { SERVICES } from '../data/content'

export function Servicos() {
  return (
    <section id="servicos" className="bg-ink px-6 py-24 text-paper">
      <SeloReveal />
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center font-display text-3xl font-black uppercase text-paper sm:text-4xl">
          Serviços
        </h2>
        <ul className="mt-10 space-y-5">
          {SERVICES.map((service) => (
            <li key={service.name} className="flex items-baseline gap-3">
              <span className="whitespace-nowrap">{service.name}</span>
              <span aria-hidden="true" className="h-px flex-1 border-b border-dotted border-brass/40" />
              <span className="whitespace-nowrap font-semibold text-brass">{service.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/components/Servicos.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Servicos.tsx src/components/Servicos.test.tsx
git commit -m "feat: add Servicos section"
```

---

### Task 10: Galeria Component

**Files:**
- Create: `src/components/Galeria.tsx`
- Test: `src/components/Galeria.test.tsx`

**Interfaces:**
- Consumes: `GALLERY` (Task 4), `SeloReveal` (Task 5).
- Produces: `Galeria` component (named export), rendering a `<section id="galeria">`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Galeria } from './Galeria'
import { GALLERY } from '../data/content'

describe('Galeria', () => {
  it('renders a labeled tile for every gallery item', () => {
    render(<Galeria />)
    GALLERY.forEach((item) => {
      const tile = item.src ? screen.getByAltText(item.alt) : screen.getByLabelText(item.alt)
      expect(tile).toBeInTheDocument()
    })
  })

  it('shows a graceful fallback for items without a real photo yet', () => {
    render(<Galeria />)
    const placeholderCount = GALLERY.filter((item) => !item.src).length
    expect(screen.getAllByText('Foto em breve')).toHaveLength(placeholderCount)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/Galeria.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Write the implementation**

```tsx
import { GALLERY } from '../data/content'
import { SeloReveal } from './SeloReveal'

export function Galeria() {
  return (
    <section id="galeria" className="bg-ink px-6 py-24 text-paper">
      <SeloReveal />
      <h2 className="text-center font-display text-3xl font-black uppercase text-paper sm:text-4xl">
        Galeria
      </h2>
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-3">
        {GALLERY.map((item, index) => (
          <div
            key={item.alt}
            className={`aspect-square rounded-sm bg-paper/10 p-2 shadow-lg transition-transform duration-300 hover:rotate-0 hover:scale-105 ${
              index % 2 === 0 ? '-rotate-2' : 'rotate-2'
            }`}
          >
            {item.src ? (
              <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
            ) : (
              <div
                role="img"
                aria-label={item.alt}
                className="flex h-full w-full items-center justify-center bg-ink/60 text-center text-xs uppercase tracking-wide text-paper/50"
              >
                Foto em breve
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/components/Galeria.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Galeria.tsx src/components/Galeria.test.tsx
git commit -m "feat: add Galeria section with graceful photo fallback"
```

---

### Task 11: Localização Component

**Files:**
- Create: `src/components/Localizacao.tsx`
- Test: `src/components/Localizacao.test.tsx`

**Interfaces:**
- Consumes: `buildWhatsAppLink` (Task 2), `SITE_INFO` and `WHATSAPP_GREETING` (Task 4), `SeloReveal` (Task 5).
- Produces: `Localizacao` component (named export), rendering a `<section id="localizacao">`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Localizacao } from './Localizacao'
import { SITE_INFO } from '../data/content'

describe('Localizacao', () => {
  it('renders the real address', () => {
    render(<Localizacao />)
    expect(screen.getByText(SITE_INFO.address)).toBeInTheDocument()
  })

  it('renders a tel: link for the landline', () => {
    render(<Localizacao />)
    expect(screen.getByRole('link', { name: SITE_INFO.landlineDisplay })).toHaveAttribute(
      'href',
      `tel:${SITE_INFO.landlineTel}`
    )
  })

  it('renders a labeled map iframe', () => {
    render(<Localizacao />)
    expect(screen.getByTitle(`Mapa de localização da ${SITE_INFO.name}`)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/Localizacao.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Write the implementation**

```tsx
import { SITE_INFO, WHATSAPP_GREETING } from '../data/content'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { SeloReveal } from './SeloReveal'

export function Localizacao() {
  return (
    <section id="localizacao" className="bg-ink px-6 py-24 text-paper">
      <SeloReveal />
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-black uppercase text-paper sm:text-4xl">
            Localização
          </h2>
          <p className="mt-4">{SITE_INFO.address}</p>
          <p className="mt-2 text-paper/70">{SITE_INFO.hoursPlaceholder}</p>
          <div className="mt-6 flex flex-col gap-2">
            <a href={`tel:${SITE_INFO.landlineTel}`} className="text-brass underline">
              {SITE_INFO.landlineDisplay}
            </a>
            <a
              href={buildWhatsAppLink(WHATSAPP_GREETING)}
              target="_blank"
              rel="noreferrer"
              className="text-brass underline"
            >
              {SITE_INFO.whatsappDisplay} (WhatsApp)
            </a>
          </div>
        </div>
        <iframe
          title={`Mapa de localização da ${SITE_INFO.name}`}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE_INFO.address)}&output=embed`}
          className="h-72 w-full rounded-sm border border-brass/20"
          loading="lazy"
        />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/components/Localizacao.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Localizacao.tsx src/components/Localizacao.test.tsx
git commit -m "feat: add Localizacao section"
```

---

### Task 12: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`
- Test: `src/components/Footer.test.tsx`

**Interfaces:**
- Consumes: `buildWhatsAppLink` (Task 2), `SITE_INFO` and `WHATSAPP_GREETING` (Task 4).
- Produces: `Footer` component (named export).

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'
import { SITE_INFO } from '../data/content'

describe('Footer', () => {
  it('renders the copyright line with the current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(
      screen.getByText(`© ${year} ${SITE_INFO.name}. Todos os direitos reservados.`)
    ).toBeInTheDocument()
  })

  it('links out to Instagram', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', SITE_INFO.instagram)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/Footer.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Write the implementation**

```tsx
import { SITE_INFO, WHATSAPP_GREETING } from '../data/content'
import { buildWhatsAppLink } from '../lib/whatsapp'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink px-6 py-10 text-center text-paper/70">
      <img src="/logo-transparent.png" alt={SITE_INFO.name} className="mx-auto h-10 w-auto" />
      <div className="mt-4 flex justify-center gap-6 text-sm">
        <a href={SITE_INFO.instagram} target="_blank" rel="noreferrer" className="hover:text-brass">
          Instagram
        </a>
        <a href={buildWhatsAppLink(WHATSAPP_GREETING)} target="_blank" rel="noreferrer" className="hover:text-brass">
          WhatsApp
        </a>
      </div>
      <p className="mt-4 text-xs">
        © {year} {SITE_INFO.name}. Todos os direitos reservados.
      </p>
    </footer>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/components/Footer.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx src/components/Footer.test.tsx
git commit -m "feat: add Footer section"
```

---

### Task 13: WhatsApp Floating Action Button

**Files:**
- Create: `src/components/WhatsAppFAB.tsx`
- Test: `src/components/WhatsAppFAB.test.tsx`

**Interfaces:**
- Consumes: `buildWhatsAppLink` (Task 2), `usePrefersReducedMotion` (Task 3), `WHATSAPP_GREETING` (Task 4).
- Produces: `WhatsAppFAB` component (named export).

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WhatsAppFAB } from './WhatsAppFAB'

describe('WhatsAppFAB', () => {
  it('renders a labeled link to WhatsApp', () => {
    render(<WhatsAppFAB />)
    const link = screen.getByRole('link', { name: 'Agendar horário pelo WhatsApp' })
    expect(link.getAttribute('href')).toContain('https://wa.me/5546991123543')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/WhatsAppFAB.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Write the implementation**

```tsx
import { motion } from 'framer-motion'
import { WHATSAPP_GREETING } from '../data/content'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function WhatsAppFAB() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <a
      href={buildWhatsAppLink(WHATSAPP_GREETING)}
      target="_blank"
      rel="noreferrer"
      aria-label="Agendar horário pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brass text-ink shadow-xl"
    >
      {!prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-2 border-brass"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm5.8 14.2c-.3.7-1.4 1.3-2 1.4-.5.1-1.1.2-3.5-.7-2.9-1.2-4.8-4.1-5-4.3-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.6c-.1.2-.2.3-.1.5.4.8 1 1.5 1.7 2.1.7.6 1.4 1 2.2 1.3.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.4.4.1.2.1.9-.2 1.6z" />
      </svg>
    </a>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/components/WhatsAppFAB.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/WhatsAppFAB.tsx src/components/WhatsAppFAB.test.tsx
git commit -m "feat: add floating WhatsApp button"
```

---

### Task 14: Assemble the Full Page

**Files:**
- Modify: `src/App.tsx` (replace the Task 1 scaffold placeholder)
- Modify: `src/App.test.tsx` (replace the Task 1 scaffold test)

**Interfaces:**
- Consumes: `Header` (Task 6), `Hero` (Task 7), `Sobre` (Task 8), `Servicos` (Task 9), `Galeria` (Task 10), `Localizacao` (Task 11), `Footer` (Task 12), `WhatsAppFAB` (Task 13).
- Produces: final `App` default export, rendered by `src/main.tsx` (unchanged from Task 1).

- [ ] **Step 1: Write the failing test**

Replace the contents of `src/App.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders every major section in document order', () => {
    render(<App />)
    const expectedOrder = ['top', 'sobre', 'servicos', 'galeria', 'localizacao']
    expectedOrder.forEach((id) => expect(document.getElementById(id)).not.toBeNull())

    const actualOrder = Array.from(document.querySelectorAll('[id]'))
      .map((el) => el.id)
      .filter((id) => expectedOrder.includes(id))
    expect(actualOrder).toEqual(expectedOrder)
  })

  it('renders the floating WhatsApp button', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Agendar horário pelo WhatsApp' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/App.test.tsx`
Expected: FAIL — `document.getElementById('sobre')` etc. are `null` because `App.tsx` still renders the Task 1 placeholder.

- [ ] **Step 3: Write the implementation**

Replace the contents of `src/App.tsx`:

```tsx
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Sobre } from './components/Sobre'
import { Servicos } from './components/Servicos'
import { Galeria } from './components/Galeria'
import { Localizacao } from './components/Localizacao'
import { Footer } from './components/Footer'
import { WhatsAppFAB } from './components/WhatsAppFAB'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Servicos />
        <Galeria />
        <Localizacao />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}

export default App
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/App.test.tsx`
Expected: PASS

- [ ] **Step 5: Run the full test suite**

Run: `pnpm test`
Expected: PASS — every test file from Tasks 1–14 green.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/App.test.tsx
git commit -m "feat: assemble full landing page from all sections"
```

---

### Task 15: Manual QA, Accessibility & Performance Verification

**Files:** none (verification only).

**Interfaces:** none.

- [ ] **Step 1: Type-check and build**

```bash
pnpm typecheck
pnpm build
```

Expected: both exit 0, no TypeScript errors, `dist/` produced.

- [ ] **Step 2: Serve the production build and open it**

```bash
pnpm preview
```

Open the printed URL (default `http://localhost:4173`) in a browser.

- [ ] **Step 3: Check responsive layout**

Resize the browser to 375px width. Confirm: the header collapses to the hamburger menu and it opens/closes correctly; Hero, Sobre, Servicos, Localização stack to a single column; Galeria shows at least a 2-column grid.

- [ ] **Step 4: Check `prefers-reduced-motion`**

Turn on OS-level reduced motion (Windows: Settings → Accessibility → Visual effects → turn off "Animation effects") and reload the page. Confirm: the hero badge stops rotating, the WhatsApp FAB's pulse ring disappears, and the SeloReveal dividers appear in their final state without an entrance animation.

- [ ] **Step 5: Check every WhatsApp CTA**

Click the WhatsApp link/button in the Header, Hero, Localização section, Footer, and the floating FAB. Confirm each one opens `https://wa.me/5546991123543` with the prefilled greeting text visible in the compose box.

- [ ] **Step 6: Check the landline link**

Click the phone number in Localização. Confirm the browser offers to dial `+55 46 3225-8653` (exact behavior depends on OS/browser telephony handling, but the `href` must be `tel:+554632258653`).

- [ ] **Step 7: Run Lighthouse**

In Chrome DevTools, open the Lighthouse panel against `http://localhost:4173`, run an audit for Performance, Accessibility, and Best Practices (mobile + desktop). Confirm all three score ≥ 90. If the Accessibility audit flags a contrast issue on any brass-on-ink or paper-on-ink text pairing, adjust that element's opacity/color token until it passes WCAG AA before proceeding.

- [ ] **Step 8: Stop the preview server, commit any fixes made during QA**

If Steps 3–7 required code changes, stage and commit them individually with descriptive messages (e.g. `fix: raise gallery placeholder text contrast for WCAG AA`). If no changes were needed, this task produces no commit — verification-only tasks are allowed to end without one.
