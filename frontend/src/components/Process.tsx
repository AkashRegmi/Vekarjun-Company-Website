import { motion } from 'framer-motion';
import { process } from '../data/content';

export default function Process() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-paper)] max-w-xl">
          How we work
        </h2>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {process.map((step, i) => (
            <motion.div
              key={step.index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative pt-6 border-t border-[var(--color-line)]"
            >
              <span className="font-display text-sm text-[var(--color-blue-soft)]">{step.index}</span>
              <h3 className="mt-3 font-display text-xl font-semibold text-[var(--color-paper)]">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm text-[var(--color-mist)] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
