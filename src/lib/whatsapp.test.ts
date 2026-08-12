import { describe, it, expect } from 'vitest'
import { buildWhatsAppLink, WHATSAPP_NUMBER } from './whatsapp'

describe('buildWhatsAppLink', () => {
  it('returns the bare wa.me link when no message is given', () => {
    expect(buildWhatsAppLink()).toBe(`https://wa.me/${WHATSAPP_NUMBER}`)
  })

  it('appends a URL-encoded prefilled message', () => {
    const link = buildWhatsAppLink('Olá! Quero agendar.')
    expect(link).toBe(`https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1!%20Quero%20agendar.`)
  })
})
