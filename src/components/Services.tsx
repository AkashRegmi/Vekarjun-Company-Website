import { Code2, Sparkles, Megaphone, TrendingUp, Workflow, BarChart3, ArrowRight } from 'lucide-react';
import { services } from '../data/content';

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2, Sparkles, Megaphone, TrendingUp, Workflow, BarChart3,
};

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-paper)]">
            Technology solutions built around your business
          </h2>
          <p className="mt-5 text-lg text-[var(--color-mist)] leading-relaxed">
            From your first website to intelligent business automation, we provide the
            technology your business needs to grow.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-line)] border border-[var(--color-line)]">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <div key={service.index} className="bg-[var(--color-ink)] p-8 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display text-sm text-[var(--color-mist)]">{service.index}</span>
                  <Icon size={20} className="text-[var(--color-blue-soft)]" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[var(--color-paper)]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--color-mist)] leading-relaxed">
                  {service.summary}
                </p>
                <ul className="mt-6 space-y-2 flex-1">
                  {service.items.map((item) => (
                    <li key={item} className="text-sm text-[var(--color-mist)] flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-blue-soft)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-paper)] hover:text-[var(--color-blue-soft)] transition-colors duration-200 group"
                >
                  {service.cta}
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
