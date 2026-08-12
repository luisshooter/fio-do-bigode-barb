import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SITE_INFO, TAGLINE, SUBTAGLINE, WHATSAPP_GREETING } from '../data/content'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { AnimatedText } from './AnimatedText'
import { fadeUpProps } from '../lib/fadeUp'

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.4])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="grain-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center"
    >
      <motion.div
        style={prefersReducedMotion ? undefined : { opacity: contentOpacity, y: contentY }}
        className="flex flex-col items-center"
      >
        <motion.div
          aria-hidden="true"
          {...fadeUpProps(prefersReducedMotion, 0.1)}
          className={`mb-6 h-20 w-5 overflow-hidden rounded-full shadow-lg barber-pole ${
            prefersReducedMotion ? '' : 'barber-pole-spin'
          }`}
        />
        <div className="relative mb-8 flex items-center justify-center">
          <motion.span
            aria-hidden="true"
            data-testid="hero-ring"
            className="absolute h-72 w-72 rounded-full border border-dotted border-brass/40"
            style={prefersReducedMotion ? undefined : { scale: ringScale }}
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={prefersReducedMotion ? undefined : { duration: 60, repeat: Infinity, ease: 'linear' }}
          />
          <motion.img
            src="/logo-transparent.png"
            alt=""
            className="relative h-56 w-auto"
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1, rotate: 0 }
                : { opacity: 0, scale: 1.3, rotate: -8 }
            }
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.9,
              delay: prefersReducedMotion ? 0 : 0.3,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          />
        </div>
        <motion.div {...fadeUpProps(prefersReducedMotion, 0.6)}>
          <AnimatedText
            as="h1"
            text={SITE_INFO.name}
            className="font-display text-5xl font-black uppercase text-paper sm:text-6xl"
          />
        </motion.div>
        <motion.p {...fadeUpProps(prefersReducedMotion, 0.8)} className="mt-4 max-w-xl text-lg text-paper/80">
          {TAGLINE}
        </motion.p>
        <motion.p
          {...fadeUpProps(prefersReducedMotion, 0.95)}
          className="mt-2 text-sm uppercase tracking-[0.15em] text-brass"
        >
          {SUBTAGLINE}
        </motion.p>
        <motion.a
          {...fadeUpProps(prefersReducedMotion, 1.1)}
          href={buildWhatsAppLink(WHATSAPP_GREETING)}
          target="_blank"
          rel="noreferrer"
          className="mt-10 rounded-sm bg-brass px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink shadow-lg"
        >
          Agendar no WhatsApp
        </motion.a>
      </motion.div>
    </section>
  )
}
