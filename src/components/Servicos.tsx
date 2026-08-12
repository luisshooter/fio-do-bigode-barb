import { SeloReveal } from './SeloReveal'
import { SERVICES } from '../data/content'

export function Servicos() {
  return (
    <section id="servicos" className="bg-ink px-6 py-24 text-paper">
      <SeloReveal />
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center font-display text-3xl font-black uppercase text-paper sm:text-4xl">
          Serviços
        </h2>
        <ul className="mt-10 space-y-5">
          {SERVICES.map((service) => (
            <li key={service.name} className="flex items-baseline gap-3">
              <span className="whitespace-nowrap">{service.name}</span>
              <span aria-hidden="true" className="h-px flex-1 border-b border-dotted border-brass/40" />
              <span className="whitespace-nowrap font-semibold text-brass">{service.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
