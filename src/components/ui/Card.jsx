import { cn } from '../../lib/utils';

const paddingClasses = {
  lg: 'p-5 sm:p-6',
  md: 'p-4 sm:p-5',
  none: '',
  sm: 'p-4',
};

export default function Card({ children, className, padding = 'lg' }) {
  return (
    <section
      className={cn(
        'rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </section>
  );
}
