import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'sans-serif']
});

export const metadata: Metadata = {
  title: 'Baby Planning Platform',
  description: 'A modern baby planning platform that helps expecting parents create personalized baby essentials checklists.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
