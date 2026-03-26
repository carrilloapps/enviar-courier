'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, Copy, Check } from 'lucide-react';
import type { Location } from '@/app/lib/locations';

export default function LocationCard({ loc, t }: { loc: Location, t: (key: string) => string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(loc.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card rounded-2xl p-6 group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-white/[0.08]">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-400" />
            {loc.city}
            {loc.area && <span className="text-teal-400 text-sm font-normal ml-1.5">· {loc.area}</span>}
          </h4>
          <p className="text-xs text-neutral-600 mt-1">{t('locations.postal') || 'CP'}: {loc.postalCode}</p>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-white/[0.06] text-neutral-600 hover:text-teal-400 transition-all duration-200 cursor-pointer"
          aria-label={t('locations.copy') || 'Copiar dirección'}
        >
          {copied ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      
      <p className="text-sm text-neutral-400 mb-4 leading-relaxed line-clamp-2 min-h-[40px]">
        {loc.address}
      </p>
      
      {loc.hours && (
        <div className="flex items-start gap-2 mb-3">
          <Clock className="w-3.5 h-3.5 text-neutral-600 mt-0.5 shrink-0" />
          <p className="text-xs text-neutral-500">{loc.hours}</p>
        </div>
      )}
      
      {loc.note && (
        <p className="text-xs text-yellow-500/90 bg-yellow-500/10 px-3 py-2 rounded-lg mb-4 border border-yellow-500/20">
          {loc.note}
        </p>
      )}
      
      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04] mt-auto">
        <Link
          href={`tel:${loc.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-indigo-400 transition-colors duration-200 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          {loc.phone}
        </Link>
      </div>
    </div>
  );
}
