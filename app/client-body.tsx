'use client';

import { usePathname } from 'next/navigation';
import { AppProvider } from '@/app/lib/context';
import Navbar from '@/app/components/ui/Navbar';
import Footer from '@/app/components/ui/Footer';
import WhatsAppButton from '@/app/components/ui/WhatsAppButton';

export default function ClientBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');
  const isAuthPage = pathname === '/ingresar';
  const hideGlobals = isDashboard || isAuthPage;

  return (
    <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
      <AppProvider>
        {!hideGlobals && <Navbar />}
        <main className="flex-1">{children}</main>
        {!hideGlobals && <Footer />}
        {!hideGlobals && <WhatsAppButton />}
      </AppProvider>
    </body>
  );
}
