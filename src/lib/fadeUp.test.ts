import { describe, it, expect } from 'vitest'
import { fadeUpProps } from './fadeUp'

describe('fadeUpProps', () => {
  it('returns a fade+rise entrance state by default', () => {
    const props = fadeUpProps(false)
    expect(props.initial).toEqual({ opacity: 0, y: 28 })
    expect(props.whileInView).toEqual({ opacity: 1, y: 0 })
    expect(props.animate).toBeUndefined()
  })

  it('returns a static resting state when reduced motion is preferred', () => {
    const props = fadeUpProps(true)
    expect(props.initial).toEqual({ opacity: 1, y: 0 })
    expect(props.animate).toEqual({ opacity: 1, y: 0 })
    expect(props.whileInView).toBeUndefined()
    expect(props.viewport).toBeUndefined()
  })

  it('applies the given delay to the transition', () => {
    const props = fadeUpProps(false, 0.3)
    expect(props.transition.delay).toBe(0.3)
  })

  it('applies a custom distance, defaulting to a pure fade at distance 0', () => {
    const props = fadeUpProps(false, 0, 0)
    expect(props.initial).toEqual({ opacity: 0, y: 0 })
  })
})
