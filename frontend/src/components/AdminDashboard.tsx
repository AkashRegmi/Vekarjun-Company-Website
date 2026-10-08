import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  Globe2,
  Inbox,
  LayoutDashboard,
  LogOut,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { apiRequest, parseApiResponse } from '../lib/api';
import { adminSessionQueryKey, fetchAdminSession } from '../lib/adminSession';
import AdminSiteContent from './AdminSiteContent';

const leadStatuses = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'IN_PROGRESS',
  'NURTURING',
  'CONVERTED',
  'LOST',
  'UNQUALIFIED',
] as const;

type LeadStatus = (typeof leadStatuses)[number];

type Inquiry = {
  _id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  details: string;
  status: LeadStatus;
  createdAt: string;
};

type InquiryResponse = {
  inquiries: Inquiry[];
  page: number;
  pages: number;
  total: number;
  totalAll: number;
  statusCounts: Record<LeadStatus, number>;
};

const inquiriesQueryKey = ['admin', 'inquiries'] as const;

function donutSegmentPath(startDegrees: number, endDegrees: number) {
  const center = 80;
  const outerRadius = 70;
  const innerRadius = 47;
  const toPoint = (radius: number, degrees: number) => {
    const radians = (degrees - 90) * (Math.PI / 180);
    return [center + radius * Math.cos(radians), center + radius * Math.sin(radians)];
  };
  const [outerStartX, outerStartY] = toPoint(outerRadius, startDegrees);
  const [outerEndX, outerEndY] = toPoint(outerRadius, endDegrees);
  const [innerStartX, innerStartY] = toPoint(innerRadius, startDegrees);
  const [innerEndX, innerEndY] = toPoint(innerRadius, endDegrees);
  const largeArc = endDegrees - startDegrees > 180 ? 1 : 0;

  return [
    `M ${outerStartX} ${outerStartY}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEndX} ${outerEndY}`,
    `L ${innerEndX} ${innerEndY}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStartX} ${innerStartY}`,
    'Z',
  ].join(' ');
}

const statusStyles: Record<LeadStatus, string> = {
  NEW: 'border-sky-400/30 bg-sky-400/10 text-sky-200',
  CONTACTED: 'border-blue-400/30 bg-blue-400/10 text-blue-200',
  QUALIFIED: 'border-violet-400/30 bg-violet-400/10 text-violet-200',
  IN_PROGRESS: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  NURTURING: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200',
  CONVERTED: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  LOST: 'border-red-400/30 bg-red-400/10 text-red-200',
  UNQUALIFIED: 'border-[var(--color-line)] bg-white/5 text-[var(--color-mist)]',
};

const chartColors: Record<LeadStatus, string> = {
  NEW: '#3b82f6',
  CONTACTED: '#a855f7',
  QUALIFIED: '#ec4899',
  IN_PROGRESS: '#f97316',
  NURTURING: '#14b8a6',
  CONVERTED: '#22c55e',
  LOST: '#ef4444',
  UNQUALIFIED: '#94a3b8',
};

