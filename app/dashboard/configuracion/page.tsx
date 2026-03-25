'use client';

import { useState } from 'react';
import {
  Settings,
  Save,
  Globe,
  Bell,
  Shield,
  Database,
  Mail,
  MessageCircle,
  ToggleLeft,
  ToggleRight,
  Server,
  Zap,
} from 'lucide-react';

interface SettingToggle {
  key: string;
  label: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
}

export default function ConfiguracionPage() {
  const [settings, setSettings] = useState<SettingToggle[]>([
    { key: 'notifications', label: 'Notificaciones por email', description: 'Enviar notificaciones automáticas de cambio de estado a los usuarios', icon: Mail, enabled: true },
    { key: 'whatsapp', label: 'Notificaciones WhatsApp', description: 'Enviar alertas de estado por WhatsApp al destinatario', icon: MessageCircle, enabled: true },
    { key: 'auto_tracking', label: 'Rastreo automático', description: 'Actualizar automáticamente el estado según ubicación GPS', icon: Globe, enabled: false },
    { key: 'insurance_required', label: 'Seguro obligatorio', description: 'Requerir seguro para todos los envíos', icon: Shield, enabled: true },
    { key: 'maintenance', label: 'Modo mantenimiento', description: 'Deshabilitar registro de nuevos usuarios temporalmente', icon: Server, enabled: false },
  ]);

  const [companyInfo, setCompanyInfo] = useState({
    name: 'Enviar Courier',
    email: 'info@enviarcourier.com',
    phone: '+57 302 754 3225',
    whatsapp: '+57 302 754 3225',
    website: 'www.enviarcourier.com',
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, enabled: !s.enabled } : s));
  };

  const handleSave = () => {
    alert('Configuración guardada exitosamente');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-[var(--font-heading)]">Configuración</h1>
          <p className="text-sm text-neutral-500 mt-1">Ajustes generales del sistema</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 gradient-lime text-dark-950 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,230,53,0.2)] transition-all duration-300 cursor-pointer text-sm"
        >
          <Save className="w-4 h-4" />
          Guardar cambios
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Company info */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            Información de la empresa
          </h3>
          <div className="space-y-4">
            {[
              { key: 'name', label: 'Nombre', icon: Zap },
              { key: 'email', label: 'Email', icon: Mail },
              { key: 'phone', label: 'Teléfono', icon: Bell },
              { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
              { key: 'website', label: 'Sitio web', icon: Globe },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-[10px] font-semibold text-neutral-500 mb-1.5 uppercase tracking-wider">
                  {field.label}
                </label>
                <div className="relative">
                  <field.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                  <input
                    value={companyInfo[field.key as keyof typeof companyInfo]}
                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
            <Settings className="w-4 h-4 text-teal-400" />
            Funcionalidades
          </h3>
          <div className="space-y-1">
            {settings.map((setting) => (
              <div
                key={setting.key}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.02] transition-colors duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.04] flex items-center justify-center shrink-0 mt-0.5">
                    <setting.icon className="w-4 h-4 text-neutral-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{setting.label}</p>
                    <p className="text-xs text-neutral-600 mt-0.5">{setting.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting(setting.key)}
                  className="cursor-pointer shrink-0 ml-3"
                >
                  {setting.enabled ? (
                    <ToggleRight className="w-8 h-8 text-teal-400" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-neutral-600" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="glass-card rounded-2xl p-6 border-red-500/10">
        <h3 className="text-sm font-semibold text-red-400 mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Zona de peligro
        </h3>
        <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/[0.03] border border-red-500/[0.08]">
          <div>
            <p className="text-sm font-medium text-white">Restablecer sistema</p>
            <p className="text-xs text-neutral-500 mt-0.5">Esta acción eliminará todos los datos y no se puede deshacer</p>
          </div>
          <button className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold cursor-pointer hover:bg-red-500/20 transition-colors duration-200">
            Restablecer
          </button>
        </div>
      </div>
    </div>
  );
}
