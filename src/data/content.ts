export type NavLink = { label: string; href: string }

export const NAV_LINKS: NavLink[] = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Localização', href: '#localizacao' },
]

export const SITE_INFO = {
  name: 'Barbearia Fio do Bigode',
  address: 'Rua Jaciretã, 17 - Centro, Pato Branco - PR',
  whatsappDisplay: '(46) 99112-3543',
  landlineDisplay: '(46) 3225-8653',
  landlineTel: '+554632258653',
  instagram: 'https://www.instagram.com/fiodobigodebarbearia',
  hoursPlaceholder: 'Segunda a Sábado — confirme o horário pelo WhatsApp',
  foundedYear: 2015,
}

export const TAGLINE = 'Cuidar do seu estilo é o nosso negócio.'

export const WHATSAPP_GREETING = 'Olá! Vim pelo site e quero agendar um horário na Fio do Bigode.'

export type Service = { name: string; price: string }

// Nomes de serviço seguem a linha old school clássica da barbearia.
// Preços ainda não confirmados pelo cliente: usar "Consulte" até a
// barbearia enviar a tabela de preços definitiva (ver Open Items no spec).
export const SERVICES: Service[] = [
  { name: 'Corte Old School', price: 'Consulte' },
  { name: 'Barba na Navalha', price: 'Consulte' },
  { name: 'Corte + Barba', price: 'Consulte' },
  { name: 'Sobrancelha na Navalha', price: 'Consulte' },
  { name: 'Acabamento (Pezinho)', price: 'Consulte' },
  { name: 'Coloração', price: 'Consulte' },
]

export type GalleryItem = { alt: string; src?: string }

export const ABOUT_PHOTO: GalleryItem = {
  alt: 'Fachada da Barbearia Fio do Bigode',
}

export const GALLERY: GalleryItem[] = [
  { alt: 'Corte clássico na tesoura' },
  { alt: 'Barba feita na navalha' },
  { alt: 'Ambiente da barbearia' },
  { alt: 'Detalhe do balcão old school' },
  { alt: 'Cliente satisfeito com o corte' },
  { alt: 'Equipe Fio do Bigode' },
]
