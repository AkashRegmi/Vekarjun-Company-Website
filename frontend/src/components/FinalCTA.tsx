export default function FinalCTA() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(700px circle at 50% 40%, rgba(61,92,255,0.16), transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 lg:px-10 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--color-paper)] leading-tight">
          Have a business problem? Let's build the solution.
        </h2>
        <p className="mt-6 text-lg text-[var(--color-mist)] leading-relaxed max-w-2xl mx-auto">
          Whether you need a new website, an AI-powered workflow, better search
          visibility, or a complete digital transformation strategy, we're ready to help.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-blue)] text-white text-sm font-medium px-6 py-3.5 hover:bg-[var(--color-blue-soft)] transition-colors duration-200"
          >
            Start a Conversation <span aria-hidden="true">→</span>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] text-[var(--color-paper)] text-sm font-medium px-6 py-3.5 hover:border-[var(--color-blue-soft)] transition-colors duration-200"
          >
            View Our Services
          </a>
        </div>
      </div>
    </section>
  );
}
