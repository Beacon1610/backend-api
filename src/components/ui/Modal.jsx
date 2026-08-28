import { X } from 'lucide-react';
import Button from './Button';
import { cn } from '../../lib/utils';

export default function Modal({ children, className, description, footer, onClose, open, title }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        aria-label="Close modal"
        className="absolute inset-0 bg-zinc-950/55 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />
      <div
        className={cn(
          'relative z-10 w-full max-w-lg rounded-lg border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900',
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-5 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
            ) : null}
          </div>
          <Button aria-label="Close" onClick={onClose} size="icon" title="Close" variant="ghost">
            <X aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-5">{children}</div>
        {footer ? (
          <div className="flex justify-end gap-3 border-t border-zinc-200 p-5 dark:border-zinc-800">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
