import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../data/content';

export default function Insights() {
  return (
    <section id="insights" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-paper)] max-w-xl">
          Ideas, insights &amp; technology
        </h2>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.title} className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-panel)] border border-[var(--color-line)]">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="mt-5 inline-block text-xs font-medium text-[var(--color-blue-soft)]">
                {article.category}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold text-[var(--color-paper)] leading-snug">
                {article.title}
              </h3>
              <p className="mt-2.5 text-sm text-[var(--color-mist)] leading-relaxed">
                {article.description}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-[var(--color-mist)]">
                <span>{article.date}</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {article.readingTime}
                </span>
              </div>
              <Link
                to={`/articles/${article.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-paper)] group-hover:text-[var(--color-blue-soft)] transition-colors duration-200"
              >
                Read article
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
