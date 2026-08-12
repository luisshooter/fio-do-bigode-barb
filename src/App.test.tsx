import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders every major section in document order', () => {
    render(<App />)
    const expectedOrder = ['top', 'sobre', 'servicos', 'galeria', 'avaliacoes', 'localizacao']
    expectedOrder.forEach((id) => expect(document.getElementById(id)).not.toBeNull())

    const actualOrder = Array.from(document.querySelectorAll('[id]'))
      .map((el) => el.id)
      .filter((id) => expectedOrder.includes(id))
    expect(actualOrder).toEqual(expectedOrder)
  })

  it('renders the floating WhatsApp button', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Agendar horário pelo WhatsApp' })).toBeInTheDocument()
  })
})
