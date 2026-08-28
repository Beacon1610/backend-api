import { cn } from '../../lib/utils';

const variants = {
  danger:
    'bg-rose-600 text-white shadow-sm hover:bg-rose-700 focus-visible:ring-rose-500 dark:bg-rose-500 dark:hover:bg-rose-400',
  ghost:
    'bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:ring-zinc-300 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white',
  primary:
    'bg-zinc-950 text-white shadow-sm hover:bg-zinc-800 focus-visible:ring-zinc-500 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200',
  secondary:
    'border border-zinc-200 bg-white text-zinc-700 shadow-sm hover:bg-zinc-50 focus-visible:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800',
  soft:
    'bg-zinc-100 text-zinc-800 hover:bg-zinc-200 focus-visible:ring-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700',
};

const sizes = {
  icon: 'h-9 w-9 p-0',
  lg: 'h-11 px-5 text-sm',
  md: 'h-10 px-4 text-sm',
  sm: 'h-8 px-3 text-xs',
};

export default function Button({
  children,
  className,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-offset-zinc-950',
        variants[variant],
        sizes[size],
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
