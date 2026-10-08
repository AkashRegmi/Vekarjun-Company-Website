import { Target, Cpu, TrendingUp, Eye, Handshake, LineChart } from 'lucide-react';
import { benefits } from '../data/content';

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Target, Cpu, TrendingUp, Eye, Handshake, LineChart,
};

export default function WhyUs() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[var(--color-ink-soft)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-paper)] max-w-xl">
          Technology with business thinking
        </h2>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefits.map((benefit) => {
            const Icon = icons[benefit.icon];
            return (
              <div key={benefit.title}>
                <Icon size={22} className="text-[var(--color-blue-soft)]" />
                <h3 className="mt-4 font-display text-lg font-semibold text-[var(--color-paper)]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-mist)] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
