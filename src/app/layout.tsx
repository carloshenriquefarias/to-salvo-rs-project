import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';

import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <title>Estou Salvo - RS</title>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="apple-touch-icon" sizes="167x167" href="/favicon-167x167.png"/>
        <link rel="icon" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="shortcut icon" sizes="48x48" href="/favicon.ico?v=1" type="image/vnd.microsoft.icon"/>
        <meta name="description" content="Ajuda para população encontrar as pessoas nos abrigos pelo Rio Grande do Sul" />
        <meta name="keywords" content="nextjs, react, javascript, seo" />
        <meta name="author" content="Andrei Andrade" />
        <meta property="og:title" content="Ajuda para população encontrar as pessoas nos abrigos pelo Rio Grande do Sul" />
        <meta property="og:description" content="Ajuda para população encontrar as pessoas nos abrigos pelo Rio Grande do Sul" />
        <meta property="og:image" content="https://estousalvo.com/logo/logo-estou-salvo.png" />
        <meta property="og:url" content="https://estousalvo.com/logo/logo-estou-salvo.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </head> 
      <body>
        <LocalizationProvider>
          <UserProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </UserProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
