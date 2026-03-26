'use client';

import { Bell, Search, ChevronDown, Menu, Package, CheckCircle2, ShieldAlert, Tag, X } from 'lucide-react';
import type { User, Role } from '@/app/lib/auth';
import { ROLE_LABELS, ROLE_COLORS } from '@/app/lib/auth';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface TopbarProps {
  user: User;
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  onMenuToggle: () => void;
}

const ALL_ROLES: Role[] = ['usuario', 'transportista', 'operador', 'analista', 'gerente', 'superadmin'];

export default function Topbar({ user, currentRole, onRoleChange, onMenuToggle }: TopbarProps) {
  const [roleOpen, setRoleOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Envío Entregado', desc: 'Tu paquete EC-0245 ha sido entregado exitosamente en Bogotá.', time: 'Hace 5m', unread: true, type: 'success', link: '/rastreo?q=EC-0245' },
    { id: 2, title: 'Nueva Tarifa', desc: 'Aprovecha un 10% de descuento en envíos volumétricos.', time: 'Hace 2h', unread: true, type: 'promo', link: '/dashboard/notificaciones' },
    { id: 3, title: 'Actualización', desc: 'El vuelo carguero ha sido programado para despache.', time: 'Ayer', unread: false, type: 'alert', link: '/dashboard/notificaciones' },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const simulatedSearchResults = [
    { id: '1', type: 'Envío', ref: 'TRACK-9921', desc: 'En tránsito a Caracas' },
    { id: '2', type: 'Casillero', ref: 'EC-005', desc: 'Carlos Ramírez' },
  ].filter(s => s.ref.toLowerCase().includes(searchQuery.toLowerCase()) || s.type.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <header className="h-16 bg-dark-900/80 backdrop-blur-xl border-b border-white/[0.04] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-neutral-500 hover:text-white hover:bg-white/[0.04] cursor-pointer transition-colors duration-200"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative hidden w-full max-w-sm sm:block" ref={searchRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            placeholder="Buscar envíos, casilleros..."
            className="w-full pl-10 pr-8 py-2 rounded-xl bg-white/[0.03] border border-white/[0.04] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500/20 focus:bg-white/[0.05] transition-all duration-200"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Search Dropdown */}
          {searchFocused && searchQuery.length > 0 && (
            <div className="absolute top-full left-0 mt-2 w-full bg-dark-950/95 backdrop-blur-2xl rounded-2xl border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.5)] py-2 animate-scale-in z-50">
              <div className="px-3 pb-2 mb-2 border-b border-white/[0.04]">
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Resultados de Búsqueda</p>
              </div>
              {simulatedSearchResults.length > 0 ? (
                simulatedSearchResults.map((result, idx) => (
                  <button key={idx} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] cursor-pointer transition-colors text-left group">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shrink-0">
                      <Search className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">{result.ref}</p>
                      <p className="text-[11px] text-neutral-500">{result.type} • {result.desc}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <Package className="w-8 h-8 text-neutral-600 mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-neutral-400">No hay resultados para "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Role switcher (demo) */}
        <div className="relative">
          <button
            onClick={() => setRoleOpen(!roleOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer transition-all duration-200 ${ROLE_COLORS[currentRole]}`}
          >
            {ROLE_LABELS[currentRole]}
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${roleOpen ? 'rotate-180' : ''}`} />
          </button>
          {roleOpen && (
            <div className="absolute right-0 top-full mt-2 glass rounded-xl shadow-2xl py-1.5 min-w-[150px] animate-scale-in z-50">
              {ALL_ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => { onRoleChange(role); setRoleOpen(false); }}
                  className={`block w-full text-left px-4 py-2 text-xs cursor-pointer transition-all duration-200 ${
                    role === currentRole
                      ? 'text-indigo-400 font-bold bg-indigo-500/5'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {ROLE_LABELS[role]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setNotifOpen(!notifOpen)}
            className={`relative p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
              notifOpen ? 'bg-white/[0.08] text-white' : 'text-neutral-500 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-dark-900 border border-dark-900 animate-pulse" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-[320px] sm:w-[380px] bg-dark-950/95 backdrop-blur-2xl rounded-2xl border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.5)] animate-scale-in z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/[0.04] flex items-center justify-between bg-white/[0.02]">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Notificaciones
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px]">{unreadCount}</span>
                  )}
                </h3>
                {unreadCount > 0 && (
                  <button onClick={handleMarkAllRead} className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer transition-colors">
                    Marcar todo como leído
                  </button>
                )}
              </div>
              
              <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                {notifications.length > 0 ? (
                  notifications.map(n => (
                    <Link 
                      href={n.link} 
                      key={n.id} 
                      onClick={() => setNotifOpen(false)}
                      className={`p-4 border-b border-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer flex gap-3 block ${n.unread ? 'bg-white/[0.02]' : 'opacity-70 hover:opacity-100'}`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        n.type === 'success' ? 'bg-teal-500/10 border-teal-500/20 text-teal-400' :
                        n.type === 'promo' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                        'bg-amber-500/10 border-amber-500/20 text-amber-400'
                      }`}>
                        {n.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : 
                         n.type === 'promo' ? <Tag className="w-4 h-4" /> : 
                         <ShieldAlert className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <p className={`text-sm font-semibold ${n.unread ? 'text-white' : 'text-neutral-300'}`}>{n.title}</p>
                          <span className="text-[10px] text-neutral-500 shrink-0 mt-0.5">{n.time}</span>
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed">{n.desc}</p>
                      </div>
                      {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />}
                    </Link>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Bell className="w-8 h-8 text-neutral-600 mx-auto mb-2 opacity-50" />
                    <p className="text-sm text-neutral-400">No tienes notificaciones</p>
                  </div>
                )}
              </div>
              
              <div className="p-2 bg-dark-900/50 border-t border-white/[0.04]">
                <Link 
                  href="/dashboard/notificaciones" 
                  onClick={() => setNotifOpen(false)}
                  className="w-full py-2 flex items-center justify-center text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/[0.04]"
                >
                  Ver todas las notificaciones
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 pl-2 ml-1 border-l border-white/[0.04]">
          <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-dark-950 font-bold text-xs shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white leading-none">{user.name}</p>
            <p className="text-[11px] text-neutral-600 mt-0.5">{user.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
