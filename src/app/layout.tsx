import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Header } from '@/components/layout/Header';
import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'sans-serif']
});

export const metadata: Metadata = {
  title: 'Baby Planning Platform | Your Peaceful Journey Starts Here',
  description: 'Transform baby planning from overwhelming to organized. Create personalized checklists, get expert guidance, and enjoy a calm, confident journey into parenthood.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", geist.variable)}>
      <body className={inter.className}>
        <TooltipProvider>
          <AuthProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </AuthProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
