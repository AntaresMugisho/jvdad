'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useI18n } from '@/lib/i18n-context';
import { Menu, X, Heart } from 'lucide-react';

export function Navbar() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('Accueil', 'Home') },
    { href: '#about', label: t('À propos', 'About') },
    { href: '#projects', label: t('Projets', 'Projects') },
    { href: '#news', label: t('Actualités', 'News') },
    { href: '#gallery', label: t('Galerie', 'Gallery') },
    { href: '#contact', label: t('Contact', 'Contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AHDI ASBL</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            <Link href="#donate" className="hidden sm:block">
              <Button className="bg-green-600 hover:bg-green-700">
                {t('Faire un don', 'Donate')}
              </Button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="#donate" className="block" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-green-600 hover:bg-green-700 mt-2">
                {t('Faire un don', 'Donate')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
