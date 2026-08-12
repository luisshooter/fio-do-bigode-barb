import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Servicos } from './Servicos'
import { SERVICES } from '../data/content'

describe('Servicos', () => {
  it('renders every service name from content.ts', () => {
    render(<Servicos />)
    SERVICES.forEach((service) => {
      expect(screen.getByText(service.name)).toBeInTheDocument()
    })
  })

  it('renders a price for each service', () => {
    render(<Servicos />)
    const prices = screen.getAllByText('Consulte')
    expect(prices).toHaveLength(SERVICES.length)
  })
})
