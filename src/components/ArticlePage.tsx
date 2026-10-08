import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { articles } from '../data/content';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <section className="min-h-[70vh] px-6 pt-36 pb-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-[var(--color-blue-soft)]">Article not found</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-[var(--color-paper)]">
            This article may have moved.
          </h1>
          <Link
            to="/#insights"
            className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--color-paper)] hover:text-[var(--color-blue-soft)]"
          >
            <ArrowLeft size={16} /> Back to insights
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="min-h-screen px-6 pt-32 pb-24 lg:pt-40">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/#insights"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-mist)] hover:text-[var(--color-paper)] transition-colors"
        >
          <ArrowLeft size={16} /> Back to insights
        </Link>

        <header className="mt-10 border-b border-[var(--color-line)] pb-8">
          <span className="text-sm font-medium text-[var(--color-blue-soft)]">
            {article.category}
          </span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-semibold leading-tight text-[var(--color-paper)]">
            {article.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-mist)]">
            {article.description}
          </p>
          <div className="mt-6 flex items-center gap-5 text-sm text-[var(--color-mist)]">
            <span>{article.date}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} /> {article.readingTime}
            </span>
          </div>
        </header>

        <figure className="mt-8">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="max-h-[30rem] w-full rounded-2xl border border-[var(--color-line)] object-cover"
          />
          <figcaption className="mt-3 text-xs text-[var(--color-mist)]">
            Illustrative image via{' '}
            <a
              href={article.image}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-[var(--color-paper)]"
            >
              Unsplash
            </a>
          </figcaption>
        </figure>

        <div className="mt-10 space-y-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-semibold text-[var(--color-paper)] sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-5 text-base leading-8 text-[var(--color-mist)] sm:text-lg">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-14 rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-7 sm:p-9">
          <h2 className="font-display text-2xl font-semibold text-[var(--color-paper)]">
            Want to explore this for your business?
          </h2>
          <p className="mt-3 leading-relaxed text-[var(--color-mist)]">
            Tell us about your goals and our team will help you identify a practical next step.
          </p>
          <Link
            to="/#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-medium text-white hover:bg-[var(--color-blue-soft)] transition-colors"
          >
            Talk to our team <ArrowRight size={16} />
          </Link>
        </footer>
      </div>
    </article>
  );
}
