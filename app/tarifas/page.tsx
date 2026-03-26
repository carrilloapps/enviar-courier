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
} from 'lucide-react';
import { useState } from 'react';

export default function TarifasPage() {
  const { t, currency } = useApp();
  const [calcWeight, setCalcWeight] = useState('');
  const [calcL, setCalcL] = useState('');
  const [calcW, setCalcW] = useState('');
  const [calcH, setCalcH] = useState('');

  const volWeight = calcL && calcW && calcH
    ? (parseFloat(calcL) * parseFloat(calcW) * parseFloat(calcH)) / 5000
    : null;

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-20 right-[20%] w-[400px] h-[400px] rounded-full bg-lime-400/[0.04] blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/20 text-xs font-semibold text-lime-300 mb-6">
            <Scale className="w-3.5 h-3.5" />
            {t('rates.title')}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('rates.title')}
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
            {t('rates.subtitle')}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent" />
      </section>

      {/* Standard Rates */}
      <section className="relative py-28">
        <div className="absolute inset-0 gradient-section" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">{t('rates.standard')}</h2>
            <p className="text-neutral-500 text-sm">{t('rates.standard.desc')}</p>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider text-neutral-400">{t('pricing.weight')}</th>
                    <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider text-neutral-400">{t('pricing.dimensions')}</th>
                    <th className="text-right px-6 py-4 font-semibold text-xs uppercase tracking-wider text-neutral-400">{t('pricing.total')}</th>
                    <th className="text-right px-6 py-4 font-semibold text-xs uppercase tracking-wider text-neutral-400">{t('pricing.perkg')}</th>
                    <th className="text-center px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_TIERS.map((tier, i) => (
                    <tr key={i} className="border-t border-white/[0.03] hover:bg-white/[0.02] transition-colors duration-200">
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 font-bold text-white text-sm">
                          <Package className="w-4 h-4 text-teal-400" />
                          {tier.weight}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-500">{tier.dimensions}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-lg font-bold text-gradient font-[var(--font-heading)]">
                          {formatPrice(convertPrice(tier.priceCOP, currency), currency)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-neutral-500">
                        {formatPrice(convertPrice(tier.pricePerKgCOP, currency), currency)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          href="https://wa.me/573003328389"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-500/20 border border-indigo-500/20 transition-all duration-200 cursor-pointer"
                        >
                          {t('pricing.cta')}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Volumetric Rates */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-dark-950" />
        <div className="absolute inset-0 dot-pattern" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">{t('rates.volumetric')}</h2>
            <p className="text-neutral-500 text-sm">{t('rates.volumetric.desc')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VOLUMETRIC_PRICING.map((vol, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 text-center cursor-default">
                <p className="text-sm font-semibold text-neutral-400 mb-3">{vol.range}</p>
                <p className="text-2xl font-bold text-gradient font-[var(--font-heading)]">
                  {formatPrice(convertPrice(vol.priceCOP, currency), currency)}
                  <span className="text-sm font-normal text-neutral-600 ml-1">/KG</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="relative py-28">
        <div className="absolute inset-0 gradient-section" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">
              <Calculator className="w-7 h-7 inline-block mr-2 text-teal-400" />
              {t('rates.calculator.title')}
            </h2>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Largo (cm)', val: calcL, set: setCalcL, ph: '50' },
                { label: 'Ancho (cm)', val: calcW, set: setCalcW, ph: '30' },
                { label: 'Alto (cm)', val: calcH, set: setCalcH, ph: '20' },
              ].map((f, i) => (
                <div key={i}>
                  <label className="block text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wider">{f.label}</label>
                  <input
                    type="number"
                    value={f.val}
                    onChange={(e) => f.set(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                    placeholder={f.ph}
                  />
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wider">Peso real (KG)</label>
              <input
                type="number"
                value={calcWeight}
                onChange={(e) => setCalcWeight(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                placeholder="5"
              />
            </div>

            {volWeight !== null && (
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6 text-center">
                <p className="text-sm text-neutral-400 mb-2">Peso volumétrico</p>
                <p className="text-4xl font-bold text-gradient font-[var(--font-heading)]">
                  {volWeight.toFixed(2)} KG
                </p>
                {calcWeight && (
                  <p className="text-sm text-neutral-500 mt-3">
                    Se cobrará por el mayor:{' '}
                    <span className="font-bold text-teal-400">
                      {Math.max(volWeight, parseFloat(calcWeight)).toFixed(2)} KG
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-dark-950" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">{t('rates.insurance.title')}</h2>
            <p className="text-neutral-500 text-sm">{t('rates.insurance.desc')}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="glass-card rounded-2xl p-8 border-teal-500/20 hover:border-teal-500/30">
              <ShieldCheck className="w-10 h-10 text-teal-400 mb-5" />
              <h3 className="text-lg font-bold text-white mb-3">Carga General</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{t('rates.insurance.general')}</p>
            </div>
            <div className="glass-card rounded-2xl p-8 border-yellow-500/20 hover:border-yellow-500/30">
              <AlertTriangle className="w-10 h-10 text-yellow-400 mb-5" />
              <h3 className="text-lg font-bold text-white mb-3">Artículos Tecnológicos</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{t('rates.insurance.tech')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
