'use client';

import { useState } from 'react';
import Sidebar from '@/app/components/dashboard/Sidebar';
import Topbar from '@/app/components/dashboard/Topbar';
import type { Role } from '@/app/lib/auth';
import { getMockUser } from '@/app/lib/auth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role>('gerente');

  const user = getMockUser(currentRole);

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — desktop */}
      <div className="hidden lg:block">
        <Sidebar role={currentRole} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      {/* Sidebar — mobile */}
      {mobileOpen && (
        <div className="lg:hidden">
          <Sidebar role={currentRole} collapsed={false} onToggle={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className={`transition-all duration-300 ${collapsed ? 'lg:ml-[68px]' : 'lg:ml-[240px]'}`}>
        <Topbar
          user={user}
          currentRole={currentRole}
          onRoleChange={setCurrentRole}
          onMenuToggle={() => setMobileOpen(!mobileOpen)}
        />
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
