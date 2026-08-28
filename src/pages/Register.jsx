import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import authApi from '../api/authApi';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import ThemeToggle from '../components/ThemeToggle';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await authApi.register({ username, password });
      toast.success('Account created successfully');
      navigate('/login');
    } catch {
      toast.error('Unable to create account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <main className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <h1 className="text-3xl font-semibold">Create account</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Register a new Order Management account.
          </p>

          <form className="mt-8 space-y-4" onSubmit={submit}>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button className="w-full" disabled={loading} type="submit">
              {loading ? 'Creating...' : 'Create account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link className="font-medium text-zinc-950 underline dark:text-white" to="/login">
              Sign in
            </Link>
          </p>
        </Card>
      </main>
    </div>
  );
}