import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { stampInProps } from '../lib/stampIn'

export function SeloReveal() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="flex items-center justify-center gap-4 py-8" data-testid="selo-reveal">
      <span aria-hidden="true" className="h-px max-w-24 flex-1 border-t border-dotted border-brass/30" />
      <motion.svg
        aria-hidden="true"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        className="text-brass"
        {...stampInProps(prefersReducedMotion)}
      >
        <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="10" x2="30" y2="30" stroke="currentColor" strokeWidth="1.5" />
        <line x1="30" y1="10" x2="10" y2="30" stroke="currentColor" strokeWidth="1.5" />
      </motion.svg>
      <span aria-hidden="true" className="h-px max-w-24 flex-1 border-t border-dotted border-brass/30" />
    </div>
  )
}
