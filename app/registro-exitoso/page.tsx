'use client';

import { useApp } from '@/app/lib/context';
import { Package, MapPin, Mail, ArrowRight, Copy, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function RegistroExitosoPage() {
  const { t } = useApp();
  const [copied, setCopied] = useState(false);

  const miamiAddress = "8234 NW 68th St, Miami, FL 33166";

  const handleCopy = () => {
    navigator.clipboard.writeText(miamiAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative glass-card rounded-3xl p-8 sm:p-12 max-w-2xl w-full border border-teal-500/20 shadow-2xl z-10">
        
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6 shadow-[0_0_30px_rgba(45,212,191,0.2)]">
            <CheckCircle className="w-10 h-10 text-teal-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
            ¡Registro <span className="text-teal-400">Exitoso</span>!
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg max-w-md mx-auto">
            Tu casillero ha sido creado correctamente. Ya puedes comenzar a enviar tus compras a nuestra dirección en Miami.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-dark-900/50 border border-white/5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Verifica tu Correo</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Te hemos enviado un correo con tu ID de usuario y los pasos a seguir.
              </p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-dark-900/50 border border-white/5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-lime-500/10 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-lime-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Empieza a Comprar</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Usa nuestra dirección en tus tiendas favoritas (Amazon, Shein, etc).
              </p>
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-500/5 to-indigo-500/5 border border-white/10 mb-10 relative group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Tu Dirección en USA</span>
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-dark-800 border border-white/10 hover:border-teal-500/30 text-xs text-neutral-300 flex items-center gap-2 transition-all cursor-pointer"
            >
              {copied ? <CheckCircle className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <div className="text-xl sm:text-2xl font-mono text-white font-bold tracking-tight">
            {miamiAddress}
          </div>
        </div>

        {/* Action */}
        <div className="flex flex-col items-center">
          <Link
            href="/ingresar"
            className="w-full sm:w-auto px-8 py-4 gradient-indigo text-white font-bold rounded-xl hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            Ingresar a mi Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="mt-6 text-sm text-neutral-500 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
