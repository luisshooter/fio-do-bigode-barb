import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avaliacoes } from './Avaliacoes'
import { GOOGLE_RATING, CURATED_REVIEWS } from '../data/reviews'

describe('Avaliacoes', () => {
  it('renders the real Google rating and review count', () => {
    render(<Avaliacoes />)
    expect(
      screen.getByText(new RegExp(`${GOOGLE_RATING.reviewCount} avaliações`))
    ).toBeInTheDocument()
  })

  it('renders every curated review quote and author', () => {
    render(<Avaliacoes />)
    CURATED_REVIEWS.forEach((review) => {
      expect(screen.getByText(new RegExp(review.quote.slice(0, 20)))).toBeInTheDocument()
      expect(screen.getByText(review.author)).toBeInTheDocument()
    })
  })

  it('links out to the real Google Maps listing', () => {
    render(<Avaliacoes />)
    expect(
      screen.getByRole('link', { name: 'Ver todas as avaliações no Google' })
    ).toHaveAttribute('href', GOOGLE_RATING.googleMapsUri)
  })
})
