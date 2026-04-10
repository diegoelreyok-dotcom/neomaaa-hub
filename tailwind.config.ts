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
          primary: '#00D4AA',
          'primary-dark': '#00B894',
          'primary-light': '#00F5C4',
          accent: '#6C5CE7',
          dark: '#0A0E1A',
          'dark-2': '#111827',
          'dark-3': '#1F2937',
          'dark-4': '#374151',
          'dark-5': '#4B5563',
          text: '#F9FAFB',
          'text-body': '#D1D5DB',
          'text-secondary': '#9CA3AF',
          'text-muted': '#6B7280',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#3B82F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
