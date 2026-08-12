import { SITE_INFO, WHATSAPP_GREETING } from '../data/content'
import { buildWhatsAppLink } from '../lib/whatsapp'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink px-6 py-10 text-center text-paper/70">
      <img
        src="/logo-transparent.png"
        alt={SITE_INFO.name}
        className="mx-auto h-10 w-auto"
        width={40}
        height={41}
      />
      <div className="mt-4 flex justify-center gap-6 text-sm">
        <a href={SITE_INFO.instagram} target="_blank" rel="noreferrer" className="hover:text-brass">
          Instagram
        </a>
        <a href={buildWhatsAppLink(WHATSAPP_GREETING)} target="_blank" rel="noreferrer" className="hover:text-brass">
          WhatsApp
        </a>
      </div>
      <p className="mt-4 text-xs">
        © {year} {SITE_INFO.name}. Todos os direitos reservados.
      </p>
    </footer>
  )
}
