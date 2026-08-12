export function stampInProps(prefersReducedMotion: boolean, delay = 0) {
  const restingState = { scale: 1, rotate: 0, opacity: 1 }

  return {
    initial: prefersReducedMotion ? restingState : { scale: 1.15, rotate: -4, opacity: 0 },
    animate: prefersReducedMotion ? restingState : undefined,
    whileInView: prefersReducedMotion ? undefined : restingState,
    viewport: prefersReducedMotion ? undefined : { once: true, amount: 0.4 },
    transition: { duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] as const },
  }
}
