import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    gradients: {
      main: string;
      [key: string]: string;
    };
  }
  interface ThemeOptions {
    gradients?: {
      [key: string]: string;
    };
  }
}
