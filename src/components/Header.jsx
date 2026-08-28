
import { LogOut, Menu, Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getInitials, getUserLabel } from '../lib/utils';
import ThemeToggle from './ThemeToggle';
import Button from './ui/Button';
import Input from './ui/Input';

const titles = {
  '/': 'Dashboard',
  '/orders': 'Orders',
  '/settings': 'Settings',
  '/users': 'Users',
};

export default function Header({ onMenuClick }) {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const userLabel = getUserLabel(user);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/85 px-4 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/85 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Button className="lg:hidden" onClick={onMenuClick} size="icon" title="Open menu" variant="ghost">
          <Menu aria-hidden="true" className="h-5 w-5" />
        </Button>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-950 dark:text-white">
            {titles[location.pathname] || 'Order Management'}
          </p>
          <p className="hidden text-xs text-zinc-500 dark:text-zinc-400 sm:block">
            Manage orders, customers, and operations.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Input
          aria-label="Global search"
          className="hidden w-64 xl:block"
          icon={Search}
          placeholder="Search workspace"
          type="search"
        />
        <ThemeToggle />
        <div className="hidden items-center gap-3 rounded-lg border border-zinc-200 bg-white py-1.5 pl-1.5 pr-3 dark:border-zinc-800 dark:bg-zinc-900 md:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            {getInitials(userLabel)}
          </div>
          <div className="min-w-0">
            <p className="max-w-32 truncate text-sm font-medium text-zinc-950 dark:text-white">{userLabel}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Administrator</p>
          </div>
        </div>
        <Button onClick={handleLogout} size="icon" title="Logout" variant="ghost">
          <LogOut aria-hidden="true" className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
