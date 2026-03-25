'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/app/lib/context';
import {
  Package,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle,
  Boxes,
} from 'lucide-react';

export default function AuthPage() {
  const { t, login, locale } = useApp();
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'recover'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [recoverSent, setRecoverSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    const success = login(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError(locale === 'es' ? 'Credenciales incorrectas' : 'Invalid credentials');
    }
    setLoading(false);
  };

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setRecoverSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px]" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-white font-[var(--font-heading)]">Enviar</span>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-[0.2em]">Courier</span>
          </div>
        </Link>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 border border-white/[0.06]">
          {mode === 'login' ? (
            <>
              <div className="text-center mb-7">
                <h1 className="text-2xl font-bold text-white font-[var(--font-heading)]">
                  {t('auth.login.title')}
                </h1>
                <p className="text-sm text-neutral-500 mt-2">{t('auth.login.subtitle')}</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">
                    {t('auth.login.email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/20 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">
                    {t('auth.login.password')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/20 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-400 cursor-pointer transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_25px_rgba(163,230,53,0.25)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-dark-950/30 border-t-dark-950 rounded-full animate-spin" />
                  ) : (
                    <>
                      {t('auth.login.submit')}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 text-center">
                <button
                  onClick={() => { setMode('recover'); setError(''); }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors duration-200"
                >
                  {t('auth.login.forgot')}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
                <p className="text-xs text-neutral-600 mb-3">{t('auth.login.noAccount')}</p>
                <Link
                  href="/casillero"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm font-semibold text-teal-400 hover:border-teal-500/30 hover:bg-teal-500/[0.04] transition-all duration-300 cursor-pointer"
                >
                  <Boxes className="w-4 h-4" />
                  {t('auth.login.createLocker')}
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-7">
                <h1 className="text-2xl font-bold text-white font-[var(--font-heading)]">
                  {t('auth.recover.title')}
                </h1>
                <p className="text-sm text-neutral-500 mt-2">{t('auth.recover.subtitle')}</p>
              </div>

              {recoverSent ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-teal-400" />
                  </div>
                  <p className="text-sm text-neutral-300 mb-6">{t('auth.recover.sent')}</p>
                  <button
                    onClick={() => { setMode('login'); setRecoverSent(false); }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t('auth.recover.back')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRecover} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">
                      {t('auth.login.email')}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/20 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_25px_rgba(163,230,53,0.25)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-dark-950/30 border-t-dark-950 rounded-full animate-spin" />
                    ) : (
                      <>
                        {t('auth.recover.submit')}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="inline-flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors duration-200"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      {t('auth.recover.back')}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-neutral-700 mt-6">
          © {new Date().getFullYear()} Enviar Courier. {t('footer.rights')}
        </p>
      </div>
    </div>
  );
}
