import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { aiWorkflow } from '../data/content';

export default function FeaturedAI() {
  return (
    <section id="solutions" className="relative py-28 lg:py-36 overflow-hidden bg-[var(--color-ink-soft)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(800px circle at 50% 0%, rgba(61,92,255,0.14), transparent 55%)',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight font-semibold text-[var(--color-paper)] max-w-lg">
            Your business doesn't need more software. It needs smarter systems.
          </h2>
          <p className="mt-6 text-lg text-[var(--color-mist)] leading-relaxed max-w-lg">
            AI agents can take over the repetitive parts of your business — qualifying
            leads, updating records, drafting responses — so your team spends time on
            the work that actually needs a person.
          </p>
          <a
            href="#contact"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[var(--color-blue)] text-white text-sm font-medium px-6 py-3.5 hover:bg-[var(--color-blue-soft)] transition-colors duration-200"
          >
            Build an AI Solution <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="relative rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)]/60 p-8 lg:p-10">
          <ol className="space-y-0">
            {aiWorkflow.map((step, i) => (
              <li key={step}>
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-center gap-4 py-3"
                >
                  <span className="shrink-0 w-8 h-8 rounded-full bg-[var(--color-ink)] border border-[var(--color-line)] flex items-center justify-center text-xs font-medium text-[var(--color-blue-soft)]">
                    {i + 1}
                  </span>
                  <span className="text-[var(--color-paper)] text-[15px]">{step}</span>
                </motion.div>
                {i < aiWorkflow.length - 1 && (
                  <div className="pl-4">
                    <ArrowDown size={14} className="text-[var(--color-mist)]" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
