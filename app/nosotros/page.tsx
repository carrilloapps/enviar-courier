'use client';

import { useApp } from '@/app/lib/context';
import {
  Target,
  Eye,
  Heart,
  ShieldCheck,
  Users,
  Zap,
  Award,
  Globe,
  Package,
  Truck,
  ArrowRight,
} from 'lucide-react';
import PageHero from '@/app/components/ui/PageHero';

export default function NosotrosPage() {
  const { t } = useApp();

  const values = [
    { icon: ShieldCheck, title: 'Confianza', desc: 'Cada envío es tratado con el mayor cuidado y responsabilidad.', gradient: 'from-teal-400 to-teal-600' },
    { icon: Zap, title: 'Eficiencia', desc: 'Procesos optimizados para entregas rápidas y puntuales.', gradient: 'from-indigo-400 to-indigo-600' },
    { icon: Heart, title: 'Compromiso', desc: 'Nos comprometemos con cada cliente como si fuera el único.', gradient: 'from-lime-400 to-green-500' },
    { icon: Users, title: 'Cercanía', desc: 'Atención personalizada y humana en cada interacción.', gradient: 'from-purple-400 to-purple-600' },
  ];

  const stats = [
    { value: '15,000+', label: 'Envíos exitosos', icon: Package },
    { value: '8,500+', label: 'Clientes satisfechos', icon: Users },
    { value: '12+', label: 'Ciudades', icon: Globe },
    { value: '5+', label: 'Años operando', icon: Award },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <PageHero
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        badgeText={t('about.title')}
        badgeIcon={Users}
        colorScheme="indigo"
      />

      {/* Mission & Vision */}
      <section className="relative py-28">
        <div className="absolute inset-0 gradient-section" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-10 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-6 shadow-lg glow-teal group-hover:scale-105 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{t('about.mission.title')}</h2>
              <p className="text-neutral-400 leading-relaxed text-sm">{t('about.mission.desc')}</p>
            </div>
            <div className="glass-card rounded-2xl p-10 group">
              <div className="w-16 h-16 rounded-2xl gradient-lime flex items-center justify-center mb-6 shadow-lg glow-lime group-hover:scale-105 transition-transform duration-300">
                <Eye className="w-8 h-8 text-dark-950" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{t('about.vision.title')}</h2>
              <p className="text-neutral-400 leading-relaxed text-sm">{t('about.vision.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-dark-950" />
        <div className="absolute inset-0 dot-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t('about.values.title')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((val, i) => (
              <div key={i} className="glass-card rounded-2xl p-7 text-center group cursor-default">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${val.gradient} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <val.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-section" />
        <div className="absolute top-0 right-[10%] w-[400px] h-[400px] rounded-full bg-indigo-500/[0.05] blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5">
                  <stat.icon className="w-7 h-7 text-indigo-400" />
                </div>
                <p className="text-4xl font-bold text-white mb-2 font-[var(--font-heading)]">{stat.value}</p>
                <p className="text-neutral-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Route — Colombia to Venezuela only */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-dark-950" />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Nuestra ruta</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto mb-14 leading-relaxed text-sm">
            Operamos la ruta más importante para conectar Colombia con Venezuela, garantizando tiempos de entrega de 12 a 18 días continuos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="glass-card rounded-2xl px-10 py-8 cursor-default group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-white">Colombia</p>
                  <p className="text-xs text-neutral-600">Origen</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block w-16 h-px bg-gradient-to-r from-indigo-500 to-indigo-500/30" />
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Truck className="w-5 h-5 text-indigo-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-indigo-400" />
              <div className="hidden sm:block w-16 h-px bg-gradient-to-r from-indigo-500/30 to-lime-500" />
            </div>

            <div className="gradient-lime rounded-2xl px-10 py-8 shadow-lg glow-lime cursor-default group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-dark-950/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-dark-950" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-dark-950">Venezuela</p>
                  <p className="text-xs text-dark-950/60">Destino</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
