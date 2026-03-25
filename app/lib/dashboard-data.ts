// Mock data for dashboard

export type ShipmentStatus = 'received' | 'processing' | 'transit' | 'customs' | 'delivered' | 'cancelled';

export interface Shipment {
  [key: string]: unknown;
  id: string;
  trackingCode: string;
  senderName: string;
  senderCity: string;
  recipientName: string;
  recipientCity: string;
  weight: number;
  dimensions: string;
  declaredValue: number;
  status: ShipmentStatus;
  origin: 'CO' | 'US' | 'CN';
  createdAt: string;
  updatedAt: string;
  lockerId?: string;
  operatorId?: string;
  transporterId?: string;
}

export interface Locker {
  [key: string]: unknown;
  id: string;
  code: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  destinationCity: string;
  address: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  shipmentsCount: number;
}

export interface TrackingEvent {
  id: string;
  shipmentId: string;
  status: ShipmentStatus;
  location: string;
  description: string;
  timestamp: string;
  updatedBy: string;
}

export const STATUS_LABELS: Record<ShipmentStatus, string> = {
  received: 'Recibido',
  processing: 'En proceso',
  transit: 'En tránsito',
  customs: 'En aduana',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
};

export const STATUS_COLORS: Record<ShipmentStatus, string> = {
  received: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  processing: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  transit: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  customs: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  delivered: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export const ORIGIN_LABELS: Record<string, string> = {
  CO: 'Colombia',
  US: 'Estados Unidos',
  CN: 'China',
};

export const MOCK_SHIPMENTS: Shipment[] = [
  { id: 's1', trackingCode: 'EC-20250320001', senderName: 'Tienda MercadoLibre', senderCity: 'Bogotá', recipientName: 'Carlos Ramírez', recipientCity: 'Caracas', weight: 4.5, dimensions: '40x30x20 cm', declaredValue: 250000, status: 'transit', origin: 'CO', createdAt: '2025-03-20', updatedAt: '2025-03-23', lockerId: 'EC-001', operatorId: 'u4', transporterId: 'u3' },
  { id: 's2', trackingCode: 'EC-20250318002', senderName: 'Amazon USA', senderCity: 'Miami', recipientName: 'María González', recipientCity: 'Maracay', weight: 2.1, dimensions: '30x20x15 cm', declaredValue: 180000, status: 'customs', origin: 'US', createdAt: '2025-03-18', updatedAt: '2025-03-24', lockerId: 'EC-002', operatorId: 'u4' },
  { id: 's3', trackingCode: 'EC-20250315003', senderName: 'AliExpress', senderCity: 'Shenzhen', recipientName: 'José Pérez', recipientCity: 'Valencia', weight: 1.8, dimensions: '25x15x10 cm', declaredValue: 95000, status: 'delivered', origin: 'CN', createdAt: '2025-03-15', updatedAt: '2025-03-25', lockerId: 'EC-003' },
  { id: 's4', trackingCode: 'EC-20250322004', senderName: 'Falabella', senderCity: 'Medellín', recipientName: 'Ana Torres', recipientCity: 'Barquisimeto', weight: 7.2, dimensions: '50x35x25 cm', declaredValue: 420000, status: 'processing', origin: 'CO', createdAt: '2025-03-22', updatedAt: '2025-03-22', operatorId: 'u4' },
  { id: 's5', trackingCode: 'EC-20250310005', senderName: 'Best Buy USA', senderCity: 'Houston', recipientName: 'Luis Fernández', recipientCity: 'Maracaibo', weight: 3.5, dimensions: '35x25x20 cm', declaredValue: 1500000, status: 'delivered', origin: 'US', createdAt: '2025-03-10', updatedAt: '2025-03-20', lockerId: 'EC-005' },
  { id: 's6', trackingCode: 'EC-20250324006', senderName: 'Zara Colombia', senderCity: 'Cali', recipientName: 'Carmen Díaz', recipientCity: 'Mérida', weight: 5.0, dimensions: '45x30x20 cm', declaredValue: 310000, status: 'received', origin: 'CO', createdAt: '2025-03-24', updatedAt: '2025-03-24' },
  { id: 's7', trackingCode: 'EC-20250319007', senderName: 'eBay', senderCity: 'Los Angeles', recipientName: 'Roberto Vargas', recipientCity: 'Caracas', weight: 0.8, dimensions: '20x15x10 cm', declaredValue: 75000, status: 'transit', origin: 'US', createdAt: '2025-03-19', updatedAt: '2025-03-23', lockerId: 'EC-007', transporterId: 'u3' },
  { id: 's8', trackingCode: 'EC-20250316008', senderName: 'Temu China', senderCity: 'Guangzhou', recipientName: 'Patricia Luna', recipientCity: 'Valencia', weight: 6.3, dimensions: '55x35x30 cm', declaredValue: 200000, status: 'cancelled', origin: 'CN', createdAt: '2025-03-16', updatedAt: '2025-03-18' },
  { id: 's9', trackingCode: 'EC-20250325009', senderName: 'Éxito Colombia', senderCity: 'Barranquilla', recipientName: 'Diego Morales', recipientCity: 'Maracay', weight: 10.0, dimensions: '60x40x30 cm', declaredValue: 580000, status: 'received', origin: 'CO', createdAt: '2025-03-25', updatedAt: '2025-03-25' },
  { id: 's10', trackingCode: 'EC-20250312010', senderName: 'Wish China', senderCity: 'Shanghai', recipientName: 'Elena Castro', recipientCity: 'Barquisimeto', weight: 2.5, dimensions: '30x20x15 cm', declaredValue: 120000, status: 'delivered', origin: 'CN', createdAt: '2025-03-12', updatedAt: '2025-03-22' },
];

export const MOCK_LOCKERS: Locker[] = [
  { id: 'l1', code: 'EC-001', userId: 'u1', userName: 'Carlos Ramírez', userEmail: 'carlos@email.com', userPhone: '+58 412 1234567', destinationCity: 'Caracas', address: 'Av. Libertador, Edif. Torre Norte, Piso 5, Apto 5-B, Chacao', status: 'active', createdAt: '2025-01-15', shipmentsCount: 12 },
  { id: 'l2', code: 'EC-002', userId: 'u2', userName: 'María González', userEmail: 'maria@email.com', userPhone: '+58 414 7654321', destinationCity: 'Maracay', address: 'Urb. El Castaño, Calle 3, Casa 15', status: 'active', createdAt: '2025-02-10', shipmentsCount: 8 },
  { id: 'l3', code: 'EC-003', userId: 'u8', userName: 'José Pérez', userEmail: 'jose@email.com', userPhone: '+58 416 3334455', destinationCity: 'Valencia', address: 'Residencias Los Mangos, Torre B, Piso 3, Apto 3-A', status: 'active', createdAt: '2025-01-20', shipmentsCount: 5 },
  { id: 'l4', code: 'EC-004', userId: 'u9', userName: 'Luisa Mendoza', userEmail: 'luisa@email.com', userPhone: '+58 424 5556677', destinationCity: 'Maracaibo', address: 'Sector La Lago, Av. 5 de Julio, Edif. Las Palmas, Piso 2', status: 'suspended', createdAt: '2024-11-05', shipmentsCount: 3 },
  { id: 'l5', code: 'EC-005', userId: 'u10', userName: 'Luis Fernández', userEmail: 'luis@email.com', userPhone: '+58 412 8889900', destinationCity: 'Maracaibo', address: 'Urb. La Virginia, Calle 72, Casa 44', status: 'active', createdAt: '2025-02-28', shipmentsCount: 15 },
  { id: 'l6', code: 'EC-006', userId: 'u11', userName: 'Gabriela Ríos', userEmail: 'gabriela@email.com', userPhone: '+58 426 1112233', destinationCity: 'Barquisimeto', address: 'Av. Lara, C.C. Sambil, Torre Oeste, Piso 8', status: 'active', createdAt: '2025-03-01', shipmentsCount: 2 },
];

export const MOCK_TRACKING_EVENTS: TrackingEvent[] = [
  { id: 'te1', shipmentId: 's1', status: 'received', location: 'Bogotá, Colombia', description: 'Paquete recibido en sede Bogotá', timestamp: '2025-03-20 14:30', updatedBy: 'Ana Herrera' },
  { id: 'te2', shipmentId: 's1', status: 'processing', location: 'Bogotá, Colombia', description: 'Paquete en proceso de clasificación', timestamp: '2025-03-21 09:00', updatedBy: 'Ana Herrera' },
  { id: 'te3', shipmentId: 's1', status: 'transit', location: 'Cúcuta, Colombia', description: 'Paquete en ruta hacia Venezuela', timestamp: '2025-03-22 08:00', updatedBy: 'Pedro López' },
  { id: 'te4', shipmentId: 's2', status: 'received', location: 'Miami, USA', description: 'Paquete recibido en warehouse Miami', timestamp: '2025-03-18 10:00', updatedBy: 'Sistema' },
  { id: 'te5', shipmentId: 's2', status: 'transit', location: 'Bogotá, Colombia', description: 'Paquete en tránsito desde Miami', timestamp: '2025-03-21 16:00', updatedBy: 'Pedro López' },
  { id: 'te6', shipmentId: 's2', status: 'customs', location: 'Frontera Colombia-Venezuela', description: 'En proceso de aduana', timestamp: '2025-03-24 11:00', updatedBy: 'Pedro López' },
];

// Dashboard KPI helpers
export function getShipmentsByStatus(shipments: Shipment[]): Record<ShipmentStatus, number> {
  const counts: Record<ShipmentStatus, number> = {
    received: 0,
    processing: 0,
    transit: 0,
    customs: 0,
    delivered: 0,
    cancelled: 0,
  };
  shipments.forEach(s => counts[s.status]++);
  return counts;
}

export function getShipmentsByOrigin(shipments: Shipment[]): Record<string, number> {
  const counts: Record<string, number> = { CO: 0, US: 0, CN: 0 };
  shipments.forEach(s => counts[s.origin]++);
  return counts;
}

export function getTotalRevenue(shipments: Shipment[]): number {
  return shipments
    .filter(s => s.status !== 'cancelled')
    .reduce((sum, s) => sum + s.declaredValue, 0);
}

export function getActiveLockers(lockers: Locker[]): number {
  return lockers.filter(l => l.status === 'active').length;
}
