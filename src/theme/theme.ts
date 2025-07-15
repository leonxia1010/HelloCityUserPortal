'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';
import '@fontsource/ibm-plex-sans/400.css';     // Regular
import '@fontsource/ibm-plex-sans/700.css';     // Bold
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/montserrat/600.css';


// Extend MUI theme with custom `gradients`
declare module '@mui/material/styles' {
  interface Theme {
    gradients: {
      homepageCTA: string;
      modalCTAActive: string;
      modalCTADisabled: string;
    };
  }
  interface ThemeOptions {
    gradients?: {
      homepageCTA?: string;
      modalCTAActive?: string;
      modalCTADisabled?: string;
    };
  }
}

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
      disabledBackground: '#E2E8F0', 
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

    body1: { fontFamily: `'IBM Plex Sans', sans-serif` },
    body2: { fontFamily: `'IBM Plex Sans', sans-serif` },
    caption: { fontFamily: `'IBM Plex Sans', sans-serif` },
    button: { fontFamily: `'IBM Plex Sans', sans-serif` },

    // Custom use (e.g., chatbot)
    subtitle2: { fontFamily: `'Inter', sans-serif` },
  },
  gradients: {
    homepageCTA: 'linear-gradient(90deg, #FFA863, #FF75B5, #6FA3FF)',
    modalCTAActive: 'linear-gradient(90deg, #FFB066, #80C3FF, #4788F2)',
    modalCTADisabled: 'linear-gradient(90deg, #E2E8F0, #CBD5E1)',
  },
} as ThemeOptions);

export default websiteTheme;
