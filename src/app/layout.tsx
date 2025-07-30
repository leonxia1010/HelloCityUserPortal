import type { Metadata } from "next";
import "./globals.css";
import { CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material';
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import websiteTheme from '@/theme/theme';
import NavBar from '@/components/NavBar';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { I18nProvider } from '@/contexts/I18nProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HelloCity - Landing Assistant for new cities",
  description:
    "HelloCity is an AI-powered landing assistant for international students, new immigrants, and travelers. It provides personalized checklists, timelines and document downloads to simplify visa processes, banking and housing and more — tackling fragmented information, language barriers, and complex procedures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <AppRouterCacheProvider>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={websiteTheme}>
              <CssBaseline />
              <NavBar />
              <div className="relative">{children}</div>
            </ThemeProvider>
          </StyledEngineProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
