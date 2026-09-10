import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Euro, Clock, Home, CalendarDays, ShieldCheck, GraduationCap,
  Gift, Laptop, CheckCircle2, Upload, ArrowRight, Loader2
} from 'lucide-react';
import { NexuraLogo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const BENEFITS = [
  { icon: Euro, title: '2.200 € / Monat + Provision', desc: 'Festes Bruttogehalt plus leistungsabhängige Provision pro abgeschlossenem Test.' },
  { icon: Clock, title: '20 Stunden / Woche', desc: 'Echte Teilzeit – ideal neben Studium, Familie oder Nebenjob.' },
  { icon: Home, title: '100 % Homeoffice', desc: 'Mobiles Arbeiten von überall. Du brauchst nur Internet und einen Laptop.' },
  { icon: CalendarDays, title: 'Flexible Arbeitszeiten', desc: 'Keine Kernarbeitszeit – du teilst dir deine Stunden frei ein.' },
  { icon: ShieldCheck, title: 'Unbefristeter Vertrag', desc: 'Sichere Anstellung mit 3 Monaten Probezeit und geregelten Kündigungsfristen.' },
  { icon: Gift, title: 'Urlaubs- & Weihnachtsgeld', desc: '28 Tage Urlaub sowie 13. und 14. Gehalt als Sonderzahlung.' },
  { icon: GraduationCap, title: 'Strukturierte Einarbeitung', desc: 'Wir schulen dich Schritt für Schritt – auch ohne Vorerfahrung.' },
  { icon: Laptop, title: 'Tools werden gestellt', desc: 'Alle Testzugänge und Softwarelizenzen bekommst du von uns bereitgestellt.' },
];

const TASKS = [
  'Durchführung von Software-, Produkt- und App-Tests unter realen Bedingungen',
  'Dokumentation und Auswertung der Testergebnisse',
  'Analyse von Schwachstellen und Erstellung von Verbesserungsvorschlägen',
  'Zusammenarbeit mit dem Team zur Optimierung von Qualität und Performance',
];

const SignupTeilzeit = () => {
  const [form, setForm] = useState({ name: '', email: '', telefonnummer: '', staatsbuergerschaft: '', password: '' });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.telefonnummer || !form.staatsbuergerschaft || !form.password) {
      toast.error('Bitte fülle alle Pflichtfelder aus.');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Das Passwort muss mindestens 6 Zeichen lang sein.');
      return;
    }
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('email', form.email);
      data.append('telefonnummer', form.telefonnummer);
      data.append('staatsbuergerschaft', form.staatsbuergerschaft);
      data.append('password', form.password);
      if (file) data.append('document', file);
      await axios.post(`${BACKEND_URL}/api/applications/signup`, data);
      setDone(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Etwas ist schiefgelaufen. Bitte versuche es erneut.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-[#1C2B3A]" data-testid="signup-page">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <NexuraLogo className="w-9 h-9" />
          <span className="text-xl font-heading font-bold">
            Nex<span className="text-sage-600">ura</span>
          </span>
        </div>
      </header>

      {done ? (
        <div className="max-w-2xl mx-auto px-6 py-24 text-center" data-testid="signup-success">
          <div className="w-16 h-16 rounded-full bg-sage-600/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-9 h-9 text-sage-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-4">Bewerbung erhalten!</h1>
          <p className="text-base text-slate-600 mb-2">
            Vielen Dank für dein Interesse an der Teilzeit-Stelle bei Nexura.
          </p>
          <p className="text-base font-semibold text-sage-700">
            Wir melden uns innerhalb von 24 Stunden bei dir.
          </p>
        </div>
      ) : (
        <>
          {/* Hero */}
          <section className="bg-gradient-to-b from-white to-[#F5F7FB]">
            <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-sage-600/10 text-sage-700 text-sm font-semibold mb-4">
                Wir stellen ein · Homeoffice
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-4">
                Teilzeit: App- & Produkttester (m/w/d)
              </h1>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mb-8">
                Teste Software und Apps von zuhause, dokumentiere deine Ergebnisse und werde Teil unseres
                Qualitätssicherungs-Teams. <strong>2.200 € / Monat + Provision</strong> bei nur 20 Stunden pro Woche.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-medium shadow-sm">
                  <Euro className="w-4 h-4 text-sage-600" /> 2.200 € + Provision
                </span>
                <span className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-medium shadow-sm">
                  <Clock className="w-4 h-4 text-sage-600" /> 20 Std./Woche
                </span>
                <span className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-medium shadow-sm">
                  <Home className="w-4 h-4 text-sage-600" /> 100 % Homeoffice
                </span>
              </div>
            </div>
          </section>

          <div className="max-w-6xl mx-auto px-6 pb-20 grid lg:grid-cols-5 gap-10">
            {/* Left: Job details */}
            <div className="lg:col-span-3 space-y-10">
              <div>
                <h2 className="text-lg md:text-xl font-heading font-bold mb-5">Deine Vorteile</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {BENEFITS.map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm" data-testid={`benefit-${i}`}>
                        <div className="w-10 h-10 rounded-lg bg-sage-600/10 flex items-center justify-center mb-3">
                          <Icon className="w-5 h-5 text-sage-600" />
                        </div>
                        <h3 className="font-semibold mb-1">{b.title}</h3>
                        <p className="text-sm text-slate-600">{b.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-lg md:text-xl font-heading font-bold mb-5">Deine Aufgaben</h2>
                <ul className="space-y-3">
                  {TASKS.map((t, i) => (
                    <li key={i} className="flex items-start gap-3 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Application form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 lg:sticky lg:top-6">
                <h2 className="text-lg md:text-xl font-heading font-bold mb-1">Jetzt bewerben</h2>
                <p className="text-sm text-slate-500 mb-6">
                  Wir melden uns innerhalb von <strong>24 Stunden</strong> bei dir.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4" data-testid="signup-form">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" name="name" value={form.name} onChange={onChange}
                           placeholder="Max Mustermann" className="mt-1" required data-testid="signup-input-name" />
                  </div>
                  <div>
                    <Label htmlFor="email">E-Mail *</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={onChange}
                           placeholder="max@beispiel.de" className="mt-1" required data-testid="signup-input-email" />
                  </div>
                  <div>
                    <Label htmlFor="telefonnummer">Telefonnummer *</Label>
                    <Input id="telefonnummer" name="telefonnummer" value={form.telefonnummer} onChange={onChange}
                           placeholder="+49 170 1234567" className="mt-1" required data-testid="signup-input-phone" />
                  </div>
                  <div>
                    <Label htmlFor="staatsbuergerschaft">Staatsbürgerschaft *</Label>
                    <Input id="staatsbuergerschaft" name="staatsbuergerschaft" value={form.staatsbuergerschaft} onChange={onChange}
                           placeholder="z. B. deutsch" className="mt-1" required data-testid="signup-input-citizenship" />
                  </div>
                  <div>
                    <Label htmlFor="password">Passwort für den Mitarbeiter-Login *</Label>
                    <Input id="password" name="password" type="password" value={form.password} onChange={onChange}
                           placeholder="Mindestens 6 Zeichen" className="mt-1" required minLength={6}
                           autoComplete="new-password" data-testid="signup-input-password" />
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-sage-600/10 border border-sage-600/20 px-3 py-2.5"
                       data-testid="signup-credentials-hint">
                    <ShieldCheck className="w-4 h-4 text-sage-700 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-sage-800">
                      Bitte <strong>sichere dir deine E-Mail und dein Passwort</strong> gut – du benötigst beide,
                      um dich später im Mitarbeiter-Login anzumelden.
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="document">Bewerbungsunterlagen (optional)</Label>
                    <label htmlFor="document"
                           className="mt-1 flex items-center gap-2 border border-dashed border-slate-300 rounded-lg px-3 py-2.5 cursor-pointer hover:border-sage-500 transition-colors text-sm text-slate-500">
                      <Upload className="w-4 h-4" />
                      <span className="truncate">{file ? file.name : 'Datei auswählen (PDF, Word, Bild)'}</span>
                    </label>
                    <input id="document" type="file" className="hidden"
                           accept=".pdf,.doc,.docx,image/*"
                           onChange={(e) => setFile(e.target.files?.[0] || null)}
                           data-testid="signup-input-document" />
                    <p className="text-xs text-slate-400 mt-1">Lebenslauf o. ä. – nicht verpflichtend, max. 10 MB.</p>
                  </div>

                  <Button type="submit" disabled={submitting}
                          className="w-full bg-sage-600 hover:bg-sage-700 text-white font-semibold py-6 rounded-lg"
                          data-testid="signup-submit-button">
                    {submitting ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Wird gesendet …</>
                    ) : (
                      <>Bewerbung absenden <ArrowRight className="w-4 h-4 ml-2" /></>
                    )}
                  </Button>
                  <p className="text-xs text-slate-400 text-center">
                    Mit dem Absenden stimmst du der Verarbeitung deiner Daten zur Bearbeitung deiner Bewerbung zu.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignupTeilzeit;
