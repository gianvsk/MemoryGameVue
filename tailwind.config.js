/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'xs': '30rem',
      'sm': '640px',
      'md': '768px'
    },
    extend: {
      width: {
        '345': '345px',
        '660': '660px',
        '125': '125px'
      },
      height: {
        '125': '125px',
        '480': '30rem'
      },
      fontSize: {
        '32': '32px'
      },
      spacing: {
        '21.440': '21.440px',
        '10-custom': '10px'
      },
      minHeight: {
        '680': '680px'
      },
      borderRadius: {
        '10': '10px'
      },
      colors: {
        'dark-grey': '#2e3d49',
        'light-blue' : '#02b3e4',
        'light-green': '#02ccba'
      },
      boxShadow: {
        'card': '5px 2px 20px 0 rgba(46, 61, 73, 0.5)'
      },
      keyframes: {
        flip: {
        '0%': { 
          width: '125px',
          height: '125px' 
        },
        '50%': { 
          width: '150px',
          height: '150px' 
        },
        '100%': { 
          width:'125px',
          height:'125px',
          backgroundColor: '#02ccba'
          }
        },
        smallFlip: {
          '0%': { 
            width: '100%',
            height: '100%' 
          },
          '50%': { 
            width: '120%',
            height: '120%' 
          },
          '100%': { 
            width:'100%',
            height:'100%',
            backgroundColor: '#02ccba'
            }
          }

      },
      animation: {
        flip: 'flip 1s',
        smallFlip: 'smallFlip 1s'
      }
    },
  },
  plugins: [],
}

