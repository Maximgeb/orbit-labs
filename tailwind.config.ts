import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Orbit Labs brand palette
        'orbit-bg':       '#090909',
        'orbit-surface':  '#0E1014',
        'orbit-card':     '#0B0F14',
        'orbit-border':   'rgba(255,255,255,0.10)',
        'orbit-text':     '#F0EDE8',
        'orbit-muted':    'rgba(255,255,255,0.68)',
        'orbit-orange':   '#FF5A1F',
        'orbit-orange-l': '#FF7A47',
        'orbit-orange-d': '#CC4818',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tight-h': '-0.03em',
        'tighter-h': '-0.04em',
      },
      lineHeight: {
        'body': '1.65',
        'tight': '1.08',
      },
      boxShadow: {
        'orbit-card': '0 4px 8px rgba(0,0,0,0.12), 0 12px 32px rgba(255,90,31,0.06), inset 0 1px 0 rgba(255,255,255,0.04)',
        'orbit-glow': '0 0 28px rgba(255,90,31,0.18)',
      },
      maxWidth: {
        'orbit': '980px',
      },
    },
  },
  plugins: [],
}
export default config
