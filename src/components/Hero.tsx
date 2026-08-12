import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SITE_INFO, TAGLINE, WHATSAPP_GREETING } from '../data/content'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { AnimatedText } from './AnimatedText'

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
        <div
          aria-hidden="true"
          className={`mb-6 h-20 w-5 overflow-hidden rounded-full shadow-lg barber-pole ${
            prefersReducedMotion ? '' : 'barber-pole-spin'
          }`}
        />
        <div className="relative mb-8 flex items-center justify-center">
          <motion.span
            aria-hidden="true"
            className="absolute h-72 w-72 rounded-full border border-dotted border-brass/40"
            style={prefersReducedMotion ? undefined : { scale: ringScale }}
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={prefersReducedMotion ? undefined : { duration: 60, repeat: Infinity, ease: 'linear' }}
          />
          <img src="/logo-transparent.png" alt="" className="relative h-56 w-auto" />
        </div>
        <AnimatedText
          as="h1"
          text={SITE_INFO.name}
          className="font-display text-5xl font-black uppercase text-paper sm:text-6xl"
        />
        <p className="mt-4 max-w-xl text-lg text-paper/80">{TAGLINE}</p>
        <a
          href={buildWhatsAppLink(WHATSAPP_GREETING)}
          target="_blank"
          rel="noreferrer"
          className="mt-10 rounded-sm bg-brass px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink shadow-lg"
        >
          Agendar no WhatsApp
        </a>
      </motion.div>
    </section>
  )
}
