import { motion } from 'framer-motion'
import { SITE_INFO, TAGLINE, SUBTAGLINE, WHATSAPP_GREETING } from '../data/content'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { AnimatedText } from './AnimatedText'
import { fadeUpProps } from '../lib/fadeUp'

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section
      id="top"
      className="grain-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center"
    >
      <span
        aria-hidden="true"
        data-testid="hero-ring-1"
        className="absolute rounded-full border border-dashed border-brass/25"
        style={{
          top: '-10%',
          right: '-6%',
          width: '340px',
          height: '340px',
          animation: prefersReducedMotion ? undefined : 'spin-slow 60s linear infinite',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute rounded-full border border-dashed border-brass/18"
        style={{
          bottom: '-8%',
          left: '-8%',
          width: '260px',
          height: '260px',
          animation: prefersReducedMotion ? undefined : 'spin-slow 50s linear infinite reverse',
        }}
      />

      <motion.div
        aria-hidden="true"
        {...fadeUpProps(prefersReducedMotion, 0.1)}
        className={`mb-7 overflow-hidden rounded-full shadow-lg barber-pole ${
          prefersReducedMotion ? '' : 'barber-pole-spin'
        }`}
        style={{ width: '18px', height: '120px' }}
      />

      <motion.img
        src="/logo-transparent.png"
        alt=""
        className="relative mb-5 object-contain"
        style={{ width: '170px', height: '170px' }}
        initial={
          prefersReducedMotion ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 1.3, rotate: -8 }
        }
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 0.9,
          delay: prefersReducedMotion ? 0 : 0.3,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      />

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
    </section>
  )
}
