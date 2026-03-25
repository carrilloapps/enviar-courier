'use client';

import DataTable from '@/app/components/dashboard/DataTable';
import { MOCK_LOCKERS, type Locker } from '@/app/lib/dashboard-data';
import {
  Boxes,
  User,
  MapPin,
  Mail,
  Phone,
  Package,
  Calendar,
} from 'lucide-react';
import { useState } from 'react';

export default function CasillerosPage() {
  const [selected, setSelected] = useState<Locker | null>(null);

  const statusColors: Record<string, string> = {
    active: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    inactive: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
    suspended: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  const statusLabels: Record<string, string> = {
    active: 'Activo',
    inactive: 'Inactivo',
    suspended: 'Suspendido',
  };

  const columns = [
    {
      key: 'code',
      label: 'Código',
      sortable: true,
      render: (l: Locker) => <span className="font-mono text-indigo-400 text-xs font-bold">{l.code}</span>,
    },
    {
      key: 'userName',
      label: 'Usuario',
      sortable: true,
      render: (l: Locker) => (
        <div>
          <p className="text-sm font-medium text-white">{l.userName}</p>
          <p className="text-[11px] text-neutral-600">{l.userEmail}</p>
        </div>
      ),
    },
    {
      key: 'destinationCity',
      label: 'Destino',
      render: (l: Locker) => (
        <span className="flex items-center gap-1 text-xs text-neutral-400">
          <MapPin className="w-3 h-3" /> {l.destinationCity}
        </span>
      ),
    },
    {
      key: 'shipmentsCount',
      label: 'Envíos',
      sortable: true,
      render: (l: Locker) => (
        <span className="flex items-center gap-1 text-xs text-neutral-400">
          <Package className="w-3 h-3" /> {l.shipmentsCount}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Estado',
      render: (l: Locker) => (
        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${statusColors[l.status]}`}>
          {statusLabels[l.status]}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Creado',
      sortable: true,
      render: (l: Locker) => <span className="text-xs text-neutral-600 font-mono">{l.createdAt}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-[var(--font-heading)]">Casilleros</h1>
        <p className="text-sm text-neutral-500 mt-1">Gestión de casilleros virtuales registrados</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: MOCK_LOCKERS.length, color: 'text-indigo-400' },
          { label: 'Activos', value: MOCK_LOCKERS.filter(l => l.status === 'active').length, color: 'text-teal-400' },
          { label: 'Suspendidos', value: MOCK_LOCKERS.filter(l => l.status === 'suspended').length, color: 'text-red-400' },
          { label: 'Total envíos', value: MOCK_LOCKERS.reduce((sum, l) => sum + l.shipmentsCount, 0), color: 'text-lime-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color} font-[var(--font-heading)]`}>{stat.value}</p>
            <p className="text-[10px] text-neutral-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <DataTable
        data={MOCK_LOCKERS as unknown as Record<string, unknown>[]}
        columns={columns as never}
        searchKeys={['code', 'userName', 'userEmail', 'destinationCity']}
        onRowClick={(item) => setSelected(item as unknown as Locker)}
      />

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative glass-card rounded-2xl p-8 max-w-md w-full animate-scale-in">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-white/[0.06] cursor-pointer">
              <span className="sr-only">Cerrar</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                <Boxes className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <p className="font-mono text-teal-400 font-bold">{selected.code}</p>
                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border mt-1 ${statusColors[selected.status]}`}>
                  {statusLabels[selected.status]}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: User, label: 'Usuario', value: selected.userName },
                { icon: Mail, label: 'Email', value: selected.userEmail },
                { icon: Phone, label: 'Teléfono', value: selected.userPhone },
                { icon: MapPin, label: 'Ciudad destino', value: selected.destinationCity },
                { icon: MapPin, label: 'Dirección', value: selected.address },
                { icon: Package, label: 'Envíos totales', value: selected.shipmentsCount.toString() },
                { icon: Calendar, label: 'Registrado', value: selected.createdAt },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                  <item.icon className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-neutral-300 mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
