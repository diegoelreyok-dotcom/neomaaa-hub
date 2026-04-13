import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          primary: '#98283A',
          'primary-dark': '#7A2030',
          'primary-light': '#B33347',
          accent: '#98283A',
          dark: '#0A0A0A',
          'dark-2': '#111111',
          'dark-3': '#1A1A1A',
          'dark-4': '#2A2A2A',
          'dark-5': '#3A3A3A',
          text: '#FFFFFF',
          'text-body': '#D1D5DB',
          'text-secondary': '#9CA3AF',
          'text-muted': '#6B7280',
          success: '#38CC97',
          warning: '#D4A03A',
          danger: '#C44545',
          info: '#3B82F6',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
