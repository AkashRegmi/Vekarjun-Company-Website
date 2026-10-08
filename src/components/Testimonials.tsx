import { Quote } from 'lucide-react';
import { testimonials } from '../data/content';

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-ink-soft)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-paper)] max-w-xl">
          Sample client stories
        </h2>
        <p className="mt-3 text-sm text-[var(--color-mist)]">
          Illustrative examples featuring fictional people and companies; these are not actual client testimonials.
        </p>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-[var(--color-line)] rounded-2xl p-7">
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
