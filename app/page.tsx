import Nav from '@/components/Nav'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Why from '@/components/Why'
import Process from '@/components/Process'
import ProductDemo from '@/components/ProductDemo'
import System from '@/components/System'
import Examples from '@/components/Examples'
import Packs from '@/components/Packs'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Trust from '@/components/Trust'
import CTAFinal from '@/components/CTAFinal'
import Footer from '@/components/Footer'
import WhatsApp from '@/components/WhatsApp'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Problem — tension / douleur */}
        <Problem />

        {/* 3. Solution — pourquoi Orbit Labs */}
        <Why />

        {/* 4. System — crédibilité méthodologique */}
        <System />

        {/* 5. Process — comment ça marche */}
        <Process />

        {/* 5b. Product Demo — brief → production → livraison */}
        <ProductDemo />

        {/* 6. Offers — pricing / packs */}
        <Packs />

        {/* 7. Testimonials — social proof */}
        <Testimonials />

        {/* 8. Results — preuve visuelle */}
        <Examples />

        {/* 8. Trust — réassurance */}
        <Trust />

        {/* 9. FAQ — levée d'objections */}
        <FAQ />

        {/* 10. CTA final — conversion */}
        <CTAFinal />
      </main>
      <Footer />
      <WhatsApp />
    </>
  )
}
