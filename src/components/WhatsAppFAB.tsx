import { motion } from 'framer-motion'
import { WHATSAPP_GREETING } from '../data/content'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function WhatsAppFAB() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <a
      href={buildWhatsAppLink(WHATSAPP_GREETING)}
      target="_blank"
      rel="noreferrer"
      aria-label="Agendar horário pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brass text-ink shadow-xl"
    >
      {!prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-2 border-brass"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm5.8 14.2c-.3.7-1.4 1.3-2 1.4-.5.1-1.1.2-3.5-.7-2.9-1.2-4.8-4.1-5-4.3-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.6c-.1.2-.2.3-.1.5.4.8 1 1.5 1.7 2.1.7.6 1.4 1 2.2 1.3.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.4.4.1.2.1.9-.2 1.6z" />
      </svg>
    </a>
  )
}
