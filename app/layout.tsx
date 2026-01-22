import type { Metadata } from 'next';
import { Inter_Tight, Space_Grotesk } from 'next/font/google';
import './globals.css';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CODECOMBAT | IEEE CTSoc',
  description: 'A premium competitive coding event by IEEE CTSoc.',
};

import CustomCursor from './components/CustomCursor';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="antialiased selection:bg-red-900 selection:text-white cursor-none" suppressHydrationWarning>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
