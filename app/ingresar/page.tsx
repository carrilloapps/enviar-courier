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
  ShieldCheck,
  Truck,
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
    <div className="min-h-screen bg-dark-950 flex flex-col lg:flex-row w-full overflow-hidden">
      
      {/* Left Side: Auth Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-12 relative z-10 min-h-screen lg:min-h-[100vh] overflow-y-auto custom-scrollbar">
        {/* Subtle background for the form side on mobile */}
        <div className="absolute inset-0 grid-bg opacity-30 lg:opacity-10 pointer-events-none" />
        <div className="absolute top-0 -left-32 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative w-full max-w-md py-8">
          {/* Main Card */}
          <div className="bg-white/[0.03] lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border border-white/[0.06] lg:border-none rounded-[2rem] lg:rounded-none p-8 lg:p-0 shadow-2xl lg:shadow-none">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-10 group cursor-pointer w-fit">
              <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-white font-[var(--font-heading)] tracking-tight">Enviar</span>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-[0.2em]">Courier</span>
              </div>
            </Link>

            {mode === 'login' ? (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-black text-white font-[var(--font-heading)] tracking-tight mb-2">
                    {t('auth.login.title')}
                  </h1>
                  <p className="text-sm text-neutral-400">{t('auth.login.subtitle')}</p>
                </div>

                {/* Social Login */}
                <div className="flex gap-4 mb-6">
                  <button type="button" className="flex-1 py-3 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all flex items-center justify-center gap-3 text-sm text-neutral-300 font-semibold cursor-pointer group">
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                    </svg>
                    Google
                  </button>
                  <button type="button" className="flex-1 py-3 px-4 rounded-xl bg-[#1877F2]/5 border border-[#1877F2]/20 hover:bg-[#1877F2]/10 hover:border-[#1877F2]/40 transition-all flex items-center justify-center gap-3 text-sm text-[#1877F2] font-semibold cursor-pointer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                </div>

                <div className="relative flex items-center py-2 mb-6">
                  <div className="flex-grow border-t border-white/[0.06]"></div>
                  <span className="flex-shrink-0 mx-4 text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">O ingresa con Email</span>
                  <div className="flex-grow border-t border-white/[0.06]"></div>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
                      {t('auth.login.email')}
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-indigo-400 transition-colors" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/[0.06] text-sm transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                       <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                        {t('auth.login.password')}
                      </label>
                      <button
                        type="button"
                        onClick={() => { setMode('recover'); setError(''); }}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer transition-colors duration-200"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                    
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-indigo-400 transition-colors" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/[0.06] text-sm transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-indigo-400 cursor-pointer transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                      <span className="font-medium">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 gradient-indigo text-white font-bold rounded-xl hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50 mt-4"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {t('auth.login.submit')}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
                  <p className="text-xs text-neutral-500 mb-4">{t('auth.login.noAccount')}</p>
                  <Link
                    href="/casillero"
                    className="inline-flex items-center justify-center w-full gap-2 px-5 py-3.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-sm font-bold text-teal-400 hover:border-teal-500/40 hover:bg-teal-500/20 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all duration-300 cursor-pointer"
                  >
                    <Boxes className="w-4 h-4" />
                    {t('auth.login.createLocker')}
                  </Link>
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="mb-8 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="mb-8">
                  <h1 className="text-3xl font-black text-white font-[var(--font-heading)] tracking-tight mb-2">
                    {t('auth.recover.title')}
                  </h1>
                  <p className="text-sm text-neutral-400">{t('auth.recover.subtitle')}</p>
                </div>

                {recoverSent ? (
                  <div className="text-center py-8 glass-card border border-white/[0.06] rounded-2xl">
                    <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-teal-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Revisa tu inbox</h3>
                    <p className="text-sm text-neutral-400 max-w-[250px] mx-auto mb-6">{t('auth.recover.sent')}</p>
                    <button
                      onClick={() => { setMode('login'); setRecoverSent(false); }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-sm font-semibold text-white cursor-pointer transition-colors duration-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {t('auth.recover.back')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRecover} className="space-y-5">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
                        {t('auth.login.email')}
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-indigo-400 transition-colors" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu@correo.com"
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/[0.06] text-sm transition-all duration-200"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 gradient-indigo text-white font-bold rounded-xl hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50 mt-4"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          {t('auth.recover.submit')}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </>
            )}

            {/* Footer */}
            <p className="text-center text-[10px] text-neutral-600 font-medium uppercase tracking-widest mt-12">
              © {new Date().getFullYear()} Enviar Courier. {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Visual & Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-[55%] relative bg-dark-950 items-center justify-center overflow-hidden border-l border-white/[0.04]">
        {/* Dynamic Backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-dark-950 to-teal-950" />
        <div className="absolute inset-0 grid-bg opacity-40 mix-blend-overlay" />
        
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        
        {/* Composition Container */}
        <div className="relative z-10 w-full max-w-xl mx-auto">
          
          {/* Main Glass Content Box */}
          <div className="relative z-20 p-12 glass-card rounded-[2.5rem] border border-white/10 shadow-[0_0_80px_rgba(99,102,241,0.1)] backdrop-blur-2xl text-center group transition-all duration-700 hover:border-white/[0.15] hover:shadow-[0_0_100px_rgba(45,212,191,0.15)]">
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center mx-auto mb-10 shadow-inner group-hover:scale-105 transition-transform duration-500">
              <Package className="w-12 h-12 text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
            </div>
            
            <h2 className="text-4xl xl:text-5xl font-black text-white mb-6 leading-tight tracking-tight px-4">
              Gestión Logística <span className="text-gradient">Inteligente</span>
            </h2>
            
            <p className="text-lg text-neutral-400 leading-relaxed mb-10 max-w-sm mx-auto">
              Administra tus casilleros, rastrea envíos internacionales en tiempo real y empodera tu comercio con la plataforma más avanzada del mercado.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white flex items-center gap-2 group-hover:bg-white/10 transition-colors">
                <CheckCircle className="w-4 h-4 text-teal-400" />
                Rastreo Activo 24/7
              </div>
              <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white flex items-center gap-2 group-hover:bg-white/10 transition-colors">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                Entregas Aseguradas
              </div>
            </div>
          </div>

          {/* Floating Element 1 (Top Right) */}
          <div className="absolute -top-8 -right-8 z-30 transform hover:-translate-y-2 transition-transform duration-500">
            <div className="glass-card p-4 rounded-2xl flex items-center gap-4 bg-dark-800/80 border border-white/[0.08] shadow-2xl backdrop-blur-xl">
              <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
                <Truck className="w-5 h-5 text-teal-400" />
              </div>
              <div className="pr-4">
                <p className="text-sm font-bold text-white mb-0.5">En Tránsito</p>
                <p className="text-xs text-teal-400 font-medium tracking-wide">Miami → Bogotá</p>
              </div>
            </div>
          </div>

          {/* Floating Element 2 (Bottom Left) */}
          <div className="absolute -bottom-10 -left-10 z-30 transform hover:translate-y-2 transition-transform duration-500">
            <div className="glass-card p-4 rounded-2xl flex items-center gap-4 bg-dark-800/80 border border-white/[0.08] shadow-2xl backdrop-blur-xl">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Boxes className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="pr-4">
                <p className="text-sm font-bold text-white mb-0.5">Tarifa Especial</p>
                <p className="text-xs text-indigo-400 font-medium tracking-wide">Volumen Optimizado</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
