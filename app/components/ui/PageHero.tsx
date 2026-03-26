import { LucideIcon } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle: string;
  badgeText: string;
  badgeIcon: LucideIcon;
  colorScheme?: 'teal' | 'lime' | 'indigo' | 'amber' | 'purple';
  children?: React.ReactNode;
}

const colorMap = {
  teal: {
    badgeBg: 'bg-teal-400/10',
    badgeBorder: 'border-teal-400/20',
    badgeText: 'text-teal-300',
    glow: 'bg-teal-400/[0.05]',
  },
  lime: {
    badgeBg: 'bg-lime-400/10',
    badgeBorder: 'border-lime-400/20',
    badgeText: 'text-lime-300',
    glow: 'bg-lime-400/[0.04]',
  },
  indigo: {
    badgeBg: 'bg-indigo-500/10',
    badgeBorder: 'border-indigo-500/20',
    badgeText: 'text-indigo-400',
    glow: 'bg-indigo-500/[0.06]',
  },
  amber: {
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/20',
    badgeText: 'text-amber-400',
    glow: 'bg-amber-500/[0.05]',
  },
  purple: {
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/20',
    badgeText: 'text-purple-400',
    glow: 'bg-purple-500/[0.05]',
  },
};

export default function PageHero({
  title,
  subtitle,
  badgeText,
  badgeIcon: Icon,
  colorScheme = 'teal',
  children
}: PageHeroProps) {
  const colors = colorMap[colorScheme];

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 grid-bg" />
      <div className={`absolute top-20 right-[20%] w-[400px] h-[400px] rounded-full ${colors.glow} blur-[100px] pointer-events-none`} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center z-10">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${colors.badgeBg} border ${colors.badgeBorder} text-xs font-semibold ${colors.badgeText} mb-6`}>
          <Icon className="w-3.5 h-3.5" />
          {badgeText}
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto mb-12">
          {subtitle}
        </p>
        {children}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
}
