import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {  
        dark: {
          100: '#121212',
          200: '#1E1E1E',
          300: '#2D2D2F',
          400: '#3E3E40',
          500: '#4D5156',
          600: '#6B6E73',
          700: '#B5BBC2',
        },
        white: '#F3F4F6',
        red: '#FF2140',
        error: '#FF0000',
      },
      fontFamily: {
        Pretendard: ['Pretendard'],
      },
    },
  },
  plugins: [],
} satisfies Config;
