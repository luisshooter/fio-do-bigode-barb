import { motion } from 'framer-motion'
import { SeloReveal } from './SeloReveal'
import { SERVICES } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { stampInProps } from '../lib/stampIn'

export function Servicos() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section id="servicos" className="bg-ink px-6 py-24 text-paper grain-overlay">
      <SeloReveal />
      <div className="mx-auto max-w-2xl">
        <motion.h2
          className="text-center font-display text-3xl font-black uppercase text-paper sm:text-4xl"
          {...stampInProps(prefersReducedMotion)}
        >
          Serviços
        </motion.h2>
        <ul className="mt-10 space-y-5">
          {SERVICES.map((service, index) => (
            <motion.li
              key={service.name}
              className="flex items-baseline gap-3"
              {...stampInProps(prefersReducedMotion, index * 0.06)}
            >
              <span className="whitespace-nowrap">{service.name}</span>
              <motion.span
                aria-hidden="true"
                className="h-px flex-1 border-b border-dotted border-brass/40"
                initial={prefersReducedMotion ? { width: '100%' } : { width: '0%' }}
                animate={prefersReducedMotion ? { width: '100%' } : undefined}
                whileInView={prefersReducedMotion ? undefined : { width: '100%' }}
                viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.8 }}
                transition={{ duration: 0.6, delay: index * 0.06 + 0.2, ease: 'easeOut' }}
              />
              <span className="whitespace-nowrap font-semibold text-brass">{service.price}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
