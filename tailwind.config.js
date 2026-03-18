module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './sections/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        notion: {
          bg: 'var(--notion-bg)',
          sidebar: '#F7F7F5',
          text: 'var(--notion-text)',
          secondary: 'var(--notion-secondary)',
          border: 'var(--notion-border)',
          hover: 'var(--notion-hover)',
          card: 'var(--notion-card-bg)',
          blue: { light: '#E7F3F8', DEFAULT: 'var(--notion-blue)' },
          pink: { light: '#F5E0E9', DEFAULT: 'var(--notion-pink)' },
          green: { light: '#EDF3EC', DEFAULT: 'var(--notion-green)' },
          yellow: { light: '#FBF3DB', DEFAULT: 'var(--notion-yellow)' },
          purple: { light: '#F1F0F5', DEFAULT: 'var(--notion-purple)' },
          orange: { DEFAULT: 'var(--notion-orange)' },
          red: { DEFAULT: 'var(--notion-red)' },
          gray: { DEFAULT: 'var(--notion-gray)' },
        },
      },
      fontFamily: {
        notion: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        '2/3': '66.666667%',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
