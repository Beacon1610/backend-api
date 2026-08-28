import { cn } from '../../lib/utils';

export default function Input({ className, icon: Icon, ...props }) {
  return (
    <label className={cn('relative block', className)}>
      {Icon ? (
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
        />
      ) : null}
      <input
        className={cn(
          'h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-4 focus:ring-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600 dark:focus:ring-zinc-800/70',
          Icon && 'pl-9'
        )}
        {...props}
      />
    </label>
  );
}
