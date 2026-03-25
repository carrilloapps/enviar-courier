'use client';

import { Bell, Search, ChevronDown, Menu } from 'lucide-react';
import type { User, Role } from '@/app/lib/auth';
import { ROLE_LABELS, ROLE_COLORS } from '@/app/lib/auth';
import { useState } from 'react';

interface TopbarProps {
  user: User;
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  onMenuToggle: () => void;
}

const ALL_ROLES: Role[] = ['usuario', 'transportista', 'operador', 'analista', 'gerente', 'superadmin'];

export default function Topbar({ user, currentRole, onRoleChange, onMenuToggle }: TopbarProps) {
  const [roleOpen, setRoleOpen] = useState(false);

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

        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
          <input
            type="text"
            placeholder="Buscar envíos, casilleros..."
            className="pl-10 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.04] text-sm text-white placeholder-neutral-600 w-[260px] focus:outline-none focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500/20 transition-all duration-200"
          />
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
        <button className="relative p-2 rounded-lg text-neutral-500 hover:text-white hover:bg-white/[0.04] cursor-pointer transition-colors duration-200">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

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
