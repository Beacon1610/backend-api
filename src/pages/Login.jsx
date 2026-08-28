
import { useState } from 'react';
import { ArrowRight, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import authApi from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import ThemeToggle from '../components/ThemeToggle';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const auth = useAuth();
  const nav = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const responseData = await authApi.login({ password, username });
      const token = typeof responseData === 'string' ? responseData : responseData?.token;
      const userPayload =
        typeof responseData === 'object' && responseData?.user
          ? responseData.user
          : {
              role: username.toLowerCase().includes('admin') ? 'ROLE_ADMIN' : 'ROLE_USER',
              username,
            };

      auth.login(token, userPayload);
      toast.success('Signed in successfully');
      nav('/');
    } catch {
      toast.error('Invalid login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <main className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden flex-col justify-between border-r border-zinc-200 bg-white p-10 dark:border-zinc-800 dark:bg-zinc-900 lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
              <ShieldCheck aria-hidden="true" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Order Management</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Admin Dashboard</p>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Operations Console
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-normal text-zinc-950 dark:text-white">
              Control every order from one calm workspace.
            </h1>
            <p className="mt-5 text-base leading-7 text-zinc-500 dark:text-zinc-400">
              Monitor fulfillment, customer activity, and operational health with a focused admin interface.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['99.9% uptime', '24h support', 'Secure JWT'].map((item) => (
              <div
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm font-medium dark:border-zinc-800 dark:bg-zinc-950"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-16 sm:px-6">
          <Card className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Welcome back</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-normal text-zinc-950 dark:text-white">
                Sign in
              </h2>
            </div>

            <form className="space-y-4" onSubmit={submit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-200" htmlFor="username">
                  Username
                </label>
                <Input
                  autoComplete="username"
                  icon={UserRound}
                  id="username"
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="admin"
                  required
                  value={username}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-200" htmlFor="password">
                  Password
                </label>
                <Input
                  autoComplete="current-password"
                  icon={LockKeyhole}
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  required
                  type="password"
                  value={password}
                />
              </div>

              <Button className="w-full" disabled={loading} size="lg" type="submit">
                {loading ? 'Signing in...' : 'Sign in'}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Don't have an account?{' '}
              <Link className="font-medium text-zinc-950 underline dark:text-white" to="/register">
                Create account
              </Link>
            </p>
          </Card>
        </section>
      </main>
    </div>
  );
}
