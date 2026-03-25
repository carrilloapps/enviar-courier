'use client';

import { useState } from 'react';
import { PRICING_TIERS, VOLUMETRIC_PRICING, formatPrice, convertPrice, type PricingTier } from '@/app/lib/pricing';
import {
  Receipt,
  Save,
  Plus,
  Trash2,
  Package,
  Scale,
  Pencil,
} from 'lucide-react';

export default function TarifasPage() {
  const [tiers, setTiers] = useState(PRICING_TIERS);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (index: number, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const updated: PricingTier = {
      weight: form.get('weight') as string,
      dimensions: form.get('dimensions') as string,
      priceCOP: parseFloat(form.get('priceCOP') as string) || 0,
      pricePerKgCOP: parseFloat(form.get('pricePerKgCOP') as string) || 0,
    };
    setTiers(prev => prev.map((t, i) => i === index ? updated : t));
    setEditingIndex(null);
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newTier: PricingTier = {
      weight: form.get('weight') as string,
      dimensions: form.get('dimensions') as string,
      priceCOP: parseFloat(form.get('priceCOP') as string) || 0,
      pricePerKgCOP: parseFloat(form.get('pricePerKgCOP') as string) || 0,
    };
    setTiers(prev => [...prev, newTier]);
    setShowForm(false);
  };

  const handleDelete = (index: number) => {
    setTiers(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-[var(--font-heading)]">Tarifas</h1>
          <p className="text-sm text-neutral-500 mt-1">Gestión de tarifas y precios de envío</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,230,53,0.2)] transition-all duration-300 cursor-pointer text-sm"
        >
          <Plus className="w-4 h-4" />
          Agregar tarifa
        </button>
      </div>

      {/* Standard rates */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Package className="w-4 h-4 text-indigo-400" />
          Tarifas estándar
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Peso</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Dimensiones</th>
                <th className="text-right px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Total (COP)</th>
                <th className="text-right px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Por KG (COP)</th>
                <th className="text-right px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier, i) => (
                <tr key={i} className="border-t border-white/[0.03] hover:bg-white/[0.02] transition-colors duration-150">
                  {editingIndex === i ? (
                    <td colSpan={5} className="px-4 py-3">
                      <form onSubmit={(e) => handleSave(i, e)} className="flex items-end gap-3">
                        <div className="flex-1">
                          <label className="block text-[9px] text-neutral-600 mb-1">Peso</label>
                          <input name="weight" defaultValue={tier.weight} className="w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-white" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[9px] text-neutral-600 mb-1">Dimensiones</label>
                          <input name="dimensions" defaultValue={tier.dimensions} className="w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-white" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[9px] text-neutral-600 mb-1">Total COP</label>
                          <input name="priceCOP" type="number" defaultValue={tier.priceCOP} className="w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-white" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[9px] text-neutral-600 mb-1">Por KG COP</label>
                          <input name="pricePerKgCOP" type="number" defaultValue={tier.pricePerKgCOP} className="w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-white" />
                        </div>
                        <button type="submit" className="px-3 py-1.5 gradient-lime text-dark-950 font-bold rounded-lg text-xs cursor-pointer">
                          <Save className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </td>
                  ) : (
                    <>
                      <td className="px-4 py-3 text-sm font-bold text-white">{tier.weight}</td>
                      <td className="px-4 py-3 text-xs text-neutral-500">{tier.dimensions}</td>
                      <td className="px-4 py-3 text-right text-sm font-bold text-gradient font-[var(--font-heading)]">
                        {formatPrice(tier.priceCOP, 'COP')}
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-neutral-500">
                        {formatPrice(tier.pricePerKgCOP, 'COP')}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            onClick={() => setEditingIndex(i)}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-amber-400 hover:bg-amber-500/10 cursor-pointer transition-colors duration-200"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(i)}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors duration-200"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Volumetric rates */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Scale className="w-4 h-4 text-teal-400" />
          Tarifas volumétricas
        </h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {VOLUMETRIC_PRICING.map((vol, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.03] text-center">
              <p className="text-xs text-neutral-500 mb-1">{vol.range}</p>
              <p className="text-lg font-bold text-gradient font-[var(--font-heading)]">
                {formatPrice(vol.priceCOP, 'COP')}
                <span className="text-xs font-normal text-neutral-600 ml-1">/KG</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative glass-card rounded-2xl p-8 max-w-md w-full animate-scale-in">
            <h2 className="text-xl font-bold text-white mb-6">Nueva tarifa</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              {[
                { name: 'weight', label: 'Peso', placeholder: '5 KG' },
                { name: 'dimensions', label: 'Dimensiones', placeholder: '40x30x20 cm' },
                { name: 'priceCOP', label: 'Total (COP)', placeholder: '79900', type: 'number' },
                { name: 'pricePerKgCOP', label: 'Por KG (COP)', placeholder: '15980', type: 'number' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">{field.label}</label>
                  <input
                    name={field.name}
                    type={field.type || 'text'}
                    required
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                  />
                </div>
              ))}
              <button type="submit" className="w-full py-3 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,230,53,0.2)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm">
                <Save className="w-4 h-4" />
                Agregar tarifa
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
