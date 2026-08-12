import { describe, it, expect } from 'vitest'
import { NAV_LINKS, SITE_INFO, WHATSAPP_GREETING, SERVICES, GALLERY } from './content'

describe('content', () => {
  it('has one nav link per main section, in page order', () => {
    expect(NAV_LINKS.map((link) => link.href)).toEqual([
      '#sobre',
      '#servicos',
      '#galeria',
      '#localizacao',
    ])
  })

  it('has the real shop contact info', () => {
    expect(SITE_INFO.address).toBe('Rua Jaciretã, 17 - Centro, Pato Branco - PR')
    expect(SITE_INFO.whatsappDisplay).toBe('(46) 99112-3543')
  })

  it('has a non-empty shared WhatsApp greeting', () => {
    expect(WHATSAPP_GREETING.length).toBeGreaterThan(0)
  })

  it('has at least one service, each with a name and a price', () => {
    expect(SERVICES.length).toBeGreaterThan(0)
    SERVICES.forEach((service) => {
      expect(service.name.length).toBeGreaterThan(0)
      expect(service.price.length).toBeGreaterThan(0)
    })
  })

  it('has at least 6 gallery slots ready for real photos', () => {
    expect(GALLERY.length).toBeGreaterThanOrEqual(6)
  })
})
