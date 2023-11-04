import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        users_primary: '#12121A',
        users_secondary: '#252430',
        users_accent: '#4992FF',
        users_accent_hover: '#1E67D4',
        users_accent_active: '#0042A5',
        admin_primary: '#17121A',
        admin_secondary: '#30242F',
        admin_accent: '#CA59FF',
        admin_accent_hover: '#9821D0',
        admin_accent_active: '#6B009D',
        error_accent: '#FF5959',
        error_accent_hover: '#D72222',
        error_accent_active: '#9B0000',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
