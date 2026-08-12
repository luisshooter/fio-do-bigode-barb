import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'
import { SITE_INFO, TAGLINE, WHATSAPP_GREETING } from '../data/content'
import { buildWhatsAppLink } from '../lib/whatsapp'

describe('Hero', () => {
  it('renders the shop name as the main heading', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { level: 1, name: SITE_INFO.name })
    expect(heading).toBeInTheDocument()
  })

  it('renders the real tagline', () => {
    render(<Hero />)
    expect(screen.getByText(TAGLINE)).toBeInTheDocument()
  })

  it('renders a WhatsApp CTA', () => {
    render(<Hero />)
    const cta = screen.getByRole('link', { name: /agendar no whatsapp/i })
    expect(cta.getAttribute('href')).toBe(buildWhatsAppLink(WHATSAPP_GREETING))
  })

  it('stops the badge rotation when reduced motion is preferred', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as unknown as typeof window.matchMedia

    const { getByTestId } = render(<Hero />)
    const badge = getByTestId('hero-ring')
    expect(badge).not.toHaveStyle({ transform: expect.stringContaining('rotate') })
  })
})
