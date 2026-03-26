// Role-based access control system

export type Role = 'usuario' | 'transportista' | 'operador' | 'analista' | 'gerente' | 'superadmin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  phone?: string;
  lockerId?: string;
  status?: 'active' | 'blocked';
  createdAt: string;
}

export type Permission =
  | 'view_own_shipments'
  | 'view_own_locker'
  | 'update_location'
  | 'create_shipment'
  | 'edit_shipment'
  | 'delete_shipment'
  | 'view_all_shipments'
  | 'view_all_lockers'
  | 'view_all_users'
  | 'create_user'
  | 'edit_user'
  | 'delete_user'
  | 'manage_rates'
  | 'manage_settings'
  | 'manage_locations'
  | 'view_analytics'
  | 'view_dashboard';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  usuario: [
    'view_own_shipments',
    'view_own_locker',
    'view_dashboard',
  ],
  transportista: [
    'update_location',
    'view_all_shipments',
    'view_dashboard',
  ],
  operador: [
    'create_shipment',
    'edit_shipment',
    'view_all_shipments',
    'view_all_lockers',
    'view_dashboard',
  ],
  analista: [
    'view_all_shipments',
    'view_all_lockers',
    'view_all_users',
    'view_analytics',
    'view_dashboard',
  ],
  gerente: [
    'view_own_shipments',
    'view_own_locker',
    'update_location',
    'create_shipment',
    'edit_shipment',
    'delete_shipment',
    'view_all_shipments',
    'view_all_lockers',
    'view_all_users',
    'create_user',
    'edit_user',
    'delete_user',
    'manage_rates',
    'manage_locations',
    'view_analytics',
    'view_dashboard',
  ],
  superadmin: [
    'view_own_shipments',
    'view_own_locker',
    'update_location',
    'create_shipment',
    'edit_shipment',
    'delete_shipment',
    'view_all_shipments',
    'view_all_lockers',
    'view_all_users',
    'create_user',
    'edit_user',
    'delete_user',
    'manage_rates',
    'manage_locations',
    'manage_settings',
    'view_analytics',
    'view_dashboard',
  ],
};

export const ROLE_LABELS: Record<Role, string> = {
  usuario: 'Usuario',
  transportista: 'Transportista',
  operador: 'Operador',
  analista: 'Analista',
  gerente: 'Gerente',
  superadmin: 'Super Admin',
};

export const ROLE_COLORS: Record<Role, string> = {
  usuario: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  transportista: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  operador: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  analista: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  gerente: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
  superadmin: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function canView(role: Role): boolean {
  return hasPermission(role, 'view_dashboard');
}

export function canCreate(role: Role): boolean {
  return hasPermission(role, 'create_shipment');
}

export function canEdit(role: Role): boolean {
  return hasPermission(role, 'edit_shipment');
}

export function canDelete(role: Role): boolean {
  return hasPermission(role, 'delete_shipment');
}

export function canManageUsers(role: Role): boolean {
  return hasPermission(role, 'create_user') || hasPermission(role, 'edit_user');
}

export function canManageLocations(role: Role): boolean {
  return hasPermission(role, 'manage_locations');
}

// Mock current user — in production, this comes from auth provider
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Carlos Ramírez', email: 'carlos@email.com', role: 'usuario', lockerId: 'EC-001', createdAt: '2025-01-15', phone: '+58 412 1234567', status: 'active' },
  { id: 'u2', name: 'María González', email: 'maria@email.com', role: 'usuario', lockerId: 'EC-002', createdAt: '2025-02-10', phone: '+58 414 7654321', status: 'blocked' },
  { id: 'u3', name: 'Pedro López', email: 'pedro@enviar.co', role: 'transportista', createdAt: '2024-06-01', phone: '+57 310 9876543', status: 'active' },
  { id: 'u4', name: 'Ana Herrera', email: 'ana@enviar.co', role: 'operador', createdAt: '2024-03-15', phone: '+57 312 1112233', status: 'active' },
  { id: 'u5', name: 'Sofía Martínez', email: 'sofia@enviar.co', role: 'analista', createdAt: '2024-08-20', phone: '+57 315 4445566', status: 'active' },
  { id: 'u6', name: 'Juan Rodríguez', email: 'juan@enviar.co', role: 'gerente', createdAt: '2023-11-01', phone: '+57 300 7778899', status: 'active' },
  { id: 'u7', name: 'Admin Sistema', email: 'admin@enviar.co', role: 'superadmin', createdAt: '2023-01-01', phone: '+57 301 0001122', status: 'active' },
];

export function getMockUser(role: Role): User {
  return MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];
}
