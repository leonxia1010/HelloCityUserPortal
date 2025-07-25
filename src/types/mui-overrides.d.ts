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
    customShadows: {
      dropdown: string;
    };
  }
  interface ThemeOptions {
    backgroundGradients?: {
      buttonPrimaryActive?: string;
      buttonModalActive?: string;
      buttonPrimaryDisabled?: string;
    };
    customSpacing?: Partial<Theme['customSpacing']>;
    customShadows?: Partial<Theme['customShadows']>;
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    tertiary: true;
  }
}
