'use client';

import { useApp } from '@/app/lib/context';
import { Bell, CheckCircle2, ShieldAlert, Tag, Trash2, CheckSquare } from 'lucide-react';
import { useState } from 'react';
import PageHero from '@/app/components/ui/PageHero';
import Link from 'next/link';

export default function NotificationsPage() {
  const { t } = useApp();
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Envío Entregado', desc: 'Tu paquete EC-0245 ha sido entregado exitosamente en Bogotá. Puedes verificar el comprobante en los detalles del envío.', time: 'Hace 5m', unread: true, type: 'success', category: 'Envíos', link: '/rastreo?q=EC-0245' },
    { id: 2, title: 'Nueva Tarifa', desc: 'Aprovecha un 10% de descuento en envíos volumétricos desde Miami hacia Caracas válido hasta el fin de mes.', time: 'Hace 2h', unread: true, type: 'promo', category: 'Promociones', link: '#' },
    { id: 3, title: 'Actualización Operativa', desc: 'El vuelo carguero ha sido programado para despache. Los tiempos de tránsito pueden presentar 12h de demora por condiciones climáticas.', time: 'Ayer', unread: false, type: 'alert', category: 'Sistema', link: '#' },
    { id: 4, title: 'Casillero Verificado', desc: 'Tus documentos de identidad han sido verificados. Ya puedes proceder a realizar envíos.', time: 'Hace 2 días', unread: false, type: 'success', category: 'Cuenta', link: '/dashboard' },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => filter === 'all' || (filter === 'unread' && n.unread));
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-[var(--font-heading)] tracking-tight">
            Centro de <span className="text-gradient">Notificaciones</span>
          </h1>
          <p className="text-sm text-neutral-400 mt-1">Gestiona tus alertas, actualizaciones de envío y mensajes del sistema.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              <CheckSquare className="w-4 h-4" />
              Marcar todo como leído
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-white/[0.04] pb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            filter === 'all' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
            filter === 'unread' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          No Leídas
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-md bg-red-500 text-white text-[10px] leading-none">{unreadCount}</span>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`group glass-card rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 ${
                notification.unread ? 'border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.05)] bg-white/[0.03]' : 'border-white/[0.04] opacity-80 hover:opacity-100'
              }`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border shadow-inner ${
                notification.type === 'success' ? 'bg-teal-500/10 border-teal-500/20 text-teal-400' :
                notification.type === 'promo' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                'bg-amber-500/10 border-amber-500/20 text-amber-400'
              }`}>
                {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : 
                 notification.type === 'promo' ? <Tag className="w-5 h-5" /> : 
                 <ShieldAlert className="w-5 h-5" />}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1.5">
                  <h3 className={`text-base font-bold ${notification.unread ? 'text-white' : 'text-neutral-300'}`}>
                    {notification.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                    {notification.category}
                  </span>
                  {notification.unread && (
                    <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  )}
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed max-w-3xl">
                  {notification.desc}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs font-medium">
                  <span className="text-neutral-500">{notification.time}</span>
                  {notification.link !== '#' && (
                    <Link href={notification.link} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                      Ver detalles →
                    </Link>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4 sm:relative sm:top-0 sm:right-0">
                {notification.unread && (
                  <button 
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                    title="Marcar como leída"
                  >
                    <CheckSquare className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(notification.id)}
                  className="p-2 rounded-lg bg-red-500/5 border border-red-500/10 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-colors cursor-pointer"
                  title="Eliminar notificación"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center glass-card rounded-3xl border border-white/[0.04]">
            <div className="w-20 h-20 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-6">
              <Bell className="w-10 h-10 text-neutral-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Bandeja Vacía</h3>
            <p className="text-neutral-500 text-sm max-w-sm text-center">
              No tienes notificaciones pendientes en este momento. Mantente atento a futuras actualizaciones.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
