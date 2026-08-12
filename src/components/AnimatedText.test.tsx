import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { AnimatedText } from './AnimatedText'

describe('AnimatedText', () => {
  it('renders the full text content, split into per-word animated spans', () => {
    const { container } = render(<AnimatedText text="Barbearia Fio do Bigode" as="h1" />)
    expect(container.textContent?.trim()).toBe('Barbearia Fio do Bigode')
    expect(container.querySelectorAll('span').length).toBeGreaterThan(0)
  })

  it('renders plain static text with no animation wrapper spans when reduced motion is preferred', () => {
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

    const { container } = render(<AnimatedText text="Barbearia Fio do Bigode" as="h1" />)
    expect(container.textContent?.trim()).toBe('Barbearia Fio do Bigode')
    expect(container.querySelectorAll('span').length).toBe(0)
  })
})
