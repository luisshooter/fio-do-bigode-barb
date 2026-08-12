import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SeloReveal } from './SeloReveal'

describe('SeloReveal', () => {
  it('renders the divider medallion', () => {
    render(<SeloReveal />)
    expect(screen.getByTestId('selo-reveal')).toBeInTheDocument()
  })

  it('skips the entrance animation and renders the final state when reduced motion is preferred', () => {
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

    render(<SeloReveal />)
    const svg = screen.getByTestId('selo-reveal').querySelector('svg')
    expect(svg).toHaveStyle({ opacity: '1' })
  })
})
