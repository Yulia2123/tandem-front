import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import '../styles/globals.css';
import Providers from './Providers';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Природні мандри',
    template: '%s | Природні мандри',
  },
  description:
    'Відкривай, ділися історіями подорожей та знаходь однодумців для мандрів.',
  openGraph: {
    title: 'Природні мандри',
    description:
      'Відкривай, ділися історіями подорожей та знаходь однодумців для мандрів.',
    type: 'website',
    locale: 'uk_UA',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${montserrat.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
