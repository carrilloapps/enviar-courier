'use client';

import { usePathname } from 'next/navigation';
import { AppProvider } from '@/app/lib/context';
import Navbar from '@/app/components/ui/Navbar';
import Footer from '@/app/components/ui/Footer';
import WhatsAppButton from '@/app/components/ui/WhatsAppButton';

export default function ClientBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
      <AppProvider>
        {!isDashboard && <Navbar />}
        <main className="flex-1">{children}</main>
        {!isDashboard && <Footer />}
        {!isDashboard && <WhatsAppButton />}
      </AppProvider>
    </body>
  );
}
