import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { contactInfo, serviceOptions, budgetOptions } from '../data/content';
import { apiRequest } from '../lib/api';

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  details: string;
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      service: '',
      budget: '',
      details: '',
    },
  });

  const inquiryMutation = useMutation({
    mutationFn: (inquiry: FormState) => apiRequest<{ message: string }>('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    }),
    onSuccess: () => setSubmitted(true),
  });

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
            <form onSubmit={handleSubmit((inquiry) => inquiryMutation.mutate(inquiry))} noValidate className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="block text-xs text-[var(--color-mist)] mb-2">Name</label>
                <input id="name" maxLength={120} className={inputClass} {...register('name', {
                  required: 'Name is required.',
                  maxLength: { value: 120, message: 'Name must be 120 characters or fewer.' },
                })} placeholder="Your full name" />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="company" className="block text-xs text-[var(--color-mist)] mb-2">Company</label>
                <input id="company" maxLength={120} className={inputClass} {...register('company', {
                  maxLength: { value: 120, message: 'Company must be 120 characters or fewer.' },
                })} placeholder="Company name" />
                {errors.company && <p className="mt-1.5 text-xs text-red-400">{errors.company.message}</p>}
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="email" className="block text-xs text-[var(--color-mist)] mb-2">Email</label>
                <input id="email" type="email" maxLength={254} className={inputClass} {...register('email', {
                  required: 'Email is required.',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' },
                  maxLength: { value: 254, message: 'Email must be 254 characters or fewer.' },
                })} placeholder="you@company.com" />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="phone" className="block text-xs text-[var(--color-mist)] mb-2">Phone</label>
                <input id="phone" maxLength={40} className={inputClass} {...register('phone', {
                  maxLength: { value: 40, message: 'Phone must be 40 characters or fewer.' },
                })} placeholder="Optional" />
                {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>}
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="service" className="block text-xs text-[var(--color-mist)] mb-2">Service</label>
                <select id="service" className={inputClass} {...register('service', {
                  required: 'Select a service.',
                  maxLength: { value: 120, message: 'Service must be 120 characters or fewer.' },
                })}>
                  <option value="">Select a service</option>
                  {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service && <p className="mt-1.5 text-xs text-red-400">{errors.service.message}</p>}
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="budget" className="block text-xs text-[var(--color-mist)] mb-2">Budget</label>
                <select id="budget" className={inputClass} {...register('budget', {
                  maxLength: { value: 80, message: 'Budget must be 80 characters or fewer.' },
                })}>
                  <option value="">Select a range</option>
                  {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="details" className="block text-xs text-[var(--color-mist)] mb-2">Project details</label>
                <textarea id="details" rows={4} maxLength={5000} className={inputClass} {...register('details', {
                  required: 'Tell us a bit about the project.',
                  maxLength: { value: 5000, message: 'Project details must be 5000 characters or fewer.' },
                })} placeholder="What are you looking to build?" />
                {errors.details && <p className="mt-1.5 text-xs text-red-400">{errors.details.message}</p>}
              </div>
              <div className="sm:col-span-2">
                {inquiryMutation.error && <p role="alert" className="mb-4 text-sm text-red-400">{inquiryMutation.error.message}</p>}
                <button
                  type="submit"
                  disabled={inquiryMutation.isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-blue)] text-white text-sm font-medium px-6 py-3.5 hover:bg-[var(--color-blue-soft)] transition-colors duration-200 disabled:opacity-60"
                >
                  {inquiryMutation.isPending ? 'Sending…' : 'Send Project Inquiry'} <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
