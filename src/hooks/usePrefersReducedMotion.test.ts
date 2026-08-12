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

  it('forces motion on via ?motion=on even when the media query matches', () => {
    mockMatchMedia(true)
    window.history.pushState({}, '', '/?motion=on')
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
    window.history.pushState({}, '', '/')
  })
})
