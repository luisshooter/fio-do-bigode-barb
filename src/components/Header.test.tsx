import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { Header } from './Header'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { WHATSAPP_GREETING } from '../data/content'

describe('Header', () => {
  it('renders all nav links pointing at their sections', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: 'Sobre' })).toHaveAttribute('href', '#sobre')
    expect(screen.getByRole('link', { name: 'Serviços' })).toHaveAttribute('href', '#servicos')
    expect(screen.getByRole('link', { name: 'Galeria' })).toHaveAttribute('href', '#galeria')
    expect(screen.getByRole('link', { name: 'Localização' })).toHaveAttribute('href', '#localizacao')
  })

  it('renders a WhatsApp CTA pointing at the shop number', () => {
    render(<Header />)
    const cta = screen.getByRole('link', { name: 'WhatsApp' })
    expect(cta.getAttribute('href')).toBe(buildWhatsAppLink(WHATSAPP_GREETING))
  })

  it('opens the mobile menu on toggle click', () => {
    render(<Header />)
    expect(screen.queryByLabelText('Navegação móvel')).not.toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Abrir menu'))

    expect(screen.getByLabelText('Navegação móvel')).toBeInTheDocument()
  })

  it('closes the mobile menu when a nav link is clicked', () => {
    render(<Header />)
    fireEvent.click(screen.getByLabelText('Abrir menu'))
    const mobileNav = screen.getByLabelText('Navegação móvel')
    expect(mobileNav).toBeInTheDocument()

    fireEvent.click(within(mobileNav).getByRole('link', { name: 'Sobre' }))
    expect(screen.queryByLabelText('Navegação móvel')).not.toBeInTheDocument()
  })

  it('starts transparent and switches to a solid background after scrolling', () => {
    render(<Header />)
    const header = document.querySelector('header')
    expect(header?.className).toContain('bg-transparent')

    Object.defineProperty(window, 'scrollY', { value: 150, configurable: true })
    fireEvent.scroll(window)

    expect(header?.className).toContain('bg-ink/80')
  })
})
