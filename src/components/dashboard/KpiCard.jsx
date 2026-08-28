import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Card from '../ui/Card';
import Skeleton from '../ui/Skeleton';
import { cn } from '../../lib/utils';

const accentClasses = {
  amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  sky: 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300',
  violet: 'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
};

export default function KpiCard({
  accent = 'sky',
  icon: Icon,
  label,
  loading,
  trend,
  trendDirection = 'up',
  value,
}) {
  const TrendIcon = trendDirection === 'down' ? ArrowDownRight : ArrowUpRight;

  return (
    <Card className="min-h-36">
      <div className="flex items-start justify-between gap-4">
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-lg', accentClasses[accent])}>
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
        {loading ? <Skeleton className="h-6 w-16" /> : null}
      </div>
      <div className="mt-5">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
        {loading ? (
          <Skeleton className="mt-3 h-9 w-24" />
        ) : (
          <p className="mt-2 text-3xl font-semibold tracking-normal text-zinc-950 dark:text-white">{value}</p>
        )}
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <TrendIcon aria-hidden="true" className="h-3.5 w-3.5" />
        <span>{trend}</span>
      </div>
    </Card>
  );
}
