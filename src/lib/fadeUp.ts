export function fadeUpProps(prefersReducedMotion: boolean, delay = 0, distance = 28) {
  const restingState = { opacity: 1, y: 0 }

  return {
    initial: prefersReducedMotion ? restingState : { opacity: 0, y: distance },
    animate: prefersReducedMotion ? restingState : undefined,
    whileInView: prefersReducedMotion ? undefined : restingState,
    viewport: prefersReducedMotion ? undefined : { once: true, amount: 0.15 },
    transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  }
}
