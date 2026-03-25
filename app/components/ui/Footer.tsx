'use client';

import Link from 'next/link';
import { useApp } from '@/app/lib/context';
import {
  Package,
  Phone,
  Mail,
  MapPin,
  Send,
  ArrowUpRight,
} from 'lucide-react';

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="relative border-t border-white/[0.04]">
      {/* Newsletter */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-section" />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-6">
              <Mail className="w-3 h-3" />
              Newsletter
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-[var(--font-heading)]">
              {t('newsletter.title')}
            </h3>
            <p className="text-neutral-400 mb-8 text-sm">
              {t('newsletter.subtitle')}
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 text-sm transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_25px_rgba(163,230,53,0.2)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Send className="w-4 h-4" />
                {t('newsletter.btn')}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-5 cursor-pointer">
                <div className="w-9 h-9 rounded-lg gradient-accent flex items-center justify-center">
                  <Package className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-white tracking-tight">Enviar</span>
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-[0.2em]">Courier</span>
                </div>
              </Link>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {t('footer.desc')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t('footer.links')}</h4>
              <ul className="space-y-3">
                {[
                  { key: 'nav.services', href: '/#servicios' },
                  { key: 'nav.rates', href: '/tarifas' },
                  { key: 'nav.locker', href: '/casillero' },
                  { key: 'nav.tracking', href: '/rastreo' },
                  { key: 'nav.about', href: '/nosotros' },
                ].map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-1 text-neutral-500 hover:text-teal-400 text-sm transition-colors duration-200 cursor-pointer"
                    >
                      {t(item.key)}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t('footer.legal')}</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-neutral-500 hover:text-teal-400 text-sm transition-colors duration-200 cursor-pointer">
                    {t('footer.privacy')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-neutral-500 hover:text-teal-400 text-sm transition-colors duration-200 cursor-pointer">
                    {t('footer.terms')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t('footer.contact')}</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-neutral-400 text-sm">+57 302 754 3225</p>
                    <p className="text-neutral-500 text-sm">+57 324 329 9800</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                  <p className="text-neutral-400 text-sm">info@enviarcourier.com</p>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                  <p className="text-neutral-400 text-sm">Colombia · Venezuela</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-neutral-600 text-xs">
              © {new Date().getFullYear()} Enviar Courier. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: 'Instagram', href: 'https://instagram.com/enviarcourier', svg: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                { label: 'Facebook', href: 'https://facebook.com/enviarcourier', svg: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { label: 'WhatsApp', href: 'https://wa.me/573027543225', svg: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-indigo-500/20 border border-white/[0.04] hover:border-indigo-500/30 flex items-center justify-center transition-all duration-300 cursor-pointer group"
                  aria-label={social.label}
                >
                  <svg className="w-3.5 h-3.5 text-neutral-500 group-hover:text-indigo-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.svg} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
