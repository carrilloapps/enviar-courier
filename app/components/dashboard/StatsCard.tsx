import { type LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'teal' | 'indigo' | 'lime' | 'purple' | 'amber' | 'red';
}

const colorMap = {
  teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/20', text: 'text-teal-400', glow: 'group-hover:shadow-[0_0_20px_rgba(52,211,153,0.1)]' },
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400', glow: 'group-hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]' },
  lime: { bg: 'bg-lime-500/10', border: 'border-lime-500/20', text: 'text-lime-400', glow: 'group-hover:shadow-[0_0_20px_rgba(163,230,53,0.1)]' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', glow: 'group-hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]' },
};

const trendIcons = { up: TrendingUp, down: TrendingDown, neutral: Minus };
const trendColors = { up: 'text-teal-400', down: 'text-red-400', neutral: 'text-neutral-500' };

export default function StatsCard({ title, value, subtitle, icon: Icon, trend, trendValue, color = 'indigo' }: StatsCardProps) {
  const c = colorMap[color];
  const TrendIcon = trend ? trendIcons[trend] : null;

  return (
    <div className={`glass-card rounded-2xl p-6 group cursor-default transition-all duration-300 ${c.glow}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
        {trend && TrendIcon && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${trendColors[trend]}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            {trendValue}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white font-[var(--font-heading)] mb-1">{value}</p>
      <p className="text-xs text-neutral-500">{title}</p>
      {subtitle && <p className="text-[10px] text-neutral-600 mt-1">{subtitle}</p>}
    </div>
  );
}
