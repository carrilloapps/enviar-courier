'use client';

import { useState } from 'react';
import {
  MOCK_SHIPMENTS,
  MOCK_TRACKING_EVENTS,
  STATUS_LABELS,
  STATUS_COLORS,
  type Shipment,
  type ShipmentStatus,
} from '@/app/lib/dashboard-data';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  Package,
  Save,
  Navigation,
  ArrowRight,
} from 'lucide-react';

export default function PaquetesPage() {
  const activeShipments = MOCK_SHIPMENTS.filter(s => s.status !== 'delivered' && s.status !== 'cancelled');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [updateLocation, setUpdateLocation] = useState('');
  const [updateDesc, setUpdateDesc] = useState('');
  const [updateStatus, setUpdateStatus] = useState<ShipmentStatus>('transit');
  const [events, setEvents] = useState(MOCK_TRACKING_EVENTS);

  const selected = activeShipments.find(s => s.id === selectedId);
  const selectedEvents = events.filter(e => e.shipmentId === selectedId).sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;
    const newEvent = {
      id: `te${Date.now()}`,
      shipmentId: selectedId,
      status: updateStatus,
      location: updateLocation,
      description: updateDesc,
      timestamp: new Date().toLocaleString('es-CO'),
      updatedBy: 'Pedro López',
    };
    setEvents(prev => [newEvent, ...prev]);
    setUpdateLocation('');
    setUpdateDesc('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-[var(--font-heading)]">Paquetes en ruta</h1>
        <p className="text-sm text-neutral-500 mt-1">Actualización de ubicación y seguimiento de paquetes</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Shipment list */}
        <div className="lg:col-span-1 space-y-3">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            {activeShipments.length} paquetes activos
          </p>
          {activeShipments.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                selectedId === s.id
                  ? 'bg-indigo-500/10 border border-indigo-500/30'
                  : 'glass-card hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs text-indigo-400">{s.trackingCode}</span>
                <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold border ${STATUS_COLORS[s.status]}`}>
                  {STATUS_LABELS[s.status]}
                </span>
              </div>
              <p className="text-sm text-white font-medium">{s.recipientName}</p>
              <p className="text-xs text-neutral-600 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" /> {s.recipientCity}
              </p>
            </button>
          ))}
        </div>

        {/* Detail + update */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="space-y-5">
              {/* Info card */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Package className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-mono text-indigo-400 text-sm">{selected.trackingCode}</p>
                    <p className="text-xs text-neutral-500">{selected.recipientName} — {selected.recipientCity}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Peso', value: `${selected.weight} KG` },
                    { label: 'Dimensiones', value: selected.dimensions },
                    { label: 'Origen', value: selected.senderCity },
                    { label: 'Estado', value: STATUS_LABELS[selected.status] },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                      <p className="text-[10px] text-neutral-600 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm text-white font-medium mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Update form */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-teal-400" />
                  Actualizar ubicación
                </h3>
                <form onSubmit={handleUpdate} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-neutral-500 mb-1.5 uppercase tracking-wider">Ubicación</label>
                      <input
                        value={updateLocation}
                        onChange={(e) => setUpdateLocation(e.target.value)}
                        required
                        placeholder="Cúcuta, Colombia"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-neutral-500 mb-1.5 uppercase tracking-wider">Estado</label>
                      <select
                        value={updateStatus}
                        onChange={(e) => setUpdateStatus(e.target.value as ShipmentStatus)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/30 cursor-pointer appearance-none transition-all duration-200"
                      >
                        {Object.entries(STATUS_LABELS).map(([key, label]) => (
                          <option key={key} value={key} className="bg-dark-800">{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-500 mb-1.5 uppercase tracking-wider">Descripción</label>
                    <input
                      value={updateDesc}
                      onChange={(e) => setUpdateDesc(e.target.value)}
                      required
                      placeholder="Paquete en ruta hacia destino"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,230,53,0.2)] transition-all duration-300 cursor-pointer text-sm flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Actualizar
                  </button>
                </form>
              </div>

              {/* Timeline */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Historial de movimientos</h3>
                <div className="space-y-0">
                  {selectedEvents.map((event, i) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${i === 0 ? 'gradient-cta' : 'bg-dark-600 border border-white/[0.06]'}`}>
                          {i === 0 ? <Truck className="w-4 h-4 text-white" /> : <CheckCircle className="w-4 h-4 text-neutral-600" />}
                        </div>
                        {i < selectedEvents.length - 1 && <div className="w-px h-full bg-white/[0.04] my-1" />}
                      </div>
                      <div className="pb-5">
                        <p className="text-sm font-medium text-white">{event.description}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-neutral-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {event.location}
                          </span>
                          <span className="text-xs text-neutral-600 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {event.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {selectedEvents.length === 0 && (
                    <p className="text-sm text-neutral-600">Sin movimientos registrados</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96 glass-card rounded-2xl">
              <div className="text-center">
                <Truck className="w-12 h-12 text-neutral-700 mx-auto mb-3" />
                <p className="text-neutral-500">Selecciona un paquete para ver detalles</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
