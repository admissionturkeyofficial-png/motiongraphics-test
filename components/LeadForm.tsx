'use client';

import { useEffect, useId, useState, type ChangeEvent, type FormEvent } from 'react';
import { countries } from '@/content/countries';
import { site, waLink } from '@/content/site';
import { Icon } from './Icon';

const QUALIFICATIONS = ['Matric / O-Levels', 'FSc / A-Levels', 'Bachelor’s (14 years)', 'Bachelor’s (16 years)', 'Master’s', 'Other'];

type Values = { name: string; phone: string; email: string; country: string; qualification: string; intake: string; message: string; company: string };
type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^\+?[0-9][0-9\s-]{8,15}$/.test(v.phone.trim())) e.phone = 'Enter your WhatsApp number, e.g. 0311 0600230.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (!v.country) e.country = 'Choose a destination.';
  if (!v.qualification) e.qualification = 'Choose your last qualification.';
  return e;
}

/**
 * Free-assessment form.
 * INTEGRATION POINT: set NEXT_PUBLIC_LEAD_ENDPOINT (see content/site.ts). The form POSTs JSON there.
 * Without an endpoint it opens WhatsApp with the lead details pre-filled, so no lead is lost.
 */
export function LeadForm({ defaultCountry = '', title = 'Get your free assessment', compact = false, source = 'website' }: { defaultCountry?: string; title?: string; compact?: boolean; source?: string }) {
  const uid = useId();
  const [values, setValues] = useState<Values>({ name: '', phone: '', email: '', country: defaultCountry, qualification: '', intake: '', message: '', company: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  // Computed after mount so the statically built HTML never disagrees with the visitor's date.
  const [intakes, setIntakes] = useState<string[]>([]);
  useEffect(() => setIntakes(intakeOptions()), []);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof Values]) setErrors((er) => ({ ...er, [name]: undefined }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    // Honeypot: bots fill the hidden "company" field. Pretend success, send nothing.
    if (values.company) {
      setStatus('done');
      return;
    }
    setStatus('sending');
    const { company: _hp, ...lead } = values;
    void _hp;
    try {
      if (site.leadEndpoint) {
        const res = await fetch(site.leadEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...lead, source, page: window.location.pathname, submittedAt: new Date().toISOString() }),
        });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        const text =
          `Hi Prime Edge, I'd like a free assessment.\n` +
          `Name: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email}\nCountry: ${lead.country}\n` +
          `Qualification: ${lead.qualification}\nIntake: ${lead.intake || '-'}\n${lead.message ? `Message: ${lead.message}` : ''}`;
        window.open(waLink(text), '_blank', 'noopener');
      }
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  const field = (name: keyof Values, label: string, control: React.ReactNode) => (
    <div className="pe-field" data-invalid={errors[name] ? 'true' : undefined}>
      <label htmlFor={`${uid}-${name}`}>{label}</label>
      {control}
      {errors[name] && (
        <span className="pe-field-error" id={`${uid}-${name}-err`}>
          {errors[name]}
        </span>
      )}
    </div>
  );
  const a = (name: keyof Values) => ({
    id: `${uid}-${name}`,
    name,
    value: values[name],
    onChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${uid}-${name}-err` : undefined,
  });

  if (status === 'done') {
    return (
      <div className="pe-form pe-glass lead-form" role="status">
        <h2 className="lead-title">
          <Icon name="check" size={22} /> Thank you{values.name ? `, ${values.name.split(' ')[0]}` : ''}
        </h2>
        <p className="pe-form-success">A Prime Edge counsellor will contact you on WhatsApp soon.</p>
        <p className="pe-form-note">Need an answer now? Message us at {site.whatsapp[0].label}.</p>
      </div>
    );
  }

  return (
    <form className={`pe-form pe-glass lead-form${compact ? ' is-compact' : ''}`} onSubmit={onSubmit} noValidate aria-labelledby={`${uid}-title`}>
      <h2 className="lead-title" id={`${uid}-title`}>
        {title}
      </h2>
      {field('name', 'Full name', <input type="text" autoComplete="name" {...a('name')} />)}
      <div className="pe-form-row">
        {field('phone', 'Phone (WhatsApp)', <input type="tel" autoComplete="tel" inputMode="tel" placeholder="03XX XXXXXXX" {...a('phone')} />)}
        {field('email', 'Email', <input type="email" autoComplete="email" {...a('email')} />)}
      </div>
      <div className="pe-form-row">
        {field(
          'country',
          'Target country',
          <select {...a('country')}>
            <option value="">Select…</option>
            {countries.map((c) => (
              <option key={c.slug} value={c.formLabel}>
                {c.formLabel}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>,
        )}
        {field(
          'qualification',
          'Last qualification',
          <select {...a('qualification')}>
            <option value="">Select…</option>
            {QUALIFICATIONS.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>,
        )}
      </div>
      {field(
        'intake',
        'Preferred intake',
        <select {...a('intake')}>
          <option value="">Not sure</option>
          {intakes.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>,
      )}
      {!compact && field('message', 'Message (optional)', <textarea rows={3} {...a('message')} />)}
      <div className="pe-hp" aria-hidden="true">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input id={`${uid}-company`} name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={onChange} />
      </div>
      <button type="submit" className="pe-btn pe-btn-primary pe-shine" disabled={status === 'sending'}>
        <Icon name="send" size={18} />
        <span>{status === 'sending' ? 'Sending…' : 'Get my free assessment'}</span>
      </button>
      {status === 'error' && (
        <p className="pe-field-error" role="alert">
          Sorry, that didn’t go through. Please message us on WhatsApp at {site.whatsapp[0].label}.
        </p>
      )}
      <p className="pe-form-note">Free and no obligation. We reply on WhatsApp. See our privacy policy.</p>
    </form>
  );
}

function intakeOptions() {
  const now = new Date();
  const y = now.getFullYear();
  const opts: string[] = [];
  for (const year of [y, y + 1, y + 2]) {
    for (const [m, label] of [
      [0, 'January / February'],
      [8, 'September'],
    ] as const) {
      if (year === y && m <= now.getMonth()) continue;
      opts.push(`${label} ${year}`);
    }
  }
  return opts.slice(0, 4);
}
