import type { Metadata } from 'next';
import { Inter_Tight, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
  description: 'Join the ultimate competitive coding battle organized by IEEE CTSoc. Register now to showcase your skills and win exciting prizes.',
  keywords: ['competitive coding', 'hackathon', 'IEEE', 'CTSoc', 'programming contest', 'codecombat'],
  authors: [{ name: 'IEEE CTSoc' }],
  metadataBase: new URL('https://register.codecombat.live'),
  openGraph: {
    title: 'CODECOMBAT | IEEE CTSoc',
    description: 'Join the ultimate competitive coding battle. Register now!',
    url: 'https://register.codecombat.live',
    siteName: 'CODECOMBAT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CODECOMBAT | IEEE CTSoc',
    description: 'The ultimate competitive coding battle is here.',
  },
  verification: {
    google: 'qWUZodIz5HV4UkF1-orT1E1cLvRTPo8xaFRNQES655k',
  },
};



import { ToastProvider } from './context/ToastContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="antialiased selection:bg-red-900 selection:text-white" suppressHydrationWarning>
        <ToastProvider>
          <Navbar />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
