/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: '#ffffff', // Standard white for headings and high-contrast texts
          pure: '#ffffff',
        },
        gold: {
          50: '#fdfaf9',
          100: '#f9f0f0',
          200: '#ebd1d1',
          300: '#dfb6b6',
          400: '#d8a9a9', // Brand Rose Gold / Warm accent (matches live site #d8a9a9)
          500: '#d8a9a9', // Brand Rose Gold / Warm accent
          600: '#c59292',
          700: '#b17c7c',
          800: '#9c6666',
          900: '#875151',
          950: '#4d2727',
        },
        stone: {
          100: '#ffffff',
          200: '#e5e5e0', // Off-white text for dark mode readability
          300: '#cccccc', // Light grey text
          400: '#a0a0a0', // Muted light grey text
          500: '#7e7e7e',
          900: '#0a2a3a', // Brand signature Deep Blue-Teal
          925: '#0a202d', // Brand Deep Dark Marine section background (dark mode)
          950: '#05141c', // Brand Absolute Body Background (dark mode tinted signature blue)
        },
        emerald: {
           400: '#7fb89a',
           500: '#78bf96', // Brand Green
         },
         whatsapp: {
           DEFAULT: '#25D366',
           hover: '#20BD5C',
         }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'subtle-zoom': 'subtleZoom 20s ease-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        subtleZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
