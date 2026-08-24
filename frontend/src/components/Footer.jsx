import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { NexuraLogo } from './Logo';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    navigation: [
      { name: 'Startseite', path: '/' },
      { name: 'Unternehmen', path: '/unternehmen' },
      { name: 'Leistungen', path: '/dienstleistungen' },
      { name: 'Karriere', path: '/karriere' },
      { name: 'Kontakt', path: '/kontakt' },
    ],
    legal: [
      { name: 'Impressum', path: '/impressum' },
      { name: 'Datenschutz', path: '/datenschutz' },
      { name: 'Mitarbeiter Login', path: '/mitarbeiter/login' },
    ],
  };

  return (
    <footer className="bg-sage-900 text-[#E7EEF7] font-body" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <NexuraLogo className="h-11 w-11" />
              <span className="text-2xl font-heading font-bold text-white">
                Nex<span className="text-sage-300">ura</span>
              </span>
            </div>
            <p className="text-[#AFC4E4] leading-relaxed max-w-sm mb-8">
              Nexura ist Ihr verlässlicher Partner für professionelle
              Qualitätssicherung und Application Testing – gründlich, sorgfältig
              und nachvollziehbar.
            </p>

            <div className="space-y-3">
              <a href="mailto:info@nexura-gmbh.de" className="flex items-center gap-3 text-[#AFC4E4] hover:text-white transition-colors" data-testid="footer-email">
                <Mail size={18} className="text-sage-400" />
                info@nexura-gmbh.de
              </a>
              <div className="flex items-start gap-3 text-[#AFC4E4]">
                <MapPin size={18} className="text-sage-400 mt-0.5" />
                <span>Lohnrößlerweg 12, 81829 München</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-heading text-sm font-bold text-white mb-5">Navigation</h4>
              <ul className="space-y-3">
                {links.navigation.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-[#AFC4E4] hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-white mb-5">Leistungen</h4>
              <ul className="space-y-3">
                {['Funktionales Testing', 'Performance Testing', 'Usability Testing', 'Testautomatisierung'].map((service) => (
                  <li key={service}>
                    <Link to="/dienstleistungen" className="text-[#AFC4E4] hover:text-white transition-colors">
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-white mb-5">Rechtliches</h4>
              <ul className="space-y-3">
                {links.legal.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-[#AFC4E4] hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-[#8A97A6]">
            <p>© {currentYear} Nexura — NEXURA GmbH. Alle Rechte vorbehalten.</p>
            <p>Sorgfältig geprüft in Deutschland</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
