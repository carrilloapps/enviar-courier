'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/573027543225"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] transition-all duration-300 cursor-pointer group overflow-hidden"
      aria-label="Contactar por WhatsApp"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600" />
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <MessageCircle className="w-6 h-6 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
    </Link>
  );
}
