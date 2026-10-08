import { Mail } from 'lucide-react';
import { company } from '../data/content';

const companyLinks = ['About', 'Services', 'Portfolio', 'Insights', 'Contact'];
const serviceLinks = ['Web Development', 'AI Solutions', 'SEO', 'Digital Marketing', 'Automation', 'Data & Analytics'];
const socialLinks = [
  { label: 'LinkedIn', short: 'in' },
  { label: 'Facebook', short: 'f' },
  { label: 'Instagram', short: 'ig' },
  { label: 'X', short: 'x' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <span className="font-display text-xl font-semibold text-[var(--color-paper)]">{company.name}</span>
            <p className="mt-4 text-sm text-[var(--color-mist)] leading-relaxed max-w-xs">
              A technology partner for businesses building, automating, and scaling
              through modern software and AI.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--color-paper)]">Company</p>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l}><a href={`/#${l.toLowerCase()}`} className="text-sm text-[var(--color-mist)] hover:text-[var(--color-paper)] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--color-paper)]">Services</p>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l}><a href="/#services" className="text-sm text-[var(--color-mist)] hover:text-[var(--color-paper)] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--color-paper)]">Connect</p>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-[var(--color-line)] flex items-center justify-center text-xs text-[var(--color-mist)] hover:text-[var(--color-paper)] hover:border-[var(--color-blue-soft)] transition-colors"
                >
                  {s.short}
                </a>
              ))}
              <a
                href="/#contact"
                aria-label="Email"
                className="w-9 h-9 rounded-full border border-[var(--color-line)] flex items-center justify-center text-[var(--color-mist)] hover:text-[var(--color-paper)] hover:border-[var(--color-blue-soft)] transition-colors"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[var(--color-line)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-mist)]">© 2026 {company.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[var(--color-mist)] hover:text-[var(--color-paper)] transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-[var(--color-mist)] hover:text-[var(--color-paper)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
