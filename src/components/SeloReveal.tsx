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
