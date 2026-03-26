'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/lib/context';
import { COLOMBIA_LOCATIONS, VENEZUELA_LOCATIONS } from '@/app/lib/locations';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  User,
  FileText,
  Clock,
  Zap,
  ArrowUpRight,
} from 'lucide-react';

export default function ContactoPage() {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Mensaje enviado! Te responderemos pronto.');
  };

  const allLocations = [...COLOMBIA_LOCATIONS.slice(0, 4), ...VENEZUELA_LOCATIONS.slice(0, 3)];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-20 right-[20%] w-[400px] h-[400px] rounded-full bg-teal-400/[0.05] blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/20 text-xs font-semibold text-teal-300 mb-6">
            <MessageCircle className="w-3.5 h-3.5" />
            {t('contact.title')}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent" />
      </section>

      {/* Contact Form + Info */}
      <section className="relative py-28">
        <div className="absolute inset-0 gradient-section" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 sm:p-10">
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-2.5 uppercase tracking-wider">
                      {t('contact.form.name')}
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition-all duration-200"
                        placeholder="Tu nombre"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-2.5 uppercase tracking-wider">
                      {t('contact.form.email')}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition-all duration-200"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-xs font-semibold text-neutral-300 mb-2.5 uppercase tracking-wider">
                    {t('contact.form.subject')}
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition-all duration-200"
                      placeholder="Asunto del mensaje"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-semibold text-neutral-300 mb-2.5 uppercase tracking-wider">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm resize-none transition-all duration-200"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_30px_rgba(163,230,53,0.25)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Send className="w-5 h-5" />
                  {t('contact.form.submit')}
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-lg font-bold text-white mb-6">{t('contact.info.title')}</h3>
                <div className="space-y-5">
                  {[
                    { icon: MessageCircle, label: t('contact.whatsapp'), value: '+57 300 332 8389', href: 'https://wa.me/573003328389', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
                    { icon: Phone, label: t('contact.phone'), value: '+57 320 851 0712', href: 'tel:+573208510712', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
                    { icon: Mail, label: t('contact.email'), value: 'info@enviarcourier.com', href: 'mailto:info@enviarcourier.com', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
                    { icon: Clock, label: 'Horario', value: 'Lun-Vie: 9AM-5PM · Sáb: 9AM-1PM', href: null, color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${item.color} border flex items-center justify-center shrink-0`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">{item.label}</p>
                        {item.href ? (
                          <Link href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} className="text-sm text-neutral-400 hover:text-teal-400 transition-colors duration-200 cursor-pointer">
                            {item.value}
                          </Link>
                        ) : (
                          <p className="text-sm text-neutral-400">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="https://wa.me/573003328389"
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
              >
                <MessageCircle className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-lg font-bold mb-1">Chat por WhatsApp</p>
                <p className="text-sm text-green-100">Respuesta inmediata</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-dark-950" />
        <div className="absolute inset-0 dot-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Nuestras Sedes</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allLocations.map((loc) => (
              <div key={loc.id} className="glass-card rounded-xl p-5 cursor-default">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{loc.country === 'CO' ? '🇨🇴' : '🇻🇪'}</span>
                  <h4 className="font-bold text-white text-sm">
                    {loc.city}{loc.area ? ` · ${loc.area}` : ''}
                  </h4>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed mb-2">{loc.address}</p>
                <div className="flex items-center gap-1 text-xs text-neutral-600">
                  <MapPin className="w-3 h-3" />
                  CP: {loc.postalCode}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
