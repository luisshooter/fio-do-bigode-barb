import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'
import { SITE_INFO, TAGLINE } from '../data/content'

describe('Hero', () => {
  it('renders the shop name as the main heading', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: SITE_INFO.name })).toBeInTheDocument()
  })

  it('renders the real tagline', () => {
    render(<Hero />)
    expect(screen.getByText(TAGLINE)).toBeInTheDocument()
  })

  it('renders a WhatsApp CTA', () => {
    render(<Hero />)
    const cta = screen.getByRole('link', { name: /agendar no whatsapp/i })
    expect(cta.getAttribute('href')).toContain('https://wa.me/5546991123543')
  })
})
