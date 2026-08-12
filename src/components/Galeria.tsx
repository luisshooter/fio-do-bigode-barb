import { motion } from 'framer-motion'
import { GALLERY } from '../data/content'
import { SeloReveal } from './SeloReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { stampInProps } from '../lib/stampIn'

export function Galeria() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section id="galeria" className="bg-ink px-6 py-24 text-paper grain-overlay">
      <SeloReveal />
      <motion.h2
        className="text-center font-display text-3xl font-black uppercase text-paper sm:text-4xl"
        {...stampInProps(prefersReducedMotion)}
      >
        Galeria
      </motion.h2>
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-3">
        {GALLERY.map((item, index) => (
          <motion.div
            key={item.alt}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={prefersReducedMotion ? { opacity: 1 } : undefined}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
            viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div
              className={`aspect-square rounded-sm bg-paper/10 p-2 shadow-lg transition-transform duration-300 hover:rotate-0 hover:scale-105 ${
                index % 2 === 0 ? '-rotate-2' : 'rotate-2'
              }`}
            >
              {item.src ? (
                <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
              ) : (
                <div
                  role="img"
                  aria-label={item.alt}
                  className="flex h-full w-full items-center justify-center bg-ink/60 text-center text-xs uppercase tracking-wide text-paper/70"
                >
                  Foto em breve
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
