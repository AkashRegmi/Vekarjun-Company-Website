import { stats, trustLabels } from '../data/content';

export default function Trust() {
  return (
    <section className="border-y border-[var(--color-line)] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-paper)] max-w-xl">
          Technology solutions built for ambitious businesses.
        </h2>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-paper)]">
                {stat.value}
              </div>
              <div className="mt-1.5 text-sm text-[var(--color-mist)]">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
          {trustLabels.map((label) => (
            <span key={label} className="text-sm text-[var(--color-mist)]">
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
