'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/lib/context';
import {
  Menu,
  X,
  Package,
  Globe,
  ChevronDown,
  Zap,
  User,
  LayoutDashboard,
  LogOut,
  Settings,
  Boxes,
} from 'lucide-react';
import type { Currency } from '@/app/lib/pricing';

const navLinks = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.services', href: '/#servicios' },
  { key: 'nav.rates', href: '/tarifas' },
  { key: 'nav.locker', href: '/casillero' },
  { key: 'nav.tracking', href: '/rastreo' },
  { key: 'nav.about', href: '/nosotros' },
  { key: 'nav.contact', href: '/contacto' },
];

const currencies: Currency[] = ['COP', 'USD', 'VES'];

export default function Navbar() {
  const { t, locale, setLocale, currency, setCurrency, user, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close avatar dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isLoggedIn = !!user;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-dark-950/95 shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-9 h-9 rounded-lg gradient-accent flex items-center justify-center overflow-hidden">
                <Package className="w-4.5 h-4.5 text-white relative z-10" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-white tracking-tight font-[var(--font-heading)]">
                  Enviar
                </span>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-[0.2em]">
                  Courier
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="px-3.5 py-2 text-[13px] font-medium text-neutral-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/[0.04] cursor-pointer"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>

            {/* Right Controls */}
            <div className="hidden lg:flex items-center gap-1.5">
              {/* Language */}
              <button
                onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                {locale === 'es' ? 'ES' : 'EN'}
              </button>

              {/* Currency */}
              <div className="relative">
                <button
                  onClick={() => setCurrencyOpen(!currencyOpen)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
                >
                  {currency}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${currencyOpen ? 'rotate-180' : ''}`} />
                </button>
                {currencyOpen && (
                  <div className="absolute right-0 top-full mt-2 glass rounded-xl shadow-2xl py-1.5 min-w-[90px] animate-scale-in">
                    {currencies.map((c) => (
                      <button
                        key={c}
                        onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                        className={`block w-full text-left px-4 py-2 text-xs cursor-pointer transition-all duration-200 ${
                          c === currency
                            ? 'text-teal-400 font-bold bg-teal-400/5'
                            : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Avatar / Auth */}
              <div className="relative" ref={avatarRef}>
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => setAvatarOpen(!avatarOpen)}
                      className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-white/[0.04] transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-dark-950 font-bold text-xs ring-2 ring-teal-500/30 group-hover:ring-teal-500/60 transition-all duration-300">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <ChevronDown className={`w-3 h-3 text-neutral-500 transition-transform duration-200 ${avatarOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {avatarOpen && (
                      <div className="absolute right-0 top-full mt-2 glass rounded-2xl shadow-2xl py-2 min-w-[220px] animate-scale-in border border-white/[0.06]">
                        {/* User info */}
                        <div className="px-4 py-3 border-b border-white/[0.06]">
                          <p className="text-sm font-semibold text-white">{user.name}</p>
                          <p className="text-[11px] text-neutral-500 mt-0.5">{user.email}</p>
                          {user.lockerId && (
                            <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-400 text-[10px] font-bold border border-teal-500/20">
                              <Boxes className="w-3 h-3" />
                              {user.lockerId}
                            </span>
                          )}
                        </div>
                        {/* Menu items */}
                        <div className="py-1.5">
                          <Link
                            href="/dashboard"
                            onClick={() => setAvatarOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
                          >
                            <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                            Dashboard
                          </Link>
                          <Link
                            href="/dashboard/envios"
                            onClick={() => setAvatarOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
                          >
                            <Package className="w-4 h-4 text-teal-400" />
                            {t('nav.tracking') === 'Tracking' ? 'My shipments' : 'Mis envíos'}
                          </Link>
                          <Link
                            href="/dashboard/configuracion"
                            onClick={() => setAvatarOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
                          >
                            <Settings className="w-4 h-4 text-neutral-500" />
                            {locale === 'es' ? 'Configuración' : 'Settings'}
                          </Link>
                        </div>
                        {/* Logout */}
                        <div className="pt-1.5 border-t border-white/[0.06]">
                          <button
                            onClick={() => { logout(); setAvatarOpen(false); }}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-400 hover:text-red-400 hover:bg-red-500/[0.04] transition-all duration-200 cursor-pointer w-full"
                          >
                            <LogOut className="w-4 h-4" />
                            {locale === 'es' ? 'Cerrar sesión' : 'Log out'}
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href="/auth"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-300 cursor-pointer group"
                    title={locale === 'es' ? 'Iniciar sesión' : 'Sign in'}
                  >
                    <User className="w-4 h-4 text-neutral-500 group-hover:text-indigo-400 transition-colors duration-300" />
                  </Link>
                )}
              </div>

              {/* CTA */}
              <Link
                href="https://wa.me/573027543225"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-dark-950 gradient-lime rounded-xl hover:shadow-[0_0_25px_rgba(163,230,53,0.3)] transition-all duration-300 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                {t('nav.cta')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-[72px] left-3 right-3 glass rounded-2xl shadow-2xl p-5 animate-scale-in border border-white/[0.06]">
            {/* User section mobile */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/[0.06]">
                <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-dark-950 font-bold text-sm ring-2 ring-teal-500/30">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                  <p className="text-[11px] text-neutral-500 truncate">{user.email}</p>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <Link
                href="/auth"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 mb-4 pb-4 border-b border-white/[0.06] cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:border-indigo-500/40 transition-all duration-200">
                  <User className="w-5 h-5 text-neutral-500 group-hover:text-indigo-400 transition-colors duration-200" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{locale === 'es' ? 'Iniciar sesión' : 'Sign in'}</p>
                  <p className="text-[11px] text-neutral-600">{locale === 'es' ? 'Accede a tu casillero' : 'Access your locker'}</p>
                </div>
              </Link>
            )}

            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all duration-200 cursor-pointer"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-3">
              <button
                onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                {locale === 'es' ? 'Español' : 'English'}
              </button>

              <div className="flex gap-0.5 bg-dark-700 rounded-lg p-0.5">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md cursor-pointer transition-all duration-200 ${
                      c === currency
                        ? 'bg-indigo-500 text-white shadow'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="https://wa.me/573027543225"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-dark-950 gradient-lime rounded-xl cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              {t('nav.cta')}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
