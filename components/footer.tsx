'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n-context';
import { Heart, Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-white">AHDI ASBL</span>
            </div>
            <p className="text-sm">
              {t(
                'Association humanitaire et de développement en Afrique',
                'Humanitarian and Development Association in Africa'
              )}
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('Navigation', 'Navigation')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#about" className="hover:text-green-400 transition-colors">{t('À propos', 'About')}</Link></li>
              <li><Link href="#projects" className="hover:text-green-400 transition-colors">{t('Projets', 'Projects')}</Link></li>
              <li><Link href="#news" className="hover:text-green-400 transition-colors">{t('Actualités', 'News')}</Link></li>
              <li><Link href="#gallery" className="hover:text-green-400 transition-colors">{t('Galerie', 'Gallery')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('Contact', 'Contact')}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>Kinshasa, RD Congo</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+243 XXX XXX XXX</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@ahdi-asbl.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('Suivez-nous', 'Follow Us')}</h3>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>
            © {currentYear} AHDI ASBL. {t('Tous droits réservés', 'All rights reserved')}.
          </p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-green-400 transition-colors">
              {t('Politique de confidentialité', 'Privacy Policy')}
            </Link>
            <Link href="/terms" className="hover:text-green-400 transition-colors">
              {t('Conditions d\'utilisation', 'Terms of Service')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
