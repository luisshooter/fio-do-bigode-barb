import { describe, it, expect } from 'vitest'
import { stampInProps } from './stampIn'

describe('stampInProps', () => {
  it('returns an animated entrance state by default', () => {
    const props = stampInProps(false)
    expect(props.initial).toEqual({ scale: 1.15, rotate: -4, opacity: 0 })
    expect(props.whileInView).toEqual({ scale: 1, rotate: 0, opacity: 1 })
    expect(props.animate).toBeUndefined()
  })

  it('returns a static resting state when reduced motion is preferred', () => {
    const props = stampInProps(true)
    expect(props.initial).toEqual({ scale: 1, rotate: 0, opacity: 1 })
    expect(props.animate).toEqual({ scale: 1, rotate: 0, opacity: 1 })
    expect(props.whileInView).toBeUndefined()
    expect(props.viewport).toBeUndefined()
  })

  it('applies the given delay to the transition', () => {
    const props = stampInProps(false, 0.3)
    expect(props.transition.delay).toBe(0.3)
  })
})
