import { motion } from 'framer-motion'
import { SeloReveal } from './SeloReveal'
import { SERVICES, WHATSAPP_GREETING } from '../data/content'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { fadeUpProps } from '../lib/fadeUp'

export function Servicos() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section id="servicos" className="bg-ink px-6 py-24 text-paper grain-overlay">
      <SeloReveal />
      <div className="mx-auto max-w-2xl">
        <motion.h2
          {...fadeUpProps(prefersReducedMotion)}
          className="text-center font-display text-3xl font-black uppercase text-paper sm:text-4xl"
        >
          Serviços
        </motion.h2>
        <motion.p
          {...fadeUpProps(prefersReducedMotion, 0.1)}
          className="mt-3 text-center text-sm uppercase tracking-wide text-paper/70"
        >
          Tabela na cadeira — valor você confirma na hora
        </motion.p>
        <motion.ul {...fadeUpProps(prefersReducedMotion, 0.2)} className="mt-10 space-y-5">
          {SERVICES.map((service) => (
            <li key={service.name} className="flex items-baseline gap-3">
              <span className="whitespace-nowrap">{service.name}</span>
              <span aria-hidden="true" className="h-px flex-1 border-b border-dotted border-brass/40" />
              <span className="whitespace-nowrap font-semibold text-brass">{service.price}</span>
            </li>
          ))}
        </motion.ul>
        <motion.div {...fadeUpProps(prefersReducedMotion, 0.3)} className="mt-8 flex justify-center">
          <a
            href={buildWhatsAppLink(WHATSAPP_GREETING)}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-brass px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-brass transition-colors hover:bg-brass hover:text-ink"
          >
            Chama no zap e marca
          </a>
        </motion.div>
      </div>
    </section>
  )
}
