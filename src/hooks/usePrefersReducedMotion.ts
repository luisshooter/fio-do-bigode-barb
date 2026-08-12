import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

// Local preview convenience only: appending ?motion=on to the URL forces
// animations on even if the OS/browser has reduced motion enabled, so the
// animated path can be previewed without changing a real accessibility
// setting. Real site visitors never use this — it's not linked anywhere.
function isForcedMotionOn(): boolean {
  return typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('motion') === 'on'
}

export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(
    () => !isForcedMotionOn() && typeof window !== 'undefined' && window.matchMedia(QUERY).matches
  )

  useEffect(() => {
    if (isForcedMotionOn()) return
    const mediaQuery = window.matchMedia(QUERY)
    const handleChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReduced
}
