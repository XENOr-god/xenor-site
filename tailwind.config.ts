import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    colors: {
      'bg-base': '#050508',
      'bg-surface': '#0d0d12',
      'bg-border': '#1a1a2e',
      'accent': '#00e5ff',
      'accent2': '#7c5cfc',
      'text': '#eef0f8',
      'muted': '#5a6580',
      'warn': '#f5a623',
      'success': '#00c87a',
      transparent: 'transparent',
      inherit: 'inherit',
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff',
    },
    fontFamily: {
      'grotesk': ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      'mono': ['var(--font-space-mono)', 'monospace'],
    },
    letterSpacing: {
      'widest': '0.2em',
    },
  },
  plugins: [],
};
export default config;
