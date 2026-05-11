import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("scroll-smooth", "font-sans", geist.variable)}>
      <body className={inter.className}>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
