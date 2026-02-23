import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#39c1ef',
        'vintage-teal': '#2d5a5e',
        'muted-orange': '#e67e51',
        cream: '#fdfaf1',
        'background-light': '#f6f7f8',
        'background-dark': '#101d22',
        'retro-text': '#111618',
        'retro-muted': '#617f89',
      },
      fontFamily: {
        sans: ['var(--font-spline-sans)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
export default config;
