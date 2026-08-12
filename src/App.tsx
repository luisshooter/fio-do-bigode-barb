import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Sobre } from './components/Sobre'
import { Servicos } from './components/Servicos'
import { Galeria } from './components/Galeria'
import { Localizacao } from './components/Localizacao'
import { Footer } from './components/Footer'
import { WhatsAppFAB } from './components/WhatsAppFAB'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Servicos />
        <Galeria />
        <Localizacao />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}

export default App
