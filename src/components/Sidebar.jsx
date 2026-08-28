
import { BarChart3, ClipboardList, Settings, ShoppingBag, Users, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import Button from './ui/Button';

const navigation = [
  { icon: BarChart3, label: 'Dashboard', to: '/' },
  { icon: ClipboardList, label: 'Orders', to: '/orders' },
  { icon: Users, label: 'Users', to: '/users' },
  { icon: Settings, label: 'Settings', to: '/settings' },
];

function SidebarContent({ onClose }) {
  return (
    <>
      <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-5 dark:border-zinc-800">
        <NavLink className="flex min-w-0 items-center gap-3" onClick={onClose} to="/">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
            <ShoppingBag aria-hidden="true" className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-950 dark:text-white">
              Order Management
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Admin Console</p>
          </div>
        </NavLink>
        <Button className="lg:hidden" onClick={onClose} size="icon" title="Close menu" variant="ghost">
          <X aria-hidden="true" className="h-4 w-4" />
        </Button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5" aria-label="Main navigation">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-zinc-950 text-white shadow-sm dark:bg-white dark:text-zinc-950'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white'
                )
              }
              end={item.to === '/'}
              key={item.to}
              onClick={onClose}
              to={item.to}
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Workspace
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Operations HQ
          </p>
        </div>
      </div>
    </>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 lg:flex">
        <SidebarContent />
      </aside>

      <div className={cn('fixed inset-0 z-50 lg:hidden', isOpen ? 'block' : 'hidden')}>
        <button
          aria-label="Close navigation"
          className="absolute inset-0 bg-zinc-950/55"
          onClick={onClose}
          type="button"
        />
        <aside
          className={cn(
            'absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-zinc-200 bg-white shadow-2xl transition dark:border-zinc-800 dark:bg-zinc-950',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <SidebarContent onClose={onClose} />
        </aside>
      </div>
    </>
  );
}
