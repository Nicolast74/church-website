import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/globals.css', // Explicitly added
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4A5568',      // Slate Gray
        'secondary': '#A0AEC0',    // Cool Gray
        'accent': '#FBBF24',       // Amber
        'background': '#F7FAFC',   // Off-white
        'text-primary': '#2D3748', // Charcoal
        'text-secondary': '#718096', // Gray
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        serif: ['Georgia', 'serif'],
        mono: ['var(--font-geist-mono)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    typography,
  ],
}
export default config
