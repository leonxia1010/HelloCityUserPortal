'use client'
import { createTheme, ThemeOptions } from '@mui/material/styles'

const websiteTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5C6DF7',      
      contrastText: '#ffffff',
    },

    secondary: {
      main: '#FFB663',        
      contrastText: '#000000',
    },

    info: {
      main: '#8AA8FF',      
    },

    divider: '#3C4CCC',  

    action: {
      disabled: '#CBD5E1',    
      disabledBackground: '#F1F5F9',
    },

    text: {
      disabled: '#CBD5E1',
    },
  },
  typography: {
    fontFamily: `'IBM Plex Sans', sans-serif`,


    h1: { fontFamily: `'Cabinet Grotesk', sans-serif` },
    h2: { fontFamily: `'Cabinet Grotesk', sans-serif` },
    h3: { fontFamily: `'Cabinet Grotesk', sans-serif` },
    h4: { fontFamily: `'Cabinet Grotesk', sans-serif` },
    h5: { fontFamily: `'Cabinet Grotesk', sans-serif` },
    h6: { fontFamily: `'Cabinet Grotesk', sans-serif` },


    button: { fontFamily: `'IBM Plex Sans', sans-serif` },
    caption: { fontFamily: `'IBM Plex Sans', sans-serif` },
  },
  //Add custom definitions here
  gradients: {
    main: 'linear-gradient(45deg, #5C6DF7, #FFB663, #8AA8FF)',
  }
} as ThemeOptions);


export default websiteTheme;
