import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WhatsAppFAB } from './WhatsAppFAB'

describe('WhatsAppFAB', () => {
  it('renders a labeled link to WhatsApp', () => {
    render(<WhatsAppFAB />)
    const link = screen.getByRole('link', { name: 'Agendar horário pelo WhatsApp' })
    expect(link.getAttribute('href')).toContain('https://wa.me/5546991123543')
  })
})
