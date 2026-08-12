import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WhatsAppFAB } from './WhatsAppFAB'

describe('WhatsAppFAB', () => {
  it('renders a labeled link to WhatsApp', () => {
    render(<WhatsAppFAB />)
    const link = screen.getByRole('link', { name: 'Agendar horário pelo WhatsApp' })
    expect(link.getAttribute('href')).toContain('https://wa.me/5546991123543')
  })

  it('removes the pulse ring entirely when reduced motion is preferred', () => {
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

    render(<WhatsAppFAB />)
    const link = screen.getByRole('link', { name: 'Agendar horário pelo WhatsApp' })
    expect(link.querySelectorAll('span').length).toBe(0)
  })
})
