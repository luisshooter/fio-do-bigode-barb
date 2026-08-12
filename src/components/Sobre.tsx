import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SeloReveal } from './SeloReveal'
import { SITE_INFO, ABOUT_PHOTO } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { fadeUpProps } from '../lib/fadeUp'

export function Sobre() {
  const yearsActive = new Date().getFullYear() - SITE_INFO.foundedYear
  const prefersReducedMotion = usePrefersReducedMotion()
  const photoRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], [-24, 24])

  return (
    <section id="sobre" className="bg-ink px-6 py-24 text-paper grain-overlay">
      <SeloReveal />
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
        <motion.div ref={photoRef} style={prefersReducedMotion ? undefined : { y: photoY }}>
          <motion.div
            initial={
              prefersReducedMotion
                ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0 }
                : { clipPath: 'inset(0% 0% 0% 100%)', opacity: 0, y: 28 }
            }
            whileInView={
              prefersReducedMotion ? undefined : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0 }
            }
            animate={
              prefersReducedMotion ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0 } : undefined
            }
            viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          >
            {ABOUT_PHOTO.src ? (
              <img
                src={ABOUT_PHOTO.src}
                alt={ABOUT_PHOTO.alt}
                className="aspect-[4/5] w-full -rotate-2 rounded-sm object-cover shadow-xl"
              />
            ) : (
              <div
                role="img"
                aria-label={ABOUT_PHOTO.alt}
                className="flex aspect-[4/5] w-full -rotate-2 items-center justify-center rounded-sm bg-paper/10 text-center text-xs uppercase tracking-wide text-paper/70 shadow-xl"
              >
                Foto em breve
              </div>
            )}
          </motion.div>
        </motion.div>
        <motion.div {...fadeUpProps(prefersReducedMotion)}>
          <h2 className="font-display text-3xl font-black uppercase text-paper sm:text-4xl">
            Desde {SITE_INFO.foundedYear}
          </h2>
          <p className="mt-4 text-paper/80">
            Há {yearsActive} anos cuidando do visual de Pato Branco com técnica clássica de navalha,
            tesoura e muita conversa de barbearia.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
