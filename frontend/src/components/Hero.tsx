import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(600px circle at 80% 10%, rgba(66,126,130,0.18), transparent 60%), radial-gradient(500px circle at 10% 60%, rgba(126,167,171,0.12), transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-sm text-[var(--color-blue-soft)] font-medium mb-6">
            Technology · AI · Growth · Automation
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-semibold text-[var(--color-paper)] max-w-2xl">
            We build technology that moves your business forward.
          </h1>
          <p className="mt-7 text-lg text-[var(--color-mist)] max-w-xl leading-relaxed">
            We help businesses build, automate, and scale through modern software, AI,
            digital marketing, and data-driven technology solutions.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-blue)] text-white text-sm font-medium px-6 py-3.5 hover:bg-[var(--color-blue-soft)] transition-colors duration-200"
            >
              Start a Project <span aria-hidden="true">→</span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] text-[var(--color-paper)] text-sm font-medium px-6 py-3.5 hover:border-[var(--color-blue-soft)] transition-colors duration-200"
            >
              Explore Our Services
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="relative"
        >
          <SystemVisual />
        </motion.div>
      </div>
    </section>
  );
}

function SystemVisual() {
  return (
    <div className="relative aspect-square max-w-md mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Diagram representing connected software and AI systems">
        <defs>
          <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#427E82" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7EA7AB" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill="none" stroke="var(--color-line)" strokeWidth="1" />
        <circle cx="200" cy="200" r="105" fill="none" stroke="var(--color-line)" strokeWidth="1" />

        {[
          [200, 50], [340, 130], [340, 270], [200, 350], [60, 270], [60, 130],
        ].map(([x, y], i) => (
          <line key={i} x1="200" y1="200" x2={x} y2={y} stroke="url(#edge)" strokeWidth="1.5" />
        ))}

        <circle cx="200" cy="200" r="34" fill="var(--color-panel)" stroke="var(--color-blue)" strokeWidth="1.5" />
        <text x="200" y="205" textAnchor="middle" fill="#F5F6FA" fontSize="11" fontFamily="Space Grotesk, sans-serif">
          CORE
        </text>

        {[
          [200, 50], [340, 130], [340, 270], [200, 350], [60, 270], [60, 130],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="18" fill="var(--color-ink-soft)" stroke="var(--color-line)" strokeWidth="1.5" />
        ))}
      </svg>

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <motion.span
          className="absolute w-2 h-2 rounded-full bg-[var(--color-blue-soft)]"
          style={{ top: '10%', left: '50%' }}
          animate={{ top: ['10%', '48%', '10%'], left: ['50%', '50%', '50%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}
