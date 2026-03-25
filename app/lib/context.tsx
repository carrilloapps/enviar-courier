'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Currency } from '@/app/lib/pricing';
import type { User } from '@/app/lib/auth';
import { getMockUser } from '@/app/lib/auth';

type Locale = 'es' | 'en';

interface AppContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  t: (key: string) => string;
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const translations: Record<Locale, Record<string, string>> = {
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.rates': 'Tarifas',
    'nav.locker': 'Casillero',
    'nav.tracking': 'Rastreo',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.cta': 'Cotizar envío',

    // Hero
    'hero.badge': 'Líder en envíos internacionales',
    'hero.title1': 'Envíos seguros de',
    'hero.title2': 'Colombia',
    'hero.title3': 'a Venezuela',
    'hero.subtitle': 'Servicio de courier puerta a puerta con rastreo en tiempo real. Casillero internacional, tarifas competitivas y entrega garantizada.',
    'hero.cta1': 'Crear mi casillero',
    'hero.cta2': 'Cotizar envío',
    'hero.track.placeholder': 'Ingresa tu número de rastreo...',
    'hero.track.btn': 'Rastrear',
    'hero.stat1': 'Envíos exitosos',
    'hero.stat2': 'Clientes satisfechos',
    'hero.stat3': 'Ciudades',
    'hero.stat4': 'Años de experiencia',

    // Services
    'services.title': 'Nuestros servicios',
    'services.subtitle': 'Soluciones logísticas hechas a tu medida',
    'services.s1.title': 'Envío puerta a puerta',
    'services.s1.desc': 'Recogemos tu paquete en Colombia y lo entregamos directamente en la puerta de tu destino en Venezuela. Sin intermediarios.',
    'services.s2.title': 'Casillero internacional',
    'services.s2.desc': 'Compra en tiendas online de Colombia. Nosotros lo recibimos en tu casillero y lo enviamos a Venezuela. Simple y seguro.',
    'services.s3.title': 'Rastreo en tiempo real',
    'services.s3.desc': 'Sigue tu envío en cada etapa del proceso. Desde la recepción hasta la entrega, siempre sabrás dónde está tu paquete.',
    'services.s4.title': 'Carga asegurada',
    'services.s4.desc': 'Todas las cargas viajan aseguradas. Protegemos tu inversión con seguros desde el 3% del valor declarado.',
    'services.learn': 'Más información',

    // How it Works
    'how.title': '¿Cómo funciona?',
    'how.subtitle': 'Enviar tu paquete es fácil en 4 simples pasos',
    'how.s1.title': 'Cotiza tu envío',
    'how.s1.desc': 'Contacta a uno de nuestros asesores o usa nuestra calculadora de tarifas.',
    'how.s2.title': 'Entrega o recogida',
    'how.s2.desc': 'Lleva tu paquete a nuestras sedes o solicita recogida a domicilio.',
    'how.s3.title': 'Envío seguro',
    'how.s3.desc': 'Tu paquete viaja asegurado y rastreable en todo momento.',
    'how.s4.title': 'Entrega en Venezuela',
    'how.s4.desc': 'Recibe tu paquete en la puerta de tu casa en Venezuela.',

    // Pricing
    'pricing.title': 'Tarifas competitivas',
    'pricing.subtitle': 'Precios transparentes para tus envíos desde Colombia a Venezuela',
    'pricing.weight': 'Peso',
    'pricing.dimensions': 'Dimensiones',
    'pricing.total': 'Total',
    'pricing.perkg': 'Por KG',
    'pricing.cta': 'Cotiza ya tu envío',
    'pricing.viewall': 'Ver todas las tarifas',
    'pricing.popular': 'Popular',

    // Locations
    'locations.title': 'Nuestras sedes',
    'locations.subtitle': 'Estamos presentes en las principales ciudades',
    'locations.co': 'Colombia',
    'locations.ve': 'Venezuela',
    'locations.copy': 'Copiar dirección',
    'locations.copied': '¡Copiado!',
    'locations.hours': 'Horario',
    'locations.postal': 'Código postal',

    // Testimonials
    'testimonials.title': '¿Qué dicen nuestros clientes?',
    'testimonials.subtitle': 'Miles de clientes satisfechos confían en nosotros',

    // Newsletter
    'newsletter.title': '¡Sé el primero en conocer nuestras novedades!',
    'newsletter.subtitle': 'Suscríbete y recibe ofertas exclusivas, actualizaciones y noticias.',
    'newsletter.placeholder': 'Tu correo electrónico',
    'newsletter.btn': 'Suscribirme',

    // Footer
    'footer.desc': 'Empresa líder en envíos internacionales desde Colombia a Venezuela. Servicio confiable, seguro y con rastreo en tiempo real.',
    'footer.links': 'Enlaces rápidos',
    'footer.legal': 'Legal',
    'footer.privacy': 'Política de privacidad',
    'footer.terms': 'Términos y condiciones',
    'footer.contact': 'Contacto',
    'footer.rights': 'Todos los derechos reservados.',

    // Casillero Page
    'locker.hero.title': 'Crea tu casillero internacional',
    'locker.hero.subtitle': 'Compra en Colombia, recibe en Venezuela rápido y seguro. Regístrate y obtén tu dirección de casillero personal.',
    'locker.how.title': '¿Cómo funciona el casillero?',
    'locker.step1.title': 'Compra online con tu casillero',
    'locker.step1.desc': 'Al hacer una compra, incluye tu número de casillero en los datos de entrega para identificar tu paquete.',
    'locker.step2.title': 'Recepción de mercancía',
    'locker.step2.desc': 'Si un proveedor envía tu mercancía, la caja debe estar identificada con tu nombre y número de casillero.',
    'locker.step3.title': 'Pre-notificación obligatoria',
    'locker.step3.desc': 'Pre-notifica tu carga a través de WhatsApp para agilizar el proceso de recepción.',
    'locker.step4.title': 'Plazos de recepción',
    'locker.step4.desc': 'La carga debe recibirse máximo los viernes a las 3:00 PM para garantizar la salida el sábado.',
    'locker.step5.title': 'Confirmación de datos',
    'locker.step5.desc': 'Te contactaremos en máximo 24 horas para coordinar datos del destinatario y valor declarado.',
    'locker.step6.title': 'Proceso 100% trazable',
    'locker.step6.desc': 'Una vez confirmado el pago, tu envío estará listo para salir a Venezuela con rastreo completo.',
    'locker.register.title': 'Regístrate y obtén tu casillero',
    'locker.form.name': 'Nombre completo',
    'locker.form.email': 'Correo electrónico',
    'locker.form.phone': 'Teléfono',
    'locker.form.id': 'Cédula de identidad',
    'locker.form.city': 'Ciudad de destino en Venezuela',
    'locker.form.submit': 'Crear mi casillero',
    'locker.addresses.title': 'Direcciones de nuestras sedes',
    'locker.addresses.subtitle': 'Usa la dirección de la sede más cercana como destino de tus compras online',

    // Tracking Page
    'tracking.title': 'Rastrea tu paquete',
    'tracking.subtitle': 'Ingresa tu número de guía para ver el estado de tu envío en tiempo real',
    'tracking.placeholder': 'Ingresa tu número de guía...',
    'tracking.btn': 'Rastrear',
    'tracking.status.received': 'Recibido',
    'tracking.status.transit': 'En tránsito',
    'tracking.status.customs': 'En aduana',
    'tracking.status.delivered': 'Entregado',
    'tracking.demo.title': 'Ejemplo de rastreo',

    // Rates Page
    'rates.title': 'Tarifas de envío',
    'rates.subtitle': 'Consulta nuestras tarifas actualizadas para envíos desde Colombia a Venezuela',
    'rates.standard': 'Tarifas estándar',
    'rates.standard.desc': 'Aplica para Caracas, Maracay, Maracaibo, Valencia, Barquisimeto, Mérida',
    'rates.volumetric': 'Tarifas por peso volumétrico',
    'rates.volumetric.desc': 'Para paquetes de gran tamaño y poco peso',
    'rates.insurance.title': 'Seguros',
    'rates.insurance.desc': 'Todas las cargas viajan aseguradas por ley',
    'rates.insurance.general': 'Carga general (ropa, zapatos, medicamentos): 3% del valor declarado',
    'rates.insurance.tech': 'Artículos tecnológicos: 5% al 10% del valor declarado',
    'rates.calculator.title': 'Calculadora de envío',

    // About Page
    'about.title': 'Sobre Enviar Courier',
    'about.subtitle': 'Conectamos familias y negocios entre Colombia y Venezuela',
    'about.mission.title': 'Nuestra misión',
    'about.mission.desc': 'Brindar un servicio de envíos internacional confiable, seguro y accesible que conecte a las familias y negocios entre Colombia y Venezuela.',
    'about.vision.title': 'Nuestra visión',
    'about.vision.desc': 'Ser la empresa de courier líder en la ruta Colombia-Venezuela, reconocida por excelencia, innovación y compromiso con nuestros clientes.',
    'about.values.title': 'Nuestros valores',

    // Contact Page
    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Estamos para ayudarte en todo tu proceso de envío',
    'contact.form.name': 'Nombre',
    'contact.form.email': 'Correo electrónico',
    'contact.form.subject': 'Asunto',
    'contact.form.message': 'Mensaje',
    'contact.form.submit': 'Enviar mensaje',
    'contact.info.title': 'Información de contacto',
    'contact.whatsapp': 'WhatsApp',
    'contact.phone': 'Teléfono',
    'contact.email': 'Correo',

    // Auth Page
    'auth.login.title': 'Iniciar sesión',
    'auth.login.subtitle': 'Accede a tu casillero y gestiona tus envíos',
    'auth.login.email': 'Correo electrónico',
    'auth.login.password': 'Contraseña',
    'auth.login.submit': 'Iniciar sesión',
    'auth.login.forgot': '¿Olvidaste tu contraseña?',
    'auth.login.noAccount': '¿No tienes cuenta?',
    'auth.login.createLocker': 'Crea tu casillero',
    'auth.recover.title': 'Recuperar contraseña',
    'auth.recover.subtitle': 'Te enviaremos un enlace para restablecer tu contraseña',
    'auth.recover.submit': 'Enviar enlace',
    'auth.recover.back': 'Volver al login',
    'auth.recover.sent': 'Hemos enviado un enlace de recuperación a tu correo electrónico.',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.rates': 'Rates',
    'nav.locker': 'Locker',
    'nav.tracking': 'Tracking',
    'nav.about': 'About us',
    'nav.contact': 'Contact',
    'nav.cta': 'Get a quote',

    // Hero
    'hero.badge': 'Leader in international shipping',
    'hero.title1': 'Safe shipments from',
    'hero.title2': 'Colombia',
    'hero.title3': 'to Venezuela',
    'hero.subtitle': 'Door-to-door courier service with real-time tracking. International locker, competitive rates and guaranteed delivery.',
    'hero.cta1': 'Create my locker',
    'hero.cta2': 'Get a quote',
    'hero.track.placeholder': 'Enter your tracking number...',
    'hero.track.btn': 'Track',
    'hero.stat1': 'Successful shipments',
    'hero.stat2': 'Happy customers',
    'hero.stat3': 'Cities',
    'hero.stat4': 'Years of experience',

    // Services
    'services.title': 'Our services',
    'services.subtitle': 'Logistics solutions tailored to your needs',
    'services.s1.title': 'Door to door shipping',
    'services.s1.desc': 'We pick up your package in Colombia and deliver it directly to your door in Venezuela. No intermediaries.',
    'services.s2.title': 'International locker',
    'services.s2.desc': 'Shop online in Colombia and USA. We receive it and ship it to Venezuela. Simple and secure.',
    'services.s3.title': 'Real-time tracking',
    'services.s3.desc': 'Follow your shipment at every stage. From reception to delivery, you\'ll always know where your package is.',
    'services.s4.title': 'Insured cargo',
    'services.s4.desc': 'All cargo travels insured. We protect your investment with insurance starting from 3% of declared value.',
    'services.learn': 'Learn more',

    // How it Works
    'how.title': 'How it works',
    'how.subtitle': 'Shipping your package is easy in 4 simple steps',
    'how.s1.title': 'Get a quote',
    'how.s1.desc': 'Contact one of our advisors or use our rate calculator.',
    'how.s2.title': 'Drop-off or pickup',
    'how.s2.desc': 'Bring your package to our offices or request home pickup.',
    'how.s3.title': 'Safe shipping',
    'how.s3.desc': 'Your package travels insured and trackable at all times.',
    'how.s4.title': 'Delivery in Venezuela',
    'how.s4.desc': 'Receive your package at your doorstep in Venezuela.',

    // Pricing
    'pricing.title': 'Competitive rates',
    'pricing.subtitle': 'Transparent prices for your shipments from Colombia to Venezuela',
    'pricing.weight': 'Weight',
    'pricing.dimensions': 'Dimensions',
    'pricing.total': 'Total',
    'pricing.perkg': 'Per KG',
    'pricing.cta': 'Get a quote now',
    'pricing.viewall': 'View all rates',
    'pricing.popular': 'Popular',

    // Locations
    'locations.title': 'Our locations',
    'locations.subtitle': 'We are present in major cities',
    'locations.co': 'Colombia',
    'locations.ve': 'Venezuela',
    'locations.copy': 'Copy address',
    'locations.copied': 'Copied!',
    'locations.hours': 'Hours',
    'locations.postal': 'Postal code',

    // Testimonials
    'testimonials.title': 'What our customers say',
    'testimonials.subtitle': 'Thousands of satisfied customers trust us',

    // Newsletter
    'newsletter.title': 'Be the first to know our news!',
    'newsletter.subtitle': 'Subscribe and receive exclusive offers, updates and news.',
    'newsletter.placeholder': 'Your email address',
    'newsletter.btn': 'Subscribe',

    // Footer
    'footer.desc': 'Leading international shipping company from Colombia to Venezuela. Reliable, safe service with real-time tracking.',
    'footer.links': 'Quick links',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy policy',
    'footer.terms': 'Terms & conditions',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',

    // Casillero Page
    'locker.hero.title': 'Create your international locker',
    'locker.hero.subtitle': 'Shop in Colombia, receive in Venezuela fast and secure. Register and get your personal locker address.',
    'locker.how.title': 'How does the locker work?',
    'locker.step1.title': 'Shop online with your locker',
    'locker.step1.desc': 'When making a purchase, include your locker number in the delivery details to identify your package.',
    'locker.step2.title': 'Merchandise reception',
    'locker.step2.desc': 'If a supplier sends your merchandise, the box must be identified with your name and locker number.',
    'locker.step3.title': 'Mandatory pre-notification',
    'locker.step3.desc': 'Pre-notify your cargo through WhatsApp to speed up the reception process.',
    'locker.step4.title': 'Reception deadlines',
    'locker.step4.desc': 'Cargo must be received by Fridays at 3:00 PM to guarantee Saturday departure.',
    'locker.step5.title': 'Data confirmation',
    'locker.step5.desc': 'We will contact you within 24 hours to coordinate recipient data and declared value.',
    'locker.step6.title': '100% traceable process',
    'locker.step6.desc': 'Once payment is confirmed, your shipment will be ready to depart to Venezuela with full tracking.',
    'locker.register.title': 'Register and get your locker',
    'locker.form.name': 'Full name',
    'locker.form.email': 'Email address',
    'locker.form.phone': 'Phone number',
    'locker.form.id': 'ID number',
    'locker.form.city': 'Destination city in Venezuela',
    'locker.form.submit': 'Create my locker',
    'locker.addresses.title': 'Our office addresses',
    'locker.addresses.subtitle': 'Use the nearest office address as your online shopping destination',

    // Tracking Page
    'tracking.title': 'Track your package',
    'tracking.subtitle': 'Enter your tracking number to see your shipment status in real-time',
    'tracking.placeholder': 'Enter your tracking number...',
    'tracking.btn': 'Track',
    'tracking.status.received': 'Received',
    'tracking.status.transit': 'In transit',
    'tracking.status.customs': 'In customs',
    'tracking.status.delivered': 'Delivered',
    'tracking.demo.title': 'Tracking example',

    // Rates Page
    'rates.title': 'Shipping rates',
    'rates.subtitle': 'Check our updated rates for shipments from Colombia to Venezuela',
    'rates.standard': 'Standard rates',
    'rates.standard.desc': 'Applies for Caracas, Maracay, Maracaibo, Valencia, Barquisimeto, Mérida',
    'rates.volumetric': 'Volumetric weight rates',
    'rates.volumetric.desc': 'For large-size, lightweight packages',
    'rates.insurance.title': 'Insurance',
    'rates.insurance.desc': 'All cargo travels insured by law',
    'rates.insurance.general': 'General cargo (clothes, shoes, medicine): 3% of declared value',
    'rates.insurance.tech': 'Technology items: 5% to 10% of declared value',
    'rates.calculator.title': 'Shipping calculator',

    // About Page
    'about.title': 'About Enviar Courier',
    'about.subtitle': 'Connecting families and businesses between Colombia and Venezuela',
    'about.mission.title': 'Our mission',
    'about.mission.desc': 'To provide a reliable, safe and accessible international shipping service that connects families and businesses between Colombia and Venezuela.',
    'about.vision.title': 'Our vision',
    'about.vision.desc': 'To be the leading courier company on the Colombia-Venezuela route, recognized for excellence, innovation and commitment to our customers.',
    'about.values.title': 'Our values',

    // Contact Page
    'contact.title': 'Contact us',
    'contact.subtitle': 'We are here to help you with your entire shipping process',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send message',
    'contact.info.title': 'Contact information',
    'contact.whatsapp': 'WhatsApp',
    'contact.phone': 'Phone',
    'contact.email': 'Email',

    // Auth Page
    'auth.login.title': 'Sign in',
    'auth.login.subtitle': 'Access your locker and manage your shipments',
    'auth.login.email': 'Email',
    'auth.login.password': 'Password',
    'auth.login.submit': 'Sign in',
    'auth.login.forgot': 'Forgot your password?',
    'auth.login.noAccount': "Don't have an account?",
    'auth.login.createLocker': 'Create your locker',
    'auth.recover.title': 'Recover password',
    'auth.recover.subtitle': "We'll send you a link to reset your password",
    'auth.recover.submit': 'Send link',
    'auth.recover.back': 'Back to login',
    'auth.recover.sent': "We've sent a recovery link to your email address.",
  },
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('es');
  const [currency, setCurrency] = useState<Currency>('COP');
  const [user, setUser] = useState<User | null>(null);

  const t = (key: string): string => {
    return translations[locale][key] || key;
  };

  const login = (email: string, _password: string): boolean => {
    // Mock login — in production this would call Supabase Auth
    const mockUser = getMockUser('gerente');
    if (email) {
      setUser({ ...mockUser, email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ locale, setLocale, currency, setCurrency, t, user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
