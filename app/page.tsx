'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/app/lib/context';
import { convertPrice, formatPrice, PRICING_TIERS } from '@/app/lib/pricing';
import { COLOMBIA_LOCATIONS, VENEZUELA_LOCATIONS } from '@/app/lib/locations';
import {
  MOCK_SHIPMENTS,
  MOCK_TRACKING_EVENTS,
  STATUS_LABELS,
  STATUS_COLORS,
} from '@/app/lib/dashboard-data';
import { useState, useRef } from 'react';
import {
  Search,
  ArrowRight,
  Truck,
  Package,
  ShieldCheck,
  Calculator,
  MapPin,
  Star,
  ChevronRight,
  Copy,
  Check,
  Clock,
  Phone,
  Zap,
  ArrowUpRight,
  Boxes,
  ScanLine,
  Flame,
  Scale,
  AlertTriangle,
  Loader2,
  CheckCircle,
  Cog,
} from 'lucide-react';
import LocationCard from '@/app/components/ui/LocationCard';

// Status icons
const STATUS_ICONS: Record<string, React.ElementType> = {
  received: Package,
  processing: Cog,
  transit: Truck,
  customs: ShieldCheck,
  delivered: CheckCircle,
  cancelled: AlertTriangle,
};

export default function HomePage() {
  const { t, currency } = useApp();
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingState, setTrackingState] = useState<'idle' | 'loading' | 'found' | 'not_found'>('idle');
  const [foundShipment, setFoundShipment] = useState<typeof MOCK_SHIPMENTS[0] | null>(null);
  const [foundEvents, setFoundEvents] = useState<typeof MOCK_TRACKING_EVENTS>([]);
  const [activeTier, setActiveTier] = useState(2);
  const [locationTab, setLocationTab] = useState<'CO' | 'VE'>('CO');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const copyAddress = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Inline tracking search
  const doTrack = (code?: string) => {
    const q = (code || trackingNumber).trim().toUpperCase();
    if (!q) return;

    setTrackingState('loading');

    // Simulate network delay for professional feel
    setTimeout(() => {
      const shipment = MOCK_SHIPMENTS.find(
        s => s.trackingCode.toUpperCase() === q || s.id.toUpperCase() === q
      );

      if (shipment) {
        setFoundShipment(shipment);
        const events = MOCK_TRACKING_EVENTS
          .filter(e => e.shipmentId === shipment.id)
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setFoundEvents(events);
        setTrackingState('found');
      } else {
        setFoundShipment(null);
        setFoundEvents([]);
        setTrackingState('not_found');
      }

      // Scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 600);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doTrack();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      doTrack();
    }
  };

  const services = [
    { icon: Truck, title: t('services.s1.title'), desc: t('services.s1.desc'), gradient: 'from-teal-400 via-teal-500 to-emerald-600' },
    { icon: Boxes, title: t('services.s2.title'), desc: t('services.s2.desc'), gradient: 'from-indigo-400 via-indigo-500 to-violet-600' },
    { icon: ScanLine, title: t('services.s3.title'), desc: t('services.s3.desc'), gradient: 'from-lime-400 via-lime-500 to-green-500' },
    { icon: ShieldCheck, title: t('services.s4.title'), desc: t('services.s4.desc'), gradient: 'from-purple-400 via-purple-500 to-indigo-600' },
  ];

  const howSteps = [
    { num: '01', title: t('how.s1.title'), desc: t('how.s1.desc'), icon: Calculator },
    { num: '02', title: t('how.s2.title'), desc: t('how.s2.desc'), icon: MapPin },
    { num: '03', title: t('how.s3.title'), desc: t('how.s3.desc'), icon: ShieldCheck },
    { num: '04', title: t('how.s4.title'), desc: t('how.s4.desc'), icon: Truck },
  ];

  const testimonials = [
    { name: 'Carlos J. Ramírez', text: 'Excelente servicio, 100% seguro y confiable. Mi paquete llegó perfectamente desde Bogotá.', rating: 5, origin: 'Caracas, VE' },
    { name: 'María P. González', text: 'Los mejores precios y la atención es increíble. Siempre uso Enviar Courier.', rating: 5, origin: 'Maracay, VE' },
    { name: 'Juan F. Martínez', text: 'El rastreo en tiempo real me da mucha tranquilidad. Servicio premium.', rating: 5, origin: 'Valencia, VE' },
    { name: 'Ana L. Herrera', text: 'Mi casillero funciona perfecto. Compro en Colombia y recibo sin problemas.', rating: 5, origin: 'Barquisimeto, VE' },
  ];

  const displayedTiers = PRICING_TIERS.slice(0, 6);
  const locations = locationTab === 'CO' ? COLOMBIA_LOCATIONS : VENEZUELA_LOCATIONS;
  const heroTiers = PRICING_TIERS.slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Backgrounds */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 noise" />

        {/* Decorative orbs */}
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-500/[0.07] blur-[100px]" />
        <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] rounded-full bg-teal-400/[0.05] blur-[100px]" />

        {/* Spinning ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.03] animate-spin-slow pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.04] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-32 sm:py-40 w-full z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/20 text-xs font-semibold text-teal-300 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-glow-pulse" />
                {t('hero.badge')}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-white leading-[1.05] mb-6">
                {t('hero.title1')}{' '}
                <span className="text-gradient-lime">{t('hero.title2')}</span>{' '}
                {t('hero.title3')}
              </h1>

              <p className="text-base sm:text-lg text-neutral-400 max-w-xl mb-10 leading-relaxed">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="/casillero"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_30px_rgba(163,230,53,0.3)] transition-all duration-300 cursor-pointer text-sm"
                >
                  <Package className="w-4.5 h-4.5" />
                  {t('hero.cta1')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
                <Link
                  href="https://wa.me/573003328389"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/[0.05] text-white font-semibold rounded-xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 cursor-pointer text-sm"
                >
                  {t('hero.cta2')}
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </Link>
              </div>

              {/* Interactive Tracking Input */}
              <form onSubmit={handleTrackSubmit} className="max-w-lg">
                <div className="flex">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => { setTrackingNumber(e.target.value); if (trackingState !== 'idle') setTrackingState('idle'); }}
                      onKeyDown={handleKeyDown}
                      placeholder={t('hero.track.placeholder')}
                      className="w-full pl-11 pr-4 py-3.5 rounded-l-xl bg-white/[0.05] border border-white/[0.08] border-r-0 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition-all duration-200"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={trackingState === 'loading'}
                    className="px-6 py-3.5 gradient-cta text-white font-bold rounded-r-xl hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 text-sm cursor-pointer shrink-0 flex items-center gap-2 disabled:opacity-70"
                  >
                    {trackingState === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        {t('hero.track.btn')}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Quick demo links */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="text-[11px] text-neutral-600">Prueba:</span>
                  {['EC-20250320001', 'EC-20250318002'].map(code => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => { setTrackingNumber(code); doTrack(code); }}
                      className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500/20 cursor-pointer transition-all duration-200"
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </form>
            </div>

            {/* Right: Interactive Pricing Cards */}
            <div className="hidden lg:block animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="glass-card rounded-2xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-lime-400/10 border border-lime-400/20 flex items-center justify-center">
                      <Calculator className="w-4 h-4 text-lime-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{t('pricing.title')}</p>
                      <p className="text-[10px] text-neutral-600">Colombia → Venezuela</p>
                    </div>
                  </div>
                  <Link
                    href="/tarifas"
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors duration-200"
                  >
                    {t('pricing.viewall')}
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Tier Selector Pills */}
                <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1">
                  {heroTiers.map((tier, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTier(i)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all duration-300 shrink-0 ${
                        activeTier === i
                          ? 'gradient-cta text-white shadow-lg glow-indigo'
                          : 'bg-white/[0.04] text-neutral-500 hover:bg-white/[0.06] border border-white/[0.04]'
                      }`}
                    >
                      {tier.weight}
                    </button>
                  ))}
                </div>

                {/* Active Tier Detail */}
                <div className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.04] mb-4 transition-all duration-300">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p className="text-[10px] text-neutral-600 uppercase tracking-wider font-semibold mb-1">{t('pricing.total')}</p>
                      <p className="text-3xl font-bold text-gradient font-[var(--font-heading)]">
                        {formatPrice(convertPrice(heroTiers[activeTier].priceCOP, currency), currency)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-neutral-600 uppercase tracking-wider font-semibold mb-1">{t('pricing.perkg')}</p>
                      <p className="text-lg font-bold text-neutral-300">
                        {formatPrice(convertPrice(heroTiers[activeTier].pricePerKgCOP, currency), currency)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-teal-400" />
                      <span className="text-xs text-neutral-400">{heroTiers[activeTier].weight}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-xs text-neutral-400">{heroTiers[activeTier].dimensions}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom rows: all 4 tiers compact */}
                <div className="grid grid-cols-2 gap-2">
                  {heroTiers.map((tier, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTier(i)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        activeTier === i
                          ? 'bg-indigo-500/10 border border-indigo-500/20'
                          : 'bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                          activeTier === i ? 'gradient-cta text-white' : 'bg-white/[0.04] text-neutral-500'
                        }`}>
                          {tier.weight.replace(' KG', '')}
                        </div>
                        <span className={`text-xs font-semibold ${activeTier === i ? 'text-white' : 'text-neutral-500'}`}>
                          {tier.weight}
                        </span>
                      </div>
                      <span className={`text-xs font-bold ${activeTier === i ? 'text-indigo-400' : 'text-neutral-600'}`}>
                        {formatPrice(convertPrice(tier.priceCOP, currency), currency)}
                      </span>
                    </button>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="https://wa.me/573003328389"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full py-3 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,230,53,0.2)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {t('pricing.cta')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-900 to-transparent" />
      </section>

      {/* ===== INLINE TRACKING RESULT ===== */}
      {trackingState !== 'idle' && (
        <section ref={resultRef} className="relative py-16">
          <div className="absolute inset-0 gradient-section" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
            {/* Loading */}
            {trackingState === 'loading' && (
              <div className="glass-card rounded-2xl p-10 text-center animate-pulse">
                <Loader2 className="w-10 h-10 text-indigo-400 mx-auto mb-4 animate-spin" />
                <p className="text-sm text-neutral-400">Buscando envío...</p>
              </div>
            )}

            {/* Found */}
            {trackingState === 'found' && foundShipment && (
              <div className="glass-card rounded-2xl p-8 sm:p-10 animate-scale-in">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <div>
                    <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">Resultado de rastreo</p>
                    <p className="font-mono text-indigo-400 text-sm">{foundShipment.trackingCode}</p>
                  </div>
                  <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold border ${STATUS_COLORS[foundShipment.status]}`}>
                    {STATUS_LABELS[foundShipment.status]}
                  </span>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: 'Remitente', value: foundShipment.senderName, sub: foundShipment.senderCity },
                    { label: 'Destinatario', value: foundShipment.recipientName, sub: foundShipment.recipientCity },
                    { label: 'Peso', value: `${foundShipment.weight} KG`, sub: foundShipment.dimensions as string },
                    { label: 'Origen', value: foundShipment.origin === 'CO' ? 'Colombia' : foundShipment.origin === 'US' ? 'Estados Unidos' : 'China', sub: foundShipment.createdAt as string },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.03]">
                      <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-semibold text-white mt-1">{item.value}</p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{item.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Progress */}
                <div className="flex items-center gap-0 mb-6">
                  {(['received', 'processing', 'transit', 'customs', 'delivered'] as const).map((status, i) => {
                    const order = ['received', 'processing', 'transit', 'customs', 'delivered'];
                    const currentIdx = order.indexOf(foundShipment.status);
                    const isDone = i <= currentIdx && foundShipment.status !== 'cancelled';
                    const Icon = STATUS_ICONS[status] || Package;
                    return (
                      <div key={status} className="flex-1 flex items-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isDone ? 'gradient-cta shadow-lg' : 'bg-dark-600 border border-white/[0.06]'
                        }`}>
                          <Icon className={`w-4 h-4 ${isDone ? 'text-white' : 'text-neutral-600'}`} />
                        </div>
                        {i < 4 && (
                          <div className={`flex-1 h-0.5 rounded-full ${isDone && i < currentIdx ? 'bg-indigo-500' : 'bg-dark-600'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Events */}
                {foundEvents.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Historial</p>
                    {foundEvents.map((event, i) => {
                      const Icon = STATUS_ICONS[event.status] || Package;
                      return (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.03]">
                          <div className="w-8 h-8 rounded-lg gradient-cta flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white">{STATUS_LABELS[event.status]}</p>
                            <p className="text-[11px] text-neutral-500 mt-0.5">{event.description}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1 text-[10px] text-neutral-600">
                                <MapPin className="w-2.5 h-2.5" /> {event.location}
                              </span>
                              <span className="flex items-center gap-1 text-[10px] text-neutral-600 font-mono">
                                <Clock className="w-2.5 h-2.5" /> {event.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* View full details link */}
                <div className="mt-4 text-center">
                  <button
                    onClick={() => router.push(`/rastreo?q=${foundShipment.trackingCode}`)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    Ver detalles completos
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Not Found */}
            {trackingState === 'not_found' && (
              <div className="glass-card rounded-2xl p-8 text-center animate-scale-in">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Envío no encontrado</h3>
                <p className="text-sm text-neutral-500 mb-4">
                  No encontramos ningún envío con el código <span className="font-mono text-indigo-400">{trackingNumber}</span>.
                  Verifica tu número de guía e intenta nuevamente.
                </p>
                <button
                  onClick={() => { setTrackingState('idle'); setTrackingNumber(''); }}
                  className="px-5 py-2 gradient-cta text-white font-semibold rounded-xl hover:shadow-[0_0_16px_rgba(99,102,241,0.3)] transition-all duration-300 cursor-pointer text-sm"
                >
                  Intentar de nuevo
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== SERVICES ===== */}
      <section id="servicios" className="relative py-28">
        <div className="absolute inset-0 gradient-section" />
        <div className="absolute inset-0 dot-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/20 text-xs font-semibold text-teal-300 mb-6">
              <Zap className="w-3 h-3" />
              {t('services.title')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
              {t('services.title')}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-7 group cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <svc.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{svc.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-5">{svc.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-400 group-hover:text-teal-300 transition-colors duration-200">
                  {t('services.learn')}
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-dark-950" />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-6">
              <Flame className="w-3 h-3" />
              {t('how.title')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
              {t('how.title')}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">
              {t('how.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howSteps.map((step, i) => (
              <div key={i} className="relative text-center group">
                {/* Connector */}
                {i < howSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-indigo-500/30 to-transparent" />
                )}
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center mx-auto mb-6 shadow-xl glow-indigo group-hover:scale-105 transition-transform duration-300">
                  <step.icon className="w-9 h-9 text-white" />
                </div>
                <span className="text-xs font-bold text-indigo-400/60 uppercase tracking-[0.2em] mb-2 block font-mono">
                  Paso {step.num}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="relative py-28">
        <div className="absolute inset-0 gradient-section" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/20 text-xs font-semibold text-lime-300 mb-6">
              <Calculator className="w-3 h-3" />
              {t('pricing.title')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
              {t('pricing.title')}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">
              {t('pricing.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedTiers.map((tier, i) => {
              const isPopular = i === 2;
              return (
                <div
                  key={i}
                  className={`relative glass-card rounded-2xl p-8 cursor-pointer ${
                    isPopular ? 'ring-1 ring-indigo-500/40 glow-indigo' : ''
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 gradient-lime text-dark-950 text-[10px] font-black rounded-full uppercase tracking-wider">
                      {t('pricing.popular')}
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-white mb-4">
                      <span className="text-xl font-bold font-[var(--font-heading)]">{tier.weight}</span>
                    </div>
                    <p className="text-xs text-neutral-600">{tier.dimensions}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                      <span className="text-sm text-neutral-500">{t('pricing.total')}</span>
                      <span className="text-2xl font-bold text-gradient font-[var(--font-heading)]">
                        {formatPrice(convertPrice(tier.priceCOP, currency), currency)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-500">{t('pricing.perkg')}</span>
                      <span className="text-sm font-semibold text-neutral-300">
                        {formatPrice(convertPrice(tier.pricePerKgCOP, currency), currency)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="https://wa.me/573027543225"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                      isPopular
                        ? 'gradient-cta text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                        : 'bg-white/[0.05] text-neutral-300 hover:bg-white/[0.08] border border-white/[0.06]'
                    }`}
                  >
                    {t('pricing.cta')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/tarifas"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors duration-200 cursor-pointer group"
            >
              {t('pricing.viewall')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS ===== */}
      <section className="relative py-28">
        <div className="absolute inset-0 bg-dark-950" />
        <div className="absolute inset-0 dot-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
              {t('locations.title')}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">
              {t('locations.subtitle')}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-10">
            {(['CO', 'VE'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setLocationTab(tab)}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
                  locationTab === tab
                    ? 'gradient-cta text-white shadow-lg glow-indigo'
                    : 'bg-white/[0.04] text-neutral-400 hover:bg-white/[0.06] border border-white/[0.04]'
                }`}
              >
                {tab === 'CO' ? t('locations.co') : t('locations.ve')}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((loc) => (
              <LocationCard key={loc.id} loc={loc} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-section" />
        <div className="absolute top-0 right-[10%] w-[400px] h-[400px] rounded-full bg-indigo-500/[0.05] blur-[100px]" />
        <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] rounded-full bg-teal-400/[0.03] blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
              {t('testimonials.title')}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">
              {t('testimonials.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((test, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-6 cursor-default"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: test.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-lime-400 fill-lime-400" />
                  ))}
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  &ldquo;{test.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
                  <div className="w-9 h-9 rounded-full gradient-accent flex items-center justify-center text-dark-950 font-bold text-xs shrink-0">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{test.name}</p>
                    <p className="text-xs text-neutral-600">{test.origin}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
