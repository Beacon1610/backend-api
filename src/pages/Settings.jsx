import { Bell, Moon, ShieldCheck, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        subtitle="Configure appearance, notifications, and access defaults."
        title="Settings"
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <Sun aria-hidden="true" className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-semibold text-zinc-950 dark:text-white">Appearance</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Light and dark workspace modes</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={() => setTheme('light')} variant={theme === 'light' ? 'primary' : 'secondary'}>
                  <Sun aria-hidden="true" className="h-4 w-4" />
                  Light
                </Button>
                <Button onClick={() => setTheme('dark')} variant={theme === 'dark' ? 'primary' : 'secondary'}>
                  <Moon aria-hidden="true" className="h-4 w-4" />
                  Dark
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <ShieldCheck aria-hidden="true" className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-950 dark:text-white">Security</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">JWT authentication and protected APIs</p>
              <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                Active session storage is scoped to this browser.
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                <Bell aria-hidden="true" className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-zinc-950 dark:text-white">Notifications</h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Operational updates and order alerts</p>
              </div>
            </div>
            <Button variant="secondary">Configure</Button>
          </div>
        </Card>
      </div>
    </>
  );
}
