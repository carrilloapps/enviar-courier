'use client';

import { MailCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SuscripcionExitosaPage() {
  return (
    <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative glass-card rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center border border-indigo-500/20 shadow-2xl z-10 block">
        
        {/* Success Icon */}
        <div className="mx-auto inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
          <MailCheck className="w-10 h-10 text-indigo-400" />
        </div>
        
        {/* Content */}
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
          ¡Gracias por <span className="text-gradient">Suscribirte</span>!
        </h1>
        <p className="text-neutral-400 text-base sm:text-lg mb-10 leading-relaxed">
          Has sido añadido exitosamente a nuestro newsletter privado. Serás el primero en enterarte de nuestras ofertas de envío, promociones prime y cupones exclusivos.
        </p>

        {/* Action */}
        <Link
          href="/"
          className="w-full sm:w-auto px-8 py-4 gradient-indigo text-white font-bold rounded-xl hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
