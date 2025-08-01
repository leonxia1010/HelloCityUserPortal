import '@mui/material/styles';
import '@mui/material/Menu';
import '@mui/material/Button';

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
    customBorderRadius: {
      esm: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
  }
  interface ThemeOptions {
    backgroundGradients?: {
      buttonPrimaryActive?: string;
      buttonModalActive?: string;
      buttonPrimaryDisabled?: string;
    };
    customSpacing?: Partial<Theme['customSpacing']>;
    customBorderRadius?: Partial<Theme['customBorderRadius']>;
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    tertiary: true;
  }
}

declare module '@mui/material/Menu' {
  interface MenuProps {
    layout?: 'vertical' | 'horizontal';
  }
}
