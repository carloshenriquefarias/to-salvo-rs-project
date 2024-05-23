import { redirect } from 'next/navigation';
import * as React from 'react';
import type { Metadata } from 'next';

import { Layout } from '@/components/landing-page/layout';
import { LandingPage } from '@/components/landing-page/page';

export const metadata = {
  title: `Estou Salvo - RS`,
  description: `Ajuda para população encontrar as pessoas nos abrigos pelo Rio grande do sul`,
  icons: `https://estousalvo.com/logo/logo-estou-salvo.png`
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  // redirect('/landing-page/');
  return (
    <Layout>
      <LandingPage />
    </Layout>
  )
}
