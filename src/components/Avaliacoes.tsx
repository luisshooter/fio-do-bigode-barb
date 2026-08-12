import { motion } from 'framer-motion'
import { GOOGLE_RATING, CURATED_REVIEWS } from '../data/reviews'
import { SeloReveal } from './SeloReveal'
import { stampInProps } from '../lib/stampIn'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Avaliacoes() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const formattedRating = GOOGLE_RATING.rating.toFixed(1).replace('.', ',')

  return (
    <section id="avaliacoes" className="bg-ink px-6 py-24 text-paper grain-overlay">
      <SeloReveal />
      <motion.h2
        className="text-center font-display text-3xl font-black uppercase text-paper sm:text-4xl"
        {...stampInProps(prefersReducedMotion)}
      >
        Avaliações
      </motion.h2>
      <p className="mt-4 text-center text-lg">
        <span className="font-semibold text-brass">{formattedRating} ★</span>{' '}
        <span className="text-paper/70">
          ({GOOGLE_RATING.reviewCount} avaliações no Google)
        </span>
      </p>
      <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
        {CURATED_REVIEWS.map((review, index) => (
          <motion.blockquote
            key={review.author}
            className="rounded-sm bg-paper/5 p-6 shadow-lg"
            {...stampInProps(prefersReducedMotion, index * 0.08)}
          >
            <p className="text-paper/90">&ldquo;{review.quote}&rdquo;</p>
            <footer className="mt-4 text-sm text-brass">
              {review.author}
              <span className="block text-xs text-paper/50">{review.meta}</span>
            </footer>
          </motion.blockquote>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <a
          href={GOOGLE_RATING.googleMapsUri}
          target="_blank"
          rel="noreferrer"
          className="rounded-sm border border-brass/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-brass transition-colors hover:bg-brass hover:text-ink"
        >
          Ver todas as avaliações no Google
        </a>
      </div>
    </section>
  )
}
