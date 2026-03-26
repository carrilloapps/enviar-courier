'use client';

import Link from 'next/link';
import { useApp } from '@/app/lib/context';
import { convertPrice, formatPrice, PRICING_TIERS, VOLUMETRIC_PRICING } from '@/app/lib/pricing';
import {
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Package,
  Scale,
  Zap,
  Info,
  ShieldAlert,
  Shield,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Smartphone,
  Laptop
} from 'lucide-react';
import PageHero from '@/app/components/ui/PageHero';
import { useState, useMemo } from 'react';

export default function TarifasPage() {
  const { t, currency } = useApp();
  // Calculator state
  const [calcWeight, setCalcWeight] = useState('');
  const [calcL, setCalcL] = useState('');
  const [calcW, setCalcW] = useState('');
  const [calcH, setCalcH] = useState('');
  const [declaredVal, setDeclaredVal] = useState('');
  const [insType, setInsType] = useState<'none'|'general'|'tech'>('none');

  // Calculations
  const calculations = useMemo(() => {
    const w = parseFloat(calcWeight) || 0;
    const l = parseFloat(calcL) || 0;
    const wid = parseFloat(calcW) || 0;
    const h = parseFloat(calcH) || 0;
    const decl = parseFloat(declaredVal) || 0;

    const volWeight = (l * wid * h) / 5000;
    const chargeableWeight = Math.max(w, volWeight);

    let baseCop = 0;
    if (chargeableWeight <= 2) baseCop = 29900;
    else if (chargeableWeight <= 4) baseCop = 49900;
    else if (chargeableWeight <= 7) baseCop = 79900;
    else if (chargeableWeight <= 10) baseCop = 109900;
    else if (chargeableWeight <= 15) baseCop = 149900;
    else if (chargeableWeight <= 25) baseCop = 229900;
    else if (chargeableWeight <= 40) baseCop = 349900;
    else if (chargeableWeight <= 50) baseCop = 399900;
    else if (chargeableWeight <= 60) baseCop = 449900;
    else if (chargeableWeight <= 80) baseCop = 549900;
    else baseCop = chargeableWeight * 6874;

    const rateMap: Record<string, number> = { COP: 1, USD: 0.00023, VES: 0.0089 };
    const declCop = decl / rateMap[currency];
    const insCop = insType === 'none' ? 0 : insType === 'general' ? declCop * 0.05 : declCop * 0.10;

    return {
      volWeight,
      chargeableWeight,
      baseCop,
      insCop,
      totalCop: baseCop + insCop,
      isValid: w > 0 || volWeight > 0
    };
  }, [calcWeight, calcL, calcW, calcH, declaredVal, insType, currency]);

  return (
    <div className="overflow-hidden">
      {/* 1. UNIFIED HERO & CALCULATOR (TOP) */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 bg-dark-950" />
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/20 text-xs font-semibold text-teal-300 mb-6">
              <Calculator className="w-3 h-3" />
              Cotización Inmediata
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-white mb-6 tracking-tight">
              Calcula el Costo Exacto<br className="hidden sm:block" /> de tu <span className="text-gradient">Envío Internacional</span>
            </h1>
            <p className="text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg">
              Estima tarifas precisas con seguros y volumen integrados para todos nuestros servicios desde Colombia hacia Venezuela. Sin sorpresas, con total transparencia.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* Form Side */}
            <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8">
              <div className="space-y-8">
                {/* Dimensions */}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Package className="w-4 h-4 text-teal-400" />
                    Medidas y Peso
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { l: 'Peso (KG)', v: calcWeight, s: setCalcWeight, p: 'Ej: 5' },
                      { l: 'Largo (cm)', v: calcL, s: setCalcL, p: 'Ej: 30' },
                      { l: 'Ancho (cm)', v: calcW, s: setCalcW, p: 'Ej: 20' },
                      { l: 'Alto (cm)', v: calcH, s: setCalcH, p: 'Ej: 15' },
                    ].map((f, i) => (
                      <div key={i}>
                        <label className="block text-xs font-medium text-neutral-400 mb-2">{f.l}</label>
                        <input
                          type="number"
                          value={f.v}
                          onChange={(e) => f.s(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/[0.06] text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-200"
                          placeholder={f.p}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insurance */}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-indigo-400" />
                    Protección de Carga
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-2">Valor Declarado ({currency})</label>
                      <input
                        type="number"
                        value={declaredVal}
                        onChange={(e) => setDeclaredVal(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/[0.06] text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                        placeholder="Ej: 150"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-2">Tipo de Seguro</label>
                      <div className="flex bg-dark-900 p-1 rounded-xl border border-white/[0.06]">
                        {['none', 'general', 'tech'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setInsType(type as any)}
                            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${insType === type ? 'bg-indigo-500 text-white shadow-lg' : 'text-neutral-500 hover:text-white'}`}
                          >
                            {type === 'none' ? 'Sin Seguro' : type === 'general' ? 'General' : 'Tecnología'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {insType !== 'none' && (
                    <p className="text-xs text-indigo-400/80 bg-indigo-500/10 px-3 py-2 rounded-lg border border-indigo-500/20">
                      {insType === 'general' ? 'Carga general requiere seguro del 5% del valor declarado.' : 'Artículos tecnológicos requieren seguro del 10% del valor declarado.'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Results Side */}
            <div className="lg:col-span-5">
              <div className="glass-card rounded-3xl p-6 sm:p-8 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/[0.03] rounded-full blur-[80px] pointer-events-none" />
                <h3 className="text-lg font-bold text-white mb-6">Resumen de Cotización</h3>
                
                {calculations.isValid ? (
                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-center py-3 border-b border-white/[0.06]">
                      <span className="text-sm text-neutral-400">Peso Físico</span>
                      <span className="text-sm font-semibold text-white">{parseFloat(calcWeight) || 0} KG</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/[0.06]">
                      <span className="text-sm text-neutral-400">Peso Volumétrico</span>
                      <span className="text-sm font-semibold text-white">{calculations.volWeight.toFixed(2)} KG</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/[0.06] bg-teal-400/[0.05] -mx-4 px-4 rounded-lg">
                      <span className="text-sm text-teal-300 font-bold">Peso a Cobrar</span>
                      <span className="text-sm font-bold text-teal-400">{calculations.chargeableWeight.toFixed(2)} KG</span>
                    </div>

                    <div className="pt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-neutral-400">Costo Base</span>
                        <span className="text-sm font-medium text-white">{formatPrice(convertPrice(calculations.baseCop, currency), currency)}</span>
                      </div>
                      {calculations.insCop > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-400">Seguro de Carga</span>
                          <span className="text-sm font-medium text-white">{formatPrice(convertPrice(calculations.insCop, currency), currency)}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-auto">
                      <div className="flex justify-between items-end mb-6 bg-dark-900 border border-white/[0.08] p-5 rounded-2xl">
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Total Estimado</span>
                        <span className="text-3xl font-black text-gradient font-[var(--font-heading)]">
                          {formatPrice(convertPrice(calculations.totalCop, currency), currency)}
                        </span>
                      </div>
                      <Link
                        href="https://wa.me/573003328389"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 gradient-cta text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
                      >
                        Enviar Ahora <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60 px-4 py-8">
                    <Calculator className="w-12 h-12 text-neutral-600 mb-4" />
                    <p className="text-sm text-neutral-400">Ingresa las medidas o el peso para ver tu cotización desglosada en tiempo real.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TARIFAS MODULARES (BENTO GRID replacing massive table) */}
      <section className="relative py-28">
        <div className="absolute inset-0 gradient-section" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">{t('rates.standard')}</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">{t('rates.standard.desc')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
            {PRICING_TIERS.map((tier, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 hover:border-white/[0.1] hover:-translate-y-1 transition-all duration-300">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">Peso Físico</span>
                <span className="text-2xl font-black text-white font-[var(--font-heading)] block mb-4">{tier.weight}</span>
                <div className="space-y-1 border-t border-white/[0.06] pt-4">
                  <div className="flex justify-between text-xs">
                     <span className="text-neutral-500">Costo</span>
                     <span className="font-semibold text-white">{formatPrice(convertPrice(tier.priceCOP, currency), currency)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                     <span className="text-neutral-500">Volumen</span>
                     <span className="font-semibold text-white">{tier.dimensions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden">
               <div className="absolute -top-24 -right-24 w-48 h-48 bg-lime-400/[0.1] rounded-full blur-[60px]" />
               <h3 className="text-2xl font-bold text-white mb-4">Tarifas Volumétricas Exclusivas</h3>
               <p className="text-neutral-400 text-sm mb-8 leading-relaxed max-w-2xl mx-auto">
                  Para envíos donde el Volumen supera al Peso Físico, aplicamos tarifas reducidas especializadas que optimizan tu inversión logística.
               </p>
               <div className="grid sm:grid-cols-3 gap-4">
                 {VOLUMETRIC_PRICING.slice(0, 3).map((vol, i) => (
                    <div key={i} className="bg-dark-900/50 border border-white/[0.04] rounded-2xl p-4">
                       <span className="block text-xs text-lime-400 mb-1">{vol.range}</span>
                       <span className="block text-xl font-bold text-white">{formatPrice(convertPrice(vol.priceCOP, currency), currency)} <span className="text-[10px] font-normal text-neutral-500">/KG</span></span>
                    </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEGUROS Y RESTRICCIONES (NUEVO DISEÑO UX) */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-dark-950" />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Seguros */}
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-4">
                  <ShieldCheck className="w-3 h-3" />
                  Políticas de Seguro
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Respaldo Total para tu Carga</h2>
              </div>
              
              <div className="space-y-4">
                <div className="glass-card rounded-2xl p-6 border-l-4 border-l-teal-400 hover:border-white/[0.08] transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-400/10 flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">Carga General (Obligatorio 5%)</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">Ropa, calzado, repuestos, artículos del hogar y perecederos. Toda la carga general requiere de forma obligatoria un pago equivalente al 5% sobre el valor declarado de la mercancía.</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 border-l-4 border-l-indigo-400 hover:border-white/[0.08] transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                       <Laptop className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">Artículos Tecnológicos (Obligatorio 10%)</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">Laptops, Smartphones, Tablets, Consolas y procesadores. Este tipo de carga requiere por protección internacional un seguro del 10% del valor total comercial declarado.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Restricciones */}
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-4">
                  <ShieldAlert className="w-3 h-3" />
                  Restricciones de Vuelo
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Envíos Especiales y Prohibidos</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="glass-card rounded-2xl p-5 bg-dark-900 border-red-500/20">
                  <XCircle className="w-6 h-6 text-red-400 mb-3" />
                  <h4 className="text-sm font-bold text-white mb-2">Completamente Prohibidos</h4>
                  <ul className="text-xs text-neutral-400 space-y-2">
                    <li>• Armas, réplicas y municiones</li>
                    <li>• Explosivos y material inflamable</li>
                    <li>• Drogas / Estupefacientes</li>
                    <li>• Material corrosivo o químico</li>
                    <li>• Divisas o billetes en tránsito</li>
                  </ul>
                </div>

                <div className="glass-card rounded-2xl p-5 bg-dark-900 border-amber-500/20">
                  <AlertTriangle className="w-6 h-6 text-amber-500 mb-3" />
                  <h4 className="text-sm font-bold text-white mb-2">Requieren Supervisión</h4>
                  <ul className="text-xs text-neutral-400 space-y-2">
                    <li>• Baterías de litio sueltas</li>
                    <li>• Perfumes (cantidades altas)</li>
                    <li>• Suplementos médicos sin récipe</li>
                    <li>• Semillas o material biológico</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                 <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                 <p className="text-[11px] text-neutral-500 leading-relaxed">Toda la paquetería internacional es sujeta a escrutinio aeroportuario. Intentar evadir restricciones puede resultar en incautación irreversible del paquete por autoridades aduaneras, sin responsabilidad para Enviar Courier.</p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
