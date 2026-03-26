'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/app/lib/context';
import {
  MOCK_SHIPMENTS,
  MOCK_TRACKING_EVENTS,
  STATUS_LABELS,
  STATUS_COLORS,
} from '@/app/lib/dashboard-data';
import {
  Search,
  Package,
  Truck,
  ShieldCheck,
  CheckCircle,
  MapPin,
  Clock,
  ArrowRight,
  ScanLine,
  AlertTriangle,
  Scale,
  User,
  Globe,
  Cog,
  Loader2,
} from 'lucide-react';

const STATUS_ICONS: Record<string, React.ElementType> = {
  received: Package,
  processing: Cog,
  transit: Truck,
  customs: ShieldCheck,
  delivered: CheckCircle,
  cancelled: AlertTriangle,
};

export default function RastreoPage() {
  const { t } = useApp();
  const searchParams = useSearchParams();
  const [tracking, setTracking] = useState('');
  const [result, setResult] = useState<'idle' | 'loading' | 'found' | 'not_found'>('idle');
  const [foundShipment, setFoundShipment] = useState<typeof MOCK_SHIPMENTS[0] | null>(null);
  const [foundEvents, setFoundEvents] = useState<typeof MOCK_TRACKING_EVENTS>([]);
  const resultRef = useRef<HTMLElement>(null);

  // Auto-fill from URL params (e.g., from homepage search)
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setTracking(q);
      doSearch(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const doSearch = (query: string) => {
    const q = query.trim().toUpperCase();
    if (!q) return;

    setResult('loading');

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
        setResult('found');
      } else {
        setFoundShipment(null);
        setFoundEvents([]);
        setResult('not_found');
      }

      // Auto scroll
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 600); // Simulate network
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(tracking);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-28 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-20 left-[15%] w-[400px] h-[400px] rounded-full bg-indigo-500/[0.06] blur-[100px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-6">
            <ScanLine className="w-3.5 h-3.5" />
            Tracking
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('tracking.title')}
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto mb-12">
            {t('tracking.subtitle')}
          </p>

          <form onSubmit={handleTrack} className="max-w-lg mx-auto">
            <div className="flex">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={tracking}
                  onChange={(e) => { setTracking(e.target.value); if (result !== 'idle') setResult('idle'); }}
                  placeholder={t('tracking.placeholder')}
                  className="w-full pl-11 pr-4 py-4 rounded-l-xl bg-white/[0.06] border border-white/[0.08] border-r-0 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={result === 'loading'}
                className="px-8 py-4 gradient-cta text-white font-bold rounded-r-xl hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 text-sm cursor-pointer shrink-0 flex items-center gap-2 disabled:opacity-70"
              >
                {result === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <>
                    <ScanLine className="w-4 h-4" />
                    {t('tracking.btn')}
                  </>
                )}
              </button>
            </div>

            {/* Quick demo codes */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-[11px] text-neutral-600">Prueba:</span>
              {['EC-20250320001', 'EC-20250318002', 'EC-20250315003'].map(code => (
                <button
                  key={code}
                  type="button"
                  onClick={() => { setTracking(code); doSearch(code); }}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500/20 cursor-pointer transition-all duration-200"
                >
                  {code}
                </button>
              ))}
            </div>
          </form>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent" />
      </section>

      {/* Loading state */}
      {result === 'loading' && (
        <section ref={resultRef} className="relative py-28">
          <div className="absolute inset-0 gradient-section" />
          <div className="relative max-w-xl mx-auto px-4 sm:px-6 text-center">
            <div className="glass-card rounded-2xl p-10 animate-pulse">
              <Loader2 className="w-12 h-12 text-indigo-400 mx-auto mb-4 animate-spin" />
              <p className="text-neutral-500 text-base">Rastreando paquete...</p>
            </div>
          </div>
        </section>
      )}

      {/* Tracking Result — Found */}
      {result === 'found' && foundShipment && (
        <section ref={resultRef} className="relative py-28 animate-scale-in">
          <div className="absolute inset-0 gradient-section" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
            <div className="glass-card rounded-2xl p-8 sm:p-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Resultado de rastreo</h3>
                  <p className="text-sm text-neutral-500 mt-1 font-mono">
                    {foundShipment.trackingCode}
                  </p>
                </div>
                <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold border ${STATUS_COLORS[foundShipment.status]}`}>
                  {STATUS_LABELS[foundShipment.status]}
                </span>
              </div>

              {/* Shipment Info */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: User, label: 'Remitente', value: `${foundShipment.senderName} — ${foundShipment.senderCity}` },
                  { icon: User, label: 'Destinatario', value: `${foundShipment.recipientName} — ${foundShipment.recipientCity}` },
                  { icon: Scale, label: 'Peso / Volumen', value: `${foundShipment.weight} KG (${foundShipment.dimensions})` },
                  { icon: Globe, label: 'Origen', value: foundShipment.origin === 'CO' ? 'Colombia' : foundShipment.origin === 'US' ? 'Estados Unidos' : 'China' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.03]">
                    <item.icon className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm text-neutral-300 mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-0 mb-10">
                {(['received', 'processing', 'transit', 'customs', 'delivered'] as const).map((status, i) => {
                  const statusOrder = ['received', 'processing', 'transit', 'customs', 'delivered'];
                  const currentIdx = statusOrder.indexOf(foundShipment.status);
                  const isDone = i <= currentIdx && foundShipment.status !== 'cancelled';
                  const Icon = STATUS_ICONS[status] || Package;
                  return (
                    <div key={status} className="flex-1 flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isDone
                            ? 'gradient-cta shadow-lg glow-indigo'
                            : 'bg-dark-600 border border-white/[0.06]'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isDone ? 'text-white' : 'text-neutral-600'}`} />
                      </div>
                      {i < 4 && (
                        <div className={`flex-1 h-0.5 rounded-full ${isDone && i < currentIdx ? 'bg-indigo-500' : 'bg-dark-600'}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Timeline Events */}
              {foundEvents.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-neutral-400 mb-3">Historial de movimientos</h4>
                  {foundEvents.map((event, i) => {
                    const Icon = STATUS_ICONS[event.status] || Package;
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.04]"
                      >
                        <div className="w-10 h-10 rounded-xl gradient-cta shadow-lg flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-sm">{STATUS_LABELS[event.status]}</h4>
                          <p className="text-xs text-neutral-400 mt-0.5">{event.description}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1 text-xs text-neutral-500">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-neutral-600 font-mono">
                              <Clock className="w-3 h-3" />
                              {event.timestamp}
                            </span>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-teal-400 shrink-0" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-neutral-500">No hay eventos de rastreo registrados aún.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Not Found */}
      {result === 'not_found' && (
        <section ref={resultRef} className="relative py-28 animate-scale-in">
          <div className="absolute inset-0 gradient-section" />
          <div className="relative max-w-xl mx-auto px-4 sm:px-6 text-center">
            <div className="glass-card rounded-2xl p-10">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Envío no encontrado</h3>
              <p className="text-sm text-neutral-500 mb-6">
                No encontramos ningún envío con el código <span className="font-mono text-indigo-400">{tracking}</span>. Verifica el número e intenta de nuevo.
              </p>
              <button
                onClick={() => { setResult('idle'); setTracking(''); }}
                className="px-6 py-2.5 gradient-cta text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 cursor-pointer text-sm"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Idle state */}
      {result === 'idle' && (
        <section className="relative py-28">
          <div className="absolute inset-0 gradient-section" />
          <div className="relative max-w-xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6">
              <ScanLine className="w-10 h-10 text-indigo-400/40" />
            </div>
            <p className="text-neutral-500 text-base">{t('tracking.subtitle')}</p>
          </div>
        </section>
      )}
    </div>
  );
}
