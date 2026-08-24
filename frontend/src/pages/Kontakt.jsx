import React, { useState } from 'react';
import { Mail, MapPin, Send, Clock } from 'lucide-react';
import { toast } from 'sonner';

const Kontakt = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', subject: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Nachricht gesendet!', { description: 'Wir melden uns in Kürze bei Ihnen.' });
      setFormData({ name: '', email: '', company: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1200);
  };

  const inputClass = 'w-full px-4 py-3 border border-[#D9E3F0] rounded-sm bg-white text-[#1C2B3A] focus:border-sage-500 focus:ring-1 focus:ring-sage-500 outline-none transition-colors';

  return (
    <div className="min-h-screen bg-white font-body text-[#4A5568]">
      {/* Hero */}
      <section className="bg-[#F0F4FA] border-b border-[#D9E3F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="max-w-2xl">
            <div className="text-sage-700 font-semibold mb-3">Kontakt</div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#1C2B3A] leading-tight mb-4">
              Lassen Sie uns sprechen
            </h1>
            <p className="text-lg">Haben Sie ein Projekt oder eine Frage? Wir freuen uns auf Ihre Nachricht.</p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#1C2B3A] mb-8">Nachricht senden</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#1C2B3A] mb-2">Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required data-testid="contact-name" className={inputClass} placeholder="Ihr Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1C2B3A] mb-2">E-Mail *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required data-testid="contact-email" className={inputClass} placeholder="ihre@email.de" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#1C2B3A] mb-2">Unternehmen</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} data-testid="contact-company" className={inputClass} placeholder="Ihr Unternehmen" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1C2B3A] mb-2">Telefon</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} data-testid="contact-phone" className={inputClass} placeholder="+49 123 456789" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1C2B3A] mb-2">Betreff *</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} required data-testid="contact-subject" className={inputClass} placeholder="Worum geht es?" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1C2B3A] mb-2">Nachricht *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} data-testid="contact-message" className={`${inputClass} resize-none`} placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..." />
                </div>
                <button type="submit" disabled={isSubmitting} data-testid="contact-submit" className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-sage-600 text-white font-semibold rounded-sm hover:bg-sage-700 disabled:opacity-50 transition-colors">
                  {isSubmitting ? (
                    <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> Wird gesendet...</>
                  ) : (
                    <>Nachricht senden <Send size={18} /></>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#1C2B3A] mb-8">Kontaktdaten</h2>
              <div className="space-y-6 mb-10">
                <a href="mailto:info@tdata-testing.de" className="flex items-start gap-4 group" data-testid="contact-email-link">
                  <div className="w-11 h-11 bg-sage-50 border border-sage-200 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Mail className="text-sage-600" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1C2B3A]">E-Mail</div>
                    <div className="group-hover:text-sage-600 transition-colors">info@tdata-testing.de</div>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-sage-50 border border-sage-200 rounded-sm flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-sage-600" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1C2B3A]">Adresse</div>
                    <div>Lohnrößlerweg 12<br />81829 München, Deutschland</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F0F4FA] border border-[#D9E3F0] p-8 rounded-sm">
                <h3 className="font-heading font-bold text-[#1C2B3A] mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-sage-600" /> Erreichbarkeit
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Montag – Freitag</span>
                    <span className="font-semibold text-[#1C2B3A]">09:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samstag – Sonntag</span>
                    <span className="text-[#8A97A6]">Geschlossen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-80 bg-[#F0F4FA] border-t border-[#D9E3F0] flex items-center justify-center">
        <div className="text-center">
          <MapPin className="text-sage-600 mx-auto mb-3" size={40} strokeWidth={1.5} />
          <p className="font-medium text-[#1C2B3A]">Lohnrößlerweg 12, 81829 München</p>
        </div>
      </section>
    </div>
  );
};

export default Kontakt;
