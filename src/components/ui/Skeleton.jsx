import { cn } from '../../lib/utils';

export default function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-zinc-200/80 dark:bg-zinc-800',
        className
      )}
    />
  );
}
