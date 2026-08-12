import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sobre } from './Sobre'
import { SITE_INFO, ABOUT_PHOTO } from '../data/content'

describe('Sobre', () => {
  it('renders the founding year heading', () => {
    render(<Sobre />)
    expect(screen.getByRole('heading', { name: `Desde ${SITE_INFO.foundedYear}` })).toBeInTheDocument()
  })

  it('renders the real about photo', () => {
    render(<Sobre />)
    expect(screen.getByAltText(ABOUT_PHOTO.alt)).toHaveAttribute('src', ABOUT_PHOTO.src)
  })
})
