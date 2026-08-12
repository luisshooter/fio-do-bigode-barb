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
