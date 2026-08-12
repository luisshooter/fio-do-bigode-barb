import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'
import { SITE_INFO, WHATSAPP_GREETING } from '../data/content'
import { buildWhatsAppLink } from '../lib/whatsapp'

describe('Footer', () => {
  it('renders the copyright line with the current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(
      screen.getByText(`© ${year} ${SITE_INFO.name}. Todos os direitos reservados.`)
    ).toBeInTheDocument()
  })

  it('links out to Instagram', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', SITE_INFO.instagram)
  })

  it('links out to WhatsApp with the shared greeting', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'WhatsApp' }).getAttribute('href')).toBe(
      buildWhatsAppLink(WHATSAPP_GREETING)
    )
  })

  it('renders a tel: link for the landline', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: SITE_INFO.landlineDisplay })).toHaveAttribute(
      'href',
      `tel:${SITE_INFO.landlineTel}`
    )
  })
})
