import { SITE_INFO, WHATSAPP_GREETING } from '../data/content'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { SeloReveal } from './SeloReveal'

export function Localizacao() {
  return (
    <section id="localizacao" className="bg-ink px-6 py-24 text-paper">
      <SeloReveal />
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-black uppercase text-paper sm:text-4xl">
            Localização
          </h2>
          <p className="mt-4">{SITE_INFO.address}</p>
          <p className="mt-2 text-paper/70">{SITE_INFO.hoursPlaceholder}</p>
          <div className="mt-6 flex flex-col gap-2">
            <a href={`tel:${SITE_INFO.landlineTel}`} className="text-brass underline">
              {SITE_INFO.landlineDisplay}
            </a>
            <a
              href={buildWhatsAppLink(WHATSAPP_GREETING)}
              target="_blank"
              rel="noreferrer"
              className="text-brass underline"
            >
              {SITE_INFO.whatsappDisplay} (WhatsApp)
            </a>
          </div>
        </div>
        <iframe
          title={`Mapa de localização da ${SITE_INFO.name}`}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE_INFO.address)}&output=embed`}
          className="h-72 w-full rounded-sm border border-brass/20"
          loading="lazy"
        />
      </div>
    </section>
  )
}
