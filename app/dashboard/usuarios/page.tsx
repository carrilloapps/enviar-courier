'use client';

import DataTable from '@/app/components/dashboard/DataTable';
import { MOCK_USERS, ROLE_LABELS, ROLE_COLORS, type User, type Role } from '@/app/lib/auth';
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  User as UserIcon,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Lock,
  Unlock,
  Boxes,
} from 'lucide-react';
import { useState } from 'react';

export default function UsuariosPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all');

  const filtered = roleFilter === 'all' ? users : users.filter(u => u.role === roleFilter);

  const columns = [
    {
      key: 'name',
      label: 'Nombre',
      sortable: true,
      render: (u: User) => (
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
              u.status === 'blocked' ? 'bg-red-500/20 text-red-500' : 'gradient-accent text-dark-950'
            }`}>
              {u.name.charAt(0)}
            </div>
            {u.status === 'blocked' && (
               <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-dark-950 flex items-center justify-center">
                 <Lock className="w-2 h-2 text-white" />
               </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className={`text-sm font-medium ${u.status === 'blocked' ? 'text-neutral-400 line-through' : 'text-white'}`}>{u.name}</p>
              {u.status === 'blocked' && (
                <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 text-[9px] font-bold uppercase tracking-wider">Bloqueado</span>
              )}
            </div>
            <p className="text-[11px] text-neutral-600">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Rol',
      render: (u: User) => (
        <span className={`inline-flex px-2.5 py-0.5 rounded text-[10px] font-bold border ${ROLE_COLORS[u.role]}`}>
          {ROLE_LABELS[u.role]}
        </span>
      ),
    },
    {
      key: 'phone',
      label: 'Teléfono',
      render: (u: User) => <span className="text-xs text-neutral-500">{u.phone || '—'}</span>,
    },
    {
      key: 'lockerId',
      label: 'Casillero',
      render: (u: User) => u.lockerId
        ? <span className="font-mono text-xs text-teal-400">{u.lockerId}</span>
        : <span className="text-xs text-neutral-700">—</span>,
    },
    {
      key: 'createdAt',
      label: 'Registro',
      sortable: true,
      render: (u: User) => <span className="text-xs text-neutral-600 font-mono">{u.createdAt}</span>,
    },
  ];

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' } : u
    ));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newUser: User = {
      id: editingUser?.id || `u${Date.now()}`,
      name: form.get('name') as string,
      email: form.get('email') as string,
      role: form.get('role') as Role,
      phone: form.get('phone') as string,
      lockerId: form.get('lockerId') as string | undefined,
      status: editingUser?.status || 'active',
      createdAt: editingUser?.createdAt || new Date().toISOString().split('T')[0],
    };
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? newUser : u));
    } else {
      setUsers(prev => [newUser, ...prev]);
    }
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-[var(--font-heading)]">Usuarios</h1>
          <p className="text-sm text-neutral-500 mt-1">Gestión de usuarios y roles del sistema</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,230,53,0.2)] transition-all duration-300 cursor-pointer text-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo usuario
        </button>
      </div>

      {/* Role filters */}
      <div className="flex flex-wrap gap-2">
        {['all', ...Object.keys(ROLE_LABELS)].map((r) => (
          <button
            key={r}
            onClick={() => setRoleFilter(r as Role | 'all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
              roleFilter === r
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                : 'bg-white/[0.03] text-neutral-500 border border-white/[0.04] hover:bg-white/[0.06]'
            }`}
          >
            {r === 'all' ? 'Todos' : ROLE_LABELS[r as Role]}
          </button>
        ))}
      </div>

      <DataTable
        data={filtered as unknown as Record<string, unknown>[]}
        columns={columns as never}
        searchKeys={['name', 'email', 'phone', 'lockerId']}
        actions={(item) => {
          const u = item as unknown as User;
          return (
            <div className="flex items-center gap-1 justify-end">
              <button
                onClick={(e) => { e.stopPropagation(); handleToggleStatus(u.id); }}
                className={`p-1.5 rounded-lg transition-colors duration-200 cursor-pointer ${
                  u.status === 'blocked' 
                    ? 'text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10' 
                    : 'text-neutral-500 hover:text-orange-400 hover:bg-orange-500/10'
                }`}
                title={u.status === 'blocked' ? 'Desbloquear usuario' : 'Bloquear usuario'}
              >
                {u.status === 'blocked' ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setEditingUser(u); setShowForm(true); }}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-amber-400 hover:bg-amber-500/10 cursor-pointer transition-colors duration-200"
                title="Editar usuario"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(u.id); }}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors duration-200"
                title="Eliminar usuario"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        }}
      />

      {/* Create/Edit form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowForm(false); setEditingUser(null); }} />
          <div className="relative glass-card rounded-2xl p-8 max-w-md w-full animate-scale-in">
            <button onClick={() => { setShowForm(false); setEditingUser(null); }} className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-white/[0.06] cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white mb-6">{editingUser ? 'Editar usuario' : 'Nuevo usuario'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: 'name', label: 'Nombre', icon: UserIcon, placeholder: 'Juan Pérez', defaultValue: editingUser?.name },
                { name: 'email', label: 'Email', icon: Mail, placeholder: 'juan@email.com', defaultValue: editingUser?.email },
                { name: 'phone', label: 'Teléfono', icon: Phone, placeholder: '+58 412 1234567', defaultValue: editingUser?.phone },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">{field.label}</label>
                  <div className="relative">
                    <field.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                    <input
                      name={field.name}
                      required
                      defaultValue={field.defaultValue || ''}
                      placeholder={field.placeholder}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                    />
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">Rol</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                  <select
                    name="role"
                    defaultValue={editingUser?.role || 'usuario'}
                    onChange={(e) => {
                      if (!editingUser) return;
                      setEditingUser({ ...editingUser, role: e.target.value as Role });
                    }}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/30 cursor-pointer appearance-none transition-all duration-200"
                  >
                    {Object.entries(ROLE_LABELS).map(([key, label]) => (
                      <option key={key} value={key} className="bg-dark-800">{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {((editingUser?.role === 'usuario') || (!editingUser)) && (
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">ID de Casillero</label>
                  <div className="relative">
                    <Boxes className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                    <input
                      name="lockerId"
                      defaultValue={editingUser?.lockerId || ''}
                      placeholder="Dejar en blanco para asignar auto."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200 font-mono"
                    />
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 mt-2 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,230,53,0.2)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Save className="w-4 h-4" />
                {editingUser ? 'Guardar cambios' : 'Crear usuario'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
