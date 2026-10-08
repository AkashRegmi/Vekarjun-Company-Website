import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../lib/api';

type Project = {
  _id: string;
  name: string;
  industry: string;
  problem: string;
  solution: string;
  technologies: string[];
  result: string;
};

export default function Portfolio() {
  const projectsQuery = useQuery({
    queryKey: ['site-content', 'project'],
    queryFn: async () => (await apiRequest<{ items: Project[] }>('/api/content/projects')).items,
  });

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-[var(--color-ink-soft)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-paper)]">
            Selected work
          </h2>
          <p className="mt-4 text-[var(--color-mist)] text-sm">Representative project examples and selected client work.</p>
        </div>

        <div className="mt-14 space-y-px bg-[var(--color-line)] border border-[var(--color-line)]">
          {projectsQuery.isPending ? (
            <p className="bg-[var(--color-ink-soft)] px-6 py-10 text-sm text-[var(--color-mist)]">Loading selected work…</p>
          ) : projectsQuery.isError ? (
            <p role="alert" className="bg-[var(--color-ink-soft)] px-6 py-10 text-sm text-red-300">{projectsQuery.error.message}</p>
          ) : projectsQuery.data.length === 0 ? (
            <p className="bg-[var(--color-ink-soft)] px-6 py-10 text-sm text-[var(--color-mist)]">Selected work will appear here as projects are published.</p>
          ) : projectsQuery.data.map((project) => (
            <div key={project._id} className="bg-[var(--color-ink-soft)] p-8 lg:p-10 grid lg:grid-cols-[1fr_2fr] gap-8">
              <div>
                <span className="text-xs font-medium text-[var(--color-blue-soft)] uppercase tracking-wide">
                  {project.industry}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-[var(--color-paper)]">
                  {project.name}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs text-[var(--color-mist)] border border-[var(--color-line)] rounded-full px-2.5 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs font-medium text-[var(--color-mist)]">Problem</p>
                  <p className="mt-1.5 text-sm text-[var(--color-paper)] leading-relaxed">{project.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--color-mist)]">Solution</p>
                  <p className="mt-1.5 text-sm text-[var(--color-paper)] leading-relaxed">{project.solution}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--color-mist)]">Result</p>
                  <p className="mt-1.5 text-sm text-[var(--color-mist)] italic leading-relaxed">{project.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <a
          href="#contact"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-paper)] hover:text-[var(--color-blue-soft)] transition-colors duration-200 group"
        >
          Discuss a project like this
          <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}
