import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SeloReveal } from './SeloReveal'

describe('SeloReveal', () => {
  it('renders the divider medallion', () => {
    render(<SeloReveal />)
    expect(screen.getByTestId('selo-reveal')).toBeInTheDocument()
  })
})
