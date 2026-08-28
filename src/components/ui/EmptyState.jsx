import Button from './Button';
import { cn } from '../../lib/utils';

export default function EmptyState({ action, className, description, icon: Icon, title }) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-12 text-center', className)}>
      {Icon ? (
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
      ) : null}
      <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">{title}</h3>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
      ) : null}
      {action ? (
        <Button className="mt-5" onClick={action.onClick} variant="secondary">
          {action.label}
        </Button>
      ) : null}
    </div>
  );
}
