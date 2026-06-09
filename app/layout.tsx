import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';

// Optimize fonts natively via Next.js loader subroutines
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Ops Process Analyser — Process Intelligence Suite',
  description: 'Isolate operations friction instantly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Fallback import for Instrument Serif */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
