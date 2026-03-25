'use client';

import { useState } from 'react';
import { useApp } from '@/app/lib/context';
import { COLOMBIA_LOCATIONS, VENEZUELA_LOCATIONS, type Location } from '@/app/lib/locations';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  MapPin,
  Phone,
  Clock,
  Save,
  Building2,
  Search,
  Globe,
  AlertTriangle,
} from 'lucide-react';

export default function SedesPage() {
  const { locale } = useApp();
  const [locations, setLocations] = useState<Location[]>([...COLOMBIA_LOCATIONS, ...VENEZUELA_LOCATIONS]);
  const [countryFilter, setCountryFilter] = useState<'all' | 'CO' | 'VE'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = locations
    .filter(l => countryFilter === 'all' || l.country === countryFilter)
    .filter(l => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return l.city.toLowerCase().includes(q) || l.address.toLowerCase().includes(q) || (l.area?.toLowerCase().includes(q) ?? false);
    });

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newLocation: Location = {
      id: editingLocation?.id || `loc-${Date.now()}`,
      city: form.get('city') as string,
      area: (form.get('area') as string) || undefined,
      address: form.get('address') as string,
      postalCode: form.get('postalCode') as string,
      neighborhood: form.get('neighborhood') as string,
      phone: form.get('phone') as string,
      whatsapp: form.get('whatsapp') as string,
      country: form.get('country') as 'CO' | 'VE',
      hours: (form.get('hours') as string) || undefined,
      note: (form.get('note') as string) || undefined,
    };

    if (editingLocation) {
      setLocations(prev => prev.map(l => l.id === editingLocation.id ? newLocation : l));
    } else {
      setLocations(prev => [newLocation, ...prev]);
    }
    setShowForm(false);
    setEditingLocation(null);
  };

  const handleDelete = (id: string) => {
    setLocations(prev => prev.filter(l => l.id !== id));
    setDeleteConfirm(null);
  };

  const coCount = locations.filter(l => l.country === 'CO').length;
  const veCount = locations.filter(l => l.country === 'VE').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-[var(--font-heading)]">Sedes</h1>
          <p className="text-sm text-neutral-500 mt-1">{locale === 'es' ? 'Gestión de sedes y oficinas' : 'Office and location management'}</p>
        </div>
        <button
          onClick={() => { setEditingLocation(null); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,230,53,0.2)] transition-all duration-300 cursor-pointer text-sm"
        >
          <Plus className="w-4 h-4" />
          {locale === 'es' ? 'Nueva sede' : 'New location'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{locations.length}</p>
              <p className="text-[11px] text-neutral-600">Total</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{coCount}</p>
              <p className="text-[11px] text-neutral-600">Colombia</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-5 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{veCount}</p>
              <p className="text-[11px] text-neutral-600">Venezuela</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex gap-2">
          {(['all', 'CO', 'VE'] as const).map(f => (
            <button
              key={f}
              onClick={() => setCountryFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                countryFilter === f
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'bg-white/[0.03] text-neutral-500 border border-white/[0.04] hover:bg-white/[0.06]'
              }`}
            >
              {f === 'all' ? 'Todas' : f === 'CO' ? 'Colombia' : 'Venezuela'}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar sede..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
          />
        </div>
      </div>

      {/* Location Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(loc => (
          <div key={loc.id} className="glass-card rounded-2xl p-6 group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                  loc.country === 'CO'
                    ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    : 'bg-teal-500/10 text-teal-400 border-teal-500/20'
                }`}>
                  {loc.country}
                </span>
                <h3 className="text-base font-bold text-white">
                  {loc.city}
                  {loc.area && <span className="text-teal-400 text-sm font-normal ml-1.5">· {loc.area}</span>}
                </h3>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => { setEditingLocation(loc); setShowForm(true); }}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-amber-400 hover:bg-amber-500/10 cursor-pointer transition-colors duration-200"
                  title="Editar"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(loc.id)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors duration-200"
                  title="Eliminar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-sm text-neutral-400 mb-3 leading-relaxed flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-neutral-600 mt-0.5 shrink-0" />
              {loc.address}
            </p>

            <div className="space-y-2">
              <p className="text-xs text-neutral-600">{loc.neighborhood} · CP: {loc.postalCode}</p>
              {loc.hours && (
                <div className="flex items-start gap-2">
                  <Clock className="w-3 h-3 text-neutral-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-neutral-600">{loc.hours}</p>
                </div>
              )}
              {loc.note && (
                <p className="text-xs text-amber-400/80 bg-amber-400/5 px-3 py-2 rounded-lg border border-amber-400/10">
                  {loc.note}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 pt-3 mt-3 border-t border-white/[0.04]">
              <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                <Phone className="w-3 h-3" />
                {loc.phone}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <MapPin className="w-10 h-10 text-neutral-700 mx-auto mb-4" />
          <p className="text-sm text-neutral-500">No se encontraron sedes</p>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative glass-card rounded-2xl p-8 max-w-sm w-full animate-scale-in text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{locale === 'es' ? '¿Eliminar sede?' : 'Delete location?'}</h3>
            <p className="text-sm text-neutral-500 mb-6">{locale === 'es' ? 'Esta acción no se puede deshacer.' : 'This action cannot be undone.'}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/[0.04] text-neutral-300 font-semibold border border-white/[0.06] hover:bg-white/[0.08] cursor-pointer text-sm transition-all duration-200"
              >
                {locale === 'es' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl bg-red-500/20 text-red-400 font-bold border border-red-500/30 hover:bg-red-500/30 cursor-pointer text-sm transition-all duration-200"
              >
                {locale === 'es' ? 'Eliminar' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowForm(false); setEditingLocation(null); }} />
          <div className="relative glass-card rounded-2xl p-8 max-w-lg w-full animate-scale-in max-h-[85vh] overflow-y-auto">
            <button onClick={() => { setShowForm(false); setEditingLocation(null); }} className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-white/[0.06] cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white mb-6">{editingLocation ? 'Editar sede' : 'Nueva sede'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">Ciudad</label>
                  <input name="city" required defaultValue={editingLocation?.city || ''} placeholder="Bogotá" className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">Área/Zona</label>
                  <input name="area" defaultValue={editingLocation?.area || ''} placeholder="Cedritos" className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">Dirección</label>
                <input name="address" required defaultValue={editingLocation?.address || ''} placeholder="Cra 19 #147-30, Local 09" className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">Barrio</label>
                  <input name="neighborhood" required defaultValue={editingLocation?.neighborhood || ''} placeholder="El Cedrito" className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">Código postal</label>
                  <input name="postalCode" required defaultValue={editingLocation?.postalCode || ''} placeholder="111961" className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">Teléfono</label>
                  <input name="phone" required defaultValue={editingLocation?.phone || ''} placeholder="+57 324..." className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">WhatsApp</label>
                  <input name="whatsapp" required defaultValue={editingLocation?.whatsapp || ''} placeholder="+57 302..." className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">País</label>
                <select name="country" required defaultValue={editingLocation?.country || 'CO'} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200 cursor-pointer appearance-none">
                  <option value="CO" className="bg-dark-800">Colombia</option>
                  <option value="VE" className="bg-dark-800">Venezuela</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">Horario</label>
                <input name="hours" defaultValue={editingLocation?.hours || ''} placeholder="Lunes a Viernes, 9:00 a.m. a 5:00 p.m." className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">Nota especial</label>
                <input name="note" defaultValue={editingLocation?.note || ''} placeholder="Opcional" className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200" />
              </div>
              <button
                type="submit"
                className="w-full py-3 mt-2 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,230,53,0.2)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Save className="w-4 h-4" />
                {editingLocation ? 'Guardar cambios' : 'Crear sede'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
