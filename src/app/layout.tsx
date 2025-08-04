// import './globals.css';
// import { CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material';
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
// import type { Metadata } from 'next';

// import NavBar from '@/components/NavBar';
// import websiteTheme from '@/theme/theme';


// export const metadata: Metadata = {
//   title: 'HelloCity – Landing Assistant for new cities',
//   description:
//     'HelloCity is an AI-powered landing assistant for international students, new immigrants, and travelers. It provides personalized checklists, timelines and document downloads to simplify visa processes, banking and housing and more — tackling fragmented information, language barriers, and complex procedures.',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang='en'>
//       <body className="relative">
//         <AppRouterCacheProvider>
//             <StyledEngineProvider injectFirst>
//               <ThemeProvider theme={websiteTheme}>
//                 <CssBaseline />
//                 <NavBar />
//                 <div className='relative'>
//                   {children}
//                 </div>
//               </ThemeProvider>
//             </StyledEngineProvider>
//           </AppRouterCacheProvider>
//         </body>
//     </html>
//   );
// }


import './globals.css';
import { Auth0Provider } from '@auth0/nextjs-auth0';
import { CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata } from 'next';

import NavBar from '@/components/NavBar';
import { auth0 } from '@/lib/auth0'; // ✅ 请确保你有这个文件，并配置了 scope & audience
import websiteTheme from '@/theme/theme';

export const metadata: Metadata = {
  title: 'HelloCity – Landing Assistant for new cities',
  description:
    'HelloCity is an AI-powered landing assistant for international students, new immigrants, and travelers. It provides personalized checklists, timelines and document downloads to simplify visa processes, banking and housing and more — tackling fragmented information, language barriers, and complex procedures.',
};

// ✅ 必须改为 async
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession();

  return (
    <html lang='en'>
      <body className="relative">
        <Auth0Provider user={session?.user}>
          <AppRouterCacheProvider>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={websiteTheme}>
                <CssBaseline />
                <NavBar />
                <div className='relative'>
                  {children}
                </div>
              </ThemeProvider>
            </StyledEngineProvider>
          </AppRouterCacheProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
