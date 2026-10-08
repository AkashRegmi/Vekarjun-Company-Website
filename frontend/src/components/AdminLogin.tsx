import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { apiRequest } from '../lib/api';
import { adminSessionQueryKey, fetchAdminSession, type AdminSession } from '../lib/adminSession';

const inputClass = 'w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-ink)] px-4 py-3 text-sm text-[var(--color-paper)] placeholder:text-[var(--color-mist)] outline-none focus:border-[var(--color-blue-soft)]';

export default function AdminLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const sessionQuery = useQuery({
    queryKey: adminSessionQueryKey,
    queryFn: fetchAdminSession,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: ({ adminEmail, adminPassword }: { adminEmail: string; adminPassword: string }) =>
      apiRequest<{ message: string }>('/api/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      }),
    onSuccess: async (_result, variables) => {
      queryClient.setQueryData<AdminSession>(adminSessionQueryKey, {
        admin: { email: variables.adminEmail },
      });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'inquiries'] });
      navigate('/admin', { replace: true });
    },
  });

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginMutation.mutate({ adminEmail: email, adminPassword: password });
  }

  if (sessionQuery.isPending) {
    return <main className="min-h-screen grid place-items-center text-sm text-[var(--color-mist)]">Checking admin session…</main>;
  }

  if (sessionQuery.data) return <Navigate to="/admin" replace />;

  if (sessionQuery.isError) {
    return (
      <main className="min-h-screen grid place-items-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-2xl font-semibold">Sign-in unavailable</h1>
          <p role="alert" className="mt-3 text-sm text-red-300">{sessionQuery.error.message}</p>
          <button type="button" onClick={() => void sessionQuery.refetch()} className="mt-6 rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-medium text-white hover:bg-[var(--color-blue-soft)]">Try again</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen grid place-items-center px-6 py-24">
      <form onSubmit={handleLogin} className="w-full max-w-md rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-soft)] p-8 sm:p-10">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-[var(--color-mist)] hover:text-[var(--color-paper)]">
          <ArrowLeft size={16} /> Back to website
        </a>
        <p className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-blue-soft)]">Vekarjun admin</p>
        <h1 className="mt-3 font-display text-3xl font-semibold">Sign in</h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-mist)]">Sign in to view and manage contact inquiries.</p>
        <label htmlFor="admin-email" className="mt-7 mb-2 block text-xs text-[var(--color-mist)]">Email</label>
        <input id="admin-email" type="email" autoComplete="username" required className={inputClass} value={email} onChange={(event) => setEmail(event.target.value)} />
        <label htmlFor="admin-password" className="mt-5 mb-2 block text-xs text-[var(--color-mist)]">Password</label>
        <input id="admin-password" type="password" autoComplete="current-password" required className={inputClass} value={password} onChange={(event) => setPassword(event.target.value)} />
        {loginMutation.error && <p role="alert" className="mt-4 text-sm text-red-400">{loginMutation.error.message}</p>}
        <button type="submit" disabled={loginMutation.isPending} className="mt-6 w-full rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-blue-soft)] disabled:opacity-60">
          {loginMutation.isPending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
