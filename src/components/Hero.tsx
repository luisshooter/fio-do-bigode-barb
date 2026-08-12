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
      <div className="relative mb-8 flex items-center justify-center">
        <motion.span
          aria-hidden="true"
          className="absolute h-72 w-72 rounded-full border border-dotted border-brass/40"
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={prefersReducedMotion ? undefined : { duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <img src="/logo-transparent.png" alt="" className="relative h-56 w-auto" />
      </div>
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
