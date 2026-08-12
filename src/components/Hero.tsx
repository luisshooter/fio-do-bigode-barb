import { motion } from 'framer-motion'
import { SITE_INFO, TAGLINE, WHATSAPP_GREETING } from '../data/content'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section
      id="top"
      className="grain-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center"
    >
      <motion.div
        aria-hidden="true"
        className="mb-8 h-24 w-24 rounded-full border-2 border-brass"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={prefersReducedMotion ? undefined : { duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <h1 className="font-display text-5xl font-black uppercase text-paper sm:text-6xl">
        {SITE_INFO.name}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-paper/80">{TAGLINE}</p>
      <a
        href={buildWhatsAppLink(WHATSAPP_GREETING)}
        target="_blank"
        rel="noreferrer"
        className="mt-10 rounded-sm bg-brass px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink shadow-lg"
      >
        Agendar no WhatsApp
      </a>
    </section>
  )
}
