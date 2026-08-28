import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Dropdown({ align = 'right', items, trigger }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!dropdownRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-flex" ref={dropdownRef}>
      <div onClick={() => setOpen((current) => !current)}>{trigger}</div>
      {open ? (
        <div
          className={cn(
            'absolute top-full z-30 mt-2 w-48 rounded-lg border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-900',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <button
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800',
                  item.danger
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-zinc-700 dark:text-zinc-200'
                )}
                disabled={item.disabled}
                key={item.label}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                type="button"
              >
                {Icon ? <Icon aria-hidden="true" className="h-4 w-4" /> : null}
                <span className="flex-1 truncate">{item.label}</span>
                {item.active ? <Check aria-hidden="true" className="h-4 w-4" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
