import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CircleCheck, Clock3, Eye, Files, Pencil, Plus, Trash2, X } from 'lucide-react';
import { apiRequest } from '../lib/api';

type ContentType = 'story' | 'project';
type ContentStatus = 'PUBLISHED' | 'PENDING';

type SiteContent = {
  _id: string;
  type: ContentType;
  status: ContentStatus;
  name: string;
  company?: string;
  role?: string;
  quote?: string;
  industry?: string;
  problem?: string;
  solution?: string;
  technologies?: string[];
  result?: string;
};

type SiteContentResponse = {
  items: SiteContent[];
  stats: { total: number; published: number; pending: number };
};

type ContentForm = Omit<SiteContent, '_id' | 'status'>;

const emptyForm = (type: ContentType): ContentForm => type === 'story'
  ? { type, name: '', company: '', role: '', quote: '' }
  : { type, name: '', industry: '', problem: '', solution: '', technologies: [], result: '' };

const contentQueryKey = ['admin', 'site-content'] as const;
const inputClass = 'w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-ink)] px-4 py-3 text-sm text-[var(--color-paper)] placeholder:text-[var(--color-mist)] outline-none focus:border-[var(--color-blue-soft)]';

export default function AdminSiteContent() {
  const queryClient = useQueryClient();
  const [type, setType] = useState<ContentType>('story');
  const [editing, setEditing] = useState<SiteContent | null>(null);
  const [viewing, setViewing] = useState<SiteContent | null>(null);
  const [form, setForm] = useState<ContentForm>(emptyForm('story'));
  const [formError, setFormError] = useState('');

  const itemsQuery = useQuery({
    queryKey: contentQueryKey,
    queryFn: async () => {
      const result = await apiRequest<SiteContentResponse>('/api/admin/content', {
        credentials: 'include',
      });
      return result;
    },
    retry: false,
  });

  const saveMutation = useMutation({
    mutationFn: ({ id, content }: { id?: string; content: ContentForm }) =>
      apiRequest<{ item: SiteContent }>(id ? `/api/admin/content/${id}` : '/api/admin/content', {
        method: id ? 'PATCH' : 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      }),
    onSuccess: async () => {
      setEditing(null);
      setFormError('');
      await queryClient.invalidateQueries({ queryKey: contentQueryKey });
      await queryClient.invalidateQueries({ queryKey: ['site-content'] });
    },
    onError: (error) => setFormError(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest<{ message: string }>(`/api/admin/content/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }),
    onSuccess: async () => {
      setViewing(null);
      await queryClient.invalidateQueries({ queryKey: contentQueryKey });
      await queryClient.invalidateQueries({ queryKey: ['site-content'] });
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContentStatus }) =>
      apiRequest<{ item: SiteContent }>(`/api/admin/content/${id}/status`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: contentQueryKey });
      await queryClient.invalidateQueries({ queryKey: ['site-content'] });
    },
  });

  function beginAdd() {
    setForm(emptyForm(type));
    setFormError('');
    setEditing({ _id: '', ...emptyForm(type), status: 'PENDING' });
  }

  function beginEdit(item: SiteContent) {
    setForm({
      type: item.type,
      name: item.name,
      company: item.company || '',
      role: item.role || '',
      quote: item.quote || '',
      industry: item.industry || '',
      problem: item.problem || '',
      solution: item.solution || '',
      technologies: item.technologies || [],
      result: item.result || '',
    });
    setFormError('');
    setEditing(item);
    setViewing(null);
  }

  function update(field: keyof ContentForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');
    saveMutation.mutate({ id: editing?._id || undefined, content: form });
  }

  const allItems = itemsQuery.data?.items || [];
  const items = allItems.filter((item) => item.type === type);
  const stats = itemsQuery.data?.stats || { total: 0, published: 0, pending: 0 };

  return (
    <section id="site-content" className="scroll-mt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-blue-soft)]">Website content</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Website content</h2>
          <p className="mt-1 text-sm text-[var(--color-mist)]">Add and manage the content shown on your public website.</p>
        </div>
        <button type="button" onClick={beginAdd} className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[var(--color-blue)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-blue-soft)]">
          <Plus size={16} /> Add {type === 'story' ? 'story' : 'project'}
        </button>
      </div>

      <div aria-label="Website content totals" className="mt-7 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total content', count: stats.total, Icon: Files, color: 'text-[var(--color-paper)]' },
          { label: 'Published', count: stats.published, Icon: CircleCheck, color: 'text-emerald-200' },
          { label: 'Pending', count: stats.pending, Icon: Clock3, color: 'text-amber-200' },
        ].map(({ label, count, Icon, color }) => (
          <div key={label} className="rounded-xl border border-[var(--color-line)] bg-[var(--color-ink-soft)] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--color-mist)]">{label}</p>
              <Icon size={18} className={color} />
            </div>
            <p className={`mt-3 font-display text-3xl font-semibold ${color}`}>{count}</p>
          </div>
        ))}
      </div>

      <div role="tablist" aria-label="Website content type" className="mt-6 flex gap-2">
        {(['story', 'project'] as const).map((contentType) => (
          <button
            key={contentType}
            type="button"
            role="tab"
            aria-selected={type === contentType}
            onClick={() => { setType(contentType); setEditing(null); setForm(emptyForm(contentType)); }}
            className={`rounded-full px-4 py-2 text-sm ${type === contentType ? 'bg-[var(--color-blue)] text-white' : 'border border-[var(--color-line)] text-[var(--color-mist)] hover:text-[var(--color-paper)]'}`}
          >
            {contentType === 'story' ? 'Sample client stories' : 'Selected work'}
          </button>
        ))}
      </div>

      {itemsQuery.error && <p role="alert" className="mt-4 text-sm text-red-300">{itemsQuery.error.message}</p>}
      {deleteMutation.error && <p role="alert" className="mt-4 text-sm text-red-300">{deleteMutation.error.message}</p>}
      {statusMutation.error && <p role="alert" className="mt-4 text-sm text-red-300">{statusMutation.error.message}</p>}
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--color-line)]">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead className="bg-[var(--color-ink-soft)]">
            <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-wide text-[var(--color-mist)]">
              <th className="px-5 py-4 font-medium">Name</th>
              <th className="px-5 py-4 font-medium">Details</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-line)]">
            {itemsQuery.isPending ? (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-sm text-[var(--color-mist)]">Loading content…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-sm text-[var(--color-mist)]">No {type === 'story' ? 'stories' : 'projects'} yet. Add content to get started.</td></tr>
            ) : items.map((item) => (
              <tr key={item._id} className="hover:bg-white/[0.025]">
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-[var(--color-paper)]">{item.name}</p>
                  <p className="mt-1 max-w-lg truncate text-xs text-[var(--color-mist)]">{item.type === 'story' ? item.quote : item.problem}</p>
                </td>
                <td className="px-5 py-4 text-sm text-[var(--color-mist)]">{item.type === 'story' ? `${item.company} · ${item.role}` : item.industry}</td>
                <td className="px-5 py-4">
                  <select
                    aria-label={`Publication status for ${item.name}`}
                    className={`rounded-full border px-3 py-2 text-xs font-medium outline-none focus:border-[var(--color-blue-soft)] disabled:opacity-60 ${item.status === 'PUBLISHED' ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200' : 'border-amber-400/30 bg-amber-400/10 text-amber-200'}`}
                    value={item.status}
                    disabled={statusMutation.isPending && statusMutation.variables.id === item._id}
                    onChange={(event) => statusMutation.mutate({ id: item._id, status: event.target.value as ContentStatus })}
                  >
                    <option value="PUBLISHED" className="bg-[var(--color-ink)] text-[var(--color-paper)]">Published</option>
                    <option value="PENDING" className="bg-[var(--color-ink)] text-[var(--color-paper)]">Pending</option>
                  </select>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setViewing(item)} aria-label={`View ${item.name}`} title="View" className="grid size-9 place-items-center rounded-lg border border-[var(--color-line)] text-[var(--color-mist)] hover:border-[var(--color-blue-soft)] hover:text-[var(--color-paper)]"><Eye size={16} /></button>
                    <button type="button" onClick={() => beginEdit(item)} aria-label={`Edit ${item.name}`} title="Edit" className="grid size-9 place-items-center rounded-lg border border-[var(--color-line)] text-[var(--color-mist)] hover:border-[var(--color-blue-soft)] hover:text-[var(--color-paper)]"><Pencil size={16} /></button>
                    <button type="button" disabled={deleteMutation.isPending} onClick={() => {
                      if (window.confirm(`Delete "${item.name}"? This will also remove it from the public website.`)) deleteMutation.mutate(item._id);
                    }} aria-label={`Delete ${item.name}`} title="Delete" className="grid size-9 place-items-center rounded-lg border border-[var(--color-line)] text-[var(--color-mist)] hover:border-red-400/50 hover:text-red-300 disabled:opacity-50"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-black/70 p-4">
          <form onSubmit={save} className="my-auto w-full max-w-2xl rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-soft)] p-6 shadow-2xl sm:p-8">
            <header className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-blue-soft)]">{form.type === 'story' ? 'Sample client story' : 'Selected work'}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{editing._id ? 'Edit content' : 'Add content'}</h3>
              </div>
              <button type="button" onClick={() => setEditing(null)} aria-label="Close editor" className="grid size-9 place-items-center rounded-lg border border-[var(--color-line)] text-[var(--color-mist)] hover:text-[var(--color-paper)]"><X size={17} /></button>
            </header>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-xs text-[var(--color-mist)] sm:col-span-2">Name
                <input required maxLength={120} className={`${inputClass} mt-2`} value={form.name} onChange={(event) => update('name', event.target.value)} />
              </label>
              {form.type === 'story' ? (
                <>
                  <label className="text-xs text-[var(--color-mist)]">Company
                    <input required maxLength={120} className={`${inputClass} mt-2`} value={form.company || ''} onChange={(event) => update('company', event.target.value)} />
                  </label>
                  <label className="text-xs text-[var(--color-mist)]">Role
                    <input required maxLength={120} className={`${inputClass} mt-2`} value={form.role || ''} onChange={(event) => update('role', event.target.value)} />
                  </label>
                  <label className="text-xs text-[var(--color-mist)] sm:col-span-2">Story
                    <textarea required maxLength={3000} rows={5} className={`${inputClass} mt-2`} value={form.quote || ''} onChange={(event) => update('quote', event.target.value)} />
                  </label>
                </>
              ) : (
                <>
                  <label className="text-xs text-[var(--color-mist)] sm:col-span-2">Industry
                    <input required maxLength={120} className={`${inputClass} mt-2`} value={form.industry || ''} onChange={(event) => update('industry', event.target.value)} />
                  </label>
                  <label className="text-xs text-[var(--color-mist)]">Problem
                    <textarea required maxLength={2000} rows={4} className={`${inputClass} mt-2`} value={form.problem || ''} onChange={(event) => update('problem', event.target.value)} />
                  </label>
                  <label className="text-xs text-[var(--color-mist)]">Solution
                    <textarea required maxLength={2000} rows={4} className={`${inputClass} mt-2`} value={form.solution || ''} onChange={(event) => update('solution', event.target.value)} />
                  </label>
                  <label className="text-xs text-[var(--color-mist)] sm:col-span-2">Technologies (comma-separated)
                    <input maxLength={1300} className={`${inputClass} mt-2`} value={(form.technologies || []).join(', ')} onChange={(event) => setForm((current) => ({ ...current, technologies: event.target.value.split(',').map((value) => value.trim()).filter(Boolean) }))} />
                  </label>
                  <label className="text-xs text-[var(--color-mist)] sm:col-span-2">Result
                    <textarea required maxLength={500} rows={2} className={`${inputClass} mt-2`} value={form.result || ''} onChange={(event) => update('result', event.target.value)} />
                  </label>
                </>
              )}
            </div>
            {formError && <p role="alert" className="mt-4 text-sm text-red-300">{formError}</p>}
            <footer className="mt-7 flex justify-end gap-3">
              <button type="button" onClick={() => setEditing(null)} className="rounded-full border border-[var(--color-line)] px-4 py-2.5 text-sm text-[var(--color-mist)] hover:text-[var(--color-paper)]">Cancel</button>
              <button type="submit" disabled={saveMutation.isPending} className="rounded-full bg-[var(--color-blue)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-blue-soft)] disabled:opacity-60">{saveMutation.isPending ? 'Saving…' : 'Save'}</button>
            </footer>
          </form>
        </div>
      )}

      {viewing && (
        <div className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-black/70 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setViewing(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="content-view-title" className="my-auto w-full max-w-2xl rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-soft)] p-6 shadow-2xl sm:p-8">
            <header className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-blue-soft)]">{viewing.type === 'story' ? `${viewing.role} · ${viewing.company}` : viewing.industry}</p><h3 id="content-view-title" className="mt-2 font-display text-2xl font-semibold">{viewing.name}</h3></div>
              <button type="button" onClick={() => setViewing(null)} aria-label="Close details" className="grid size-9 place-items-center rounded-lg border border-[var(--color-line)] text-[var(--color-mist)] hover:text-[var(--color-paper)]"><X size={17} /></button>
            </header>
            {viewing.type === 'story' ? <p className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-mist)]">{viewing.quote}</p> : (
              <div className="mt-6 space-y-5 text-sm">
                <div><p className="text-xs text-[var(--color-mist)]">Problem</p><p className="mt-1 whitespace-pre-wrap">{viewing.problem}</p></div>
                <div><p className="text-xs text-[var(--color-mist)]">Solution</p><p className="mt-1 whitespace-pre-wrap">{viewing.solution}</p></div>
                <div><p className="text-xs text-[var(--color-mist)]">Technologies</p><p className="mt-1">{(viewing.technologies || []).join(', ') || 'None specified'}</p></div>
                <div><p className="text-xs text-[var(--color-mist)]">Result</p><p className="mt-1 whitespace-pre-wrap">{viewing.result}</p></div>
              </div>
            )}
            <footer className="mt-7 flex justify-end gap-3">
              <button type="button" onClick={() => setViewing(null)} className="rounded-full border border-[var(--color-line)] px-4 py-2.5 text-sm text-[var(--color-mist)] hover:text-[var(--color-paper)]">Close</button>
              <button type="button" onClick={() => beginEdit(viewing)} className="inline-flex items-center gap-2 rounded-full bg-[var(--color-blue)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-blue-soft)]"><Pencil size={15} /> Edit</button>
            </footer>
          </section>
        </div>
      )}
    </section>
  );
}
