import { useQuery } from '@tanstack/react-query';
import { Quote } from 'lucide-react';
import { apiRequest } from '../lib/api';

type Story = {
  _id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
};

export default function Testimonials() {
  const storiesQuery = useQuery({
    queryKey: ['site-content', 'story'],
    queryFn: async () => (await apiRequest<{ items: Story[] }>('/api/content/stories')).items,
  });

  return (
    <section className="py-24 lg:py-32 bg-[var(--color-ink-soft)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-paper)] max-w-xl">
          Sample client stories
        </h2>
        <p className="mt-3 text-sm text-[var(--color-mist)]">Stories and feedback shared by our clients.</p>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {storiesQuery.isPending ? (
            <p className="text-sm text-[var(--color-mist)]">Loading client stories…</p>
          ) : storiesQuery.isError ? (
            <p role="alert" className="text-sm text-red-300">{storiesQuery.error.message}</p>
          ) : storiesQuery.data.length === 0 ? (
            <p className="text-sm text-[var(--color-mist)]">Client stories will appear here when they are published.</p>
          ) : storiesQuery.data.map((t) => (
            <div key={t._id} className="border border-[var(--color-line)] rounded-2xl p-7">
              <Quote size={20} className="text-[var(--color-blue-soft)]" />
              <p className="mt-4 text-[15px] text-[var(--color-mist)] italic leading-relaxed">
                {t.quote}
              </p>
              <div className="mt-6 pt-5 border-t border-[var(--color-line)]">
                <p className="text-sm font-medium text-[var(--color-paper)]">{t.name}</p>
                <p className="text-xs text-[var(--color-mist)] mt-0.5">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
