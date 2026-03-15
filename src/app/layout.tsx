import type { Metadata } from 'next';
import { Raleway, Hind_Madurai, Press_Start_2P } from 'next/font/google';
import { AppProviders } from '@/context/app-providers';
import '@/styles/globals.scss';

const raleway = Raleway({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const hindMadurai = Hind_Madurai({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const pressStart = Press_Start_2P({
  variable: '--font-pixel',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pokedex | Search and Explore Pokemon',
  description:
    'A modern Pokedex built with Next.js. Search for any Pokemon and view their stats, evolution chain, alternate forms, and related Pokemon.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${raleway.variable} ${hindMadurai.variable} ${pressStart.variable}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
