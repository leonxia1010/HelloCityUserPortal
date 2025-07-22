'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';
import '@fontsource/ibm-plex-sans/400.css';     // Regular
import '@fontsource/ibm-plex-sans/700.css';     // Bold
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';

declare module '@mui/material/styles' {
  interface Theme {
    backgroundGradients: {
      buttonPrimaryActive: string;
      buttonModalActive: string;
      buttonPrimaryDisabled: string;
    };
    customSpacing: {
      buttonPaddingSm: string;
      buttonFontSize: string;
    };
  }
  interface ThemeOptions {
    backgroundGradients?: {
      buttonPrimaryActive?: string;
      buttonModalActive?: string;
      buttonPrimaryDisabled?: string;
    };
    customSpacing?: Partial<Theme['customSpacing']>;
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    tertiary: true;
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

    h1: {
      fontFamily: `'Cabinet Grotesk', sans-serif`,
      fontWeight: 700,
    },
    h2: {
      fontFamily: `'Cabinet Grotesk', sans-serif`,
      fontWeight: 700,
    },
    h3: {
      fontFamily: `'Cabinet Grotesk', sans-serif`,
      fontWeight: 700,
    },
    h4: {
      fontFamily: `'Cabinet Grotesk', sans-serif`,
      fontWeight: 1100,
    },
    h5: {
      fontFamily: `'Cabinet Grotesk', sans-serif`,
      fontWeight: 700,
    },
    h6: {
      fontFamily: `'Cabinet Grotesk', sans-serif`,
      fontWeight: 700,
    },

    body1: { fontFamily: `'IBM Plex Sans', sans-serif` },
    body2: { fontFamily: `'IBM Plex Sans', sans-serif` },
    caption: { fontFamily: `'IBM Plex Sans', sans-serif` },
    button: {
      fontFamily: `'IBM Plex Sans', sans-serif`,
      textTransform: 'none'
    },

    // Custom use (e.g., chatbot)
    subtitle2: { fontFamily: `'Inter', sans-serif` },
  },
  backgroundGradients: {
    buttonPrimaryActive: 'linear-gradient(90deg, #FFA863, #FF75B5, #6FA3FF)',
    buttonModalActive: 'linear-gradient(90deg, #FFB066, #80C3FF, #4788F2)',
    buttonPrimaryDisabled: 'linear-gradient(90deg, #E2E8F0, #CBD5E1)',
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'primary' },
          style: ({ theme }) => ({
            background: theme.backgroundGradients.buttonPrimaryActive,
            color: theme.palette.common.white,
            padding: theme.customSpacing.buttonPaddingSm,
            borderRadius: '2rem',
            boxShadow: theme.shadows[5],
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              filter: 'brightness(110%)',
              boxShadow: theme.shadows[8],
            },
          }),
        },
        {
          props: { variant: 'primary', disabled: true },
          style: ({ theme }) => ({
            background: theme.backgroundGradients.buttonPrimaryDisabled,
            boxShadow: 'none',
            '&.Mui-disabled': {
              color: '#E53935', // <- override default disabled color
            },
          }),
        },
        {
          props: { variant: 'secondary' },
          style: ({ theme }) => ({
            background: theme.backgroundGradients.buttonModalActive,
            color: theme.palette.common.white,
            padding: theme.customSpacing.buttonPaddingSm,
            borderRadius: '2rem',
            boxShadow: theme.shadows[5],
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              filter: 'brightness(110%)',
              boxShadow: theme.shadows[8],
            },
          }),
        },
        {
          props: { variant: 'secondary', disabled: true },
          style: () => ({
            background: "#F3F3F3",
            border: `1px solid #DCDCDC`,
            '&.Mui-disabled': {
              color: '#A0A0A0', // <- override default disabled color
            },
          }),
        },
        {
          props: { variant: 'tertiary' },
          style: ({ theme }) => ({
            background: 'transparent',
            color: theme.palette.common.white,
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              filter: 'brightness(110%)',
              borderBottom: `2px solid ${theme.palette.common.white}`,
              boxShadow: theme.shadows[8],
            },
          }),
        },
        {
          props: { variant: 'tertiary', disabled: true },
          style: () => ({
            '&.Mui-disabled': {
              color: '#BBBBBB', // <- override default disabled color
            },
          }),
        }
      ],
    },
  },
  customSpacing: {
    buttonPaddingSm: '0.5rem 2rem',
    buttonFontSize: '1.125rem',
  },
  customBorderRadius: {
    esm: '0.5rem',     // 8px
    sm: '0.75rem',     // rounded xl 12px
    md: '1rem',       // 16px
    lg: '2rem',       // 32px
    xl: '3rem',       // 64px
    full: '9999px',
  },
} as ThemeOptions);

export default websiteTheme;