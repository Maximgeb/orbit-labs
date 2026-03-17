import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Orbit Labs — UGC IA prêts pub. Livrés en 72h.',
  description: 'Orbit Labs produit des créatives UGC IA performantes pour e-commerce. Brief en 2 min, MP4 prêts à lancer sous 72h. Pack 4 / 8 / 12 vidéos.',
  keywords: ['UGC IA', 'créatives publicitaires', 'e-commerce', 'vidéos publicitaires', 'AI UGC', 'agence créative'],
  openGraph: {
    title: 'Orbit Labs — UGC IA prêts pub',
    description: 'Brief en 2 min. MP4 prêts pub livrés en 72h. Testez vite, scalez proprement.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" href="/logos/favicon.png" type="image/png" />
      </head>
      <body>
        {/* Film grain — premium editorial texture */}
        <div className="orbit-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
