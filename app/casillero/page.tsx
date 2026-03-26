'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
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
    router.push('/registro-exitoso');
  };

  return (
    <div className="overflow-hidden">
      {/* Professional Registration Suite */}
      <section className="relative pt-32 pb-24" id="registro">
        <div className="absolute inset-0 bg-dark-950" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-6">
              <UserCheck className="w-3.5 h-3.5" />
              Registro Seguro
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
              Crea tu <span className="text-gradient">Casillero Gratuito</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-base">
              Completa tus datos de entrega en Venezuela. Una vez registrado, te asignaremos inmediatamente tu dirección física en Colombia.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Form Side */}
            <div className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Datos Personales */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-xs text-center border border-teal-500/30">1</span>
                    Datos Personales
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { label: 'Nombre Completo', icon: User, key: 'name', type: 'text', placeholder: 'Juan Pérez' },
                      { label: 'Cédula de Identidad', icon: CreditCard, key: 'id', type: 'text', placeholder: 'V-12345678' },
                      { label: 'Correo Electrónico', icon: Mail, key: 'email', type: 'email', placeholder: 'juan@email.com' },
                      { label: 'Teléfono (WhatsApp)', icon: Phone, key: 'phone', type: 'tel', placeholder: '+58 414 1234567' },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-[11px] font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
                          {field.label}
                        </label>
                        <div className="relative group">
                          <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-teal-400 transition-colors" />
                          <input
                            type={field.type}
                            required
                            value={formData[field.key as keyof typeof formData]}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-dark-900/50 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 text-sm transition-all duration-200"
                            placeholder={field.placeholder}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-white/5" />

                {/* 2. Dirección de Entrega Destino */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs text-center border border-indigo-500/30">2</span>
                    Dirección de Destino (Venezuela)
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
                        Dirección Principal (Calle, Avenida)
                      </label>
                      <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-indigo-400 transition-colors" />
                        <input
                          type="text"
                          required
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-dark-900/50 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-sm transition-all duration-200"
                          placeholder="Av. Principal, Edificio / Casa"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
                        Detalles Adicionales (Apto, Piso, Referencia)
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3.5 rounded-xl bg-dark-900/50 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-sm transition-all duration-200"
                        placeholder="Apto 4B, Punto de referencia: Frente a la panadería"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
                        Estado
                      </label>
                      <select required className="w-full px-4 py-3.5 rounded-xl bg-dark-900/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-sm appearance-none cursor-pointer transition-all duration-200">
                        <option value="" className="bg-dark-900">Seleccionar estado...</option>
                        {['Distrito Capital', 'Miranda', 'Carabobo', 'Aragua', 'Lara', 'Zulia'].map(estado => (
                          <option key={estado} value={estado.toLowerCase()} className="bg-dark-900">{estado}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-dark-900/50 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-sm transition-all duration-200"
                        placeholder="Ej. Caracas"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
                        Municipio / Parroquia
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-dark-900/50 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-sm transition-all duration-200"
                        placeholder="Ej. Chacao"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-dark-900/50 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-sm transition-all duration-200"
                        placeholder="Ej. 1060"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_30px_rgba(163,230,53,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-base"
                  >
                    <Check className="w-5 h-5" />
                    Crear mi Casillero Ahora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                  <p className="text-center text-[11px] text-neutral-500 mt-4">
                    Al registrarte, aceptas nuestros términos y políticas de privacidad y aduanas.
                  </p>
                </div>
              </form>
            </div>

            {/* Benefits Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="glass-card rounded-2xl p-6 border-t-4 border-t-teal-400">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-teal-400" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Casillero Gratuito</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Sin mensualidades ni costos de mantenimiento. Solo pagas por lo que envías.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6 border-t-4 border-t-indigo-400">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                  <Radio className="w-6 h-6 text-indigo-400" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Rastreo 24/7</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Sistema de notificaciones vía correo y rastreo en tiempo real desde la recepción hasta la entrega.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6 border-t-4 border-t-lime-400">
                <div className="w-12 h-12 rounded-xl bg-lime-500/10 flex items-center justify-center mb-4">
                  <ShoppingCart className="w-6 h-6 text-lime-400" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Consolidación</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Recibimos tus compras de diferentes tiendas y las agrupamos en un solo envío para ahorrar costos.
                </p>
              </div>
            </div>
          </div>
        </div>
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
