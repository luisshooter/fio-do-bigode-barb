import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'
import { SITE_INFO } from '../data/content'

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
})
