import { AlertTriangle } from 'lucide-react';
import Button from './Button';
import { cn } from '../../lib/utils';

export default function ErrorState({ className, message, onRetry, title = 'Something went wrong' }) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900/70 dark:bg-rose-950 dark:text-rose-200',
        className
      )}
    >
      <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{title}</p>
        {message ? <p className="mt-1 text-rose-700 dark:text-rose-300">{message}</p> : null}
      </div>
      {onRetry ? (
        <Button onClick={onRetry} size="sm" variant="secondary">
          Retry
        </Button>
      ) : null}
    </div>
  );
}
