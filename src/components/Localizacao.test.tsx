import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Localizacao } from './Localizacao'
import { SITE_INFO } from '../data/content'

describe('Localizacao', () => {
  it('renders the real address', () => {
    render(<Localizacao />)
    expect(screen.getByText(SITE_INFO.address)).toBeInTheDocument()
  })

  it('renders a tel: link for the landline', () => {
    render(<Localizacao />)
    expect(screen.getByRole('link', { name: SITE_INFO.landlineDisplay })).toHaveAttribute(
      'href',
      `tel:${SITE_INFO.landlineTel}`
    )
  })

  it('renders a labeled map iframe', () => {
    render(<Localizacao />)
    expect(screen.getByTitle(`Mapa de localização da ${SITE_INFO.name}`)).toBeInTheDocument()
  })
})
