import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        zinc: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(24 24 27 / 0.08), 0 0 0 1px rgb(24 24 27 / 0.04)',
      },
    },
  },
};

export default config;
