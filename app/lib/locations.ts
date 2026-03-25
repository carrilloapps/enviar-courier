export interface Location {
  id: string;
  city: string;
  area?: string;
  address: string;
  postalCode: string;
  neighborhood: string;
  phone: string;
  whatsapp: string;
  country: 'CO' | 'VE';
  hours?: string;
  note?: string;
}

export const COLOMBIA_LOCATIONS: Location[] = [
  {
    id: 'med-poblado',
    city: 'Medellín',
    area: 'Poblado',
    address: 'Cra 35A #15B-35, Centro de Negocios Prisma (Oficina 101)',
    postalCode: '050016',
    neighborhood: 'Las Palmas – Poblado',
    phone: '+57 3243299800',
    whatsapp: '+57 3027543225',
    country: 'CO',
  },
  {
    id: 'bello',
    city: 'Bello',
    address: 'Diagonal 55 #37-41, CC Estación Niquía, Local 147',
    postalCode: '051050',
    neighborhood: 'Hermosa Provincia',
    phone: '+57 3243299800',
    whatsapp: '+57 3027543225',
    country: 'CO',
  },
  {
    id: 'bog-cedritos',
    city: 'Bogotá',
    area: 'Cedritos',
    address: 'Cra 19 #147-30, Local 09, CC La Juguetería',
    postalCode: '111961',
    neighborhood: 'El Cedrito',
    phone: '+57 3243299800',
    whatsapp: '+57 3027543225',
    country: 'CO',
  },
  {
    id: 'bog-engativa',
    city: 'Bogotá',
    area: 'Engativá',
    address: 'Calle 72 #86-60, Local 13 (Piso 1), Centro Empresarial Punto 72',
    postalCode: '111071',
    neighborhood: 'Los Campos',
    phone: '+57 3243299800',
    whatsapp: '+57 3027543225',
    country: 'CO',
  },
  {
    id: 'cali-norte',
    city: 'Cali',
    area: 'Norte',
    address: 'Carrera 1 #61A-30, Local 10, CC Colón Plaza',
    postalCode: '760002',
    neighborhood: 'Chiminangos',
    phone: '+57 3243299800',
    whatsapp: '+57 3027543225',
    country: 'CO',
  },
  {
    id: 'barranquilla',
    city: 'Barranquilla',
    address: 'Calle 79 #42F-93, Local 102, Garden Plaza',
    postalCode: '080020',
    neighborhood: 'El Porvenir',
    phone: '+57 3243299800',
    whatsapp: '+57 3027543225',
    country: 'CO',
  },
  {
    id: 'cucuta',
    city: 'Cúcuta',
    address: 'Avenida 6 #7N-109, Zona Industrial',
    postalCode: '540003',
    neighborhood: 'Zona Industrial',
    phone: '+57 3243299800',
    whatsapp: '+57 3027543225',
    country: 'CO',
    note: 'Se reciben casilleros hasta las 4:30 PM los viernes. No se labora los sábados.',
  },
];

export const VENEZUELA_LOCATIONS: Location[] = [
  {
    id: 've-caracas',
    city: 'Caracas',
    address: 'Torre Parque Cristal, Planta Baja Local Lcc-24, Los Palos Grandes, Chacao',
    postalCode: '1060',
    neighborhood: 'Los Palos Grandes',
    phone: '+58 212-1234567',
    whatsapp: '+57 3027543225',
    country: 'VE',
    hours: 'Lunes a Viernes, 9:00 a.m. a 12:00 m y de 1:00 p.m. a 5:00 p.m.',
  },
  {
    id: 've-maracay',
    city: 'Maracay',
    address: 'Av. Bolívar de Maracay, C.C. Parque Aragua, Nivel C4, Local 04-20',
    postalCode: '2101',
    neighborhood: 'Centro',
    phone: '+58 243-1234567',
    whatsapp: '+57 3027543225',
    country: 'VE',
    hours: 'Lunes a Viernes, 9:00 a.m. a 12:00 m y de 1:00 p.m. a 5:00 p.m.',
  },
  {
    id: 've-valencia',
    city: 'Valencia',
    address: 'Avenida Bolívar Norte, C.C Camoruco Piso 3 Local N-24',
    postalCode: '2001',
    neighborhood: 'Centro',
    phone: '+58 241-1234567',
    whatsapp: '+57 3027543225',
    country: 'VE',
    hours: 'Lunes a Viernes, 9:00 a.m. a 12:00 m y de 1:00 p.m. a 5:00 p.m.',
  },
  {
    id: 've-barquisimeto',
    city: 'Barquisimeto',
    address: 'Av 20 entre Calles 40 y 41, CC Ciudad Crepuscular Local 5, Planta Baja',
    postalCode: '3001',
    neighborhood: 'Centro Oeste',
    phone: '+58 251-1234567',
    whatsapp: '+57 3027543225',
    country: 'VE',
    hours: 'Lunes a Viernes, 8:00 a.m. a 12:30 m y de 1:30 p.m. a 6:00 p.m.',
  },
  {
    id: 've-maracaibo',
    city: 'Maracaibo',
    address: 'Avenida 4, Bella Vista, con Calle 79, C.C. Shalom, Local 3',
    postalCode: '4001',
    neighborhood: 'Bella Vista',
    phone: '+58 261-1234567',
    whatsapp: '+57 3027543225',
    country: 'VE',
    hours: 'Lunes a Viernes, 9:00 a.m. a 12:00 m y de 1:00 p.m. a 5:00 p.m.',
  },
  {
    id: 've-merida',
    city: 'Mérida',
    address: 'C.C Pie de Monte, Av. Los Próceres, Local PB-15',
    postalCode: '5101',
    neighborhood: 'Centro',
    phone: '+58 274-1234567',
    whatsapp: '+57 3027543225',
    country: 'VE',
    hours: 'Lunes a Viernes, 9:00 a.m. a 12:00 m y de 1:00 p.m. a 5:00 p.m.',
  },
];
