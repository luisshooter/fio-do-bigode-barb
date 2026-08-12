import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App scaffold', () => {
  it('renders the app root landmark', () => {
    render(<App />)
    expect(screen.getByTestId('app-root')).toBeInTheDocument()
  })
})
