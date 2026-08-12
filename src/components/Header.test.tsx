import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from './Header'

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
    expect(cta.getAttribute('href')).toContain('https://wa.me/5546991123543')
  })

  it('opens the mobile menu on toggle click', () => {
    render(<Header />)
    expect(screen.queryByLabelText('Navegação móvel')).not.toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Abrir menu'))

    expect(screen.getByLabelText('Navegação móvel')).toBeInTheDocument()
  })
})
