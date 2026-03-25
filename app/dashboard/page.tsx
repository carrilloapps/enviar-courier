'use client';

import StatsCard from '@/app/components/dashboard/StatsCard';
import {
  MOCK_SHIPMENTS,
  MOCK_LOCKERS,
  getShipmentsByStatus,
  getShipmentsByOrigin,
  getTotalRevenue,
  getActiveLockers,
  STATUS_LABELS,
  STATUS_COLORS,
  ORIGIN_LABELS,
} from '@/app/lib/dashboard-data';
import { MOCK_USERS } from '@/app/lib/auth';
import {
  Package,
  Truck,
  Boxes,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
  MapPin,
  Clock,
  Globe,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverview() {
  const statusCounts = getShipmentsByStatus(MOCK_SHIPMENTS);
  const originCounts = getShipmentsByOrigin(MOCK_SHIPMENTS);
  const totalRevenue = getTotalRevenue(MOCK_SHIPMENTS);
  const activeLockers = getActiveLockers(MOCK_LOCKERS);

  const recentShipments = [...MOCK_SHIPMENTS]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white font-[var(--font-heading)]">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Resumen general de operaciones</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total envíos"
          value={MOCK_SHIPMENTS.length}
          icon={Package}
          color="indigo"
          trend="up"
          trendValue="+12%"
        />
        <StatsCard
          title="En tránsito"
          value={statusCounts.transit + statusCounts.customs}
          icon={Truck}
          color="amber"
          trend="up"
          trendValue="+3"
          subtitle="Incluye envíos en aduana"
        />
        <StatsCard
          title="Casilleros activos"
          value={activeLockers}
          icon={Boxes}
          color="teal"
          trend="up"
          trendValue="+2"
        />
        <StatsCard
          title="Valor declarado total"
          value={`$${(totalRevenue / 1000).toFixed(0)}K`}
          icon={DollarSign}
          color="lime"
          trend="up"
          trendValue="+8%"
          subtitle="COP"
        />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Status distribution */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-5">Estado de envíos</h3>
          <div className="space-y-3">
            {(Object.entries(statusCounts) as [string, number][]).map(([status, count]) => {
              const total = MOCK_SHIPMENTS.length;
              const pct = total > 0 ? (count / total) * 100 : 0;
              const colorClass = STATUS_COLORS[status as keyof typeof STATUS_COLORS];
              return (
                <div key={status} className="flex items-center gap-3">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${colorClass} min-w-[80px] justify-center`}>
                    {STATUS_LABELS[status as keyof typeof STATUS_LABELS]}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-500 font-mono w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Origin distribution */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-5">Envíos por origen</h3>
          <div className="grid grid-cols-3 gap-3">
            {(Object.entries(originCounts) as [string, number][]).map(([origin, count]) => {
              const icons: Record<string, React.ReactNode> = {
                CO: <Globe className="w-5 h-5 text-yellow-400" />,
                US: <Globe className="w-5 h-5 text-blue-400" />,
                CN: <Globe className="w-5 h-5 text-red-400" />,
              };
              return (
                <div key={origin} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex justify-center mb-2">{icons[origin]}</div>
                  <p className="text-2xl font-bold text-white font-[var(--font-heading)]">{count}</p>
                  <p className="text-xs text-neutral-500 mt-1">{ORIGIN_LABELS[origin]}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-white/[0.04]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Usuarios registrados</span>
              <span className="text-sm font-bold text-white">{MOCK_USERS.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent shipments */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-white">Envíos recientes</h3>
          <Link
            href="/dashboard/envios"
            className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors duration-200"
          >
            Ver todos
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Guía</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Destinatario</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Destino</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Estado</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentShipments.map((s) => (
                <tr key={s.id} className="border-t border-white/[0.03] hover:bg-white/[0.02] transition-colors duration-150">
                  <td className="px-4 py-3 text-sm font-mono text-indigo-400">{s.trackingCode}</td>
                  <td className="px-4 py-3 text-sm text-neutral-300">{s.recipientName}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <MapPin className="w-3 h-3" />
                      {s.recipientCity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${STATUS_COLORS[s.status]}`}>
                      {STATUS_LABELS[s.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs text-neutral-600 font-mono">
                      <Clock className="w-3 h-3" />
                      {s.createdAt}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