async function fetchInquiries(page: number, search: string): Promise<InquiryResponse> {
  const params = new URLSearchParams({ page: String(page), limit: '25', q: search });
  const response = await fetch(`/api/admin/inquiries?${params}`, { credentials: 'include' });
  return parseApiResponse<InquiryResponse>(response);
}

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const { hash } = useLocation();
  const activeSection = hash === '#inquiries'
    ? 'inquiries'
    : hash === '#site-content' ? 'site-content' : 'overview';
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [viewingInquiry, setViewingInquiry] = useState<Inquiry | null>(null);
  const [hoveredStatus, setHoveredStatus] = useState<LeadStatus | null>(null);
  const [hoveredBarStatus, setHoveredBarStatus] = useState<LeadStatus | null>(null);

  const sessionQuery = useQuery({
    queryKey: adminSessionQueryKey,
    queryFn: fetchAdminSession,
    retry: false,
  });

  const inquiriesQuery = useQuery({
    queryKey: [...inquiriesQueryKey, page, search],
    queryFn: () => fetchInquiries(page, search),
    enabled: sessionQuery.data !== null && sessionQuery.data !== undefined && activeSection !== 'site-content',
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest<{ message: string }>('/api/admin/logout', {
      method: 'POST',
      credentials: 'include',
    }),
    onSuccess: async () => {
      setViewingInquiry(null);
      queryClient.setQueryData(adminSessionQueryKey, null);
      queryClient.removeQueries({ queryKey: inquiriesQueryKey });
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: LeadStatus }) =>
      apiRequest<{ inquiry: Inquiry }>(`/api/admin/inquiries/${id}/status`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      }),
    onSuccess: async ({ inquiry }) => {
      setViewingInquiry((current) => current?._id === inquiry._id ? inquiry : current);
      await queryClient.invalidateQueries({ queryKey: inquiriesQueryKey });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest<{ message: string; id: string }>(`/api/admin/inquiries/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }),
    onSuccess: async (_result, deletedId) => {
      setViewingInquiry((current) => current?._id === deletedId ? null : current);
      if (inquiriesQuery.data?.inquiries.length === 1 && page > 1) setPage((current) => current - 1);
      await queryClient.invalidateQueries({ queryKey: inquiriesQueryKey });
    },
  });

  function handleDelete(inquiry: Inquiry) {
    if (window.confirm(`Delete the inquiry from ${inquiry.name}? This cannot be undone.`)) {
      deleteMutation.mutate(inquiry._id);
    }
  }

  const inputClass = 'w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-ink)] px-4 py-3 text-sm text-[var(--color-paper)] placeholder:text-[var(--color-mist)] outline-none focus:border-[var(--color-blue-soft)]';

  const logoutError = logoutMutation.error;
  const inquiryActionError = [statusMutation.error, deleteMutation.error]
    .find((mutationError) => mutationError instanceof Error);

  if (sessionQuery.isPending || (sessionQuery.data && activeSection !== 'site-content' && inquiriesQuery.isPending)) {
    return <main className="min-h-screen grid place-items-center text-sm text-[var(--color-mist)]">Checking admin session…</main>;
  }

  if (sessionQuery.isError || (activeSection !== 'site-content' && inquiriesQuery.isError)) {
    return (
      <main className="min-h-screen grid place-items-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-2xl font-semibold">Dashboard unavailable</h1>
          <p role="alert" className="mt-3 text-sm text-red-300">{sessionQuery.error?.message || inquiriesQuery.error?.message}</p>
          <button type="button" onClick={() => {
            if (sessionQuery.isError) void sessionQuery.refetch();
            else void inquiriesQuery.refetch();
          }} className="mt-6 rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-medium text-white hover:bg-[var(--color-blue-soft)]">Try again</button>
        </div>
      </main>
    );
  }

  if (!sessionQuery.data) return <Navigate to="/admin/login" replace />;

  const data = inquiriesQuery.data;
  const statusCounts: Record<LeadStatus, number> = data?.statusCounts || {
    NEW: 0,
    CONTACTED: 0,
    QUALIFIED: 0,
    IN_PROGRESS: 0,
    NURTURING: 0,
    CONVERTED: 0,
    LOST: 0,
    UNQUALIFIED: 0,
  };
  const chartTotal = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);
  let chartOffset = 0;
  const donutSegments = leadStatuses.flatMap((status) => {
    const count = statusCounts[status];
    if (!count || !chartTotal) return [];
    const start = chartOffset;
    chartOffset += (count / chartTotal) * 360;
    const gap = Math.min(1.4, (chartOffset - start) / 4);
    return [{ status, start: start + gap, end: chartOffset - gap }];
  });
  const hoveredCount = hoveredStatus ? statusCounts[hoveredStatus] : 0;
  const hoveredPercent = chartTotal && hoveredStatus ? (hoveredCount / chartTotal) * 100 : 0;
  const maxStatusCount = Math.max(1, ...leadStatuses.map((status) => statusCounts[status]));
  const otherCount = statusCounts.CONTACTED
    + statusCounts.QUALIFIED
    + statusCounts.IN_PROGRESS
    + statusCounts.NURTURING
    + statusCounts.UNQUALIFIED;

  return (
    <main className="min-h-screen lg:flex">
      <aside className="border-b border-[var(--color-line)] bg-[var(--color-ink-soft)] p-5 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r lg:p-6">
        <a href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-[var(--color-blue)] font-display font-bold text-white">V</span>
          <span>
            <span className="block font-display font-semibold text-[var(--color-paper)]">Vekarjun</span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.16em] text-[var(--color-mist)]">Admin workspace</span>
          </span>
        </a>

        <p className="mb-3 mt-8 hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-mist)] lg:block">Workspace</p>
        <nav aria-label="Admin navigation" className="mt-5 flex gap-2 lg:mt-0 lg:flex-col">
          <a href="#overview" aria-current={activeSection === 'overview' ? 'location' : undefined} className={`inline-flex flex-1 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors lg:flex-none ${activeSection === 'overview' ? 'bg-[var(--color-blue)]/15 font-medium text-[var(--color-paper)]' : 'text-[var(--color-mist)] hover:bg-white/5 hover:text-[var(--color-paper)]'}`}>
            <LayoutDashboard size={17} className={activeSection === 'overview' ? 'text-[var(--color-blue-soft)]' : ''} /> Overview
          </a>
          <a href="#inquiries" aria-current={activeSection === 'inquiries' ? 'location' : undefined} className={`inline-flex flex-1 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors lg:flex-none ${activeSection === 'inquiries' ? 'bg-[var(--color-blue)]/15 font-medium text-[var(--color-paper)]' : 'text-[var(--color-mist)] hover:bg-white/5 hover:text-[var(--color-paper)]'}`}>
            <Inbox size={17} /> Inquiries
            {data && <span className="ml-auto rounded-full bg-[var(--color-panel)] px-2 py-0.5 text-xs text-[var(--color-paper)]">{data.totalAll}</span>}
          </a>
          <a href="#site-content" aria-current={activeSection === 'site-content' ? 'location' : undefined} className={`inline-flex flex-1 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors lg:flex-none ${activeSection === 'site-content' ? 'bg-[var(--color-blue)]/15 font-medium text-[var(--color-paper)]' : 'text-[var(--color-mist)] hover:bg-white/5 hover:text-[var(--color-paper)]'}`}>
            <LayoutDashboard size={17} /> Website content
          </a>
        </nav>

        <div className="mt-8 hidden border-t border-[var(--color-line)] pt-5 lg:block">
          <a href="/" className="inline-flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--color-mist)] transition-colors hover:bg-white/5 hover:text-[var(--color-paper)]">
            <Globe2 size={17} /> View website
          </a>
        </div>

        <button type="button" disabled={logoutMutation.isPending} onClick={() => logoutMutation.mutate()} className="mt-4 inline-flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--color-mist)] transition-colors hover:bg-white/5 hover:text-[var(--color-paper)] disabled:opacity-60 lg:mt-auto">
          <LogOut size={17} /> {logoutMutation.isPending ? 'Signing out…' : 'Sign out'}
        </button>
      </aside>

      <div className="min-w-0 flex-1 px-5 pb-12 pt-8 sm:px-8 lg:px-10 lg:pt-10">
        <div className="mx-auto max-w-6xl">
          <header id="overview" className="scroll-mt-8 border-b border-[var(--color-line)] pb-7">
            <a href="/" className="inline-flex items-center gap-2 text-xs text-[var(--color-mist)] hover:text-[var(--color-paper)] lg:hidden"><ArrowLeft size={15} /> Back to website</a>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mt-0">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-blue-soft)]">Dashboard</p>
                <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{activeSection === 'site-content' ? 'Website content' : activeSection === 'inquiries' ? 'Contact inquiries' : 'Dashboard overview'}</h1>
                <p className="mt-2 text-sm text-[var(--color-mist)]">{activeSection === 'site-content' ? 'Manage stories and selected-work projects published on your website.' : activeSection === 'inquiries' ? 'Manage messages from people who contacted your team.' : 'Review inquiry activity and recent website performance.'}</p>
              </div>
              {activeSection !== 'site-content' && <span className="text-xs text-[var(--color-mist)]">Your inbox, all in one place</span>}
            </div>
          </header>

          {logoutError && (
            <p role="alert" className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {logoutError.message}
            </p>
          )}
          {activeSection === 'inquiries' && inquiryActionError && (
            <p role="alert" className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {inquiryActionError.message}
            </p>
          )}

          {activeSection === 'overview' && data && (<section aria-label="Inquiry overview" className="mt-7">
            <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-ink-soft)] p-5 sm:max-w-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[var(--color-mist)]">All inquiries</p>
                <Inbox size={18} className="text-[var(--color-blue-soft)]" />
              </div>
              <p className="mt-3 font-display text-3xl font-semibold">{data.totalAll}</p>
              <p className="mt-1 text-xs text-[var(--color-mist)]">Contact form submissions</p>
            </div>
            <div className="mt-5 grid gap-5 xl:grid-cols-2">
              <section aria-labelledby="status-distribution-title" className="rounded-xl border border-[var(--color-line)] bg-[var(--color-ink-soft)] p-5 sm:p-6">
                <h2 id="status-distribution-title" className="font-display text-lg font-semibold">Status distribution</h2>
                <p className="mt-1 text-xs text-[var(--color-mist)]">All inquiries grouped by lead status</p>
                <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
                  <div className="relative size-44 shrink-0">
                    <svg viewBox="0 0 160 160" className="size-full" role="group" aria-label={`Inquiry status distribution, ${chartTotal} total`}>
                      {chartTotal === 1 && donutSegments.length === 1 ? (
                        <circle
                          cx="80"
                          cy="80"
                          r="58.5"
                          fill="none"
                          stroke={chartColors[donutSegments[0].status]}
                          strokeWidth="22"
                          className="cursor-pointer transition-opacity hover:opacity-80"
                          onMouseEnter={() => setHoveredStatus(donutSegments[0].status)}
                          onMouseLeave={() => setHoveredStatus(null)}
                          onFocus={() => setHoveredStatus(donutSegments[0].status)}
                          onBlur={() => setHoveredStatus(null)}
                          tabIndex={0}
                          aria-label={`${donutSegments[0].status.replace('_', ' ')}: 1 inquiry`}
                        />
                      ) : chartTotal ? donutSegments.map((segment) => (
                        <path
                          key={segment.status}
                          d={donutSegmentPath(segment.start, segment.end)}
                          fill={chartColors[segment.status]}
                          className="cursor-pointer transition-opacity hover:opacity-80 focus:opacity-80"
                          onMouseEnter={() => setHoveredStatus(segment.status)}
                          onMouseLeave={() => setHoveredStatus(null)}
                          onFocus={() => setHoveredStatus(segment.status)}
                          onBlur={() => setHoveredStatus(null)}
                          tabIndex={0}
                          aria-label={`${segment.status.replace('_', ' ')}: ${data.statusCounts[segment.status]} inquiries`}
                        />
                      )) : <circle cx="80" cy="80" r="58.5" fill="none" stroke="var(--color-panel)" strokeWidth="22" />}
                    </svg>
                    <div className="pointer-events-none absolute inset-0 grid place-items-center">
                      <div className="text-center">
                        <p className="font-display text-2xl font-semibold">{chartTotal}</p>
                        <p className="text-[10px] text-[var(--color-mist)]">Total</p>
                      </div>
                    </div>
                    {hoveredStatus && (
                      <div role="status" className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-[var(--color-line)] bg-[var(--color-ink)] px-3 py-2 text-center shadow-xl">
                        <p className="text-xs font-medium text-[var(--color-paper)]">{hoveredStatus.replace('_', ' ')}</p>
                        <p className="mt-0.5 text-[11px] text-[var(--color-mist)]">{hoveredCount} {hoveredCount === 1 ? 'inquiry' : 'inquiries'} · {hoveredPercent.toFixed(1)}%</p>
                      </div>
                    )}
                  </div>
                  <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-3">
                    {leadStatuses.map((status) => (
                        <li key={status} onMouseEnter={() => setHoveredStatus(status)} onMouseLeave={() => setHoveredStatus(null)} className="flex min-w-0 items-center gap-2 text-xs">
                        <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: chartColors[status] }} />
                        <span className="truncate text-[var(--color-mist)]">{status.replace('_', ' ')}</span>
                        <span className="ml-auto font-medium text-[var(--color-paper)]">{data.statusCounts[status]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section aria-labelledby="status-bars-title" className="rounded-xl border border-[var(--color-line)] bg-[var(--color-ink-soft)] p-5 sm:p-6">
                <h2 id="status-bars-title" className="font-display text-lg font-semibold">Inquiries by status</h2>
                <p className="mt-1 text-xs text-[var(--color-mist)]">Compare the number of leads at each stage</p>
                <ul className="mt-6 space-y-3.5">
                  {leadStatuses.map((status) => (
                    <li key={status} className="grid grid-cols-[100px_1fr_32px] items-center gap-3 text-xs">
                      <span className="truncate text-[var(--color-mist)]">{status.replace('_', ' ')}</span>
                      <div className="relative">
                        <span
                          className="block h-2 cursor-pointer overflow-hidden rounded-full bg-[var(--color-ink)]"
                          onMouseEnter={() => setHoveredBarStatus(status)}
                          onMouseLeave={() => setHoveredBarStatus(null)}
                          onFocus={() => setHoveredBarStatus(status)}
                          onBlur={() => setHoveredBarStatus(null)}
                          tabIndex={0}
                          aria-label={`${status.replace('_', ' ')}: ${data.statusCounts[status]} inquiries`}
                        >
                          <span className="block h-full rounded-full transition-[width] duration-300" style={{ width: `${data.statusCounts[status] ? Math.max(4, (data.statusCounts[status] / maxStatusCount) * 100) : 0}%`, backgroundColor: chartColors[status] }} />
                        </span>
                        {hoveredBarStatus === status && (
                          <span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--color-line)] bg-[var(--color-ink)] px-3 py-2 text-center text-[11px] shadow-xl">
                            <span className="block font-medium text-[var(--color-paper)]">{status.replace('_', ' ')}</span>
                            <span className="mt-0.5 block text-[var(--color-mist)]">{data.statusCounts[status]} {data.statusCounts[status] === 1 ? 'inquiry' : 'inquiries'} · {chartTotal ? ((data.statusCounts[status] / chartTotal) * 100).toFixed(1) : '0.0'}%</span>
                          </span>
                        )}
                      </div>
                      <span className="text-right font-medium text-[var(--color-paper)]">{data.statusCounts[status]}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </section>)}

          {activeSection === 'site-content' && <div className="mt-8"><AdminSiteContent /></div>}

          {activeSection === 'inquiries' && data && (<section id="inquiries" className="scroll-mt-8">
            <header className="mt-12 border-t border-[var(--color-line)] pt-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-blue-soft)]">Lead management</p>
              <h2 className="mt-2 font-display text-2xl font-semibold">Inquiries</h2>
              <p className="mt-1 text-sm text-[var(--color-mist)]">Track each contact through your pipeline.</p>
            </header>

            <div aria-label="Inquiry counts by lead status" className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              {[
                { label: 'Total inquiries', count: data.totalAll, color: 'text-[var(--color-paper)]' },
                { label: 'New', count: data.statusCounts.NEW, color: 'text-sky-200' },
                { label: 'Converted', count: data.statusCounts.CONVERTED, color: 'text-emerald-200' },
                { label: 'Lost', count: data.statusCounts.LOST, color: 'text-red-200' },
                { label: 'Other statuses', count: otherCount, color: 'text-[var(--color-blue-soft)]' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-[var(--color-line)] bg-[var(--color-ink-soft)] p-4">
                  <p className="text-xs text-[var(--color-mist)]">{stat.label}</p>
                  <p className={`mt-2 font-display text-2xl font-semibold ${stat.color}`}>{stat.count}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold">Your inbox</h2>
                <p className="mt-1 text-sm text-[var(--color-mist)]">{data.total} {data.total === 1 ? 'inquiry' : 'inquiries'} received</p>
              </div>
              <label className="relative block w-full sm:max-w-sm">
                <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-mist)]" />
                <input aria-label="Search inquiries" className={`${inputClass} pl-11`} value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search inquiries…" />
              </label>
            </div>

            <div className="mt-5 overflow-x-auto rounded-2xl border border-[var(--color-line)]">
              <table className="w-full min-w-[850px] border-collapse text-left">
                <thead className="bg-[var(--color-ink-soft)]">
                  <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-wide text-[var(--color-mist)]">
                    <th scope="col" className="px-5 py-4 font-medium">Contact</th>
                    <th scope="col" className="px-5 py-4 font-medium">Service</th>
                    <th scope="col" className="px-5 py-4 font-medium">Received</th>
                    <th scope="col" className="px-5 py-4 font-medium">Lead status</th>
                    <th scope="col" className="px-5 py-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-line)]">
                  {inquiriesQuery.isFetching && data.inquiries.length === 0 ? (
                    <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-[var(--color-mist)]">Loading inquiries…</td></tr>
                  ) : data.inquiries.length === 0 ? (
                    <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-[var(--color-mist)]">{search ? 'No inquiries match your search.' : 'No inquiries yet.'}</td></tr>
                  ) : data.inquiries.map((inquiry) => (
                    <tr key={inquiry._id} className="transition-colors hover:bg-white/[0.025]">
                      <td className="px-5 py-4">
                        <p className="font-medium text-[var(--color-paper)]">{inquiry.name}</p>
                        <p className="mt-1 text-xs text-[var(--color-mist)]">{inquiry.company || 'No company provided'}</p>
                        <a href={`mailto:${inquiry.email}`} className="mt-1 inline-block text-xs text-[var(--color-blue-soft)] hover:underline">{inquiry.email}</a>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-[var(--color-paper)]">{inquiry.service}</p>
                        <p className="mt-1 text-xs text-[var(--color-mist)]">{inquiry.budget || 'Budget not specified'}</p>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-xs text-[var(--color-mist)]">{new Date(inquiry.createdAt).toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <select
                          aria-label={`Status for ${inquiry.name}`}
                          className={`rounded-full border px-3 py-2 text-xs font-medium outline-none focus:border-[var(--color-blue-soft)] ${statusStyles[inquiry.status]}`}
                          value={inquiry.status}
                          disabled={statusMutation.isPending && statusMutation.variables.id === inquiry._id}
                          onChange={(event) => statusMutation.mutate({ id: inquiry._id, status: event.target.value as LeadStatus })}
                        >
                          {leadStatuses.map((status) => <option key={status} value={status} className="bg-[var(--color-ink)] text-[var(--color-paper)]">{status.replace('_', ' ')}</option>)}
                        </select>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button type="button" onClick={() => setViewingInquiry(inquiry)} aria-label={`View inquiry from ${inquiry.name}`} title="View inquiry" className="grid size-9 place-items-center rounded-lg border border-[var(--color-line)] text-[var(--color-mist)] transition-colors hover:border-[var(--color-blue-soft)] hover:text-[var(--color-paper)]"><Eye size={16} /></button>
                          <button type="button" disabled={deleteMutation.isPending && deleteMutation.variables === inquiry._id} onClick={() => handleDelete(inquiry)} aria-label={`Delete inquiry from ${inquiry.name}`} title="Delete inquiry" className="grid size-9 place-items-center rounded-lg border border-[var(--color-line)] text-[var(--color-mist)] transition-colors hover:border-red-400/50 hover:text-red-300 disabled:opacity-50"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <nav aria-label="Inquiry pages" className="mt-5 flex items-center justify-between">
              <p className="text-xs text-[var(--color-mist)]">Page {data.page} of {Math.max(1, data.pages)}</p>
              <div className="flex gap-2">
                <button type="button" disabled={page <= 1 || inquiriesQuery.isFetching} onClick={() => setPage((current) => current - 1)} className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line)] px-4 py-2 text-sm disabled:opacity-40"><ChevronLeft size={16} /> Previous</button>
                <button type="button" disabled={page >= data.pages || inquiriesQuery.isFetching} onClick={() => setPage((current) => current + 1)} className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line)] px-4 py-2 text-sm disabled:opacity-40">Next <ChevronRight size={16} /></button>
              </div>
            </nav>
          </section>)}
        </div>
      </div>

      {viewingInquiry && (
        <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-black/70 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setViewingInquiry(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="inquiry-dialog-title" className="my-auto w-full max-w-2xl rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-soft)] p-6 shadow-2xl sm:p-8">
            <header className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-blue-soft)]">Inquiry details</p>
                <h2 id="inquiry-dialog-title" className="mt-2 font-display text-2xl font-semibold">{viewingInquiry.name}</h2>
              </div>
              <button type="button" onClick={() => setViewingInquiry(null)} aria-label="Close inquiry details" className="grid size-9 shrink-0 place-items-center rounded-lg border border-[var(--color-line)] text-[var(--color-mist)] hover:text-[var(--color-paper)]"><X size={17} /></button>
            </header>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div><p className="text-xs text-[var(--color-mist)]">Email</p><a href={`mailto:${viewingInquiry.email}`} className="mt-1 inline-block break-all text-sm text-[var(--color-blue-soft)] hover:underline">{viewingInquiry.email}</a></div>
              <div><p className="text-xs text-[var(--color-mist)]">Phone</p><p className="mt-1 text-sm">{viewingInquiry.phone || 'Not provided'}</p></div>
              <div><p className="text-xs text-[var(--color-mist)]">Company</p><p className="mt-1 text-sm">{viewingInquiry.company || 'Not provided'}</p></div>
              <div><p className="text-xs text-[var(--color-mist)]">Service</p><p className="mt-1 text-sm">{viewingInquiry.service}</p></div>
              <div><p className="text-xs text-[var(--color-mist)]">Budget</p><p className="mt-1 text-sm">{viewingInquiry.budget || 'Not provided'}</p></div>
              <div><p className="text-xs text-[var(--color-mist)]">Received</p><p className="mt-1 text-sm">{new Date(viewingInquiry.createdAt).toLocaleString()}</p></div>
            </div>
            <div className="mt-6">
              <p className="text-xs text-[var(--color-mist)]">Lead status</p>
              <select
                aria-label="Inquiry lead status"
                className={`mt-2 rounded-full border px-3 py-2 text-xs font-medium outline-none focus:border-[var(--color-blue-soft)] ${statusStyles[viewingInquiry.status]}`}
                value={viewingInquiry.status}
                onChange={(event) => statusMutation.mutate({ id: viewingInquiry._id, status: event.target.value as LeadStatus })}
              >
                {leadStatuses.map((status) => <option key={status} value={status} className="bg-[var(--color-ink)] text-[var(--color-paper)]">{status.replace('_', ' ')}</option>)}
              </select>
            </div>
            <div className="mt-6 border-t border-[var(--color-line)] pt-5">
              <p className="text-xs text-[var(--color-mist)]">Project details</p>
              <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-[var(--color-paper)]">{viewingInquiry.details}</p>
            </div>
            <footer className="mt-7 flex flex-wrap justify-end gap-3">
              <button type="button" onClick={() => setViewingInquiry(null)} className="rounded-full border border-[var(--color-line)] px-4 py-2.5 text-sm text-[var(--color-mist)] hover:text-[var(--color-paper)]">Close</button>
              <button type="button" onClick={() => handleDelete(viewingInquiry)} className="inline-flex items-center gap-2 rounded-full border border-red-400/30 px-4 py-2.5 text-sm text-red-300 hover:bg-red-400/10"><Trash2 size={15} /> Delete inquiry</button>
            </footer>
          </section>
        </div>
      )}
    </main>
  );
}
