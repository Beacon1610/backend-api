import { cn } from '../../lib/utils';

export default function PageHeader({ actions, eyebrow, subtitle, title }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={cn(
            'truncate text-2xl font-semibold tracking-normal text-zinc-950 dark:text-white sm:text-3xl'
          )}
        >
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
