'use client';

import { useState } from 'react';
import DataTable from '@/app/components/dashboard/DataTable';
import {
  MOCK_SHIPMENTS,
  STATUS_LABELS,
  STATUS_COLORS,
  ORIGIN_LABELS,
  type Shipment,
  type ShipmentStatus,
} from '@/app/lib/dashboard-data';
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  X,
  Package,
  MapPin,
  Clock,
  User,
  Scale,
  DollarSign,
  Globe,
  ArrowRight,
  Save,
} from 'lucide-react';

export default function EnviosPage() {
  const [shipments, setShipments] = useState<Shipment[]>(MOCK_SHIPMENTS);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);
  const [statusFilter, setStatusFilter] = useState<ShipmentStatus | 'all'>('all');

  const filtered = statusFilter === 'all' ? shipments : shipments.filter(s => s.status === statusFilter);

  const columns = [
    {
      key: 'trackingCode',
      label: 'Guía',
      sortable: true,
      render: (s: Shipment) => (
        <span className="font-mono text-indigo-400 text-xs">{s.trackingCode}</span>
      ),
    },
    {
      key: 'recipientName',
      label: 'Destinatario',
      sortable: true,
      render: (s: Shipment) => (
        <div>
          <p className="font-medium text-white text-sm">{s.recipientName}</p>
          <p className="text-[11px] text-neutral-600 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" /> {s.recipientCity}
          </p>
        </div>
      ),
    },
    {
      key: 'origin',
      label: 'Origen',
      render: (s: Shipment) => (
        <span className="flex items-center gap-1.5 text-xs text-neutral-400">
          <Globe className="w-3.5 h-3.5" />
          {ORIGIN_LABELS[s.origin]}
        </span>
      ),
    },
    {
      key: 'weight',
      label: 'Peso',
      sortable: true,
      render: (s: Shipment) => <span className="text-xs text-neutral-500">{s.weight} KG</span>,
    },
    {
      key: 'status',
      label: 'Estado',
      render: (s: Shipment) => (
        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${STATUS_COLORS[s.status]}`}>
          {STATUS_LABELS[s.status]}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Fecha',
      sortable: true,
      render: (s: Shipment) => (
        <span className="text-xs text-neutral-600 font-mono">{s.createdAt}</span>
      ),
    },
  ];

  const handleDelete = (id: string) => {
    setShipments(prev => prev.filter(s => s.id !== id));
    setSelectedShipment(null);
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newShipment: Shipment = {
      id: `s${Date.now()}`,
      trackingCode: `EC-${Date.now()}`,
      senderName: form.get('senderName') as string,
      senderCity: form.get('senderCity') as string,
      recipientName: form.get('recipientName') as string,
      recipientCity: form.get('recipientCity') as string,
      weight: parseFloat(form.get('weight') as string) || 0,
      dimensions: form.get('dimensions') as string,
      declaredValue: parseFloat(form.get('declaredValue') as string) || 0,
      status: 'received',
      origin: (form.get('origin') as 'CO' | 'US' | 'CN') || 'CO',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setShipments(prev => [newShipment, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-[var(--font-heading)]">Envíos</h1>
          <p className="text-sm text-neutral-500 mt-1">Gestión de envíos y paquetes</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,230,53,0.2)] transition-all duration-300 cursor-pointer text-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo envío
        </button>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2">
        {['all', ...Object.keys(STATUS_LABELS)].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st as ShipmentStatus | 'all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
              statusFilter === st
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                : 'bg-white/[0.03] text-neutral-500 border border-white/[0.04] hover:bg-white/[0.06]'
            }`}
          >
            {st === 'all' ? 'Todos' : STATUS_LABELS[st as ShipmentStatus]}
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable<Shipment>
        data={filtered}
        columns={columns}
        searchKeys={['trackingCode', 'recipientName', 'senderName', 'recipientCity']}
        onRowClick={(item) => setSelectedShipment(item)}
        actions={(item) => {
          const s = item;
          return (
            <div className="flex items-center gap-1 justify-end">
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedShipment(s); }}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-indigo-400 hover:bg-indigo-500/10 cursor-pointer transition-colors duration-200"
                title="Ver"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setEditingShipment(s); setShowForm(true); }}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-amber-400 hover:bg-amber-500/10 cursor-pointer transition-colors duration-200"
                title="Editar"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(s.id); }}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors duration-200"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        }}
      />

      {/* Detail modal */}
      {selectedShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedShipment(null)} />
          <div className="relative glass-card rounded-2xl p-8 max-w-lg w-full animate-scale-in max-h-[80vh] overflow-y-auto">
            <button onClick={() => setSelectedShipment(null)} className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-white/[0.06] cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Package className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p className="font-mono text-indigo-400 text-sm">{selectedShipment.trackingCode}</p>
                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border mt-1 ${STATUS_COLORS[selectedShipment.status]}`}>
                  {STATUS_LABELS[selectedShipment.status]}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: User, label: 'Remitente', value: `${selectedShipment.senderName} — ${selectedShipment.senderCity}` },
                { icon: User, label: 'Destinatario', value: `${selectedShipment.recipientName} — ${selectedShipment.recipientCity}` },
                { icon: Globe, label: 'Origen', value: ORIGIN_LABELS[selectedShipment.origin] },
                { icon: Scale, label: 'Peso', value: `${selectedShipment.weight} KG — ${selectedShipment.dimensions}` },
                { icon: DollarSign, label: 'Valor declarado', value: `$${selectedShipment.declaredValue.toLocaleString('es-CO')} COP` },
                { icon: Clock, label: 'Fecha', value: `Creado: ${selectedShipment.createdAt} — Actualizado: ${selectedShipment.updatedAt}` },
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

      {/* Create/Edit form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowForm(false); setEditingShipment(null); }} />
          <div className="relative glass-card rounded-2xl p-8 max-w-lg w-full animate-scale-in max-h-[85vh] overflow-y-auto">
            <button onClick={() => { setShowForm(false); setEditingShipment(null); }} className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-white/[0.06] cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white mb-6">{editingShipment ? 'Editar envío' : 'Nuevo envío'}</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              {[
                { name: 'senderName', label: 'Nombre remitente', placeholder: 'Tienda o persona', defaultValue: editingShipment?.senderName },
                { name: 'senderCity', label: 'Ciudad origen', placeholder: 'Bogotá', defaultValue: editingShipment?.senderCity },
                { name: 'recipientName', label: 'Nombre destinatario', placeholder: 'Juan Pérez', defaultValue: editingShipment?.recipientName },
                { name: 'recipientCity', label: 'Ciudad destino', placeholder: 'Caracas', defaultValue: editingShipment?.recipientCity },
                { name: 'weight', label: 'Peso (KG)', placeholder: '5', defaultValue: editingShipment?.weight?.toString() },
                { name: 'dimensions', label: 'Dimensiones', placeholder: '40x30x20 cm', defaultValue: editingShipment?.dimensions },
                { name: 'declaredValue', label: 'Valor declarado (COP)', placeholder: '250000', defaultValue: editingShipment?.declaredValue?.toString() },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">{field.label}</label>
                  <input
                    name={field.name}
                    required
                    defaultValue={field.defaultValue || ''}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                  />
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">País de origen</label>
                <select
                  name="origin"
                  defaultValue={editingShipment?.origin || 'CO'}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200 cursor-pointer appearance-none"
                >
                  <option value="CO" className="bg-dark-800">Colombia</option>
                  <option value="US" className="bg-dark-800">Estados Unidos</option>
                  <option value="CN" className="bg-dark-800">China</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 mt-2 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,230,53,0.2)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Save className="w-4 h-4" />
                {editingShipment ? 'Guardar cambios' : 'Crear envío'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
