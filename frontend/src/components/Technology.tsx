import { techStack } from '../data/content';

export default function Technology() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-paper)] max-w-xl">
          Our technology ecosystem
        </h2>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {Object.entries(techStack).map(([category, tools]) => (
            <div key={category}>
              <p className="text-sm font-medium text-[var(--color-blue-soft)]">{category}</p>
              <ul className="mt-4 space-y-2.5">
                {tools.map((tool) => (
                  <li key={tool} className="text-sm text-[var(--color-mist)]">{tool}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
