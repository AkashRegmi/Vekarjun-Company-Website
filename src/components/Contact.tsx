import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { contactInfo, serviceOptions, budgetOptions } from '../data/content';

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  details: string;
};

const initialState: FormState = {
  name: '', company: '', email: '', phone: '', service: '', budget: '', details: '',
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.service) next.service = 'Select a service.';
    if (!form.details.trim()) next.details = 'Tell us a bit about the project.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  }

  const inputClass =
    'w-full bg-[var(--color-ink)] border border-[var(--color-line)] rounded-lg px-4 py-3 text-sm text-[var(--color-paper)] placeholder:text-[var(--color-mist)] focus:border-[var(--color-blue-soft)] outline-none transition-colors duration-200';

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[var(--color-ink-soft)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-[1fr_1.3fr] gap-16">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-paper)]">
            Tell us about your project
          </h2>
          <p className="mt-5 text-[var(--color-mist)] leading-relaxed">
            Share a few details and we'll follow up to schedule a conversation about
            what your business needs.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3 text-sm text-[var(--color-mist)]">
              <Mail size={17} className="text-[var(--color-blue-soft)]" /> {contactInfo.email}
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--color-mist)]">
              <Phone size={17} className="text-[var(--color-blue-soft)]" /> {contactInfo.phone}
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--color-mist)]">
              <MapPin size={17} className="text-[var(--color-blue-soft)]" /> {contactInfo.location}
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--color-mist)]">
              <Clock size={17} className="text-[var(--color-blue-soft)]" /> {contactInfo.hours}
            </div>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="border border-[var(--color-line)] rounded-2xl p-10 text-center">
              <CheckCircle2 size={32} className="mx-auto text-[var(--color-blue-soft)]" />
              <h3 className="mt-4 font-display text-xl font-semibold text-[var(--color-paper)]">
                Inquiry sent
              </h3>
              <p className="mt-2 text-sm text-[var(--color-mist)]">
                Thanks — we'll be in touch shortly to discuss your project.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="block text-xs text-[var(--color-mist)] mb-2">Name</label>
                <input id="name" className={inputClass} value={form.name}
                  onChange={(e) => update('name', e.target.value)} placeholder="Your full name" />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="company" className="block text-xs text-[var(--color-mist)] mb-2">Company</label>
                <input id="company" className={inputClass} value={form.company}
                  onChange={(e) => update('company', e.target.value)} placeholder="Company name" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="email" className="block text-xs text-[var(--color-mist)] mb-2">Email</label>
                <input id="email" type="email" className={inputClass} value={form.email}
                  onChange={(e) => update('email', e.target.value)} placeholder="you@company.com" />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="phone" className="block text-xs text-[var(--color-mist)] mb-2">Phone</label>
                <input id="phone" className={inputClass} value={form.phone}
                  onChange={(e) => update('phone', e.target.value)} placeholder="Optional" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="service" className="block text-xs text-[var(--color-mist)] mb-2">Service</label>
                <select id="service" className={inputClass} value={form.service}
                  onChange={(e) => update('service', e.target.value)}>
                  <option value="">Select a service</option>
                  {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service && <p className="mt-1.5 text-xs text-red-400">{errors.service}</p>}
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="budget" className="block text-xs text-[var(--color-mist)] mb-2">Budget</label>
                <select id="budget" className={inputClass} value={form.budget}
                  onChange={(e) => update('budget', e.target.value)}>
                  <option value="">Select a range</option>
                  {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="details" className="block text-xs text-[var(--color-mist)] mb-2">Project details</label>
                <textarea id="details" rows={4} className={inputClass} value={form.details}
                  onChange={(e) => update('details', e.target.value)} placeholder="What are you looking to build?" />
                {errors.details && <p className="mt-1.5 text-xs text-red-400">{errors.details}</p>}
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-blue)] text-white text-sm font-medium px-6 py-3.5 hover:bg-[var(--color-blue-soft)] transition-colors duration-200 disabled:opacity-60"
                >
                  {submitting ? 'Sending…' : 'Send Project Inquiry'} <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
