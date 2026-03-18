module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        notion: {
          bg: '#FFFFFF',
          sidebar: '#F7F7F5',
          text: '#37352F',
          secondary: '#787774',
          border: '#EDEDED',
          hover: '#EFEFEF',
          blue: { light: '#E7F3F8', DEFAULT: '#0B6E99' },
          pink: { light: '#F5E0E9', DEFAULT: '#AD1A72' },
          green: { light: '#EDF3EC', DEFAULT: '#1C773D' },
          yellow: { light: '#FBF3DB', DEFAULT: '#89632A' },
          purple: { light: '#F1F0F5', DEFAULT: '#6931A5' },
        }
      },
      fontFamily: {
        notion: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Apple Color Emoji', 'Arial', 'sans-serif'],
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
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

