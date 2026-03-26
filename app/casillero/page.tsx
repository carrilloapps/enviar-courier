'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/app/lib/context';
import { COLOMBIA_LOCATIONS } from '@/app/lib/locations';
import {
  ShoppingCart,
  Package,
  MessageCircle,
  Clock,
  UserCheck,
  Radio,
  ArrowRight,
  Copy,
  Check,
  Phone,
  Mail,
  User,
  MapPin,
  CreditCard,
  Zap,
} from 'lucide-react';

const steps = [
  { icon: ShoppingCart, numKey: '1' },
  { icon: Package, numKey: '2' },
  { icon: MessageCircle, numKey: '3' },
  { icon: Clock, numKey: '4' },
  { icon: UserCheck, numKey: '5' },
  { icon: Radio, numKey: '6' },
];

const stepGradients = [
  'from-teal-400 to-teal-600',
  'from-indigo-400 to-indigo-600',
  'from-lime-400 to-lime-600',
  'from-purple-400 to-purple-600',
  'from-teal-400 to-indigo-500',
  'from-lime-400 to-teal-400',
];

export default function CasilleroPage() {
  const { t } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', id: '', city: '',
  });

  const copyAddress = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Casillero creado exitosamente! Te contactaremos pronto.');
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-20 right-[15%] w-[400px] h-[400px] rounded-full bg-teal-400/[0.06] blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/20 text-xs font-semibold text-teal-300 mb-6">
            <Package className="w-3.5 h-3.5" />
            Casillero Internacional
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('locker.hero.title')}
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
            {t('locker.hero.subtitle')}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent" />
      </section>

      {/* How it works */}
      <section className="relative py-28">
        <div className="absolute inset-0 gradient-section" />
        <div className="absolute inset-0 dot-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('locker.how.title')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((step, i) => {
              const stepKeys = [
                { title: 'locker.step1.title', desc: 'locker.step1.desc' },
                { title: 'locker.step2.title', desc: 'locker.step2.desc' },
                { title: 'locker.step3.title', desc: 'locker.step3.desc' },
                { title: 'locker.step4.title', desc: 'locker.step4.desc' },
                { title: 'locker.step5.title', desc: 'locker.step5.desc' },
                { title: 'locker.step6.title', desc: 'locker.step6.desc' },
              ];

              return (
                <div key={i} className="glass-card rounded-2xl p-8 group cursor-default relative overflow-hidden">
                  <div className="absolute top-4 right-5 text-5xl font-bold text-white/[0.03] font-[var(--font-heading)]">
                    {step.numKey}
                  </div>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stepGradients[i]} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{t(stepKeys[i].title)}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{t(stepKeys[i].desc)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-dark-950" />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{t('locker.register.title')}</h2>
          </div>

          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 sm:p-10">
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { label: t('locker.form.name'), icon: User, key: 'name', type: 'text', placeholder: 'Juan Pérez' },
                { label: t('locker.form.email'), icon: Mail, key: 'email', type: 'email', placeholder: 'juan@email.com' },
                { label: t('locker.form.phone'), icon: Phone, key: 'phone', type: 'tel', placeholder: '+58 412 1234567' },
                { label: t('locker.form.id'), icon: CreditCard, key: 'id', type: 'text', placeholder: 'V-12345678' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2.5 uppercase tracking-wider">
                    {field.label}
                  </label>
                  <div className="relative">
                    <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                    <input
                      type={field.type}
                      required
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 text-sm transition-all duration-200"
                      placeholder={field.placeholder}
                    />
                  </div>
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-2.5 uppercase tracking-wider">
                  {t('locker.form.city')}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                  <select
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 text-sm appearance-none cursor-pointer transition-all duration-200"
                  >
                    <option value="" className="bg-dark-800">Seleccionar ciudad...</option>
                    {['Caracas', 'Maracay', 'Valencia', 'Barquisimeto', 'Maracaibo', 'Mérida'].map((c) => (
                      <option key={c} value={c.toLowerCase()} className="bg-dark-800">{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full py-4 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_30px_rgba(163,230,53,0.25)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Zap className="w-5 h-5" />
              {t('locker.form.submit')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Addresses */}
      <section className="relative py-28">
        <div className="absolute inset-0 gradient-section" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{t('locker.addresses.title')}</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm">{t('locker.addresses.subtitle')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLOMBIA_LOCATIONS.map((loc) => (
              <div key={loc.id} className="glass-card rounded-2xl p-6 group">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-base font-bold text-white">
                    <MapPin className="inline-block w-4 h-4 mr-1.5 text-indigo-400" /> {loc.city}{loc.area ? ` · ${loc.area}` : ''}
                  </h4>
                  <button
                    onClick={() => copyAddress(loc.id, `${loc.address}, ${loc.city}, Colombia. CP: ${loc.postalCode}`)}
                    className="p-2 rounded-lg hover:bg-white/[0.06] text-neutral-600 hover:text-teal-400 transition-all duration-200 cursor-pointer"
                  >
                    {copiedId === loc.id ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-sm text-neutral-400 mb-2">{loc.address}</p>
                <p className="text-xs text-neutral-600 mb-3">CP: {loc.postalCode} · {loc.neighborhood}</p>
                {loc.note && (
                  <p className="text-xs text-yellow-400/80 bg-yellow-400/5 px-3 py-2 rounded-lg mb-3 border border-yellow-400/10">{loc.note}</p>
                )}
                <div className="flex items-center gap-2 pt-3 border-t border-white/[0.04]">
                  <Link href={`tel:${loc.phone.replace(/\s/g, '')}`} className="text-xs text-neutral-500 hover:text-indigo-400 transition-colors duration-200 cursor-pointer">
                    <Phone className="inline-block w-3.5 h-3.5 mr-1 text-teal-400" /> {loc.phone}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
