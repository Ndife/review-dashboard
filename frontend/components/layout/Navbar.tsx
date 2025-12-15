'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '../ui/Button';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { Dropdown } from '../ui/Dropdown';
import { languageItems, currencyItems } from '../../constants/navigation';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State for Language and Currency
  // Defaulting to first item for language and GBP for currency (index 2 based on previous view or find)
  const [selectedLanguage, setSelectedLanguage] = useState(languageItems[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyItems[2] || currencyItems[0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoSrc =
    isScrolled || isMobileMenuOpen
      ? 'https://lsmvmmgkpbyqhthzdexc.supabase.co/storage/v1/object/public/website/Uploads/White_V3%20Symbol%20&%20Wordmark.png'
      : 'https://lsmvmmgkpbyqhthzdexc.supabase.co/storage/v1/object/public/website/Uploads/Green_V3%20Symbol%20&%20Wordmark%20(1).png';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={clsx(
        'fixed top-0 w-full z-50 md:px-8 px-4 py-6 transition-all duration-300 text-2xl font-bold tracking-normal',
        isScrolled || isMobileMenuOpen
          ? 'text-white shadow-sm bg-[#284E4C]'
          : 'to-transparent text-[#333333]'
      )}
    >
      <div className="mx-auto max-w-[1400px] flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="The Flex Homepage">
            <div className="relative w-24 h-8 md:w-30 md:h-10 hover:opacity-80 transition-opacity">
              <Image src={logoSrc} alt="The Flex" fill className="object-contain" priority />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Actions */}
        <div className="md:hidden flex items-center gap-4">
          <Dropdown
            trigger={
              <span
                className={clsx(
                  'flex items-center gap-2 text-sm font-medium',
                  isScrolled || isMobileMenuOpen ? 'text-white' : 'text-[#333333]'
                )}
              >
                <span className="text-lg">{selectedLanguage.icon}</span>
                {/* User requested Flag + Symbol/Language on mobile. Using Symbol if present, else label */}
                {selectedLanguage.symbol || selectedLanguage.label}
              </span>
            }
            items={languageItems.map((item) => ({
              ...item,
              onClick: () => setSelectedLanguage(item),
              href: undefined,
            }))}
            align="right"
            dropdownClassName="w-40"
            showChevron={false}
          />

          <Dropdown
            trigger={
              <span
                className={clsx(
                  'flex items-center gap-2 text-sm font-medium',
                  isScrolled || isMobileMenuOpen ? 'text-white' : 'text-[#333333]'
                )}
              >
                <span className="text-lg">{selectedCurrency.icon}</span>
                {selectedCurrency.label}
              </span>
            }
            items={currencyItems.map((item) => ({
              ...item,
              onClick: () => setSelectedCurrency(item),
              href: undefined,
            }))}
            align="right"
            dropdownClassName="w-40"
            showChevron={false}
          />

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent hover:opacity-70 p-0 h-auto"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X
                className={clsx(
                  'w-6 h-6',
                  isScrolled || isMobileMenuOpen ? 'text-white' : 'text-[#333333]'
                )}
              />
            ) : (
              <Menu className={clsx('w-6 h-6', isScrolled ? 'text-white' : 'text-[#333333]')} />
            )}
          </Button>
        </div>

        <DesktopNav
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
        />
      </div>
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};
