import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Galeria } from './Galeria'
import { GALLERY } from '../data/content'

describe('Galeria', () => {
  it('renders a labeled tile for every gallery item', () => {
    render(<Galeria />)
    GALLERY.forEach((item) => {
      const tile = item.src ? screen.getByAltText(item.alt) : screen.getByLabelText(item.alt)
      expect(tile).toBeInTheDocument()
    })
  })

  it('shows a graceful fallback for items without a real photo yet', () => {
    render(<Galeria />)
    const placeholderCount = GALLERY.filter((item) => !item.src).length
    expect(screen.getAllByText('Foto em breve')).toHaveLength(placeholderCount)
  })
})
