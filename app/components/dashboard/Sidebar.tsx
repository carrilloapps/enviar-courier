'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Role } from '@/app/lib/auth';
import { hasPermission, ROLE_LABELS, ROLE_COLORS } from '@/app/lib/auth';
import type { Permission } from '@/app/lib/auth';
import {
  LayoutDashboard,
  Package,
  Truck,
  Boxes,
  Users,
  Receipt,
  Settings,
  MapPin,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
  Bell,
} from 'lucide-react';

interface SidebarProps {
  role: Role;
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  permission?: Permission;
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Envíos', href: '/dashboard/envios', icon: Package, permission: 'view_all_shipments' },
  { label: 'Paquetes', href: '/dashboard/paquetes', icon: Truck, permission: 'update_location' },
  { label: 'Casilleros', href: '/dashboard/casilleros', icon: Boxes, permission: 'view_all_lockers' },
  { label: 'Usuarios', href: '/dashboard/usuarios', icon: Users, permission: 'view_all_users' },
  { label: 'Sedes', href: '/dashboard/sedes', icon: MapPin, permission: 'manage_locations' },
  { label: 'Tarifas', href: '/dashboard/tarifas', icon: Receipt, permission: 'manage_rates' },
  { label: 'Notificaciones', href: '/dashboard/notificaciones', icon: Bell },
  { label: 'Configuración', href: '/dashboard/configuracion', icon: Settings, permission: 'manage_settings' },
];

// Items visible by usuario role
const userNavItems: NavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Mis envíos', href: '/dashboard/envios', icon: Package },
  { label: 'Mi casillero', href: '/dashboard/casilleros', icon: Boxes },
  { label: 'Notificaciones', href: '/dashboard/notificaciones', icon: Bell },
];

export default function Sidebar({ role, collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const items = role === 'usuario'
    ? userNavItems
    : navItems.filter(item => {
        if (!item.permission) return true;
        return hasPermission(role, item.permission);
      });

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-40 flex flex-col bg-dark-900 border-r border-white/[0.04] transition-all duration-300 ${
        collapsed ? 'w-[68px]' : 'w-[240px]'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/[0.04]">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center shrink-0">
              <Package className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-white">Enviar</span>
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-[0.15em]">Courier</span>
            </div>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center mx-auto">
            <Package className="w-4 h-4 text-white" />
          </div>
        )}
        <button
          onClick={onToggle}
          className="hidden lg:flex w-6 h-6 rounded-md bg-white/[0.04] hover:bg-white/[0.08] items-center justify-center text-neutral-500 hover:text-white cursor-pointer transition-colors duration-200"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 py-3">
          <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${ROLE_COLORS[role]}`}>
            {ROLE_LABELS[role]}
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  : 'text-neutral-500 hover:text-white hover:bg-white/[0.04] border border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-indigo-400' : 'text-neutral-600 group-hover:text-neutral-300'}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-3 border-t border-white/[0.04] space-y-0.5">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-500 hover:text-white hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
          title={collapsed ? 'Ver sitio' : undefined}
        >
          <ExternalLink className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && <span>Ver sitio</span>}
        </Link>
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-500 hover:text-red-400 hover:bg-red-500/[0.04] transition-all duration-200 cursor-pointer w-full"
          title={collapsed ? 'Cerrar sesión' : undefined}
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
}
